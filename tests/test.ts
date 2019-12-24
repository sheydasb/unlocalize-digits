import { localizeDigits, unlocalizeDigits } from '../src/lib';

describe('validate unlocalizeDigits', () => {
  it('should return empty string for empty input', () => {
    expect(unlocalizeDigits('')).toBe('');
  });
  it('should not remove leading zeroes', () => {
    expect(unlocalizeDigits('۰۰۱۲۳۴۵.۶۷۸۹')).toBe('0012345.6789');
  });
  it('should support all non-latin utf16 digits', () => {
    expect(
      unlocalizeDigits('١٢٣٤٥٦٧٨٩٠-১২৩৪৫৬৭৮৯০-۱۲۳۴۵۶۷۸۹۰-१२३४५६७८९०'),
    ).toBe('1234567890-1234567890-1234567890-1234567890');
  });
  it('should work with mixed example', () => {
    expect(unlocalizeDigits('۵۴loremdupsdups۰۰۱۲۳۴۵.۶۷۸۹huh')).toBe(
      '54loremdupsdups0012345.6789huh',
    );
  });
});

describe('validate localizeDigits', () => {
  it('should return empty string for empty input', () => {
    expect(localizeDigits('', 'fa')).toBe('');
  });
  it('should not remove leading zeroes', () => {
    expect(localizeDigits('0012345.6789', 'fa')).toBe('۰۰۱۲۳۴۵.۶۷۸۹');
  });
  it('should support arabic digits', () => {
    expect(localizeDigits(1234567890, 'ar')).toBe('١٢٣٤٥٦٧٨٩٠');
  });
  it('should support bengali digits', () => {
    expect(localizeDigits(1234567890, 'bn')).toBe('১২৩৪৫৬৭৮৯০');
  });
  it('should support farsi digits', () => {
    expect(localizeDigits(1234567890, 'fa')).toBe('۱۲۳۴۵۶۷۸۹۰');
  });
  it('should support marathi digits', () => {
    expect(localizeDigits(1234567890, 'mr')).toBe('१२३४५६७८९०');
  });
  it('should work with mixed example', () => {
    expect(localizeDigits('54loremdupsdups0012345.6789huh', 'fa-IR')).toBe(
      '۵۴loremdupsdups۰۰۱۲۳۴۵.۶۷۸۹huh',
    );
  });
  it('it should work with numbers as input', () => {
    expect(localizeDigits(345243, 'fa')).toBe('۳۴۵۲۴۳');
  });
  it('should return same string for languages that use latin digits', () => {
    const input = '32432';
    expect(localizeDigits(input, '#@%invalidlangcode*%$@%@')).toBe(input);
  });
});
