import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MoneyDonationModal from '../components/MoneyDonationModal';
import SupplyDonationModal from '../components/SupplyDonationModal';

function DonatePage({ needs = [], onDonateMoney, onDonateSuppliesToNeed, onDonateSuppliesToReserve }) {
  const [searchParams] = useSearchParams();
  const initialAction = searchParams.get('action') || 'money';
  const [activeTab, setActiveTab] = useState(initialAction);
  const [showMoneyModal, setShowMoneyModal] = useState(false);
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState(null);

  const openNeeds = needs.filter(n =>
    n.status !== 'Fulfilled' &&
    ((n.fundingRaised || 0) < (n.fundingTarget || 0) || (n.quantityRemaining || 0) > 0)
  );

  const handleSelectNeedForMoney = (need) => {
    setSelectedNeed(need);
    setShowMoneyModal(true);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">How would you like to help?</h1>
        <p className="text-muted lead">Choose a way to support communities in need.</p>
      </div>

      <div className="row justify-content-center mb-5">
        {/* Money Card */}
        <div className="col-md-5 mb-4">
          <div
            className={`card h-100 border-2 rounded-4 p-4 text-center ${activeTab === 'money' ? 'shadow' : 'shadow-sm'}`}
            style={{
              cursor: 'pointer',
              borderColor: activeTab === 'money' ? 'var(--ib-primary)' : 'var(--ib-border)'
            }}
            onClick={() => setActiveTab('money')}
          >
            <span className="display-4 mb-3">💳</span>
            <h3 className="fw-bold">Donate Money</h3>
            <p className="text-muted">Make a financial contribution toward a verified NGO need.</p>

            {activeTab === 'money' && openNeeds.length > 0 && (
              <div className="mt-3 text-start">
                <h6 className="fw-bold text-muted small mb-2">Quick Fund a Need:</h6>
                <div className="d-flex flex-column gap-2" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                  {openNeeds.slice(0, 6).map(need => {
                    const percent = (need.fundingTarget || 0) > 0
                      ? Math.round(((need.fundingRaised || 0) / need.fundingTarget) * 100)
                      : 0;
                    return (
                      <div
                        key={need.id}
                        className="bg-light rounded-3 p-3 d-flex justify-content-between align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); handleSelectNeedForMoney(need); }}
                      >
                        <div>
                          <h6 className="fw-bold mb-0 small">{need.title}</h6>
                          <small className="text-muted">{need.ngoName}</small>
                        </div>
                        <div className="text-end">
                          <span className="fw-bold small" style={{ color: 'var(--ib-primary)' }}>{percent}%</span>
                          <br />
                          <small className="text-muted">funded</small>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-auto pt-3">
              <Link to="/needs" className="btn btn-outline-dark rounded-pill fw-bold px-4">
                Browse All Needs
              </Link>
            </div>
          </div>
        </div>

        {/* Supplies Card */}
        <div className="col-md-5 mb-4">
          <div
            className={`card h-100 border-2 rounded-4 p-4 text-center ${activeTab === 'supplies' ? 'shadow' : 'shadow-sm'}`}
            style={{
              cursor: 'pointer',
              borderColor: activeTab === 'supplies' ? 'var(--ib-primary)' : 'var(--ib-border)'
            }}
            onClick={() => setActiveTab('supplies')}
          >
            <span className="display-4 mb-3">📦</span>
            <h3 className="fw-bold">Donate Supplies</h3>
            <p className="text-muted">Contribute physical supplies directly to an NGO need or to the central reserve.</p>

            {activeTab === 'supplies' && (
              <div className="mt-3">
                <p className="text-muted small mb-3">Choose a destination for your supplies:</p>
              </div>
            )}

            <div className="d-flex gap-2 justify-content-center mt-auto pt-3">
              <Link to="/needs" className="btn btn-teal rounded-pill fw-bold px-3">
                Direct to Need
              </Link>
              <button
                className="btn btn-outline-secondary rounded-pill fw-bold px-3"
                onClick={(e) => { e.stopPropagation(); setShowSupplyModal(true); }}
              >
                Central Reserve
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-muted mb-2">Prefer to choose a specific community need?</p>
        <Link to="/needs" className="btn btn-light border px-4 py-2 rounded-pill fw-semibold">
          Browse All NGO Needs →
        </Link>
      </div>

      {/* Money Donation Modal */}
      <MoneyDonationModal
        isOpen={showMoneyModal}
        onClose={() => { setShowMoneyModal(false); setSelectedNeed(null); }}
        need={selectedNeed}
        onDonateMoney={onDonateMoney}
      />

      {/* Supply Donation Modal (Reserve mode) */}
      <SupplyDonationModal
        isOpen={showSupplyModal}
        onClose={() => setShowSupplyModal(false)}
        need={null}
        needs={needs}
        onDonateSuppliesToNeed={onDonateSuppliesToNeed}
        onDonateSuppliesToReserve={onDonateSuppliesToReserve}
      />
    </div>
  );
}

export default DonatePage;
