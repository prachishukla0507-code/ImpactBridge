import { howItWorksSteps } from '../data/mockData';

/**
 * Reusable HowItWorksCard Sub-Component
 * Demonstrates Module 2: Props passing & destructuring
 */
function HowItWorksCard({ stepNumber, title, description }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 ib-card p-4 border-0 shadow-sm">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="step-number-badge">{stepNumber}</span>
          <span className="badge bg-light text-muted border">Step</span>
        </div>
        <h5 className="card-title fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
          {title}
        </h5>
        <p className="card-text text-muted small" style={{ lineHeight: '1.5' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

/**
 * HowItWorks Section Component
 * Demonstrates Module 1 (Array iteration via .map) & Module 2 (Reusable Components with Props)
 */
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-5 bg-white border-bottom">
      <div className="container py-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Four-Step Lifecycle</span>
          <h2 className="fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
            How ImpactBridge Works
          </h2>
          <p className="text-muted small">
            A transparent and structured pathway from resource identification to verified on-ground distribution.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="row g-4">
          {howItWorksSteps.map((step) => (
            <HowItWorksCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
