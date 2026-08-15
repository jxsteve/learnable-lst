import './FeaturedPosts.css';

const posts = [
  {
    id: 1,
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80',
    category: 'Google',
    date: 'March 14, 2021',
    title: 'Loudest à la Madison #1 (L\'integral)',
    desc: 'We focus on ergonomics and well-being of the workspace and our team with products crafted to perfection.',
  },
  {
    id: 2,
    tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
    category: 'Trendy',
    date: 'March 14, 2021',
    title: 'Loudest à la Madison #2 (L\'integral)',
    desc: 'We focus on ergonomics and well-being of the workspace and our team with products crafted to perfection.',
  },
  {
    id: 3,
    tag: 'Sale',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
    category: 'Design',
    date: 'March 14, 2021',
    title: 'Loudest à la Madison #3 (L\'integral)',
    desc: 'We focus on ergonomics and well-being of the workspace and our team with products crafted to perfection.',
  },
];

export default function FeaturedPosts() {
  return (
    <section className="featured-posts">
      <div className="container">
        <div className="featured-posts__header">
          <p className="section-tag">Practice Advice</p>
          <h2 className="section-title">Featured Posts</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Problems trying to resolve the conflict between the two major realms of Classic Physics.
          </p>
        </div>

        <div className="featured-posts__grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-card__image">
                <img src={post.img} alt={post.title} loading="lazy" />
                <span className="post-card__tag">{post.tag}</span>
              </div>
              <div className="post-card__body">
                <div className="post-card__meta">
                  <span className="post-card__meta-item">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    {post.category}
                  </span>
                  <span className="post-card__meta-item">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {post.date}
                  </span>
                </div>
                <h3 className="post-card__title">{post.title}</h3>
                <p className="post-card__desc">{post.desc}</p>
                <a href="#" className="post-card__link">
                  Learn More
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
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
