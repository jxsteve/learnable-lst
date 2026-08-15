import type { Product } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import cartIcon from '../../assets/icons/cart.svg';
import heartIcon from '../../assets/icons/heart.svg';
import './ProductCard.css';

interface Props {
  /** Card imagery, exported from the Figma design */
  image: string;
  /** Live product record, when the products query has resolved */
  product?: Product;
}

export default function ProductCard({ image, product }: Props) {
  const dispatch = useAppDispatch();

  // The design fixes these values on every card; live prices override when available.
  const price = product ? product.price.toFixed(2) : '6.48';
  const oldPrice = product
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : '16.48';

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={image} alt="" className="product-card__image" loading="lazy" />

        {/* Not present in the static design — revealed on hover only */}
        <div className="product-card__actions">
          <button
            className="product-card__action"
            aria-label="Add to cart"
            disabled={!product}
            onClick={() => product && dispatch(addToCart(product))}
          >
            <img src={cartIcon} alt="" />
          </button>
          <button className="product-card__action" aria-label="Add to wishlist">
            <img src={heartIcon} alt="" />
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">Graphic Design</h3>
        <p className="product-card__dept">English Department</p>
        <div className="product-card__prices">
          <span className="product-card__old-price">${oldPrice}</span>
          <span className="product-card__price">${price}</span>
        </div>
      </div>
    </article>
  );
}
