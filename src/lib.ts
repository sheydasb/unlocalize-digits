const langZeroMap: Readonly<Record<string, string>> = {
  ar: '٠',
  bn: '০',
  fa: '۰',
  mr: '०',
};
const langs = Object.keys(langZeroMap);
const zeroCharCodes = langs.map(lang => langZeroMap[lang].charCodeAt(0));
const charRanges = zeroCharCodes
  .map(c => [c, c + 9].map(cd => String.fromCharCode(cd)).join('-'))
  .join('');
const nonAsciiDigitRegex = new RegExp(`[${charRanges}]`, 'g');
const asciiZeroCode = '0'.charCodeAt(0);

/**
 * Replaces non-ascii digits of a string with the equivalent ascii digits
 * @param input - string to convert
 */
export function unlocalizeDigits(input: string): string {
  return input.replace(nonAsciiDigitRegex, digit => {
    const c = digit.charCodeAt(0);
    const localeZeroCode = zeroCharCodes.find(
      z => z <= c && c <= z + 9,
    ) as number;
    return String.fromCharCode(c - localeZeroCode + asciiZeroCode);
  });
}

/**
 * Replaces ascii digits of a string or number to localized string by using the current or specified locale.
 * @param input - number or string to convert
 * @param locale - A locale string that contains a language or locale tag. If you omit this parameter, the default locale of the JavaScript runtime is used.
 */
export function localizeDigits(input: string | number, locale: string): string {
  const [lang] = locale.split('-');
  const idx = langs.indexOf(lang);
  if (idx === -1) return String(input);
  const zeroCode = zeroCharCodes[idx];
  return String(input).replace(/\d/g, num =>
    String.fromCharCode(zeroCode + +num),
  );
}
