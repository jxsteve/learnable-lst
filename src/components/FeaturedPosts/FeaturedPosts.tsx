import './FeaturedPosts.css';

const posts = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
    title: "Loudest à la Madison #1 (L'integral)",
    desc: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    date: '22 April 2021',
    comments: '10 comments',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    title: "Loudest à la Madison #1 (L'integral)",
    desc: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    date: '22 April 2021',
    comments: '10 comments',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    title: "Loudest à la Madison #1 (L'integral)",
    desc: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
    date: '22 April 2021',
    comments: '10 comments',
  },
];

export default function FeaturedPosts() {
  return (
    <section className="featured-posts">
      <div className="container">
        <div className="featured-posts__header">
          <p className="section-tag">Practice Advice</p>
          <h2 className="section-title">Featured Posts</h2>
        </div>

        <div className="featured-posts__grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-card__img">
                <img src={post.img} alt={post.title} loading="lazy" />
                <span className="post-card__badge">NEW</span>
              </div>
              <div className="post-card__body">
                <div className="post-card__tags">
                  <span className="post-card__tag">Google</span>
                  <span className="post-card__tag-sep">|</span>
                  <span className="post-card__tag--plain">Trending</span>
                  <span className="post-card__tag-sep">|</span>
                  <span className="post-card__tag--plain">New</span>
                </div>
                <h3 className="post-card__title">{post.title}</h3>
                <p className="post-card__desc">{post.desc}</p>
                <div className="post-card__meta">
                  <span className="post-card__meta-item">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {post.date}
                  </span>
                  <span className="post-card__meta-item">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    {post.comments}
                  </span>
                </div>
                <a href="#" className="post-card__learn">
                  Learn More
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
