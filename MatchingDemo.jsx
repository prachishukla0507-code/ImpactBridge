import { useState } from 'react';
import { findSuitableMatches } from '../utils/matching';

/**
 * MatchingDemo Component
 * Rule-based intelligent matching between Donor Stock and Community Demands.
 * 
 * Demonstrates:
 * - Module 1: Rule-based logic execution, array filtering, object destructuring
 * - Module 2: Props passing, conditional rendering, event handling, interactive quantity selector
 * - Module 3: Bootstrap responsive cards, badges, alerts, and matching workflow UI
 */
function MatchingDemo({
  selectedResource,
  needs = [],
  resources = [],
  onMatchResource,
  onClearSelection,
  onSelectResource
}) {
  // Execute rule-based matching using the utility function (Module 1)
  const matches = selectedResource ? findSuitableMatches(selectedResource, needs) : [];
  const availableResources = resources.filter(
    (r) => Number(r.availableQuantity ?? r.quantity ?? 0) > 0
  );

  const [allocationQty, setAllocationQty] = useState({});

  const handleQtyChange = (needId, val) => {
    setAllocationQty((prev) => ({ ...prev, [needId]: Number(val) }));
  };

  return (
    <section id="matching-demo" className="py-5 bg-white border-bottom">
      <div className="container py-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Deterministic Match Engine</span>
          <h2 className="fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
            Resource-to-Need Matching System
          </h2>
          <p className="text-muted small">
            3-Factor Compatibility: <strong>Category Alignment</strong> + <strong>Quantity Analysis (Full or Partial Allocation)</strong> + <strong>Geographic Proximity</strong>.
          </p>
        </div>

        {/* State 1: No resource selected yet */}
        {!selectedResource ? (
          <div className="card border-0 bg-light rounded-4 p-5 text-center shadow-sm">
            <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
              <span className="fs-3">⚡</span>
            </div>
            <h5 className="fw-bold mb-2" style={{ color: 'var(--ib-text-main)' }}>
              Select a Donor Resource to Evaluate
            </h5>
            <p className="text-muted small mb-4" style={{ maxWidth: '540px', margin: '0 auto' }}>
              Choose any available inventory batch from the donor depot to test real-time matching algorithms against open NGO demands.
            </p>

            {/* Quick Picker Pills */}
            <div className="d-flex flex-wrap justify-content-center gap-2 max-w-lg mx-auto">
              {availableResources.slice(0, 6).map((res) => (
                <button
                  key={res.id}
                  type="button"
                  className="btn btn-outline-teal btn-sm px-3 py-2 text-start bg-white shadow-xs"
                  onClick={() => onSelectResource && onSelectResource(res.id)}
                >
                  <strong>{res.resourceName}</strong> ({res.availableQuantity ?? res.quantity} {res.unit || 'Units'}, {res.location})
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* State 2: Resource is selected, evaluate and display matches */
          <div className="row g-4 align-items-stretch">
            {/* Left Column: Selected Resource Details */}
            <div className="col-lg-5">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5 bg-light d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge bg-teal text-white px-3 py-1 fw-bold" style={{ backgroundColor: 'var(--ib-primary)' }}>
                      Donor Resource Selected
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm py-1 px-2 text-xs"
                      onClick={onClearSelection}
                    >
                      ✕ Clear Selection
                    </button>
                  </div>

                  <h4 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                    {selectedResource.resourceName}
                  </h4>
                  <div className="text-muted small mb-4">
                    Contributed by: <strong className="text-dark">{selectedResource.donor}</strong>
                  </div>

                  <div className="p-3 bg-white rounded-3 border mb-3 small">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">1. Category:</span>
                      <span className="badge bg-secondary-subtle text-secondary border">
                        {selectedResource.category}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">2. Available Stock:</span>
                      <strong className="text-teal" style={{ color: 'var(--ib-primary)' }}>
                        {selectedResource.availableQuantity ?? selectedResource.quantity} {selectedResource.unit || 'Units'}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">3. Origin Location:</span>
                      <strong className="text-dark">{selectedResource.location}</strong>
                    </div>
                  </div>

                  <p className="text-muted small mb-0">
                    {selectedResource.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-top text-muted small">
                  Batch Code: <code>{selectedResource.id}</code> &bull; Status: <span className="badge badge-open">Available</span>
                </div>
              </div>
            </div>

            {/* Right Column: Suitable Match Evaluation & Result */}
            <div className="col-lg-7">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="badge bg-secondary-subtle text-secondary border px-3 py-1 fw-bold">
                      Matching Evaluation ({matches.length} Candidate Demands)
                    </span>
                    <span className="text-muted small">
                      Screened {needs.length} Active NGO Needs
                    </span>
                  </div>

                  {/* Scenario A: Matches Found */}
                  {matches.length > 0 ? (
                    <div>
                      <div className="alert alert-success py-2 px-3 small d-flex align-items-center mb-3">
                        <span className="me-2">✓</span>
                        <div>
                          <strong>{matches.length} compatible requirement(s) found!</strong> Evaluated for category, location proximity, and quantity fulfillment.
                        </div>
                      </div>

                      <div className="d-flex flex-column gap-3">
                        {matches.map((need) => {
                          const currentVal = allocationQty[need.id] ?? need.maxAllocatable;
                          const availableStock = Number(selectedResource.availableQuantity ?? selectedResource.quantity ?? 0);

                          return (
                            <div key={need.id} className="card border p-3 rounded-3 bg-light">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="badge bg-secondary-subtle text-secondary border small">
                                  {need.category}
                                </span>
                                <div className="d-flex gap-1">
                                  <span className="badge bg-success-subtle text-success border small">
                                    {need.matchScore}% Match Score
                                  </span>
                                  <span className="badge bg-warning-subtle text-dark border border-warning-subtle small">
                                    Urgency: {need.urgency}
                                  </span>
                                </div>
                              </div>

                              <h5 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                                {need.title}
                              </h5>
                              <div className="text-muted small mb-3">
                                Requesting NGO: <strong className="text-dark">{need.ngoName}</strong> &bull; Destination: <strong>{need.location}</strong>
                              </div>

                              <div className="row g-2 p-2 bg-white rounded border mb-3 small">
                                <div className="col-6">
                                  <span className="text-muted">Total Needed:</span>{' '}
                                  <strong>{need.quantityRequired} {need.unit}</strong>
                                </div>
                                <div className="col-6">
                                  <span className="text-muted">Still Open:</span>{' '}
                                  <strong className="text-danger">{need.remainingNeeded} {need.unit}</strong>
                                </div>
                              </div>

                              {/* Allocation Quantity Control */}
                              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between pt-2 border-top gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <label className="small text-muted mb-0">Allocate Units:</label>
                                  <input
                                    type="number"
                                    min="1"
                                    max={Math.min(availableStock, need.remainingNeeded)}
                                    className="form-control form-control-sm text-end fw-bold"
                                    style={{ width: '80px' }}
                                    value={currentVal}
                                    onChange={(e) => handleQtyChange(need.id, e.target.value)}
                                  />
                                  <span className="text-xs text-muted">{need.unit}</span>
                                </div>

                                <button
                                  type="button"
                                  className="btn btn-emerald btn-sm px-4 py-2 fw-bold"
                                  onClick={() => onMatchResource(selectedResource.id, need.id, currentVal)}
                                >
                                  Execute Allocation & Book ✓
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Scenario B: No Suitable Match Found */
                    <div className="p-4 bg-light rounded-3 text-center border">
                      <div className="fs-1 mb-2">⚠️</div>
                      <h5 className="fw-bold text-dark mb-2">
                        No direct matching NGO demands found
                      </h5>
                      <p className="text-muted small mb-3" style={{ maxWidth: '420px', margin: '0 auto' }}>
                        No open requirements currently match the category <strong>({selectedResource.category})</strong>. This inventory remains available in the depot for NGOs to browse and book.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-top text-muted small d-flex justify-content-between align-items-center">
                  <span>Pure Deterministic Logic &bull; <code>src/utils/matching.js</code></span>
                  <span>Instant Real-Time Stock Updates</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MatchingDemo;
