import { impactStats } from '../data/mockData';

/**
 * Reusable StatCard Sub-Component
 * Demonstrates Module 2: Props passing & destructuring
 */
function StatCard({ value, label, unit }) {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm p-4 text-center ib-card bg-white">
        <div className="display-6 fw-bold mb-1" style={{ color: 'var(--ib-primary)' }}>
          {value}
        </div>
        <h6 className="fw-semibold text-dark mb-1">{label}</h6>
        <span className="text-muted small">{unit}</span>
      </div>
    </div>
  );
}

/**
 * ImpactStats Section Component
 * Demonstrates Module 1 (Data structures), Module 2 (Props), Module 3 (Bootstrap Grid & Badges)
 */
function ImpactStats() {
  return (
    <section id="resources" className="py-5 bg-light border-bottom">
      <div className="container py-2">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
          <div>
            <span className="section-tag">Platform Footprint</span>
            <h2 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Live Platform Impact
            </h2>
            <p className="text-muted small mb-0">
              Aggregated overview of resources matched and distributed across community networks.
            </p>
          </div>
          <div className="mt-2 mt-md-0">
            <span className="badge bg-secondary-subtle text-secondary px-3 py-2 border rounded-pill small">
              ℹ Demo platform statistics
            </span>
          </div>
        </div>

        {/* 5-Column Responsive Stat Cards */}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
          {impactStats.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
              unit={stat.unit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;
