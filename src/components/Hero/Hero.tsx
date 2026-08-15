import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid">
        {/* Left - large panel */}
        <div className="hero__panel hero__panel--left">
          <img
            src="https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80"
            alt="Furniture"
          />
          <div className="hero__panel-content">
            <p className="hero__panel-items">5 Items</p>
            <h1 className="hero__panel-title">FURNITURE</h1>
            <a href="#bestseller" className="hero__panel-link">
              Read More
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Top right - wide panel */}
        <div className="hero__panel hero__panel--top-right">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
            alt="Furniture"
          />
          <div className="hero__panel-content">
            <p className="hero__panel-items">5 Items</p>
            <h2 className="hero__panel-title">FURNITURE</h2>
            <a href="#bestseller" className="hero__panel-link">Read More</a>
          </div>
        </div>

        {/* Bottom left */}
        <div className="hero__panel hero__panel--bottom-left">
          <img
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80"
            alt="Furniture"
          />
          <div className="hero__panel-content">
            <p className="hero__panel-items">5 Items</p>
            <h2 className="hero__panel-title">FURNITURE</h2>
            <a href="#bestseller" className="hero__panel-link">Read More</a>
          </div>
        </div>

        {/* Bottom right */}
        <div className="hero__panel hero__panel--bottom-right">
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80"
            alt="Furniture"
          />
          <div className="hero__panel-content">
            <p className="hero__panel-items">5 Items</p>
            <h2 className="hero__panel-title">FURNITURE</h2>
            <a href="#bestseller" className="hero__panel-link">Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
}
