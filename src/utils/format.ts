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

/**
 * dummyjson quotes `price` before the available discount, so the amount a
 * customer actually pays is derived. Shared by the product card, the
 * add-to-basket notification and the cart so they can never disagree.
 */
export function getSalePrice(product: {
  price: number;
  discountPercentage: number;
}): number {
  return product.price * (1 - product.discountPercentage / 100);
}
