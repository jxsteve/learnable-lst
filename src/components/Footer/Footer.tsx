import facebookIcon from '../../assets/icons/footer-facebook.svg';
import instagramIcon from '../../assets/icons/footer-instagram.svg';
import twitterIcon from '../../assets/icons/footer-twitter.svg';
import './Footer.css';

const SOCIALS = [
  { label: 'Facebook', icon: facebookIcon },
  { label: 'Instagram', icon: instagramIcon },
  { label: 'Twitter', icon: twitterIcon, modifier: 'footer__social-icon--twitter' },
];

const LINK_COLUMNS = [
  { title: 'Company Info', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Legal', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Features', links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'] },
  { title: 'Resources', links: ['IOS & Android', 'Watch a Demo', 'Customers', 'API'] },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* ── Brand band ── */}
      <div className="footer__top">
        <div className="footer__container footer__top-inner">
          <a href="/" className="footer__logo">Bandage</a>
          <div className="footer__socials">
            {SOCIALS.map((social) => (
              <a key={social.label} href="#" className="footer__social" aria-label={social.label}>
                <img
                  src={social.icon}
                  alt=""
                  className={`footer__social-icon ${social.modifier ?? ''}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Links band ── */}
      <div className="footer__middle">
        <div className="footer__container footer__columns">
          {LINK_COLUMNS.map((column) => (
            <div key={column.title} className="footer__column">
              <h3 className="footer__column-title">{column.title}</h3>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__column footer__column--subscribe">
            <h3 className="footer__column-title">Get In Touch</h3>
            <form className="footer__subscribe" onSubmit={(event) => event.preventDefault()}>
              <div className="footer__input-group">
                <input
                  type="email"
                  className="footer__input"
                  placeholder="Your Email"
                  aria-label="Your Email"
                />
                <button type="submit" className="footer__subscribe-btn">Subscribe</button>
              </div>
              <p className="footer__note">Lore imp sum dolor Amit</p>
            </form>
          </div>
        </div>
      </div>

      {/* ── Copyright band ── */}
      <div className="footer__bottom">
        <div className="footer__container">
          <p className="footer__copyright">Made With Love By Finland All Right Reserved </p>
        </div>
      </div>
    </footer>
  );
}
