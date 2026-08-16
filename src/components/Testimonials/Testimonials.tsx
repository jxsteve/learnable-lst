import avatar from '../../assets/images/testimonial-avatar.webp';
import starFilled from '../../assets/icons/star-filled.svg';
import starOutline from '../../assets/icons/star-outline.svg';
import gallery1 from '../../assets/images/gallery-1.webp';
import gallery2 from '../../assets/images/gallery-2.webp';
import gallery3 from '../../assets/images/gallery-3.webp';
import gallery4 from '../../assets/images/gallery-4.webp';
import gallery5 from '../../assets/images/gallery-5.webp';
import gallery6 from '../../assets/images/gallery-6.webp';
import gallery7 from '../../assets/images/gallery-7.webp';
import gallery8 from '../../assets/images/gallery-8.webp';
import gallery9 from '../../assets/images/gallery-9.webp';
import './Testimonials.css';

const GALLERY = [
  gallery1, gallery2, gallery3,
  gallery4, gallery5, gallery6,
  gallery7, gallery8, gallery9,
];

const RATING = 4;

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__row">
          {/* ── Quote ── */}
          <div className="testimonials__quote-col">
            <h2 className="testimonials__heading">What they say about us</h2>

            <div className="testimonials__card">
              <img src={avatar} alt="Regina Miles" className="testimonials__avatar" width="90" height="90" />

              <div className="testimonials__stars" aria-label={`${RATING} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <img
                    key={index}
                    src={index < RATING ? starFilled : starOutline}
                    alt=""
                    className="testimonials__star"
                  />
                ))}
              </div>

              <blockquote className="testimonials__quote">
                Slate helps you see how many more days you need to work to reach your financial goal.
              </blockquote>

              <div className="testimonials__author">
                <p className="testimonials__name">Regina Miles</p>
                <p className="testimonials__role">Designer</p>
              </div>
            </div>
          </div>

          {/* ── Gallery ── */}
          <div className="testimonials__gallery">
            {GALLERY.map((image) => (
              <img key={image} src={image} alt="" className="testimonials__tile" loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
