import SectionHeading from '../SectionHeading/SectionHeading';
import blog1 from '../../assets/images/blog-1.png';
import blog2 from '../../assets/images/blog-2.png';
import blog3 from '../../assets/images/blog-3.png';
import calendarIcon from '../../assets/icons/calendar.svg';
import commentsIcon from '../../assets/icons/comments.svg';
import arrowNextIcon from '../../assets/icons/arrow-next.svg';
import './FeaturedPosts.css';

const POSTS = [
  { id: 1, image: blog1 },
  { id: 2, image: blog2 },
  { id: 3, image: blog3 },
];

export default function FeaturedPosts() {
  return (
    <section className="posts" id="blog">
      <div className="posts__container">
        <SectionHeading tag="Practice Advice" title="Featured Posts" variant="accent" />

        <div className="posts__row">
          {POSTS.map((post) => (
            <div key={post.id} className="posts__col">
              <article className="post-card">
                <div className="post-card__media">
                  <img src={post.image} alt="" className="post-card__image" loading="lazy" />
                  <span className="post-card__badge">NEW</span>
                </div>

                <div className="post-card__body">
                  <div className="post-card__tags">
                    <span className="post-card__tag post-card__tag--accent">Google</span>
                    <span className="post-card__tag">Trending</span>
                    <span className="post-card__tag">New</span>
                  </div>

                  <h3 className="post-card__title">Loudest à la Madison #1 (L'integral)</h3>

                  <p className="post-card__excerpt">
                    We focus on ergonomics and meeting you where you work. It's only a keystroke away.
                  </p>

                  <div className="post-card__meta">
                    <span className="post-card__meta-item">
                      <img src={calendarIcon} alt="" className="post-card__meta-icon" />
                      22 April 2021
                    </span>
                    <span className="post-card__meta-item">
                      <img src={commentsIcon} alt="" className="post-card__meta-icon post-card__meta-icon--chart" />
                      10 comments
                    </span>
                  </div>

                  <a href="#" className="post-card__link">
                    Learn More
                    <img src={arrowNextIcon} alt="" className="post-card__arrow" />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
