import { Link } from 'react-router-dom';

/**
 * PlatformSides Component
 * Demonstrates Module 2 (Functional Component & JSX), Module 3 (Bootstrap Grid, Cards, Buttons) & Module 4 (React Router Link)
 */
function PlatformSides() {
  return (
    <section className="py-5 bg-light border-bottom">
      <div className="container py-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Two-Sided Humanitarian Architecture</span>
          <h2 className="fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
            The Bridge Connecting Donors with Grassroots NGOs
          </h2>
          <p className="text-muted small">
            Whether contributing bulk surplus inventory or coordinating urgent local community relief, ImpactBridge streamlines collaboration.
          </p>
        </div>

        {/* 2-Column Side by Side Cards */}
        <div className="row g-4">
          {/* Side 1: For Donors */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm p-4 p-lg-5 ib-card bg-white d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded-3 bg-teal-subtle text-teal me-3" style={{ backgroundColor: '#e6fffa', color: 'var(--ib-primary)' }}>
                    <span className="fw-bold fs-4">🎁</span>
                  </div>
                  <div>
                    <span className="badge bg-light text-muted border mb-1">For Providers & Donors</span>
                    <h4 className="fw-bold mb-0" style={{ color: 'var(--ib-text-main)' }}>Donor Supply Portal</h4>
                  </div>
                </div>
                <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                  Pool essential goods into the central warehouse or directly fund active community requirements posted by verified NGOs. Track exactly which NGOs claim your goods and watch deliveries reach families.
                </p>
                <ul className="list-unstyled text-muted small mb-4">
                  <li className="mb-2 d-flex align-items-center">
                    <span className="text-success me-2 fw-bold">✓</span> Direct-to-Need donation actions
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="text-success me-2 fw-bold">✓</span> Real-time depot inventory status
                  </li>
                  <li className="d-flex align-items-center">
                    <span className="text-success me-2 fw-bold">✓</span> Documented chain-of-custody confirmation
                  </li>
                </ul>
              </div>
              <div>
                <Link to="/donor" className="btn btn-teal w-100 py-2 fw-semibold">
                  Enter Donor Portal ➔
                </Link>
              </div>
            </div>
          </div>

          {/* Side 2: For NGOs & Communities */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm p-4 p-lg-5 ib-card bg-white d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <div className="p-3 rounded-3 me-3" style={{ backgroundColor: '#ecfdf5', color: 'var(--ib-secondary)' }}>
                    <span className="fw-bold fs-4">🤝</span>
                  </div>
                  <div>
                    <span className="badge bg-light text-muted border mb-1">For Grassroots Champions</span>
                    <h4 className="fw-bold mb-0" style={{ color: 'var(--ib-text-main)' }}>NGO Relief & Booking Portal</h4>
                  </div>
                </div>
                <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                  Browse available donor inventory and book exact quantities your community needs (e.g. claim 70 units out of 100 in stock). Raise custom demands and receive tracked humanitarian consignments.
                </p>
                <ul className="list-unstyled text-muted small mb-4">
                  <li className="mb-2 d-flex align-items-center">
                    <span className="text-success me-2 fw-bold">✓</span> Flexible partial stock booking from central reserve
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span className="text-success me-2 fw-bold">✓</span> Urgency-ranked community demand intake
                  </li>
                  <li className="d-flex align-items-center">
                    <span className="text-success me-2 fw-bold">✓</span> Verifiable digital consignment delivery notes
                  </li>
                </ul>
              </div>
              <div>
                <Link to="/receiver" className="btn btn-emerald w-100 py-2 fw-semibold">
                  Enter NGO Portal ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformSides;
