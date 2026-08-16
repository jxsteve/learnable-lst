import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCartCount } from '../../features/cart/cartSelectors';
import { selectWishlistCount } from '../../features/wishlist/wishlistSelectors';
import { useBumpOnChange } from '../../hooks/useBumpOnChange';
import phoneIcon from '../../assets/icons/phone.svg';
import mailIcon from '../../assets/icons/mail.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import twitterIcon from '../../assets/icons/twitter.svg';
import chevronIcon from '../../assets/icons/chevron.svg';
import userIcon from '../../assets/icons/user.svg';
import searchIcon from '../../assets/icons/search.svg';
import cartIcon from '../../assets/icons/cart.svg';
import heartIcon from '../../assets/icons/heart.svg';
import './Navbar.css';

const SOCIALS = [
  { href: '#', label: 'Instagram', icon: instagramIcon },
  { href: '#', label: 'YouTube', icon: youtubeIcon },
  { href: '#', label: 'Facebook', icon: facebookIcon },
  { href: '#', label: 'Twitter', icon: twitterIcon },
];

/** Each link targets a section id on the landing page. */
const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#bestseller', label: 'Shop', dropdown: true },
  { href: '#services', label: 'About' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
  { href: '#pages', label: 'Pages' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const cartBumping = useBumpOnChange(cartCount);
  const wishlistBumping = useBumpOnChange(wishlistCount);

  return (
    <header className="header">
      {/* ── Top announcement bar (desktop only, per design) ── */}
      <div className="topbar">
        <div className="topbar__inner">
          <div className="topbar__contacts">
            <a href="tel:+12255550118" className="topbar__contact">
              <img src={phoneIcon} alt="" className="topbar__icon" />
              (225) 555-0118
            </a>
            <a href="mailto:michelle.rivera@example.com" className="topbar__contact">
              <img src={mailIcon} alt="" className="topbar__icon" />
              michelle.rivera@example.com
            </a>
          </div>

          <p className="topbar__promo">Follow Us and get a chance to win 80% off</p>

          <div className="topbar__right">
            <span className="topbar__follow-label">Follow Us :</span>
            <div className="topbar__socials">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} className="topbar__social" aria-label={social.label}>
                  <img src={social.icon} alt="" className="topbar__icon" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav className="navbar">
        <div className="navbar__inner">
          <a href="#home" className="navbar__logo" onClick={() => setMenuOpen(false)}>Bandage</a>

          <ul className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={link.dropdown ? 'navbar__link navbar__link--dropdown' : 'navbar__link'}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  {link.dropdown && <img src={chevronIcon} alt="" className="navbar__chevron" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <a href="#" className="navbar__login">
              <img src={userIcon} alt="" className="navbar__login-icon" />
              <span>Login / Register</span>
            </a>

            <button className="navbar__action" aria-label="Search">
              <img src={searchIcon} alt="" className="navbar__action-icon" />
            </button>
            <Link
              to="/cart"
              className={`navbar__action ${cartBumping ? 'navbar__action--bump' : ''}`}
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            >
              <img src={cartIcon} alt="" className="navbar__action-icon" />
              <span className="navbar__count" aria-live="polite">{cartCount}</span>
            </Link>
            <button
              className={`navbar__action navbar__action--wishlist ${wishlistBumping ? 'navbar__action--bump' : ''}`}
              aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}`}
            >
              <img src={heartIcon} alt="" className="navbar__action-icon" />
              <span className="navbar__count" aria-live="polite">{wishlistCount}</span>
            </button>

            <button
              className="navbar__hamburger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
