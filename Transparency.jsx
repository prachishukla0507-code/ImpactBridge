import { transparencySteps } from '../data/mockData';

/**
 * Transparency Section Component
 * Demonstrates Module 1 (ES6 Array mapping), Module 2 (JSX & Component Structure) & Module 3 (Bootstrap Grid & Badges)
 */
function Transparency() {
  return (
    <section className="py-5 bg-white border-bottom">
      <div className="container py-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Accountability First</span>
          <h2 className="fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
            Transparent Resource Tracking
          </h2>
          <p className="text-muted small">
            Every contribution follows an open and verifiable chain of custody from initial intake to final handover.
          </p>
        </div>

        {/* 4-Step Process Flow Cards */}
        <div className="row g-4 position-relative">
          {transparencySteps.map((step, index) => (
            <div key={step.step} className="col-md-6 col-lg-3">
              <div className="card h-100 ib-card border-0 shadow-sm p-4 bg-light">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge rounded-pill bg-teal text-white px-3 py-1 fw-bold" style={{ backgroundColor: 'var(--ib-primary)' }}>
                    Phase {step.step}
                  </span>
                  <span className="badge bg-white text-muted border small">
                    {step.badgeText}
                  </span>
                </div>
                <h5 className="fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
                  {step.title}
                </h5>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Workflow Breadcrumb / Banner */}
        <div className="mt-4 p-3 rounded-3 bg-teal-subtle text-center small text-muted d-flex flex-wrap align-items-center justify-content-center gap-2 gap-md-4 border border-teal-subtle" style={{ backgroundColor: '#f0fdfa' }}>
          <strong className="text-dark">Workflow Status:</strong>
          <span className="badge bg-white text-dark border">1. Available</span>
          <span>→</span>
          <span className="badge bg-white text-dark border">2. Matched</span>
          <span>→</span>
          <span className="badge bg-white text-dark border">3. Allocated</span>
          <span>→</span>
          <span className="badge bg-success text-white">4. Distributed</span>
        </div>
      </div>
    </section>
  );
}

export default Transparency;
