import { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Healthcare', 'Education Supplies', 'Clothing', 'Emergency Relief'];

function SupplyDonationModal({ isOpen, onClose, need, needs = [], onDonateSuppliesToNeed, onDonateSuppliesToReserve }) {
  const [activeTab, setActiveTab] = useState(need ? 'direct' : 'direct');
  const [selectedNeedId, setSelectedNeedId] = useState(need?.id || '');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState(need?.category || '');
  const [unit, setUnit] = useState(need?.unit || '');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);

  useEffect(() => {
    if (need) {
      setActiveTab('direct');
      setSelectedNeedId(need.id);
      setCategory(need.category || '');
      setUnit(need.unit || '');
      setItemName(need.title || '');
    }
  }, [need]);

  if (!isOpen) return null;

  const openNeeds = needs.filter(n => n.status !== 'Fulfilled' && (n.quantityRemaining || 0) > 0);
  const currentNeed = need || openNeeds.find(n => n.id === selectedNeedId);

  const handleDirectSubmit = (e) => {
    e.preventDefault();
    const qty = Number(quantity);
    if (!selectedNeedId || qty <= 0) return;
    onDonateSuppliesToNeed(selectedNeedId, qty, category, unit, itemName);
    setSuccessDetails({
      type: 'direct',
      itemName,
      quantity: qty,
      unit,
      ngoName: currentNeed?.ngoName || 'NGO',
      needTitle: currentNeed?.title || 'Need'
    });
    setSuccess(true);
  };

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    const qty = Number(quantity);
    if (!itemName || qty <= 0) return;
    onDonateSuppliesToReserve(itemName, category, qty, unit, description, location);
    setSuccessDetails({
      type: 'reserve',
      itemName,
      quantity: qty,
      unit
    });
    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setSuccessDetails(null);
    setItemName('');
    setQuantity('');
    setCategory(need?.category || '');
    setUnit(need?.unit || '');
    setLocation('');
    setDescription('');
    setSelectedNeedId(need?.id || '');
    onClose();
  };

  return (
    <div className="modal-backdrop-custom" onClick={handleClose}>
      <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-4 pb-0">
          <h5 className="fw-bold mb-0">📦 Donate Supplies</h5>
          <button className="btn-close" onClick={handleClose}></button>
        </div>

        <div className="p-4">
          {success ? (
            /* Success Screen */
            <div className="text-center">
              <div className="display-1 mb-3">✅</div>
              <h4 className="fw-bold mb-2">Supply Donation Recorded!</h4>
              <p className="text-muted mb-4">Your demo supply contribution has been logged.</p>
              <div className="consignment-voucher text-start mb-4">
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td className="text-muted">Item</td>
                      <td className="fw-bold text-end">{successDetails?.itemName}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Quantity</td>
                      <td className="fw-bold text-end">{successDetails?.quantity} {successDetails?.unit}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Destination</td>
                      <td className="fw-bold text-end">
                        {successDetails?.type === 'direct'
                          ? `${successDetails.ngoName} — ${successDetails.needTitle}`
                          : 'ImpactBridge Central Reserve'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-teal w-100 py-2 rounded-pill fw-bold" onClick={handleClose}>
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Tab Switcher */}
              <div className="d-flex gap-2 mb-4">
                <button
                  className={`btn flex-grow-1 rounded-pill fw-bold py-2 ${activeTab === 'direct' ? 'btn-teal' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveTab('direct')}
                >
                  Direct to NGO Need
                </button>
                <button
                  className={`btn flex-grow-1 rounded-pill fw-bold py-2 ${activeTab === 'reserve' ? 'btn-teal' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveTab('reserve')}
                >
                  Central Reserve
                </button>
              </div>

              {/* Tab A: Direct to Need */}
              {activeTab === 'direct' && (
                <form onSubmit={handleDirectSubmit}>
                  {need ? (
                    <div className="bg-light rounded-3 p-3 mb-3">
                      <h6 className="fw-bold mb-1">{need.title}</h6>
                      <p className="text-muted small mb-1">{need.ngoName}</p>
                      <span className="badge bg-warning text-dark">
                        {need.quantityRemaining || 0} {need.unit} still needed
                      </span>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label className="form-label fw-bold small">Select a Need</label>
                      <select
                        className="form-select"
                        value={selectedNeedId}
                        onChange={(e) => {
                          setSelectedNeedId(e.target.value);
                          const sel = openNeeds.find(n => n.id === e.target.value);
                          if (sel) {
                            setCategory(sel.category || '');
                            setUnit(sel.unit || '');
                            setItemName(sel.title || '');
                          }
                        }}
                        required
                      >
                        <option value="">-- Choose a need --</option>
                        {openNeeds.map(n => (
                          <option key={n.id} value={n.id}>
                            {n.title} — {n.ngoName} ({n.quantityRemaining} {n.unit} needed)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-bold small">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g. Fleece Blankets"
                      required
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-bold small">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 10"
                        min="1"
                        max={currentNeed?.quantityRemaining || 9999}
                        required
                      />
                      {currentNeed && (
                        <small className="text-muted">Max: {currentNeed.quantityRemaining} {currentNeed.unit}</small>
                      )}
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small">Unit</label>
                      <input
                        type="text"
                        className="form-control"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        placeholder="e.g. Blankets"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small">Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                      <option value="">-- Select --</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-teal w-100 py-3 rounded-pill fw-bold"
                    disabled={!selectedNeedId || !quantity || Number(quantity) <= 0}
                  >
                    📦 Donate to Need
                  </button>
                </form>
              )}

              {/* Tab B: Central Reserve */}
              {activeTab === 'reserve' && (
                <form onSubmit={handleReserveSubmit}>
                  <div className="bg-light rounded-3 p-3 mb-3">
                    <h6 className="fw-bold mb-1">Central Reserve Deposit</h6>
                    <p className="text-muted small mb-0">
                      Add supplies to the ImpactBridge central inventory. Any NGO can then request these items for their community needs.
                    </p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g. Emergency Tarpaulins"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small">Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                      <option value="">-- Select --</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-bold small">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 100"
                        min="1"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small">Unit</label>
                      <input
                        type="text"
                        className="form-control"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        placeholder="e.g. Sheets"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small">Pickup Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Mumbai Warehouse, Gate 3"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small">Description (optional)</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of the supplies..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-teal w-100 py-3 rounded-pill fw-bold"
                    disabled={!itemName || !quantity || Number(quantity) <= 0}
                  >
                    📦 Add to Central Reserve
                  </button>
                </form>
              )}

              <p className="text-center text-muted small mt-3 mb-0">
                This prototype simulates supply allocation for demonstration.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupplyDonationModal;
