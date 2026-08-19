import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ activeNGO, activeDonor, donors = [], ngos = [], onSelectDonor, onSelectNGO, onResetDemo }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showDemoInfo, setShowDemoInfo] = useState(false);

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);
  const closeNavbar = () => setIsNavOpen(false);

  const navItems = [
    { to: '/', label: '🏠 Home', end: true },
    { to: '/needs', label: '📋 Browse Needs' },
    { to: '/donate', label: '🎁 Donate' },
    { to: '/receiver', label: '🤝 NGO Dashboard' },
    { to: '/donor', label: '👤 My Contributions' },
    { to: '/tracking', label: '📍 Track Deliveries' }
  ];

  const profileOptions = [
    ...(donors || []).map(d => ({ type: 'donor', id: d.id, name: d.name, label: `${d.name.split(' ')[0]} — Donor` })),
    ...(ngos || []).map(n => ({ type: 'ngo', id: n.id, name: n.name, label: `${n.name} — NGO` }))
  ];

  const currentProfileLabel = activeDonor?.name
    ? `${activeDonor.name.split(' ')[0]} — Donor`
    : 'Demo User';

  const handleProfileSwitch = (option) => {
    if (option.type === 'donor' && onSelectDonor) {
      const donor = (donors || []).find(d => d.id === option.id);
      if (donor) onSelectDonor(donor);
    } else if (option.type === 'ngo' && onSelectNGO) {
      const ngo = (ngos || []).find(n => n.id === option.id);
      if (ngo) onSelectNGO(ngo);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-2 shadow-xs">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center navbar-brand-ib me-3" to="/" onClick={closeNavbar}>
          <span
            className="badge-logo me-2 d-inline-flex align-items-center justify-content-center rounded text-white fw-bold px-2 py-1"
            style={{ backgroundColor: 'var(--ib-primary)' }}
          >
            IB
          </span>
          <span className="fw-bold fs-5" style={{ lineHeight: '1.1' }}>ImpactBridge</span>
        </Link>

        {/* Demo Badge (Desktop) */}
        <div className="position-relative d-none d-lg-block me-4">
          <button
            className="btn btn-sm btn-outline-warning text-dark fw-bold rounded-pill border-2 px-3 py-1"
            style={{ fontSize: '0.7rem', backgroundColor: '#fff3cd', borderColor: '#ffc107' }}
            onClick={() => setShowDemoInfo(!showDemoInfo)}
          >
            DEMO / PROTOTYPE
          </button>

          {showDemoInfo && (
            <div className="position-absolute bg-white border rounded shadow p-3 mt-2 z-3" style={{ width: '300px', fontSize: '0.85rem' }}>
              <h6 className="fw-bold mb-2">ImpactBridge Prototype</h6>
              <p className="mb-0 text-muted">
                This interactive prototype demonstrates how NGO needs, donor contributions, inventory allocation and delivery tracking could work in a production system.
                <br /><br />
                Payments, user accounts and logistics updates are simulated for demonstration purposes.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="d-flex d-lg-none align-items-center gap-2">
          <span className="badge bg-warning text-dark border border-warning" style={{ fontSize: '0.65rem' }}>DEMO</span>
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Nav Links */}
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium" style={{ fontSize: '0.9rem' }}>
            {navItems.map(item => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-ib px-3 ${isActive ? 'active' : ''}`}
                  to={item.to}
                  end={item.end || false}
                  onClick={closeNavbar}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Profile Switcher */}
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <div className="dropdown">
              <button
                className="btn btn-light btn-sm dropdown-toggle rounded-pill border px-3 d-flex align-items-center gap-2 text-muted fw-medium"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  className="rounded-circle text-white d-flex align-items-center justify-content-center"
                  style={{ width: '24px', height: '24px', fontSize: '0.7rem', backgroundColor: 'var(--ib-primary)' }}
                >
                  {activeDonor?.name?.charAt(0) || 'U'}
                </div>
                <span>{currentProfileLabel}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                <li><h6 className="dropdown-header">Demo Profile Switcher</h6></li>
                {profileOptions.slice(0, 6).map(option => (
                  <li key={`${option.type}-${option.id}`}>
                    <button
                      className={`dropdown-item ${option.type === 'donor' && activeDonor?.id === option.id ? 'active' : ''}`}
                      onClick={() => handleProfileSwitch(option)}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" style={{ fontSize: '0.85rem' }} onClick={onResetDemo}>
                    🔄 Reset Demo Data
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
