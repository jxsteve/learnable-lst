import ctaBackground from '../../assets/images/cta-background.png';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta" id="pages">
      <img src={ctaBackground} alt="" className="cta__background" />

      <div className="cta__container">
        <div className="cta__content">
          <p className="cta__tag">Designing Better Experience</p>
          <h2 className="cta__title">Problems trying to resolve the conflict between </h2>
          <p className="cta__text">
            Problems trying to resolve the conflict between the two major realms of Classical physics:
          </p>
          <p className="cta__price">$16.48</p>
          <button className="cta__button">ADD YOUR CALL TO ACTION</button>
        </div>
      </div>
    </section>
  );
}
