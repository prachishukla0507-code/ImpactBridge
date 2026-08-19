import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import MoneyDonationModal from '../components/MoneyDonationModal';
import SupplyDonationModal from '../components/SupplyDonationModal';

function NeedDetailPage({ needs = [], resources = [], onDonateMoney, onDonateSupplies, onDonateSuppliesToReserve }) {
  const { needId } = useParams();
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [showSupplyModal, setShowSupplyModal] = useState(false);

  const need = needs.find(n => n.id === needId);

  if (!need) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Need not found.</h2>
        <Link to="/needs" className="btn btn-outline-teal rounded-pill">← Back to all needs</Link>
      </div>
    );
  }

  const req = Number(need.quantityRequired || 0);
  const ful = Number(need.quantityFulfilled || 0);
  const rem = Number(need.quantityRemaining ?? Math.max(0, req - ful));
  const supplyPercent = req > 0 ? Math.min(100, Math.round((ful / req) * 100)) : 0;

  const target = Number(need.fundingTarget || 0);
  const raised = Number(need.fundingRaised || 0);
  const fundPercent = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;

  const getUrgencyBadge = () => {
    switch (need.urgency) {
      case 'Urgent':
        return <span className="badge badge-urgent px-3 py-2">🔴 Urgent</span>;
      case 'High':
        return <span className="badge badge-high px-3 py-2">🟠 High Priority</span>;
      case 'Medium':
        return <span className="badge badge-medium px-3 py-2">🟡 Normal</span>;
      default:
        return <span className="badge badge-medium px-3 py-2">{need.urgency || 'Normal'}</span>;
    }
  };

  // Find matching resources in the central reserve
  const matchingResources = resources.filter(
    r => r.category === need.category && (r.availableQuantity || 0) > 0
  );

  const isFulfilled = need.status === 'Fulfilled';

  return (
    <div className="container py-5">
      <Link to="/needs" className="text-decoration-none text-muted mb-4 d-inline-block">← Back to all needs</Link>

      <div className="row g-5">
        {/* Left Column */}
        <div className="col-lg-7">
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="section-tag mb-0">{need.category}</span>
            {getUrgencyBadge()}
            {isFulfilled && <span className="badge badge-fulfilled px-3 py-2">✅ Fulfilled</span>}
          </div>

          <h1 className="fw-bold mb-2" style={{ lineHeight: 1.2 }}>
            {req} {need.title}
          </h1>
          <h5 className="text-dark mb-4">
            {need.ngoName}
            <span className="text-muted fw-normal"> | 📍 {need.location}</span>
          </h5>

          {/* Story Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ backgroundColor: 'var(--ib-primary-subtle)' }}>
            <h6 className="fw-bold text-uppercase text-muted mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
              Community Need
            </h6>
            <p className="fs-5 mb-0" style={{ lineHeight: '1.6' }}>{need.description}</p>
          </div>

          {/* Beneficiaries */}
          {need.beneficiaryCount > 0 && (
            <div className="d-flex align-items-center gap-2 mb-4">
              <span className="fs-4">👥</span>
              <div>
                <span className="fw-bold fs-5">{need.beneficiaryCount.toLocaleString()}</span>
                <span className="text-muted ms-1">people will benefit</span>
              </div>
            </div>
          )}

          {/* For NGOs */}
          {matchingResources.length > 0 && (
            <div className="card border rounded-4 p-4 shadow-sm">
              <h6 className="fw-bold mb-3">📦 Matching Supplies in Central Reserve</h6>
              <p className="text-muted small mb-3">
                These donor stock batches are available and match this need's category.
              </p>
              {matchingResources.map(r => (
                <div key={r.id} className="d-flex justify-content-between align-items-center bg-light rounded-3 p-3 mb-2">
                  <div>
                    <h6 className="fw-bold mb-0 small">{r.resourceName}</h6>
                    <small className="text-muted">by {r.donor}</small>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold" style={{ color: 'var(--ib-primary)' }}>{r.availableQuantity}</span>
                    <small className="text-muted ms-1">{r.unit} available</small>
                  </div>
                </div>
              ))}
              <Link to="/receiver" className="text-decoration-none small fw-bold mt-2 d-inline-block" style={{ color: 'var(--ib-primary)' }}>
                Need similar supplies for your community? Go to NGO Dashboard →
              </Link>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-lg-5">
          {/* Fulfillment Progress */}
          <div className="card border rounded-4 p-4 shadow-sm mb-4">
            <h5 className="fw-bold mb-4">Fulfillment Progress</h5>

            {/* Supplies */}
            <div className="mb-4">
              <h6 className="text-muted fw-bold mb-2">📦 Supplies</h6>
              <div className="d-flex justify-content-between mb-1">
                <span className="fw-bold fs-5">
                  {ful} <span className="text-muted fs-6 fw-normal">/ {req} fulfilled</span>
                </span>
                <span className="text-danger fw-bold">{rem} remaining</span>
              </div>
              <div className="progress rounded-pill bg-light" style={{ height: '8px' }}>
                <div
                  className="progress-bar rounded-pill"
                  style={{ width: `${supplyPercent}%`, backgroundColor: 'var(--ib-primary)' }}
                ></div>
              </div>
            </div>

            {/* Funding */}
            {target > 0 && (
              <div className="mb-0">
                <h6 className="text-muted fw-bold mb-2">💳 Funding</h6>
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-bold fs-5">
                    ₹{raised.toLocaleString()} <span className="text-muted fs-6 fw-normal">/ ₹{target.toLocaleString()}</span>
                  </span>
                  <span className="fw-bold" style={{ color: 'var(--ib-urgent)' }}>{fundPercent}% funded</span>
                </div>
                <div className="progress rounded-pill bg-light" style={{ height: '8px' }}>
                  <div className="progress-bar bg-warning rounded-pill" style={{ width: `${fundPercent}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Action Hub */}
          {!isFulfilled && (
            <div className="card border rounded-4 p-4 shadow-sm" style={{ backgroundColor: 'var(--ib-primary-subtle)', borderColor: 'var(--ib-primary)' }}>
              <h5 className="fw-bold mb-3">Two Ways to Help</h5>
              <button
                className="btn btn-dark w-100 py-3 rounded-pill fw-bold mb-3 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowMoneyModal(true)}
              >
                <span className="fs-5">💳</span> Give Money
              </button>
              <button
                className="btn btn-teal w-100 py-3 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowSupplyModal(true)}
              >
                <span className="fs-5">📦</span> Give Supplies
              </button>
              <p className="text-center text-muted small mt-3 mb-0">
                This prototype simulates financial contributions and supply direct-allocations.
              </p>
            </div>
          )}

          {isFulfilled && (
            <div className="card border rounded-4 p-4 shadow-sm text-center" style={{ backgroundColor: 'var(--ib-secondary-light)' }}>
              <span className="display-4 d-block mb-2">✅</span>
              <h5 className="fw-bold mb-1">Fully Fulfilled!</h5>
              <p className="text-muted mb-0">This need has been completely met. Thank you to all contributors.</p>
            </div>
          )}
        </div>
      </div>

      {/* Money Donation Modal */}
      <MoneyDonationModal
        isOpen={showMoneyModal}
        onClose={() => setShowMoneyModal(false)}
        need={need}
        onDonateMoney={onDonateMoney}
      />

      {/* Supply Donation Modal */}
      <SupplyDonationModal
        isOpen={showSupplyModal}
        onClose={() => setShowSupplyModal(false)}
        need={need}
        needs={needs}
        onDonateSuppliesToNeed={onDonateSupplies}
        onDonateSuppliesToReserve={onDonateSuppliesToReserve}
      />
    </div>
  );
}

export default NeedDetailPage;
