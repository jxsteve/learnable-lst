import type { Product } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/format';
import starFilled from '../../assets/icons/pc-star-filled.svg';
import starEmpty from '../../assets/icons/pc-star-empty.svg';
import compareIcon from '../../assets/icons/pc-compare.svg';
import heartIcon from '../../assets/icons/pc-heart.svg';
import './ProductCard.css';

interface Props {
  product: Product;
}

const MAX_STARS = 5;

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();

  const discount = Math.round(product.discountPercentage);
  const hasDiscount = discount >= 1;
  const salePrice = product.price * (1 - product.discountPercentage / 100);
  const outOfStock = product.stock === 0 || product.availabilityStatus === 'Out of Stock';

  // Roughly half of dummyjson's catalogue has no brand, so fall back to category.
  const brand = product.brand ?? product.category;
  // The design swaps to a second shot on hover; not every product has one.
  const hoverImage = product.images?.[1];
  const filledStars = Math.round(product.rating);

  return (
    <article className={`pcard ${outOfStock ? 'pcard--out-of-stock' : ''}`}>
      <div className="pcard__media">
        <img src={product.thumbnail} alt={product.title} className="pcard__image" loading="lazy" />
        {hoverImage && (
          <img src={hoverImage} alt="" className="pcard__image pcard__image--hover" loading="lazy" />
        )}

        {hasDiscount && <span className="pcard__badge">-{discount}%</span>}
        {outOfStock && <span className="pcard__stock-flag">Out of stock</span>}

        <div className="pcard__actions">
          <button className="pcard__action" aria-label={`Compare ${product.title}`}>
            <img src={compareIcon} alt="" />
          </button>
          <button className="pcard__action" aria-label={`Add ${product.title} to wishlist`}>
            <img src={heartIcon} alt="" />
          </button>
        </div>
      </div>

      <p className="pcard__brand">{brand}</p>
      <h3 className="pcard__title" title={product.title}>{product.title}</h3>

      <div className="pcard__prices">
        {hasDiscount && (
          <span className="pcard__old-price">{formatPrice(product.price)}</span>
        )}
        <span className="pcard__price">
          {formatPrice(hasDiscount ? salePrice : product.price)}
        </span>
      </div>

      <div className="pcard__rating">
        <span className="pcard__stars" aria-hidden>
          {Array.from({ length: MAX_STARS }, (_, index) => (
            <img key={index} src={index < filledStars ? starFilled : starEmpty} alt="" />
          ))}
        </span>
        <span className="pcard__rating-text">
          <span className="pcard__rating-value">{product.rating.toFixed(1)}</span>
          {` (${product.reviews?.length ?? 0})`}
        </span>
      </div>

      <div className="pcard__footer">
        <button
          className="pcard__basket"
          disabled={outOfStock}
          onClick={() => dispatch(addToCart(product))}
        >
          Add to basket
        </button>
      </div>
    </article>
  );
}
