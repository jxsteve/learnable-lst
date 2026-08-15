import SectionHeading from '../SectionHeading/SectionHeading';
import bookReaderIcon from '../../assets/icons/service-book-reader.svg';
import bookIcon from '../../assets/icons/service-book.svg';
import growthIcon from '../../assets/icons/service-growth.svg';
import './BestServices.css';

const SERVICES = [
  { icon: bookReaderIcon, title: 'Easy Wins', text: 'Get your best looking smile now!' },
  {
    icon: bookIcon,
    title: 'Concrete',
    text: 'Defalcate is most focused in helping you discover your most beautiful smile',
  },
  { icon: growthIcon, title: 'Hack Growth', text: 'Overcame any hurdle or any other problem.' },
];

export default function BestServices() {
  return (
    <section className="services" id="services">
      <div className="services__container">
        <SectionHeading
          tag="Featured Products"
          title="THE BEST SERVICES"
          subtitle="Problems trying to resolve the conflict between "
        />

        <div className="services__row">
          {SERVICES.map((service) => (
            <article key={service.title} className="services__card">
              <img src={service.icon} alt="" className="services__icon" />
              <h3 className="services__title">{service.title}</h3>
              <p className="services__text">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
