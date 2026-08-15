import './Testimonials.css';

const galleryImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80',
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__inner">
          <div className="testimonials__content">
            <div className="testimonials__header">
              <p className="section-tag">What they say about us</p>
              <h2 className="section-title">Testimonials</h2>
            </div>

            <div className="testimonials__stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="testimonials__star" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>

            <p className="testimonials__quote">
              "Slate helps you see how many more days you need to work to reach your financial goal for the month and for your life."
            </p>

            <div className="testimonials__author">
              <div className="testimonials__avatar">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  alt="Regina Miles"
                />
              </div>
              <div>
                <p className="testimonials__name">Regina Miles</p>
                <p className="testimonials__role">Designer</p>
              </div>
            </div>
          </div>

          <div className="testimonials__images">
            {galleryImages.map((img, i) => (
              <div key={i} className="testimonials__img">
                <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
