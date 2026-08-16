export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  /** Absent on roughly half of dummyjson's catalogue — always guard before use. */
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

/**
 * The subset of fields the product list requests via `?select=`. Asking for
 * only what the card renders cuts the payload by ~40%, so the list genuinely
 * does not carry the rest — this type keeps that honest.
 */
export type ProductSummary = Pick<
  Product,
  | 'id'
  | 'title'
  | 'brand'
  | 'category'
  | 'price'
  | 'discountPercentage'
  | 'rating'
  | 'stock'
  | 'availabilityStatus'
  | 'thumbnail'
  | 'images'
  | 'reviews'
>;

/** Field list sent as `?select=`, derived from ProductSummary's keys. */
export const PRODUCT_SUMMARY_FIELDS: ReadonlyArray<keyof ProductSummary> = [
  'id',
  'title',
  'brand',
  'category',
  'price',
  'discountPercentage',
  'rating',
  'stock',
  'availabilityStatus',
  'thumbnail',
  'images',
  'reviews',
];

export interface ProductsResponse {
  products: ProductSummary[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartItem {
  /** Cards add from the list, so the cart holds the summary shape. */
  product: ProductSummary;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  /** Drives the "Successfully added to basket" notification; null when dismissed. */
  lastAdded: ProductSummary | null;
  /** Whether the cart drawer is open. */
  isOpen: boolean;
}
