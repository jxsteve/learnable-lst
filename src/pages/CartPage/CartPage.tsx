import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../features/cart/cartSlice';
import {
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
} from '../../features/cart/cartSelectors';
import { useGetProductsByCategoryQuery } from '../../features/products/productsApi';
import { formatPrice, getSalePrice } from '../../utils/format';
import ProductCard from '../../components/ProductCard/ProductCard';
import arrowIcon from '../../assets/icons/arrow-next.svg';
import trashIcon from '../../assets/icons/cart-trash.svg';
import starIcon from '../../assets/icons/cart-star.svg';
import minusBar from '../../assets/icons/cart-minus-bar.svg';
import paystackLogo from '../../assets/images/pay-paystack.webp';
import mastercardLogo from '../../assets/images/pay-mastercard.webp';
import visaLogo from '../../assets/images/pay-visa.webp';
import './CartPage.css';

const RELATED_LIMIT = 8;

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);

  // Suggest more of whatever category dominates the cart.
  const relatedCategory = items[0]?.product.category ?? 'furniture';
  const { data: related, isLoading: relatedLoading } = useGetProductsByCategoryQuery(
    { category: relatedCategory, limit: RELATED_LIMIT },
    { skip: items.length === 0 }
  );

  // Never suggest something already in the cart.
  const inCart = new Set(items.map((item) => item.product.id));
  const suggestions = (related?.products ?? []).filter((p) => !inCart.has(p.id));

  return (
    <main className="cart-page">
      {/* ── Breadcrumb ── */}
      <nav className="cart-page__breadcrumb" aria-label="Breadcrumb">
        <div className="cart-page__breadcrumb-inner">
          <Link to="/">Home</Link>
          <img src={arrowIcon} alt="" />
          <Link to="/#bestseller">Shop</Link>
          <img src={arrowIcon} alt="" />
          <span aria-current="page">Shopping Cart</span>
        </div>
      </nav>

      <div className="cart-page__body">
        <div className="cart-page__row">
          {/* ── Cart items ── */}
          <section className="cart-panel" aria-labelledby="cart-heading">
            <h1 className="cart-panel__title" id="cart-heading">Shopping Cart</h1>

            {items.length === 0 ? (
              <div className="cart-panel__empty">
                <p className="cart-panel__empty-title">Your cart is empty</p>
                <p className="cart-panel__empty-text">
                  Browse the shop and add something you like.
                </p>
                <Link to="/#bestseller" className="cart-panel__empty-cta">CONTINUE SHOPPING</Link>
              </div>
            ) : (
              <div className="cart-table">
                <div className="cart-table__head">
                  <span>Item Details</span>
                  <span>Quantity</span>
                  <span>Price</span>
                </div>

                <ul className="cart-table__body">
                  {items.map(({ product, quantity }) => {
                    const unit = getSalePrice(product);
                    const inStock = product.stock > 0;
                    return (
                      <li key={product.id} className="cart-row">
                        <div className="cart-row__main">
                          <div className="cart-row__details">
                            <img src={product.thumbnail} alt="" className="cart-row__thumb" />
                            <div className="cart-row__info">
                              <p className="cart-row__name" title={product.title}>{product.title}</p>
                              <p className={`cart-row__stock ${inStock ? '' : 'cart-row__stock--out'}`}>
                                {inStock ? 'In Stock' : 'Out of Stock'}
                              </p>
                              <div className="cart-row__rating">
                                <span className="cart-row__stars" aria-hidden>
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <img
                                      key={i}
                                      src={starIcon}
                                      alt=""
                                      style={{ opacity: i < Math.round(product.rating) ? 1 : 0.25 }}
                                    />
                                  ))}
                                </span>
                                <span className="cart-row__reviews">
                                  {product.reviews?.length ?? 0} Reviews
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="cart-row__qty">
                            <button
                              className="cart-step"
                              aria-label={`Decrease quantity of ${product.title}`}
                              onClick={() => dispatch(decrementQuantity(product.id))}
                            >
                              <img src={minusBar} alt="" />
                            </button>
                            <span className="cart-step__value" aria-live="polite">{quantity}</span>
                            <button
                              className="cart-step"
                              aria-label={`Increase quantity of ${product.title}`}
                              onClick={() => dispatch(incrementQuantity(product.id))}
                            >
                              <img src={minusBar} alt="" />
                              <img src={minusBar} alt="" className="cart-step__cross" />
                            </button>
                          </div>

                          <div className="cart-row__price">
                            <p className="cart-row__total">{formatPrice(unit * quantity)}</p>
                            <p className="cart-row__unit">
                              {formatPrice(unit)} x {quantity} {quantity === 1 ? 'Item' : 'Items'}
                            </p>
                          </div>
                        </div>

                        <button
                          className="cart-row__remove"
                          onClick={() => dispatch(removeFromCart(product.id))}
                        >
                          <img src={trashIcon} alt="" />
                          REMOVE
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          {/* ── Order summary ── */}
          <aside className="summary" aria-labelledby="summary-heading">
            <header className="summary__head">
              <h2 className="summary__title" id="summary-heading">Order Summary</h2>
              <p className="summary__count">{count} {count === 1 ? 'Item' : 'Items'}</p>
            </header>

            <div className="summary__row summary__row--delivery">
              <span className="summary__label">Delivery Charges</span>
              <span className="summary__note">
                Add your delivery address to checkout to see delivery charges.
              </span>
            </div>

            <div className="summary__row">
              <span className="summary__label">Subtotal</span>
              <span className="summary__value">{formatPrice(subtotal)}</span>
            </div>

            <div className="summary__row summary__row--total">
              <span className="summary__total-label">Total</span>
              <span className="summary__total-value">{formatPrice(subtotal)}</span>
            </div>

            <p className="summary__excluding">Excluding Delivery Charges</p>

            <button className="summary__checkout" disabled={items.length === 0}>
              Proceed to Checkout
            </button>

            <div className="summary__payments">
              <img src={paystackLogo} alt="Paystack" />
              <img src={mastercardLogo} alt="Mastercard" />
              <img src={visaLogo} alt="Visa" />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Related products ── */}
      {items.length > 0 && (relatedLoading || suggestions.length > 0) && (
        <section className="related">
          <h2 className="related__title">Products related to items in your cart</h2>
          <div className="related__grid">
            {relatedLoading
              ? Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="related__skeleton" aria-hidden />
                ))
              : suggestions.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </section>
      )}
    </main>
  );
}
