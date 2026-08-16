import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

const INVALID_ENCRYPTED_FORMAT = 'Invalid encrypted format';

interface ParsedKey {
  key: Buffer;
  version: string;
}

interface EncryptedPayload {
  v: string;
  ivHex: string;
  ciphertext: string;
  authTagHex: string;
}

/**
 * Parse a versioned key string. The last `.` separates the version suffix
 * (default `v0`) from the hex-encoded AES-256 key. `Buffer.from(hex)` never
 * throws — invalid hex yields a short/empty buffer that fails on first use.
 */
function parseKey(raw: string): ParsedKey {
  const dotIndex = raw.lastIndexOf('.');
  const version = dotIndex >= 0 ? raw.slice(dotIndex + 1) : 'v0';
  const keyHex = dotIndex >= 0 ? raw.slice(0, dotIndex) : raw;
  return { key: Buffer.from(keyHex, 'hex'), version };
}

/**
 * AES-256-GCM encrypt/decrypt pair bound to a current key and an optional
 * rotated-out key. The previous key is a decrypt-only fallback for payloads
 * whose version does not match the current key — it is never used to encrypt.
 *
 * Pure crypto factory: it performs no config/env reads, so callers own key
 * resolution (env, Vault, etc.). Errors are plain `Error` instances with the
 * message `Invalid encrypted format`; callers in app layers map them to their
 * own error types if needed.
 */
export function createEncryptor(currentKey: string, previousKey?: string) {
  const current = parseKey(currentKey);
  const previous = previousKey ? parseKey(previousKey) : undefined;

  function encrypt(plaintext: string): string {
    const { key, version } = current;
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv);

    let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
    ciphertext += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    return JSON.stringify({
      v: version,
      iv: iv.toString('hex'),
      c: ciphertext,
      t: authTag,
    });
  }

  function parsePayload(payload: string): EncryptedPayload {
    let parsed: { v?: string; iv?: string; c?: string; t?: string };
    try {
      const value = JSON.parse(payload) as { v?: string; iv?: string; c?: string; t?: string };
      if (value === null || typeof value !== 'object') {
        throw new Error(INVALID_ENCRYPTED_FORMAT);
      }
      parsed = value;
    } catch {
      throw new Error(INVALID_ENCRYPTED_FORMAT);
    }
    const { v, iv, c, t } = parsed;
    if (!iv || !c || !t) {
      throw new Error(INVALID_ENCRYPTED_FORMAT);
    }
    return { v: v ?? '', ivHex: iv, ciphertext: c, authTagHex: t };
  }

  function tryDecryptWith(
    key: Buffer,
    { ivHex, ciphertext, authTagHex }: EncryptedPayload,
  ): string {
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
    plaintext += decipher.final('utf8');
    return plaintext;
  }

  function decryptWithKeyVersion(payload: string): { plaintext: string; version: string } {
    const parsed = parsePayload(payload);

    try {
      return { plaintext: tryDecryptWith(current.key, parsed), version: current.version };
    } catch {
      // Only fall back to the previous key for payloads that were NOT encrypted
      // under the current version. A payload claiming the current version that
      // fails GCM auth is tampering and must never silently fall back.
      if (previous && parsed.v !== current.version) {
        try {
          return { plaintext: tryDecryptWith(previous.key, parsed), version: previous.version };
        } catch {
          throw new Error(INVALID_ENCRYPTED_FORMAT);
        }
      }
      throw new Error(INVALID_ENCRYPTED_FORMAT);
    }
  }

  function decrypt(payload: string): string {
    return decryptWithKeyVersion(payload).plaintext;
  }

  /**
   * Returns the payload unchanged when it already decrypts under the current
   * key, or a freshly-encrypted payload under the current key (new IV + auth
   * tag) when it was encrypted under the previous key.
   */
  function reencryptIfNeeded(payload: string): string {
    const { plaintext, version } = decryptWithKeyVersion(payload);
    if (version === current.version) {
      return payload;
    }
    return encrypt(plaintext);
  }

  return { encrypt, decrypt, decryptWithKeyVersion, reencryptIfNeeded };
}

export type Encryptor = ReturnType<typeof createEncryptor>;
