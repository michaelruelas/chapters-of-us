import { describe, expect, it } from 'vitest';
import { getAnniversaryYears, normalizeConfig } from './config';

describe('normalizeConfig', () => {
  it('falls back to defaults for missing fields', () => {
    const cfg = normalizeConfig({});
    expect(cfg.siteTitle).toBe('Chapters of Us');
    expect(cfg.landingTitle).toBe('Our Story');
    expect(cfg.landingSubtitle).toBe('years');
    expect(cfg.description).toBe('Our love story through the years');
    expect(cfg.theme).toBe('navy');
    expect(cfg.timelineEvents).toEqual([]);
    expect(cfg.anniversaryDate).toBeUndefined();
  });

  it('accepts an explicit theme', () => {
    expect(normalizeConfig({ theme: 'sage' }).theme).toBe('sage');
    expect(normalizeConfig({ theme: 'gray' }).theme).toBe('gray');
  });

  it('falls back to navy for unknown themes', () => {
    expect(normalizeConfig({ theme: 'magenta' }).theme).toBe('navy');
    expect(normalizeConfig({ theme: undefined }).theme).toBe('navy');
  });

  it('keeps an empty array only when timelineEvents is missing or invalid', () => {
    expect(normalizeConfig({}).timelineEvents).toEqual([]);
    expect(normalizeConfig({ timelineEvents: 'not-an-array' }).timelineEvents).toEqual([]);
    expect(normalizeConfig({ timelineEvents: [{ id: 'a' }] }).timelineEvents).toEqual([
      { id: 'a' },
    ]);
  });

  it('handles null and undefined input without throwing', () => {
    expect(() => normalizeConfig(null)).not.toThrow();
    expect(() => normalizeConfig(undefined)).not.toThrow();
  });
});

describe('getAnniversaryYears', () => {
  const june = (year, day) => new Date(year, 5, day);

  it('counts full years when the anniversary has already passed this year', () => {
    const anniv = june(2015, 15);
    expect(getAnniversaryYears(anniv.toISOString(), june(2024, 20))).toBe(9);
  });

  it('does not count the current year before the anniversary date', () => {
    const anniv = june(2015, 15);
    expect(getAnniversaryYears(anniv.toISOString(), june(2024, 10))).toBe(8);
  });

  it('counts the anniversary itself on the exact day', () => {
    const anniv = june(2015, 15);
    expect(getAnniversaryYears(anniv.toISOString(), june(2024, 15))).toBe(9);
  });

  it('handles month boundaries correctly', () => {
    const anniv = june(2015, 15);
    expect(getAnniversaryYears(anniv.toISOString(), june(2024, 14))).toBe(8);
    expect(getAnniversaryYears(anniv.toISOString(), june(2024, 16))).toBe(9);
  });

  it('returns 0 for invalid date strings', () => {
    expect(getAnniversaryYears('not-a-date', june(2024, 20))).toBe(0);
    expect(getAnniversaryYears('2024-13-40', june(2024, 20))).toBe(0);
  });

  it('falls back to config when override is empty or missing', () => {
    expect(getAnniversaryYears('', june(2024, 20))).toBe(9);
    expect(getAnniversaryYears(undefined, june(2024, 20))).toBe(9);
  });

  it('clamps to 0 for future anniversaries', () => {
    const future = june(2099, 1);
    expect(getAnniversaryYears(future.toISOString(), june(2024, 20))).toBe(0);
  });
});
