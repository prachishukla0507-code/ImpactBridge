import { useState } from 'react';
import { Link } from 'react-router-dom';
import { transparencySteps } from '../data/mockData';
import ConsignmentVoucherModal from '../components/ConsignmentVoucherModal';

/**
 * TrackingPage Component (Route: /tracking)
 * 
 * Demonstrates:
 * - Module 1: Array .map() and .filter() methods, Object manipulation
 * - Module 2: State management, interactive status progression callbacks
 * - Module 3: Bootstrap Progress bars, Cards, Badges, Timeline UI, Printable modal
 * - Module 4: Integrated React Router navigation
 */
function TrackingPage({
  consignments = [],
  onAdvanceTrackingStage
}) {
  const [filterStage, setFilterStage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVoucherConsignment, setSelectedVoucherConsignment] = useState(null);

  // Filter consignments
  const filteredConsignments = consignments.filter((c) => {
    const isStage = filterStage === 'All' || c.stage.toString() === filterStage;
    const isSearch =
      (c.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.resourceName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.ngoName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.donorName || '').toLowerCase().includes(searchQuery.toLowerCase());
    return isStage && isSearch;
  });

  const getStagePercent = (stage) => {
    switch (stage) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 75;
      case 4: return 100;
      default: return 25;
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container py-3">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-3 border-bottom">
          <div>
            <span className="section-tag">Chain-of-Custody & Logistics</span>
            <h1 className="display-6 fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Allocation & Delivery Tracking Hub
            </h1>
            <p className="text-muted small mb-0">
              Transparent 4-phase verification tracking every consignment from Donor Depot to Grassroots NGO Delivery.
            </p>
          </div>

          <div className="mt-3 mt-md-0 d-flex gap-2">
            <Link to="/receiver" className="btn btn-emerald px-3 py-2 fw-semibold shadow-sm">
              + Book More Supplies (NGO)
            </Link>
          </div>
        </div>

        {/* Section 1: The 4-Phase Lifecycle Model */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-5">
          <div className="mb-4">
            <h4 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Standard 4-Phase Supply Chain Framework
            </h4>
            <p className="text-muted small mb-0">
              Every package moves systematically through verification, packing, GPS transit, and final beneficiary confirmation.
            </p>
          </div>

          <div className="row g-4">
            {transparencySteps.map((step, index) => (
              <div key={step.step} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 p-4 rounded-3 bg-light d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge rounded-pill bg-teal text-white px-3 py-1 fw-bold" style={{ backgroundColor: 'var(--ib-primary)' }}>
                        Phase {step.step}
                      </span>
                      <span className="badge bg-white text-dark border small">
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

                  {/* Stage Status Indicator */}
                  <div className="mt-3 pt-2 border-top">
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className="progress-bar bg-teal"
                        role="progressbar"
                        style={{ width: `${(index + 1) * 25}%`, backgroundColor: 'var(--ib-primary)' }}
                        aria-valuenow={(index + 1) * 25}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Active Consignment Trackers */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-2 border-bottom">
            <div>
              <span className="badge bg-secondary-subtle text-secondary border px-3 py-1 mb-1">
                Live State Tracking
              </span>
              <h4 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                Tracked In-Flight Consignments ({filteredConsignments.length})
              </h4>
              <p className="text-muted small mb-0">
                Click <strong>"Advance Delivery Stage"</strong> on any consignment to simulate real-time status progression.
              </p>
            </div>

            {/* Filter & Search */}
            <div className="d-flex flex-wrap gap-2 mt-3 mt-md-0">
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: '220px' }}
                placeholder="🔍 Search ID, NGO, or item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="form-select form-select-sm"
                style={{ width: '150px' }}
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
              >
                <option value="All">All Stages</option>
                <option value="1">Phase 1: Booked</option>
                <option value="2">Phase 2: Packaged</option>
                <option value="3">Phase 3: In-Transit</option>
                <option value="4">Phase 4: Delivered</option>
              </select>
            </div>
          </div>

          <div className="d-flex flex-column gap-4">
            {filteredConsignments.length > 0 ? (
              filteredConsignments.map((item) => {
                const progressPct = getStagePercent(item.stage);
                const isDelivered = item.stage === 4;

                return (
                  <div key={item.id} className="p-4 border rounded-3 bg-light ib-card">
                    {/* Header */}
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h5 className="fw-bold mb-0 text-dark">{item.resourceName}</h5>
                          <span className="badge bg-secondary-subtle text-secondary border small">{item.category}</span>
                          <span className={`badge ${isDelivered ? 'badge-fulfilled' : 'badge-open'}`}>
                            Phase 0{item.stage}: {item.stageLabel}
                          </span>
                        </div>
                        <span className="text-muted small">
                          Consignment <strong>#{item.id}</strong> &bull; Quantity: <strong className="text-teal" style={{ color: 'var(--ib-primary)' }}>{item.quantity} {item.unit}</strong>
                        </span>
                      </div>

                      <div className="mt-3 mt-md-0 d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => setSelectedVoucherConsignment(item)}
                        >
                          📄 Delivery Note
                        </button>
                        {!isDelivered ? (
                          <button
                            type="button"
                            className="btn btn-teal btn-sm fw-bold px-3 shadow-xs"
                            onClick={() => onAdvanceTrackingStage(item.id)}
                            title="Simulate advancing consignment to the next delivery stage"
                          >
                            Advance Stage ➔
                          </button>
                        ) : (
                          <span className="badge bg-success text-white py-2 px-3 fw-bold">
                            ✓ Handover Complete
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Visual 4-Step Stepper Progress */}
                    <div className="mb-4 bg-white p-3 rounded border">
                      <div className="d-flex justify-content-between small text-muted mb-2 fw-semibold">
                        <span className={item.stage >= 1 ? 'text-teal fw-bold' : 'text-muted'}>
                          1. Booked & Allocated {item.stage >= 1 ? '✓' : ''}
                        </span>
                        <span className={item.stage >= 2 ? 'text-teal fw-bold' : 'text-muted'}>
                          2. Packaged at Hub {item.stage >= 2 ? '✓' : ''}
                        </span>
                        <span className={item.stage >= 3 ? 'text-teal fw-bold' : 'text-muted'}>
                          3. In Transit (GPS) {item.stage >= 3 ? '✓' : ''}
                        </span>
                        <span className={item.stage >= 4 ? 'text-success fw-bold' : 'text-muted'}>
                          4. Delivered & Distributed {item.stage >= 4 ? '🎉' : ''}
                        </span>
                      </div>

                      <div className="progress" style={{ height: '10px' }}>
                        <div
                          className={`progress-bar ${isDelivered ? 'bg-success' : 'bg-teal'}`}
                          role="progressbar"
                          style={{ width: `${progressPct}%`, backgroundColor: isDelivered ? '#059669' : 'var(--ib-primary)' }}
                          aria-valuenow={progressPct}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>

                    {/* Logistics Route Information */}
                    <div className="row g-3 small text-muted pt-2 border-top">
                      <div className="col-md-3">
                        <span className="d-block text-xs">Origin Donor Depot:</span>
                        <strong className="text-dark">{item.donorName}</strong>
                        <div className="text-xs">{item.origin}</div>
                      </div>
                      <div className="col-md-3">
                        <span className="d-block text-xs">Destination NGO Center:</span>
                        <strong className="text-dark">{item.ngoName}</strong>
                        <div className="text-xs">{item.destination}</div>
                      </div>
                      <div className="col-md-3">
                        <span className="d-block text-xs">Logistics Fleet & Driver:</span>
                        <strong className="text-dark">{item.vehicleNumber}</strong>
                        <div className="text-xs">Driver: {item.driverName}</div>
                      </div>
                      <div className="col-md-3">
                        <span className="d-block text-xs">Delivery ETA / Handover:</span>
                        <strong className={isDelivered ? 'text-success' : 'text-primary'}>
                          {item.eta}
                        </strong>
                        <div className="text-xs">Logged: {item.timestamp}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-5 text-muted">
                No consignments found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Consignment Voucher Modal */}
      <ConsignmentVoucherModal
        isOpen={!!selectedVoucherConsignment}
        onClose={() => setSelectedVoucherConsignment(null)}
        consignment={selectedVoucherConsignment}
      />
    </div>
  );
}

export default TrackingPage;
