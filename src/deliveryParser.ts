/**
 * Delivery parser utilities shared across web clients.
 * These run entirely client-side with no network dependency.
 */

export interface ParsedDelivery {
  pickupAddress: string;
  pickupPhone: string;
  dropOffAddress: string;
  dropOffPhone: string;
  description: string;
}

/**
 * Parses structured plain-text delivery templates into typed delivery objects.
 * Supports both single and bulk (multi-dropoff) formats separated by `---`.
 */
export function localParse(text: string): ParsedDelivery[] {
  const results: ParsedDelivery[] = [];
  const normalized = text.trim();

  if (!normalized) return results;

  // Extract global pickup info
  const pickupMatch = normalized.match(/Pickup:\s*(.+)/i);
  const globalPickup = pickupMatch ? pickupMatch[1].trim() : '';

  const phoneMatch = normalized.match(/(?:Sender |Pickup )?Phone:\s*([\d\+\- ]+)/i);
  const globalPhone = phoneMatch ? phoneMatch[1].trim() : '';

  // Split by Dropoff blocks or dashes
  const dropoffBlocks = normalized
    .split(/---|Dropoff\s*\d*:|Delivery\s*\d*:/i)
    .map((b) => b.trim());

  // First block is pickup (already extracted above)
  dropoffBlocks.shift();

  if (dropoffBlocks.length === 0) return results;

  for (const block of dropoffBlocks) {
    if (block.length < 5) continue;

    const dAddressMatch = block.match(/(?:Address|Location):\s*(.+)/i);
    const dAddress = dAddressMatch
      ? dAddressMatch[1].trim()
      : block.split('\n')[0].replace(/(?:Dropoff|Delivery)\s*\d*:/i, '').trim();
    const dPhone = block.match(/(?:Receiver |Dropoff )?Phone:\s*([\d\+\- ]+)/i)?.[1]?.trim() ?? '';
    const dNote  = block.match(/Note:\s*(.+)/i)?.[1]?.trim() ?? '';

    if (dAddress || dPhone) {
      results.push({
        pickupAddress: globalPickup,
        pickupPhone:   globalPhone,
        dropOffAddress: dAddress,
        dropOffPhone:   dPhone,
        description:    dNote,
      });
    }
  }

  return results;
}
