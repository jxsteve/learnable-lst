import './Testimonials.css';

const galleryPhotos = [
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80',
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=80',
  'https://images.unsplash.com/photo-1490750967868-88df5691cc49?w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=300&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80',
  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80',
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__inner">
          <div className="testimonials__content">
            <h2 className="testimonials__title">What they say about us</h2>
            <div className="testimonials__avatar">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80"
                alt="Regina Miles"
              />
            </div>

            <div className="testimonials__stars">
              {[1, 2, 3, 4].map((s) => (
                <svg key={s} width="18" height="18" fill="var(--color-warning)" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <svg width="18" height="18" fill="none" stroke="var(--color-warning)" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>

            <p className="testimonials__quote">
              Slate helps you see how many more days you need to work to reach your financial goal.
            </p>

            <p className="testimonials__name">Regina Miles</p>
            <p className="testimonials__role">Designer</p>
          </div>

          <div className="testimonials__gallery">
            {galleryPhotos.map((src, i) => (
              <div key={i} className="testimonials__photo">
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
