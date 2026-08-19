import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Demonstrates Module 2 (Functional Component & JSX), Module 3 (Bootstrap Grid, Typography & Spacing) & Module 4 (React Router Link)
 */
function Footer() {
  return (
    <footer className="bg-white border-top py-5">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Col */}
          <div className="col-lg-5 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <span className="badge me-2 px-2 py-1 rounded fw-bold text-white" style={{ backgroundColor: 'var(--ib-primary)' }}>
                IB
              </span>
              <span className="fw-bold fs-5" style={{ color: 'var(--ib-primary)' }}>
                ImpactBridge
              </span>
            </div>
            <p className="text-muted small pe-lg-4" style={{ lineHeight: '1.6' }}>
              ImpactBridge is an open two-sided humanitarian logistics platform connecting donors and verified grassroots NGOs to bridge critical resource gaps with live stock booking and transparent delivery tracking.
            </p>
            <div className="text-muted small">
              <span className="badge bg-light text-muted border">Humanitarian Supply Logistics Platform</span>
            </div>
          </div>

          {/* Navigation Links Col 1 */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="fw-bold text-dark mb-3">Portals & Tools</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-muted">🏠 Home Hub</Link></li>
              <li className="mb-2"><Link to="/donor" className="text-decoration-none text-muted">🎁 Donor Portal</Link></li>
              <li className="mb-2"><Link to="/receiver" className="text-decoration-none text-muted">🤝 NGO Portal</Link></li>
              <li className="mb-2"><Link to="/matches" className="text-decoration-none text-muted">⚡ Match Engine</Link></li>
              <li className="mb-2"><Link to="/tracking" className="text-decoration-none text-muted">📍 Live Tracking</Link></li>
            </ul>
          </div>

          {/* Navigation Links Col 2 */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="fw-bold text-dark mb-3">Key Features</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2"><Link to="/receiver" className="text-decoration-none text-muted">Partial Stock Booking</Link></li>
              <li className="mb-2"><Link to="/donor" className="text-decoration-none text-muted">Direct-to-Need Donations</Link></li>
              <li className="mb-2"><Link to="/tracking" className="text-decoration-none text-muted">4-Phase GPS Tracking</Link></li>
              <li className="mb-2"><Link to="/matches" className="text-decoration-none text-muted">Deterministic Matching</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-dark mb-3">Contact & Coordination Desk</h6>
            <p className="text-muted small mb-2">
              For partnership onboarding, verified NGO registration, and CSR logistics:
            </p>
            <div className="p-3 bg-light rounded-3 small">
              <div className="text-dark fw-semibold mb-1">ImpactBridge Command Center</div>
              <div className="text-muted">coordination@impactbridge.org</div>
              <div className="text-muted">+91 (0) 80 4567 8900</div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="border-top pt-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-muted small">
          <div>
            © {new Date().getFullYear()} ImpactBridge Humanitarian Platform. Built with React & Bootstrap.
          </div>
          <div className="mt-2 mt-md-0">
            <span className="me-3">Open Logistics Architecture</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
