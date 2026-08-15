import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <img
        className="cta-banner__bg"
        src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=900&q=80"
        alt="Kitchen utensils"
      />
      <div className="container">
        <div className="cta-banner__content">
          <p className="cta-banner__tag">Designing Better Experience</p>
          <h2 className="cta-banner__title">
            Problems trying to resolve<br />the conflict between
          </h2>
          <p className="cta-banner__desc">
            Problems trying to resolve the conflict between the two major realms of Classical physics:
          </p>
          <p className="cta-banner__price">$16.48</p>
          <a href="#bestseller" className="btn-primary">ADD YOUR CALL TO ACTION</a>
        </div>
      </div>
    </section>
  );
}
