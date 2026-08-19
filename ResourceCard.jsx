import { Link } from 'react-router-dom';

/**
 * Reusable ResourceCard Component
 * Demonstrates:
 * - Module 2: Functional components, props destructuring, event handling (onClick callback)
 * - Module 3: Bootstrap card layouts, badges, and button styling
 */
function ResourceCard({ resource, onFindMatch, isSelected }) {
  const {
    id,
    resourceName,
    category,
    totalQuantity,
    availableQuantity,
    quantity,
    unit = 'Units',
    location,
    donor,
    status,
    description
  } = resource;

  const total = Number(totalQuantity || quantity || 0);
  const avail = Number(availableQuantity ?? quantity ?? 0);
  const isDepleted = avail <= 0;
  const isMatched = status === 'Matched' || isDepleted;
  const availPct = total > 0 ? Math.round((avail / total) * 100) : 0;

  return (
    <div className="col-md-6 col-lg-4">
      <div
        className={`card h-100 ib-card border-0 shadow-sm p-4 d-flex flex-column justify-content-between ${
          isSelected ? 'border-2 shadow' : ''
        }`}
        style={isSelected ? { borderColor: 'var(--ib-primary)' } : {}}
      >
        <div>
          {/* Header Badges */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="badge bg-secondary-subtle text-secondary border px-2 py-1 small">
              {category}
            </span>
            <span
              className={`badge px-2 py-1 small ${
                avail > 0 ? 'badge-open' : 'badge-fulfilled'
              }`}
            >
              {avail > 0 ? `${avail} ${unit} Available` : 'Fully Allocated'}
            </span>
          </div>

          {/* Resource Title & Donor */}
          <h5 className="card-title fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
            {resourceName}
          </h5>
          <div className="text-muted small mb-2 fw-medium">
            Provided by: <span className="text-dark">{donor}</span>
          </div>

          {/* Description */}
          {description && (
            <p className="card-text text-muted small mb-3" style={{ lineHeight: '1.5' }}>
              {description}
            </p>
          )}

          {/* Quantity & Location Specifications */}
          <div className="p-3 bg-light rounded-3 mb-3 small">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-muted">Depot Stock:</span>
              <strong className="text-dark" style={{ color: 'var(--ib-primary)' }}>
                {avail} / {total} {unit}
              </strong>
            </div>
            <div className="progress mb-2" style={{ height: '5px' }}>
              <div
                className="progress-bar bg-teal"
                style={{ width: `${availPct}%`, backgroundColor: 'var(--ib-primary)' }}
              ></div>
            </div>
            <div className="d-flex justify-content-between text-xs text-muted">
              <span>Origin / Depot:</span>
              <strong className="text-dark">{location}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-top d-flex gap-2">
          {onFindMatch && (
            <button
              type="button"
              className={`btn ${isSelected ? 'btn-teal' : 'btn-outline-teal'} flex-grow-1 py-2 btn-sm fw-semibold`}
              onClick={() => onFindMatch(resource)}
            >
              {isSelected ? 'Selected' : 'Smart Match ⚡'}
            </button>
          )}
          <Link
            to="/receiver"
            className="btn btn-emerald btn-sm py-2 px-3 fw-bold shadow-xs"
            title="Book this item as an NGO in the NGO Portal"
          >
            Book ➔
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
