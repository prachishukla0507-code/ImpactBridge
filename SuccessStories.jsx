import { successStories } from '../data/mockData';

/**
 * Reusable StoryCard Sub-Component
 * Demonstrates Module 2: Props passing & destructuring
 */
function StoryCard({ title, location, supportType, description, result }) {
  return (
    <div className="col-md-4">
      <div className="card h-100 ib-card border-0 shadow-sm p-4 bg-white d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="badge bg-secondary-subtle text-secondary border px-2 py-1 small">
              {supportType}
            </span>
            <span className="badge bg-light text-muted border small">
              📍 {location}
            </span>
          </div>

          <h5 className="card-title fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
            {title}
          </h5>

          <p className="card-text text-muted small mb-3" style={{ lineHeight: '1.5' }}>
            {description}
          </p>
        </div>

        {/* Impact Result Box */}
        <div className="p-3 rounded-3 mt-2 border border-success-subtle" style={{ backgroundColor: '#f0fdf4' }}>
          <div className="text-success fw-bold small mb-1">
            ✓ Verified Ground Impact
          </div>
          <p className="text-dark small mb-0 fw-medium" style={{ lineHeight: '1.4' }}>
            {result}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * SuccessStories Section Component
 * Demonstrates Module 1 (Array of objects), Module 2 (Props & mapping), Module 3 (Bootstrap Grid & Cards)
 */
function SuccessStories() {
  return (
    <section id="about" className="py-5 bg-light border-bottom">
      <div className="container py-3">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-5">
          <div>
            <span className="section-tag">Ground Realities</span>
            <h2 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Verified Success Stories
            </h2>
            <p className="text-muted small mb-0">
              Examining real-world examples of resource matching and direct community impact.
            </p>
          </div>
          <div className="mt-2 mt-md-0">
            <span className="badge bg-secondary-subtle text-secondary px-3 py-2 border rounded-pill small">
              ℹ Demo Case Studies
            </span>
          </div>
        </div>

        {/* Story Cards Grid */}
        <div className="row g-4">
          {successStories.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              location={story.location}
              supportType={story.supportType}
              description={story.description}
              result={story.result}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
