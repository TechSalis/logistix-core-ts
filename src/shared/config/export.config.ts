import { ExportDataType } from '../enums/enums.js';

// Wire contract for the requestExport mutation. The backend validates and the
// workers query against these; never define a second copy.
export const VALID_DATA_TYPES: readonly ExportDataType[] = [
  ExportDataType.DELIVERIES,
  ExportDataType.BILLING,
  ExportDataType.CHAT,
];

export type DataType = (typeof VALID_DATA_TYPES)[number];

// These types are bucketed by month; a targetMonth is required for them.
// CHAT is all-time and never needs a month.
export const MONTH_REQUIRED_TYPES: ReadonlySet<DataType> = new Set<DataType>([
  ExportDataType.DELIVERIES,
  ExportDataType.BILLING,
]);
