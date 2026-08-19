import { useState } from 'react';
import { Link } from 'react-router-dom';

const PRESETS = [500, 1000, 2500, 5000];

function MoneyDonationModal({ isOpen, onClose, need, onDonateMoney }) {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [donationId, setDonationId] = useState('');

  if (!isOpen || !need) return null;

  const amount = selectedAmount || Number(customAmount) || 0;
  const target = Number(need.fundingTarget || 0);
  const raised = Number(need.fundingRaised || 0);
  const fundPercent = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;

  const handleSelectPreset = (val) => {
    setSelectedAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleCompletePayment = () => {
    const id = `DON-${Date.now().toString().slice(-4)}`;
    setDonationId(id);
    onDonateMoney(need.id, amount, paymentMethod);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedAmount(null);
    setCustomAmount('');
    setPaymentMethod('');
    setDonationId('');
    onClose();
  };

  return (
    <div className="modal-backdrop-custom" onClick={handleClose}>
      <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-4 pb-0">
          <h5 className="fw-bold mb-0">
            {step === 1 && '💳 Donate Money'}
            {step === 2 && '💳 Select Payment'}
            {step === 3 && '🎉 Donation Successful!'}
          </h5>
          <button className="btn-close" onClick={handleClose}></button>
        </div>

        <div className="p-4">
          {/* Step 1: Select Amount */}
          {step === 1 && (
            <>
              <div className="bg-light rounded-3 p-3 mb-4">
                <h6 className="fw-bold mb-1">{need.title}</h6>
                <p className="text-muted small mb-2">{need.ngoName}</p>
                <div className="d-flex justify-content-between small mb-1">
                  <span>₹{raised.toLocaleString()} raised</span>
                  <span className="fw-bold">₹{target.toLocaleString()} goal</span>
                </div>
                <div className="progress rounded-pill" style={{ height: '6px' }}>
                  <div className="progress-bar" role="progressbar" style={{ width: `${fundPercent}%`, backgroundColor: 'var(--ib-primary)' }}></div>
                </div>
              </div>

              <h6 className="fw-bold mb-3">Select Amount</h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {PRESETS.map((val) => (
                  <button
                    key={val}
                    className={`btn rounded-pill px-4 py-2 fw-bold ${selectedAmount === val ? 'btn-teal text-white' : 'btn-outline-secondary'}`}
                    onClick={() => handleSelectPreset(val)}
                  >
                    ₹{val.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Or enter custom amount</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={handleCustomChange}
                    min="1"
                  />
                </div>
              </div>

              {amount > 0 && (
                <div className="bg-light rounded-3 p-3 mb-3 text-center">
                  <span className="text-muted small">You're contributing</span>
                  <h3 className="fw-bold mb-0" style={{ color: 'var(--ib-primary)' }}>₹{amount.toLocaleString()}</h3>
                </div>
              )}

              <button
                className="btn btn-teal w-100 py-3 rounded-pill fw-bold"
                disabled={amount <= 0}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <>
              <div className="text-center mb-4">
                <span className="text-muted small">Contributing</span>
                <h2 className="fw-bold" style={{ color: 'var(--ib-primary)' }}>₹{amount.toLocaleString()}</h2>
                <p className="text-muted small mb-0">to {need.ngoName}</p>
              </div>

              <div className="alert alert-warning d-flex align-items-center gap-2 rounded-3 py-2 mb-4" style={{ fontSize: '0.85rem' }}>
                <span>⚠️</span>
                <strong>DEMO PAYMENT — No Real Money Charged</strong>
              </div>

              <h6 className="fw-bold mb-3">Choose Payment Method</h6>
              <div className="d-flex flex-column gap-2 mb-4">
                {[
                  { id: 'Demo UPI', label: 'Demo UPI / QR Code', icon: '📱', desc: 'Simulated UPI payment' },
                  { id: 'Demo Card', label: 'Demo Credit/Debit Card', icon: '💳', desc: 'Simulated card payment' },
                  { id: 'Demo Net Banking', label: 'Demo Net Banking', icon: '🏦', desc: 'Simulated bank transfer' }
                ].map((method) => (
                  <div
                    key={method.id}
                    className={`card p-3 border-2 rounded-3 cursor-pointer ${paymentMethod === method.id ? 'border-primary shadow-sm' : 'border-light'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="fs-4">{method.icon}</span>
                      <div>
                        <h6 className="fw-bold mb-0">{method.label}</h6>
                        <small className="text-muted">{method.desc}</small>
                      </div>
                      {paymentMethod === method.id && (
                        <span className="ms-auto text-primary fw-bold">✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-light rounded-pill px-4 fw-bold" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  className="btn btn-teal flex-grow-1 py-3 rounded-pill fw-bold"
                  disabled={!paymentMethod}
                  onClick={handleCompletePayment}
                >
                  Complete Demo Payment
                </button>
              </div>
            </>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <>
              <div className="text-center mb-4">
                <div className="display-1 mb-3">🎉</div>
                <h4 className="fw-bold">Thank You for Your Contribution!</h4>
                <p className="text-muted">Your demo donation has been recorded successfully.</p>
              </div>

              <div className="consignment-voucher mb-4">
                <h6 className="fw-bold text-uppercase text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                  Demo Donation Receipt
                </h6>
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td className="text-muted">Donation ID</td>
                      <td className="fw-bold text-end">{donationId}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Amount</td>
                      <td className="fw-bold text-end">₹{amount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Beneficiary</td>
                      <td className="fw-bold text-end">{need.ngoName}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Need</td>
                      <td className="fw-bold text-end">{need.title}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Payment</td>
                      <td className="fw-bold text-end">{paymentMethod}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Date</td>
                      <td className="fw-bold text-end">{new Date().toLocaleDateString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="d-flex gap-2">
                <Link to="/donor" className="btn btn-outline-teal flex-grow-1 py-2 rounded-pill fw-bold text-center" onClick={handleClose}>
                  View My Contributions
                </Link>
                <button className="btn btn-teal flex-grow-1 py-2 rounded-pill fw-bold" onClick={handleClose}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoneyDonationModal;
