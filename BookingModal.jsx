import { useState, useEffect } from 'react';

/**
 * BookingModal Component
 * Allows NGOs to book partial or full quantities from available donor stock.
 * 
 * Demonstrates:
 * - Module 2: Controlled forms, local state (useState), useEffect, conditional validation
 * - Module 3: Bootstrap responsive modals, range slider, interactive summary calculation
 */
function BookingModal({
  isOpen,
  onClose,
  resource,
  ngos = [],
  activeNGO,
  needs = [],
  onConfirmBooking
}) {
  if (!isOpen || !resource) return null;

  const availableQty = Number(resource.availableQuantity ?? resource.quantity ?? 0);
  const unit = resource.unit || 'Units';

  // Local state for booking form
  const [selectedNGO, setSelectedNGO] = useState(activeNGO?.name || (ngos[0]?.name || ''));
  const [quantity, setQuantity] = useState(Math.min(availableQty, 50 > availableQty ? availableQty : 50));
  const [selectedNeedId, setSelectedNeedId] = useState('');
  const [destination, setDestination] = useState(activeNGO?.location || resource.location || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state when resource or activeNGO changes
  useEffect(() => {
    if (resource) {
      const initQty = availableQty > 0 ? (availableQty >= 50 ? 50 : availableQty) : 0;
      setQuantity(initQty);
      setErrorMsg('');
      if (activeNGO) {
        setSelectedNGO(activeNGO.name);
        setDestination(activeNGO.location || resource.location);
      }
    }
  }, [resource, activeNGO, availableQty]);

  // Filter open needs for the selected NGO to allow linking
  const relevantNeeds = needs.filter(
    (n) => n.ngoName === selectedNGO && n.status !== 'Fulfilled' && (n.category === resource.category || !selectedNeedId)
  );

  const handlePresetPercentage = (pct) => {
    const calculated = Math.max(1, Math.round((availableQty * pct) / 100));
    setQuantity(Math.min(availableQty, calculated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyNum = Number(quantity);

    if (isNaN(qtyNum) || qtyNum <= 0) {
      setErrorMsg('Please enter a valid quantity greater than 0.');
      return;
    }

    if (qtyNum > availableQty) {
      setErrorMsg(`Cannot book more than the available ${availableQty} ${unit}.`);
      return;
    }

    if (!selectedNGO.trim()) {
      setErrorMsg('Please select or enter the requesting NGO name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Execute booking callback
    onConfirmBooking({
      resourceId: resource.id,
      resourceName: resource.resourceName,
      donorName: resource.donor,
      category: resource.category,
      ngoName: selectedNGO,
      quantityRequested: qtyNum,
      unit: unit,
      needId: selectedNeedId || null,
      destination: destination || resource.location,
      notes: notes || 'Standard priority humanitarian delivery.'
    });

    setIsSubmitting(false);
    onClose();
  };

  const remainingAfterBooking = Math.max(0, availableQty - Number(quantity || 0));

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className="modal-dialog-custom p-4 p-md-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between pb-3 border-bottom mb-4">
          <div>
            <span className="section-tag-emerald mb-1">NGO Stock Allocation Bridge</span>
            <h4 className="fw-bold mb-0" style={{ color: 'var(--ib-text-main)' }}>
              Book Resources for Your Community
            </h4>
            <p className="text-muted small mb-0 mt-1">
              Select the exact quantity your NGO needs from available verified donor inventory.
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>

        {/* Selected Resource Summary Box */}
        <div className="p-3 bg-light rounded-3 border mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="fw-bold text-dark mb-0">{resource.resourceName}</h5>
            <span className="badge bg-secondary-subtle text-secondary border">
              {resource.category}
            </span>
          </div>
          <div className="row g-2 small text-muted">
            <div className="col-sm-6">
              Donor: <strong className="text-dark">{resource.donor}</strong>
            </div>
            <div className="col-sm-6">
              Origin: <strong className="text-dark">{resource.location}</strong>
            </div>
            <div className="col-12 mt-1">
              <span className="text-success fw-bold">
                ✓ {availableQty} {unit} currently in stock
              </span>{' '}
              <span className="text-muted">(Total Donated: {resource.totalQuantity || availableQty} {unit})</span>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="alert alert-danger py-2 px-3 small mb-3">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 1. Requesting NGO Selection */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-dark">
              Requesting NGO / Community Entity: <span className="text-danger">*</span>
            </label>
            <select
              className="form-select form-select-sm"
              value={selectedNGO}
              onChange={(e) => setSelectedNGO(e.target.value)}
              required
            >
              {ngos.map((ngo) => (
                <option key={ngo.id} value={ngo.name}>
                  {ngo.name} ({ngo.focusArea})
                </option>
              ))}
              <option value="Other Community Group">Other Grassroots Community Group</option>
            </select>
          </div>

          {/* 2. Flexible Quantity Selector with Slider & Presets */}
          <div className="mb-4 p-3 bg-white border rounded-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <label className="form-label small fw-bold text-dark mb-0">
                Quantity Needed by NGO: <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max={availableQty}
                  className="form-control form-control-sm text-end fw-bold text-teal"
                  style={{ width: '100px' }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
                <span className="small text-muted fw-semibold">{unit}</span>
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              className="form-range my-2"
              min="1"
              max={availableQty}
              value={quantity || 1}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            {/* Percentage Preset Quick Buttons */}
            <div className="d-flex gap-2 mt-2">
              <span className="small text-muted me-1 align-self-center">Quick Set:</span>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm py-0 px-2 text-xs"
                onClick={() => handlePresetPercentage(25)}
              >
                25%
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm py-0 px-2 text-xs"
                onClick={() => handlePresetPercentage(50)}
              >
                50%
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm py-0 px-2 text-xs"
                onClick={() => handlePresetPercentage(75)}
              >
                75%
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm py-0 px-2 text-xs"
                onClick={() => handlePresetPercentage(100)}
              >
                All ({availableQty})
              </button>
            </div>

            {/* Dynamic Real-Time Math Indicator */}
            <div className="mt-3 pt-2 border-top d-flex justify-content-between small text-muted">
              <span>Remaining Depot Stock After Booking:</span>
              <strong className={remainingAfterBooking === 0 ? 'text-amber' : 'text-teal'}>
                {remainingAfterBooking} {unit} remaining
              </strong>
            </div>
          </div>

          {/* 3. Link to Existing Community Requirement (Optional) */}
          {relevantNeeds.length > 0 && (
            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark">
                Link to an Open Demand / Requirement (Optional):
              </label>
              <select
                className="form-select form-select-sm"
                value={selectedNeedId}
                onChange={(e) => setSelectedNeedId(e.target.value)}
              >
                <option value="">-- Direct Community Aid Booking (No linked ticket) --</option>
                {relevantNeeds.map((need) => (
                  <option key={need.id} value={need.id}>
                    [{need.id}] {need.title} (Needed: {need.quantityRequired - need.quantityFulfilled} {need.unit})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 4. Destination Address */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-dark">
              Delivery Destination & Contact Center:
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Ward 4 Community Clinic & Distribution Camp"
              required
            />
          </div>

          {/* 5. Logistics Notes */}
          <div className="mb-4">
            <label className="form-label small fw-semibold text-dark">
              Special Handling / Urgency Notes:
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Needs delivery by Friday for morning distribution drive"
            />
          </div>

          {/* Actions */}
          <div className="d-flex align-items-center justify-content-end gap-2 pt-3 border-top">
            <button
              type="button"
              className="btn btn-light btn-sm px-3 py-2 text-muted"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-emerald btn-sm px-4 py-2 fw-bold shadow-sm"
              disabled={isSubmitting || availableQty <= 0}
            >
              {isSubmitting ? 'Booking...' : `Confirm & Allocate ${quantity} ${unit} ✓`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
