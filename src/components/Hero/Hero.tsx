import './Hero.css';

const categories = [
  { label: 'FURNITURE', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80' },
  { label: 'DECORATION', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80' },
  { label: 'KITCHEN', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80' },
  { label: 'PLANTS', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80' },
  { label: 'LIGHTING', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__main">
          {/* Left big banner */}
          <div className="hero__banner">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
              alt="Furniture hero"
            />
            <div className="hero__banner-content">
              <p className="hero__banner-tag">FURNITURE</p>
              <h1 className="hero__banner-title">Explore New Arrivals</h1>
              <a href="#bestseller" className="hero__banner-link">
                SHOP NOW
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right two cards */}
          <div className="hero__right">
            <div className="hero__card">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
                alt="Furniture card 1"
              />
              <div className="hero__card-content">
                <p className="hero__card-tag">FURNITURE</p>
                <h2 className="hero__card-title">Living Room</h2>
                <a href="#bestseller" className="hero__card-link">SHOP NOW</a>
              </div>
            </div>
            <div className="hero__card">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                alt="Furniture card 2"
              />
              <div className="hero__card-content">
                <p className="hero__card-tag">FURNITURE</p>
                <h2 className="hero__card-title">Kitchen & Dining</h2>
                <a href="#bestseller" className="hero__card-link">SHOP NOW</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div className="hero__categories">
        {categories.map((cat) => (
          <div key={cat.label} className="hero__category">
            <img src={cat.img} alt={cat.label} />
            <div className="hero__category-overlay" />
            <span className="hero__category-label">{cat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
