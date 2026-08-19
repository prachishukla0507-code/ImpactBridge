import { Link } from 'react-router-dom';

/**
 * FinalCTA Component
 * Demonstrates Module 2 (Functional Component & JSX), Module 3 (Bootstrap Card, Buttons & Typography) & Module 4 (React Router Link)
 */
function FinalCTA() {
  return (
    <section id="cta" className="py-5 bg-white border-bottom">
      <div className="container py-4">
        <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 text-center text-white" style={{ backgroundColor: 'var(--ib-primary)' }}>
          <div className="max-w-xl mx-auto py-2">
            <span className="badge bg-white text-teal px-3 py-1 fw-bold rounded-pill mb-3" style={{ color: 'var(--ib-primary)' }}>
              Join the Bridge
            </span>
            <h2 className="display-6 fw-bold mb-3">
              Every Resource Can Create an Impact
            </h2>
            <p className="lead fs-6 mb-4 opacity-90" style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Help connect available resources with communities that need them. Join our growing network of donors, volunteers, and verified NGOs today.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/needs" className="btn btn-light btn-lg px-4 py-2 fs-6 fw-bold" style={{ color: 'var(--ib-primary)' }}>
                Explore Needs
              </Link>
              <Link to="/resources" className="btn btn-outline-light btn-lg px-4 py-2 fs-6 fw-semibold">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;

