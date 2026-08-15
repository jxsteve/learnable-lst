import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <img
        className="cta-banner__bg"
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
        alt="CTA background"
      />
      <div className="cta-banner__overlay" />
      <div className="cta-banner__content">
        <p className="cta-banner__tag">SUMMER 2020</p>
        <h2 className="cta-banner__title">
          Problems trying to resolve the conflict between
        </h2>
        <p className="cta-banner__desc">
          Problems trying to resolve the conflict between the two major realms of Classic Physics: Quantum Theory and General Relativity.
        </p>
        <p className="cta-banner__price">$16.48</p>
        <a href="#bestseller" className="btn-primary">ADD YOUR CALL TO ACTION</a>
      </div>
    </section>
  );
}
