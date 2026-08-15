import type { Product } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import cartIcon from '../../assets/icons/cart.svg';
import heartIcon from '../../assets/icons/heart.svg';
import './ProductCard.css';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();

  // dummyjson lists `price` before the available discount is applied.
  const salePrice = product.price * (1 - product.discountPercentage / 100);
  // Roughly half the catalogue has no brand, so fall back to the category.
  const subtitle = product.brand ?? product.category;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.thumbnail} alt={product.title} className="product-card__image" loading="lazy" />

        {/* Not present in the static design — revealed on hover only */}
        <div className="product-card__actions">
          <button
            className="product-card__action"
            aria-label={`Add ${product.title} to cart`}
            onClick={() => dispatch(addToCart(product))}
          >
            <img src={cartIcon} alt="" />
          </button>
          <button className="product-card__action" aria-label={`Add ${product.title} to wishlist`}>
            <img src={heartIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name" title={product.title}>{product.title}</h3>
        <p className="product-card__dept">{subtitle}</p>
        <div className="product-card__prices">
          <span className="product-card__old-price">${product.price.toFixed(2)}</span>
          <span className="product-card__price">${salePrice.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
