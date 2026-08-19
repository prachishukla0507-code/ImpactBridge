import { Link } from 'react-router-dom';

function NeedCard({
  id, title, category, ngoName, location,
  quantityRequired, quantityFulfilled, quantityRemaining,
  unit, urgency, status, beneficiaryCount,
  fundingTarget, fundingRaised
}) {
  const req = Number(quantityRequired || 0);
  const ful = Number(quantityFulfilled || 0);
  const supplyPercent = req > 0 ? Math.min(100, Math.round((ful / req) * 100)) : 0;

  const target = Number(fundingTarget || 0);
  const raised = Number(fundingRaised || 0);
  const fundPercent = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;

  const getUrgencyBadge = () => {
    switch (urgency) {
      case 'Urgent':
        return <span className="badge badge-urgent px-2 py-1 small">🔴 Urgent</span>;
      case 'High':
        return <span className="badge badge-high px-2 py-1 small">🟠 High</span>;
      case 'Medium':
        return <span className="badge badge-medium px-2 py-1 small">🟡 Normal</span>;
      default:
        return <span className="badge badge-medium px-2 py-1 small">{urgency || 'Normal'}</span>;
    }
  };

  const isFulfilled = status === 'Fulfilled';

  return (
    <div className="col-md-6 col-lg-4">
      <div className="ib-card h-100 d-flex flex-column overflow-hidden">
        {/* Header */}
        <div className="p-3 pb-0">
          <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
            <span className="section-tag mb-0">{category}</span>
            {getUrgencyBadge()}
            {isFulfilled && <span className="badge badge-fulfilled px-2 py-1 small">✅ Fulfilled</span>}
          </div>
        </div>

        {/* Body */}
        <div className="p-3 flex-grow-1">
          <h5 className="fw-bold mb-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {title}
          </h5>
          <p className="text-muted small mb-3">
            {ngoName} <span className="text-secondary">• 📍 {location}</span>
          </p>

          {/* Supply Progress */}
          <div className="mb-3">
            <div className="d-flex justify-content-between small mb-1">
              <span className="fw-semibold">{ful}/{req} {unit}</span>
              <span className="text-muted">{supplyPercent}%</span>
            </div>
            <div className="stock-meter-bar">
              <div
                className="stock-meter-fill"
                style={{ width: `${supplyPercent}%`, backgroundColor: 'var(--ib-primary)' }}
              ></div>
            </div>
          </div>

          {/* Funding Progress */}
          {target > 0 && (
            <div className="mb-3">
              <div className="d-flex justify-content-between small mb-1">
                <span className="fw-semibold">₹{raised.toLocaleString()} / ₹{target.toLocaleString()}</span>
                <span className="text-muted">{fundPercent}%</span>
              </div>
              <div className="stock-meter-bar">
                <div
                  className="stock-meter-fill"
                  style={{ width: `${fundPercent}%`, backgroundColor: 'var(--ib-urgent)' }}
                ></div>
              </div>
            </div>
          )}

          {/* Beneficiaries */}
          {beneficiaryCount > 0 && (
            <div className="small text-muted">
              👥 {beneficiaryCount.toLocaleString()} beneficiaries
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 pt-0 d-flex gap-2">
          <Link to={`/needs/${id}`} className="btn btn-outline-teal btn-sm rounded-pill fw-bold flex-grow-1">
            View Need
          </Link>
          {!isFulfilled && (
            <Link to={`/needs/${id}`} className="btn btn-teal btn-sm rounded-pill fw-bold flex-grow-1">
              Donate
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NeedCard;
