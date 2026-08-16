import { describe, it, expect } from 'vitest';
import { createEncryptor } from '../src/services/encryption.js';

const OLD_KEY = `${'a'.repeat(64)}.v0`;
const NEW_KEY = `${'b'.repeat(64)}.v1`;

function tamperCiphertext(payload: string): string {
  const parsed = JSON.parse(payload) as { c: string };
  const c = parsed.c;
  const flipped = c[0] === 'a' ? 'b' : 'a';
  return JSON.stringify({ ...parsed, c: flipped + c.slice(1) });
}

describe('createEncryptor', () => {
  describe('encrypt/decrypt', () => {
    it('round-trips a value encrypted with the current key', () => {
      const { encrypt, decrypt } = createEncryptor(NEW_KEY);
      expect(decrypt(encrypt('1234'))).toBe('1234');
    });

    it('embeds the current key version in the payload', () => {
      const { encrypt } = createEncryptor(NEW_KEY);
      const parsed = JSON.parse(encrypt('1234')) as { v: string };
      expect(parsed.v).toBe('v1');
    });

    it('decrypts previous-key ciphertext when a previous key is configured', () => {
      const old = createEncryptor(OLD_KEY);
      const payload = old.encrypt('4321');
      const current = createEncryptor(NEW_KEY, OLD_KEY);
      expect(current.decrypt(payload)).toBe('4321');
    });

    it('throws when previous-key ciphertext is decrypted without a previous key', () => {
      const old = createEncryptor(OLD_KEY);
      const payload = old.encrypt('9999');
      const current = createEncryptor(NEW_KEY);
      expect(() => current.decrypt(payload)).toThrow('Invalid encrypted format');
    });

    it('rejects tampered payloads claiming the current version even when a previous key is set', () => {
      const { encrypt, decrypt } = createEncryptor(NEW_KEY, OLD_KEY);
      expect(() => decrypt(tamperCiphertext(encrypt('1234')))).toThrow('Invalid encrypted format');
    });

    it('rejects tampered previous-version payloads when the previous key is configured', () => {
      const old = createEncryptor(OLD_KEY);
      const payload = old.encrypt('1234');
      const current = createEncryptor(NEW_KEY, OLD_KEY);
      expect(() => current.decrypt(tamperCiphertext(payload))).toThrow('Invalid encrypted format');
    });

    it('rejects tampered previous-version payloads when no previous key is set', () => {
      const old = createEncryptor(OLD_KEY);
      const payload = old.encrypt('1234');
      const current = createEncryptor(NEW_KEY);
      expect(() => current.decrypt(tamperCiphertext(payload))).toThrow('Invalid encrypted format');
    });

    it('rejects a payload of exactly "null" without throwing a TypeError', () => {
      const { decrypt } = createEncryptor(NEW_KEY);
      expect(() => decrypt('null')).toThrow('Invalid encrypted format');
    });

    it('rejects a non-JSON payload', () => {
      const { decrypt } = createEncryptor(NEW_KEY);
      expect(() => decrypt('not-json')).toThrow('Invalid encrypted format');
    });

    it('rejects a payload missing required fields', () => {
      const { decrypt } = createEncryptor(NEW_KEY);
      expect(() => decrypt(JSON.stringify({ v: 'v1', iv: 'aa' }))).toThrow(
        'Invalid encrypted format',
      );
    });
  });

  describe('decryptWithKeyVersion', () => {
    it('reports the current version for current-key ciphertext', () => {
      const { encrypt, decryptWithKeyVersion } = createEncryptor(NEW_KEY);
      const { plaintext, version } = decryptWithKeyVersion(encrypt('1234'));
      expect(plaintext).toBe('1234');
      expect(version).toBe('v1');
    });

    it('reports the previous version when ciphertext decrypts under the previous key', () => {
      const old = createEncryptor(OLD_KEY);
      const payload = old.encrypt('1234');
      const current = createEncryptor(NEW_KEY, OLD_KEY);
      const { plaintext, version } = current.decryptWithKeyVersion(payload);
      expect(plaintext).toBe('1234');
      expect(version).toBe('v0');
    });
  });

  describe('reencryptIfNeeded', () => {
    it('re-encrypts previous-key payloads under the current key (different ciphertext, same plaintext)', () => {
      const old = createEncryptor(OLD_KEY);
      const payload = old.encrypt('1234');
      const current = createEncryptor(NEW_KEY, OLD_KEY);
      const next = current.reencryptIfNeeded(payload);

      expect(next).not.toBe(payload);
      const { plaintext, version } = current.decryptWithKeyVersion(next);
      expect(plaintext).toBe('1234');
      expect(version).toBe('v1');
    });

    it('returns current-key payloads byte-identical', () => {
      const { encrypt, reencryptIfNeeded } = createEncryptor(NEW_KEY, OLD_KEY);
      const payload = encrypt('1234');
      expect(reencryptIfNeeded(payload)).toBe(payload);
    });
  });

  describe('key parsing', () => {
    it('defaults to version v0 for a versionless key', () => {
      const { encrypt, decryptWithKeyVersion } = createEncryptor('b'.repeat(64));
      const { version } = decryptWithKeyVersion(encrypt('x'));
      expect(version).toBe('v0');
    });
  });
});
