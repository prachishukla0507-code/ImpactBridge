import { useState } from 'react';

/**
 * ResourceForm Component
 * Demonstrates:
 * - Module 2: Controlled form inputs with useState, event handling (onChange, onSubmit), conditional rendering
 * - Module 3: Bootstrap forms, input groups, alerts, and button styling
 */
function ResourceForm({ onAddResource }) {
  // Form input state variables
  const [resourceName, setResourceName] = useState('');
  const [category, setCategory] = useState('Food');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [donor, setDonor] = useState('');
  const [description, setDescription] = useState('');
  
  // Feedback state
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation (Module 1 logic)
    if (!resourceName.trim() || !category || !quantity || !location.trim() || !donor.trim()) {
      setError('Please fill in all required fields (Resource Name, Category, Quantity, Location, and Donor).');
      setSuccessMsg('');
      return;
    }

    if (Number(quantity) <= 0) {
      setError('Quantity must be a positive number greater than 0.');
      setSuccessMsg('');
      return;
    }

    // Build new resource object (Module 1 Object creation)
    const newResource = {
      id: `RES-${Date.now().toString().slice(-4)}`,
      resourceName: resourceName.trim(),
      category: category,
      quantity: Number(quantity),
      quantityDisplay: `${quantity} Units`,
      location: location.trim(),
      donor: donor.trim(),
      status: 'Available',
      description: description.trim() || 'Direct community inventory recorded through donor intake form.'
    };

    // Pass data up to parent state via props callback (Module 2)
    onAddResource(newResource);

    // Reset form fields
    setResourceName('');
    setCategory('Food');
    setQuantity('');
    setLocation('');
    setDonor('');
    setDescription('');
    setError('');
    setSuccessMsg(`✓ Successfully registered "${newResource.resourceName}" (${newResource.quantity} units) into active inventory!`);

    // Clear success message after 4 seconds
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-5">
      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
        <div>
          <span className="badge bg-teal-subtle text-teal border px-3 py-1 mb-2" style={{ backgroundColor: '#e6fffa', color: 'var(--ib-primary)' }}>
            Donor Intake Portal
          </span>
          <h4 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
            Record Available Resources
          </h4>
          <p className="text-muted small mb-0">
            Add available donor inventory to test matching against active community requirements in real-time.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger py-2 px-3 small d-flex align-items-center mb-3" role="alert">
          <span className="me-2">⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {/* Success Alert */}
      {successMsg && (
        <div className="alert alert-success py-2 px-3 small d-flex align-items-center mb-3" role="alert">
          <span className="me-2">🎉</span>
          <div>{successMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Resource Name */}
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-dark">
              Resource Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm py-2"
              placeholder="e.g. Dry Ration Kits, Winter Woolens, Antibiotics"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
            />
          </div>

          {/* Category Selection */}
          <div className="col-md-3">
            <label className="form-label small fw-semibold text-dark">
              Category <span className="text-danger">*</span>
            </label>
            <select
              className="form-select form-select-sm py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education Supplies">Education Supplies</option>
              <option value="Clothing">Clothing</option>
              <option value="Emergency Relief">Emergency Relief</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="col-md-3">
            <label className="form-label small fw-semibold text-dark">
              Quantity (Units) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              min="1"
              className="form-control form-control-sm py-2"
              placeholder="e.g. 250"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-dark">
              Origin / Location <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm py-2"
              placeholder="e.g. Kalyanpur, Urban Ward 4 or Navi Basti"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
              Tip: Match with locations like "Kalyanpur, Urban Ward 4", "Navi Basti Community Clinic", etc.
            </small>
          </div>

          {/* Donor / Organization */}
          <div className="col-md-6">
            <label className="form-label small fw-semibold text-dark">
              Donor / Organization <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm py-2"
              placeholder="e.g. Rotary Club Central, Hope NGO, Metro Logistics"
              value={donor}
              onChange={(e) => setDonor(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label small fw-semibold text-dark">
              Item Specifications / Description (Optional)
            </label>
            <textarea
              className="form-control form-control-sm"
              rows="2"
              placeholder="Brief details regarding packaging, expiry dates, or handling notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-12 pt-2">
            <button type="submit" className="btn btn-teal px-4 py-2 fw-semibold">
              + Register Resource to Inventory
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResourceForm;
