/**
 * ConsignmentVoucherModal Component
 * Renders a formal, verifiable Digital Delivery Voucher / Consignment Note.
 * 
 * Demonstrates:
 * - Module 2: Conditional rendering, props drilling
 * - Module 3: Bootstrap printable card design, receipt layout, badges
 */
function ConsignmentVoucherModal({ isOpen, onClose, consignment }) {
  if (!isOpen || !consignment) return null;

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className="modal-dialog-custom p-4 p-md-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-4">
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-teal text-white p-2 rounded" style={{ backgroundColor: 'var(--ib-primary)' }}>
              IB
            </span>
            <div>
              <h5 className="fw-bold mb-0 text-dark">ImpactBridge Consignment Note</h5>
              <small className="text-muted">Digital Chain-of-Custody Document</small>
            </div>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>

        {/* Voucher Printable Frame */}
        <div className="consignment-voucher mb-4 bg-light">
          {/* Top Bar */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <div>
              <span className="text-muted small">Tracking ID:</span>
              <strong className="d-block text-dark fs-5">{consignment.id}</strong>
            </div>
            <div className="text-end">
              <span className="badge bg-success-subtle text-success border px-3 py-1">
                Phase {consignment.stage}/4: {consignment.stageLabel}
              </span>
              <small className="d-block text-muted mt-1">{consignment.timestamp}</small>
            </div>
          </div>

          {/* Allocation Details */}
          <div className="row g-3 mb-3">
            <div className="col-sm-6">
              <div className="p-2 bg-white rounded border">
                <small className="text-muted d-block">Donor / Origin:</small>
                <strong className="text-dark d-block">{consignment.donorName}</strong>
                <small className="text-muted">{consignment.origin}</small>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="p-2 bg-white rounded border">
                <small className="text-muted d-block">Receiving NGO / Beneficiary:</small>
                <strong className="text-dark d-block">{consignment.ngoName}</strong>
                <small className="text-muted">{consignment.destination}</small>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="table-responsive bg-white rounded border mb-3">
            <table className="table table-sm table-borderless mb-0">
              <thead className="table-light small border-bottom">
                <tr>
                  <th>Item Description</th>
                  <th>Category</th>
                  <th className="text-end">Quantity Allocated</th>
                </tr>
              </thead>
              <tbody className="small">
                <tr>
                  <td className="fw-semibold">{consignment.resourceName}</td>
                  <td>
                    <span className="badge bg-secondary-subtle text-secondary border">
                      {consignment.category}
                    </span>
                  </td>
                  <td className="text-end fw-bold text-teal" style={{ color: 'var(--ib-primary)' }}>
                    {consignment.quantity} {consignment.unit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Logistics & Fleet Meta */}
          <div className="p-2 bg-white rounded border mb-3 small text-muted">
            <div className="row g-2">
              <div className="col-6">
                Assigned Logistics: <strong className="text-dark">{consignment.vehicleNumber}</strong>
              </div>
              <div className="col-6">
                Driver / Agent: <strong className="text-dark">{consignment.driverName}</strong>
              </div>
              <div className="col-12 mt-1">
                Estimated Delivery: <strong className="text-success">{consignment.eta}</strong>
              </div>
              {consignment.notes && (
                <div className="col-12 text-xs fst-italic">
                  Notes: {consignment.notes}
                </div>
              )}
            </div>
          </div>

          {/* Cryptographic Proof & QR Simulation */}
          <div className="d-flex align-items-center justify-content-between pt-2 border-top text-xs text-muted">
            <div>
              <span>Verification Hash: </span>
              <code>SHA256:8f9b4...2a1c</code>
            </div>
            <div className="text-end text-success fw-semibold">
              ✓ ImpactBridge Tamper-Proof Verified
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="d-flex justify-content-between align-items-center pt-2">
          <small className="text-muted">
            Print this voucher or show on mobile upon handover.
          </small>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => window.print()}
            >
              🖨️ Print Voucher
            </button>
            <button
              type="button"
              className="btn btn-teal btn-sm px-3"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsignmentVoucherModal;
