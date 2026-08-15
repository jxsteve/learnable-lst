import './Testimonials.css';

const galleryPhotos = [
  'https://picsum.photos/seed/g1/300/300',
  'https://picsum.photos/seed/g2/300/300',
  'https://picsum.photos/seed/g3/300/300',
  'https://picsum.photos/seed/g4/300/300',
  'https://picsum.photos/seed/g5/300/300',
  'https://picsum.photos/seed/g6/300/300',
  'https://picsum.photos/seed/g7/300/300',
  'https://picsum.photos/seed/g8/300/300',
  'https://picsum.photos/seed/g9/300/300',
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
                src="https://picsum.photos/seed/avatar/200/200"
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
                <img src={src} alt={`Gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
