import type { Product } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import './ProductCard.css';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="product-card">
      <div className="product-card__img-wrap">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <div className="product-card__actions">
          <button
            className="product-card__action-btn"
            aria-label="Add to cart"
            onClick={() => dispatch(addToCart(product))}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
          <button className="product-card__action-btn" aria-label="Add to wishlist">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
          <button className="product-card__action-btn" aria-label="Quick view">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">Graphic Design</h3>
        <p className="product-card__dept">English Department</p>
        <div className="product-card__prices">
          <span className="product-card__old-price">${originalPrice}</span>
          <span className="product-card__price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
