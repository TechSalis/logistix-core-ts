import { z } from 'zod';
import { SECURITY_CONFIG } from './security.js';
import { LIMITS_CONFIG } from './limits.js';

const SQL_INJECTION_PATTERN =
  /(?:union\s+select|drop\s+table|insert\s+into|delete\s+from|update\s+\w+\s+set|exec\s*\(|script\s*>)/i;
const XSS_PATTERN =
  /(?:<script|javascript:|onload=|onerror=|onclick=|onmouseover=|<iframe|<object|<embed)/i;

/**
 * Sanitize user input to prevent XSS.
 * Shared across backend, workers, and web apps.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:\s*\w+/gi, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/url\s*\(/gi, '')
    .replace(/&#x?\w+;/gi, '')
    .replace(/[\\"]/g, '')
    .trim();
}

/**
 * Check if input contains SQL injection patterns.
 */
export function containsSqlInjection(input: string): boolean {
  return SQL_INJECTION_PATTERN.test(input);
}

/**
 * Check if input contains XSS patterns.
 */
export function containsXss(input: string): boolean {
  return XSS_PATTERN.test(input);
}

/**
 * Zod validation schemas for common fields.
 * Limits sourced from SECURITY_CONFIG (SSOT).
 */
const ValidationSchemas = {
  email: z
    .email('Invalid email format')
    .max(SECURITY_CONFIG.validation.maxEmailLength, 'Email too long')
    .transform((val) => val.trim().toLowerCase()),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(SECURITY_CONFIG.validation.maxPasswordLength, 'Password too long'),

  name: z
    .string()
    .min(1, 'Name is required')
    .max(SECURITY_CONFIG.validation.maxNameLength, 'Name too long')
    .transform(sanitizeInput),

  phone: z
    .string()
    .min(10, 'Phone number too short')
    .max(SECURITY_CONFIG.validation.maxPhoneLength, 'Phone number too long')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Invalid phone number format'),

  address: z
    .string()
    .min(1, 'Address is required')
    .max(SECURITY_CONFIG.validation.maxAddressLength, 'Address too long')
    .transform(sanitizeInput),

  description: z
    .string()
    .min(1, 'Description is required')
    .max(SECURITY_CONFIG.validation.maxDescriptionLength, 'Description too long')
    .transform(sanitizeInput),

  uuid: z.string().uuid('Invalid UUID format'),

  timeFormat: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (expected HH:MM)'),

  amount: z.number().positive('Amount must be positive').max(10_000_000, 'Amount too large'),

  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),

  pagination: z.object({
    limit: z.number().min(1).max(LIMITS_CONFIG.maxQueryLimit).default(20),
    offset: z.number().min(0).default(0),
  }),
};

/**
 * Comprehensive input validation.
 * Shared across backend and workers — the single source of truth
 * for all field-level validation rules.
 */
export class InputValidator {
  static validateEmail(email: string): string {
    return ValidationSchemas.email.parse(email);
  }

  static validatePassword(password: string): string {
    return ValidationSchemas.password.parse(password);
  }

  static validateName(name: string): string {
    return ValidationSchemas.name.parse(name);
  }

  static validatePhone(phone: string): string {
    return ValidationSchemas.phone.parse(phone);
  }

  static validateAddress(address: string): string {
    return ValidationSchemas.address.parse(address);
  }

  static validateDescription(description: string): string {
    return ValidationSchemas.description.parse(description);
  }

  static validateUuid(uuid: string): string {
    return ValidationSchemas.uuid.parse(uuid);
  }

  static validateTime(time: string): string {
    return ValidationSchemas.timeFormat.parse(time);
  }

  static validateAmount(amount: number): number {
    return ValidationSchemas.amount.parse(amount);
  }

  static validateCoordinates(lat: number, lng: number): { lat: number; lng: number } {
    return ValidationSchemas.coordinates.parse({ lat, lng });
  }

  static validatePagination(params: { limit?: number; offset?: number }): {
    limit: number;
    offset: number;
  } {
    return ValidationSchemas.pagination.parse(params);
  }

  static sanitize(input: string): string {
    return sanitizeInput(input);
  }

  static containsSqlInjection(input: string): boolean {
    return containsSqlInjection(input);
  }

  static containsXss(input: string): boolean {
    return containsXss(input);
  }
}
