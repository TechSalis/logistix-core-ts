import { describe, it, expect } from 'vitest';
import { localParse } from '../src/deliveryParser.js';

describe('localParse', () => {
	it('returns empty array for empty input', () => {
		expect(localParse('')).toEqual([]);
		expect(localParse('   ')).toEqual([]);
	});

	it('returns empty array for gibberish', () => {
		expect(localParse('Hello, how are you today?')).toEqual([]);
	});

	it('parses a single pickup + dropoff block', () => {
		const input = `
Pickup: 14 Broad St, Lagos
Phone: 08012345678

---
Dropoff: 52 Bode Thomas, Surulere
Phone: 08198765432
Note: Fragile items`;

		const result = localParse(input);
		expect(result).toHaveLength(1);
		expect(result[0].pickupAddress).toBe('14 Broad St, Lagos');
		expect(result[0].pickupPhone).toBe('08012345678');
		expect(result[0].dropOffAddress).toBe('52 Bode Thomas, Surulere');
		expect(result[0].dropOffPhone).toBe('08198765432');
		expect(result[0].description).toBe('Fragile items');
	});

	it('parses multiple dropoffs separated by ---', () => {
		const input = `
Pickup: 14 Broad St, Lagos
Phone: 08012345678

---
Dropoff 1: 52 Bode Thomas, Surulere
Phone: 08198765432
Note: Call when outside

---
Dropoff 2: 12 Allen Ave, Ikeja
Phone: 09011122233`;

		const result = localParse(input);
		expect(result).toHaveLength(2);

		expect(result[0].pickupAddress).toBe('14 Broad St, Lagos');
		expect(result[0].dropOffAddress).toBe('52 Bode Thomas, Surulere');
		expect(result[0].description).toBe('Call when outside');

		expect(result[1].pickupAddress).toBe('14 Broad St, Lagos');
		expect(result[1].dropOffAddress).toBe('12 Allen Ave, Ikeja');
		expect(result[1].dropOffPhone).toBe('09011122233');
	});

	it('handles missing optional fields gracefully', () => {
		const input = `
Pickup: 14 Broad St, Lagos

---
Dropoff: 52 Bode Thomas, Surulere`;

		const result = localParse(input);
		expect(result).toHaveLength(1);
		expect(result[0].pickupPhone).toBe('');
		expect(result[0].dropOffPhone).toBe('');
		expect(result[0].description).toBe('');
	});

	it('is case-insensitive for keywords', () => {
		const input = `
pickup: 14 Broad St, Lagos
phone: 08012345678

---
dropoff: 52 Bode Thomas
phone: 08198765432`;

		const result = localParse(input);
		expect(result).toHaveLength(1);
		expect(result[0].pickupAddress).toBe('14 Broad St, Lagos');
	});

	it('does not crash on blocks with no address', () => {
		const input = `
Pickup: 14 Broad St

---

---
Dropoff: Final Stop
Phone: 09011111111`;

		expect(() => localParse(input)).not.toThrow();
	});
});
