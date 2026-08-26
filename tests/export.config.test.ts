import { describe, it, expect } from 'vitest';
import { ExportDataType } from '../src/shared/enums/enums.js';
import { VALID_DATA_TYPES, MONTH_REQUIRED_TYPES } from '../src/shared/config/export.config.js';

describe('export.config', () => {
  it('defines the canonical export data types', () => {
    expect(VALID_DATA_TYPES).toEqual([
      ExportDataType.DELIVERIES,
      ExportDataType.BILLING,
      ExportDataType.CHAT,
    ]);
  });

  it('requires a month for DELIVERIES/BILLING but not CHAT', () => {
    expect(MONTH_REQUIRED_TYPES.has(ExportDataType.DELIVERIES)).toBe(true);
    expect(MONTH_REQUIRED_TYPES.has(ExportDataType.BILLING)).toBe(true);
    expect(MONTH_REQUIRED_TYPES.has(ExportDataType.CHAT)).toBe(false);
  });
});
