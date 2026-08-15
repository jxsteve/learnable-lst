import './BestServices.css';

const services = [
  {
    icon: (
      <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'Easy Win',
    desc: 'We focus on ergonomics and well-being of the workspace with products crafted to perfection.',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    title: 'Elaborate',
    desc: 'We focus on ergonomics and well-being of the workspace with products crafted to perfection.',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Stark Growth',
    desc: 'We focus on ergonomics and well-being of the workspace with products crafted to perfection.',
  },
];

export default function BestServices() {
  return (
    <section className="services">
      <div className="container">
        <div className="services__header">
          <p className="section-tag">Featured Products</p>
          <h2 className="section-title">THE BEST SERVICES</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Problems trying to resolve the conflict between the two major realms of Classic Physics: Quantum Theory and General Relativity.
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
