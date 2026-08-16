import type { ProductSummary } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { selectIsWishlisted } from '../../features/wishlist/wishlistSelectors';
import { formatPrice, getSalePrice } from '../../utils/format';
import starFilled from '../../assets/icons/pc-star-filled.svg';
import starEmpty from '../../assets/icons/pc-star-empty.svg';
import heartIcon from '../../assets/icons/pc-heart.svg';
import heartFilledIcon from '../../assets/icons/pc-heart-filled.svg';
import './ProductCard.css';

interface Props {
  product: ProductSummary;
}

const MAX_STARS = 5;

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) => selectIsWishlisted(state, product.id));

  const discount = Math.round(product.discountPercentage);
  const hasDiscount = discount >= 1;
  const salePrice = getSalePrice(product);
  const outOfStock = product.stock === 0 || product.availabilityStatus === 'Out of Stock';

  // Roughly half of dummyjson's catalogue has no brand, so fall back to category.
  const brand = product.brand ?? product.category;
  // The design swaps to a second shot on hover; not every product has one.
  const hoverImage = product.images?.[1];
  const filledStars = Math.round(product.rating);

  return (
    <article
      className={[
        'pcard',
        outOfStock ? 'pcard--out-of-stock' : '',
        hoverImage ? 'pcard--has-hover' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="pcard__media">
        <img src={product.thumbnail} alt={product.title} className="pcard__image" loading="lazy" />
        {hoverImage && (
          <img src={hoverImage} alt="" className="pcard__image pcard__image--hover" loading="lazy" />
        )}

        {hasDiscount && <span className="pcard__badge">-{discount}%</span>}
        {outOfStock && <span className="pcard__stock-flag">Out of stock</span>}

        <button
          className={`pcard__like ${isWishlisted ? 'pcard__like--on' : ''}`}
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          aria-pressed={isWishlisted}
          onClick={() => dispatch(toggleWishlist(product.id))}
        >
          <img src={isWishlisted ? heartFilledIcon : heartIcon} alt="" />
        </button>
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
