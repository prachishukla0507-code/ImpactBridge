import { Link } from 'react-router-dom';
import MatchingDemo from '../components/MatchingDemo';

/**
 * MatchesPage Component (Route: /matches)
 * 
 * Demonstrates:
 * - Module 1: Array .filter() and .map() methods, Object property access
 * - Module 2: Props passing, conditional rendering, list rendering
 * - Module 3: Bootstrap responsive tables, cards, badges, and alerts
 * - Module 4: Integrated React Router navigation
 */
function MatchesPage({
  resources = [],
  needs = [],
  selectedResource,
  onMatchResource,
  onClearSelection,
  onSelectResource,
  consignments = []
}) {
  const availableResourcesList = resources.filter(
    (r) => Number(r.availableQuantity ?? r.quantity ?? 0) > 0
  );

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container py-3">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-3 border-bottom">
          <div>
            <span className="section-tag">Rule-Based Allocations</span>
            <h1 className="display-6 fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Smart Match & Allocation Engine
            </h1>
            <p className="text-muted small mb-0">
              Evaluate 3-factor criteria (Category + Proximity + Quantity) and execute instant consignment allocations between Donors and NGOs.
            </p>
          </div>

          <div className="mt-3 mt-md-0 d-flex gap-2">
            <Link to="/tracking" className="btn btn-emerald px-4 py-2 fw-semibold shadow-sm">
              View Tracking Lifecycle &rarr;
            </Link>
          </div>
        </div>

        {/* Resource Selector Dropdown / Pills */}
        {!selectedResource && availableResourcesList.length > 0 && (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <h6 className="fw-bold text-dark mb-2">
              Select a Donor Stock Batch to Evaluate Matching Rules:
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {availableResourcesList.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  className="btn btn-outline-teal btn-sm px-3 py-2 text-start"
                  onClick={() => onSelectResource(res.id)}
                >
                  <strong>{res.resourceName}</strong> ({res.availableQuantity ?? res.quantity} {res.unit || 'Units'}, {res.location})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section 1: Active Interactive Matching Engine */}
        <div className="mb-5">
          <MatchingDemo
            selectedResource={selectedResource}
            needs={needs}
            resources={resources}
            onMatchResource={onMatchResource}
            onClearSelection={onClearSelection}
            onSelectResource={onSelectResource}
          />
        </div>

        {/* Section 2: Matched Allocations Ledger */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
            <div>
              <span className="badge bg-success-subtle text-success border px-3 py-1 mb-1">
                Verified Consignment Ledger
              </span>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                Active Consignments & Allocated Orders
              </h3>
              <p className="text-muted small mb-0">
                Official real-time record of donor resources matched and booked for partner NGOs.
              </p>
            </div>
            <span className="badge bg-light text-muted border px-3 py-2">
              {consignments.length} Total Booked Orders
            </span>
          </div>

          {consignments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-light small text-muted">
                  <tr>
                    <th>Consignment ID</th>
                    <th>Item Description</th>
                    <th>Category</th>
                    <th>Quantity Allocated</th>
                    <th>Donor Origin</th>
                    <th>Receiving NGO</th>
                    <th>Delivery Stage</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {consignments.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <strong className="text-dark d-block">{c.id}</strong>
                        <span className="text-muted text-xs">{c.timestamp}</span>
                      </td>
                      <td>
                        <strong className="text-dark">{c.resourceName}</strong>
                      </td>
                      <td>
                        <span className="badge bg-secondary-subtle text-secondary border">
                          {c.category}
                        </span>
                      </td>
                      <td>
                        <strong className="text-teal" style={{ color: 'var(--ib-primary)' }}>
                          {c.quantity} {c.unit}
                        </strong>
                      </td>
                      <td>{c.donorName}</td>
                      <td><strong className="text-dark">{c.ngoName}</strong></td>
                      <td>
                        <span className="badge bg-success-subtle text-success border">
                          Phase {c.stage}/4: {c.stageLabel}
                        </span>
                      </td>
                      <td>
                        <Link to="/tracking" className="btn btn-outline-teal btn-sm py-1 px-2 text-xs">
                          Track Stage &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5 bg-light rounded-3 p-4 border">
              <div className="fs-1 mb-2">📋</div>
              <h5 className="fw-bold text-muted mb-2">No matched consignments yet</h5>
              <p className="text-muted small mb-3" style={{ maxWidth: '450px', margin: '0 auto' }}>
                Select an available resource from the matching tool above and click <strong>"Execute Allocation & Book ✓"</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchesPage;
