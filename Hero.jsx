import { Link } from 'react-router-dom';

/**
 * Hero Component
 * Redesigned for Prototype Transparency
 */
function Hero() {
  return (
    <section id="home" className="py-5 py-lg-6 bg-white border-bottom position-relative overflow-hidden">
      <div className="container py-4 position-relative z-1">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-3 text-dark" style={{ lineHeight: '1.2' }}>
              Help meet real NGO needs.
            </h1>
            <p className="lead text-muted mb-4 mx-auto fs-5" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
              ImpactBridge is an interactive prototype that connects NGO requirements with donor funding and supplies.
            </p>

            {/* Subtle Prototype Notice */}
            <div className="d-inline-block bg-light border rounded-3 p-3 mb-5 text-start shadow-sm mx-auto" style={{ maxWidth: '550px' }}>
              <div className="d-flex gap-3 align-items-start">
                <span className="fs-4">💡</span>
                <div>
                  <h6 className="fw-bold mb-1 text-dark">Prototype Demo</h6>
                  <p className="mb-0 text-muted small" style={{ lineHeight: '1.4' }}>
                    Payments, profiles, inventory allocation and delivery tracking are simulated to demonstrate the complete ImpactBridge workflow.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4">
              <Link to="/donate?action=money" className="btn btn-outline-dark btn-lg px-4 py-3 fw-bold rounded-pill shadow-sm d-flex align-items-center gap-2">
                <span className="fs-5">💳</span> Donate Money
              </Link>
              <Link to="/donate?action=supplies" className="btn btn-teal btn-lg px-4 py-3 fw-bold rounded-pill shadow-sm d-flex align-items-center gap-2 text-white">
                <span className="fs-5">📦</span> Donate Supplies
              </Link>
              <Link to="/receiver" className="btn btn-emerald btn-lg px-4 py-3 fw-bold rounded-pill shadow-sm d-flex align-items-center gap-2 text-white">
                <span className="fs-5">🤝</span> I'm an NGO
              </Link>
            </div>
            
            {/* Secondary Action */}
            <div className="mt-2">
              <Link to="/needs" className="text-decoration-none fw-semibold text-secondary d-inline-flex align-items-center gap-2">
                Browse Current Needs <span className="small">➔</span>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
