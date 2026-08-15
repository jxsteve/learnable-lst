import './BestServices.css';

const services = [
  {
    icon: (
      <svg width="56" height="56" fill="var(--color-primary)" viewBox="0 0 64 64">
        <path d="M32 4C20.954 4 12 12.954 12 24v2a4 4 0 004 4h2v12h-2a4 4 0 01-4-4v-2c0-11.046 8.954-20 20-20s20 8.954 20 20v2a4 4 0 01-4 4h-2V30h2a4 4 0 004-4v-2C52 12.954 43.046 4 32 4zm-8 26v12h16V30H24z"/>
        <circle cx="32" cy="10" r="4"/>
      </svg>
    ),
    title: 'Easy Wins',
    desc: 'Get your best looking smile now!',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="12" width="48" height="40" rx="2" stroke="var(--color-primary)" strokeWidth="3" fill="none"/>
        <line x1="8" y1="24" x2="56" y2="24" stroke="var(--color-primary)" strokeWidth="3"/>
        <line x1="32" y1="24" x2="32" y2="52" stroke="var(--color-primary)" strokeWidth="3"/>
        <line x1="8" y1="38" x2="56" y2="38" stroke="var(--color-primary)" strokeWidth="3"/>
      </svg>
    ),
    title: 'Concrete',
    desc: 'Defalcate is most focused in helping you discover your most beautiful smile',
  },
  {
    icon: (
      <svg width="56" height="56" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 64 64">
        <polyline points="8,44 22,28 34,36 56,14"/>
        <polyline points="44,14 56,14 56,26"/>
      </svg>
    ),
    title: 'Hack Growth',
    desc: 'Overcame any hurdle or any other problem.',
  },
];

export default function BestServices() {
  return (
    <section className="services">
      <div className="container">
        <div className="services__header">
          <p className="section-tag">Featured Products</p>
          <h2 className="section-title">THE BEST SERVICES</h2>
          <p className="section-subtitle">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="services__grid">
          {services.map((s) => (
            <div key={s.title} className="service-card">
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
