import heroFurnitureLg from '../../assets/images/hero-furniture-lg.png';
import heroPlant from '../../assets/images/hero-plant.png';
import heroLamp from '../../assets/images/hero-lamp.png';
import heroVases from '../../assets/images/hero-vases.png';
import './Hero.css';

type Card = {
  image: string;
  alt: string;
  modifier: string;
};

const CARDS: Card[] = [
  { image: heroFurnitureLg, alt: 'Pink and gold ceramic plates', modifier: 'hero__card--tall' },
  { image: heroPlant, alt: 'Succulent in a pink ceramic bowl', modifier: 'hero__card--wide' },
  { image: heroLamp, alt: 'White pendant lamp', modifier: 'hero__card--small' },
  { image: heroVases, alt: 'Collection of white ceramic vases', modifier: 'hero__card--small' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__row">
        {CARDS.map((card) => (
          <article key={card.alt} className={`hero__card ${card.modifier}`}>
            <img src={card.image} alt={card.alt} className="hero__card-image" />
            <div className="hero__card-content">
              <p className="hero__card-items">5 Items</p>
              <h2 className="hero__card-title">FURNITURE</h2>
              <a href="#bestseller" className="hero__card-link">Read More</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
