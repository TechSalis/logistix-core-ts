import { describe, it, expect, expectTypeOf } from 'vitest';
import {
  CAC_EVIDENCE_STATUS,
  type CACEvidenceStatus,
  type CacVerificationEvidence,
  type CompanyMetadata,
} from '../src/index.js';

// SSOT for CAC verification: the status union (wire values stored in
// companies.metadata.cacVerification) and the evidence shape must be importable
// from the package entry point and stay in lockstep with each other.
describe('CAC evidence SSOT', () => {
  it('exposes the four CAC verdict statuses as canonical wire values', () => {
    expect(CAC_EVIDENCE_STATUS).toEqual({
      FOUND: 'FOUND',
      INACTIVE: 'INACTIVE',
      NOT_FOUND: 'NOT_FOUND',
      ERROR: 'ERROR',
    });
    expect(CAC_EVIDENCE_STATUS.FOUND).toBe('FOUND');
    expect(CAC_EVIDENCE_STATUS.INACTIVE).toBe('INACTIVE');
    expect(CAC_EVIDENCE_STATUS.NOT_FOUND).toBe('NOT_FOUND');
    expect(CAC_EVIDENCE_STATUS.ERROR).toBe('ERROR');
  });

  it('CACEvidenceStatus is exactly the union of the const values', () => {
    expectTypeOf<CACEvidenceStatus>().toEqualTypeOf<
      (typeof CAC_EVIDENCE_STATUS)[keyof typeof CAC_EVIDENCE_STATUS]
    >();
  });

  it('CacVerificationEvidence status field is the SSOT union', () => {
    expectTypeOf<CacVerificationEvidence['status']>().toEqualTypeOf<CACEvidenceStatus>();
  });

  it('CompanyMetadata.cacVerification uses the SSOT evidence shape', () => {
    expectTypeOf<
      NonNullable<CompanyMetadata['cacVerification']>
    >().toEqualTypeOf<CacVerificationEvidence>();
  });
});
