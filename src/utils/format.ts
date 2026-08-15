/**
 * Currency shown on product cards and the basket notification.
 * The Figma card design is drawn in euros; dummyjson quotes US dollars, and the
 * rest of the app follows the data. Change this pair to switch presentation.
 */
const CURRENCY = 'USD';
const LOCALE = 'en-US';

const priceFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
});

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}
