import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * DonorPortal Component (Route: /donor)
 * 
 * Demonstrates:
 * - Module 1: Array .filter() and .map() methods, Object restructuring, Template literals
 * - Module 2: Controlled forms, local state, multi-step tab flows, conditional rendering
 * - Module 3: Bootstrap responsive grids, badges, cards, progress bars, and alerts
 * - Module 4: Integrated React Router navigation
 */
function DonorPortal({
  resources,
  needs,
  donors,
  activeDonor,
  onSelectDonor,
  onRegisterDonor,
  onAddResource,
  consignments = [],
  donations = []
}) {
  // Local state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRegForm, setShowRegForm] = useState(false);
  const [newDonorData, setNewDonorData] = useState({
    name: '',
    type: 'Corporate CSR Foundation',
    email: '',
    phone: '',
    location: ''
  });

  // Resource Donation Form state
  const [resourceName, setResourceName] = useState('');
  const [category, setCategory] = useState('Food');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Units');
  const [location, setLocation] = useState(activeDonor?.location || 'Kalyanpur, Urban Ward 4');
  const [description, setDescription] = useState('');
  const [linkedNeedId, setLinkedNeedId] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Filter donor's own inventory
  const donorName = activeDonor?.name || (donors[0]?.name || '');
  const myResources = resources.filter(
    (r) => r.donor?.toLowerCase() === donorName.toLowerCase()
  );

  // Filter open NGO needs for "What NGOs Need" section
  const openNeeds = needs.filter((n) => {
    const isCat = selectedCategory === 'All' || n.category === selectedCategory;
    const isOpen = n.status !== 'Fulfilled';
    return isCat && isOpen;
  });

  // Filter consignments associated with this donor
  const myConsignments = consignments.filter(
    (c) => c.donorName?.toLowerCase() === donorName.toLowerCase()
  );

  // Calculate donor statistics
  const totalUnitsDonated = myResources.reduce(
    (sum, r) => sum + Number(r.totalQuantity || r.quantity || 0),
    0
  );
  const totalUnitsAllocated = myResources.reduce(
    (sum, r) => sum + Number(r.allocatedQuantity || 0),
    0
  );
  const totalUnitsAvailable = myResources.reduce(
    (sum, r) => sum + Number(r.availableQuantity ?? r.quantity ?? 0),
    0
  );

  // Handle donor onboarding/registration submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!newDonorData.name.trim() || !newDonorData.location.trim()) {
      return;
    }
    const createdDonor = {
      id: `DON-${Date.now().toString().slice(-4)}`,
      name: newDonorData.name,
      type: newDonorData.type,
      email: newDonorData.email || 'donor@impactbridge.org',
      phone: newDonorData.phone || '+91 99999 00000',
      location: newDonorData.location,
      verified: true,
      donatedCount: 0
    };
    onRegisterDonor(createdDonor);
    setShowRegForm(false);
    setLocation(createdDonor.location);
    setFormSuccess(`Registered and switched to ${createdDonor.name}!`);
    setTimeout(() => setFormSuccess(''), 4000);
  };

  // Handle Direct Donation for an NGO need
  const handleDonateForNeed = (need) => {
    setCategory(need.category);
    setResourceName(`${need.category} Package for ${need.ngoName}`);
    const remaining = Number(need.quantityRequired || 0) - Number(need.quantityFulfilled || 0);
    setQuantity(remaining > 0 ? remaining : 50);
    setUnit(need.unit || 'Units');
    setLocation(need.location);
    setLinkedNeedId(need.id);
    setDescription(`Dedicated donation to fulfill ${need.title} requested by ${need.ngoName}.`);

    // Smooth scroll to donation form
    const formEl = document.getElementById('donation-intake-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Add Resource Form Submit
  const handleResourceSubmit = (e) => {
    e.preventDefault();
    const qtyNum = Number(quantity);

    if (!resourceName.trim()) {
      setFormError('Please provide a descriptive resource name.');
      return;
    }

    if (isNaN(qtyNum) || qtyNum <= 0) {
      setFormError('Quantity must be a positive number.');
      return;
    }

    const newResource = {
      id: `RES-${Date.now().toString().slice(-4)}`,
      resourceName: resourceName.trim(),
      category,
      totalQuantity: qtyNum,
      availableQuantity: qtyNum,
      allocatedQuantity: 0,
      unit: unit.trim() || 'Units',
      location: location.trim(),
      donor: donorName,
      status: 'Available',
      description: description.trim() || `${category} supplies contributed by ${donorName}.`,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onAddResource(newResource, linkedNeedId);
    setFormSuccess(`✓ Successfully logged ${qtyNum} ${newResource.unit} of "${newResource.resourceName}" into central stock!`);
    setFormError('');

    // Reset form fields
    setResourceName('');
    setQuantity('');
    setDescription('');
    setLinkedNeedId('');

    setTimeout(() => setFormSuccess(''), 5000);
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container py-3">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-3 border-bottom">
          <div>
            <span className="section-tag">Donor Portal</span>
            <h1 className="display-6 fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Donor Supply & Contribution Hub
            </h1>
            <p className="text-muted small mb-0">
              Contribute verified inventory to the central reserve or fund active NGO community demands with transparent delivery tracking.
            </p>
          </div>

          <div className="mt-3 mt-md-0 d-flex align-items-center gap-2">
            <Link to="/receiver" className="btn btn-outline-teal btn-sm px-3 py-2 fw-semibold">
              Switch to NGO Portal &rarr;
            </Link>
            <a href="#donation-intake-form" className="btn btn-teal btn-sm px-3 py-2 fw-semibold shadow-sm">
              + Donate Resources
            </a>
          </div>
        </div>

        {/* Global Success Alert */}
        {formSuccess && (
          <div className="alert alert-success alert-dismissible fade show py-3 px-4 shadow-sm rounded-3 mb-4" role="alert">
            <div className="d-flex align-items-center">
              <span className="fs-5 me-2">🎉</span>
              <div>{formSuccess}</div>
            </div>
          </div>
        )}

        {/* 1. Donor Profile & Identity Card */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div className="p-3 rounded-circle bg-teal-subtle text-teal me-3" style={{ backgroundColor: '#e6fffa', color: 'var(--ib-primary)', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="fs-4">🎁</span>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h4 className="fw-bold mb-0 text-dark">{donorName}</h4>
                  <span className="badge bg-success-subtle text-success border px-2 py-1 small">
                    ✓ Verified Donor
                  </span>
                </div>
                <div className="text-muted small">
                  Type: <strong>{activeDonor?.type || 'Philanthropic Contributor'}</strong> &bull; Base Location: <strong>{activeDonor?.location || 'Central Depot'}</strong>
                </div>
              </div>
            </div>

            {/* Profile Switcher & Registration Button */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="dropdown">
                <select
                  className="form-select form-select-sm"
                  style={{ minWidth: '220px' }}
                  value={donorName}
                  onChange={(e) => {
                    const match = donors.find((d) => d.name === e.target.value);
                    if (match) {
                      onSelectDonor(match);
                      setLocation(match.location);
                    }
                  }}
                >
                  {donors.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.location})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setShowRegForm(!showRegForm)}
              >
                {showRegForm ? '✕ Close Registration' : '+ Register New Donor'}
              </button>
            </div>
          </div>

          {/* Quick Registration Form Modal/Drawer */}
          {showRegForm && (
            <div className="mt-4 pt-3 border-top bg-light p-3 rounded-3">
              <h6 className="fw-bold text-dark mb-3">Register as a New Donor / Provider</h6>
              <form onSubmit={handleRegisterSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Donor / Organization Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Hope Alliance Foundation"
                      value={newDonorData.name}
                      onChange={(e) => setNewDonorData({ ...newDonorData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Donor Type:</label>
                    <select
                      className="form-select form-select-sm"
                      value={newDonorData.type}
                      onChange={(e) => setNewDonorData({ ...newDonorData, type: e.target.value })}
                    >
                      <option value="Corporate CSR Foundation">Corporate CSR Foundation</option>
                      <option value="Individual Philanthropist">Individual Philanthropist</option>
                      <option value="Non-Profit Trust">Non-Profit Trust</option>
                      <option value="Healthcare Provider">Healthcare Provider</option>
                      <option value="Retail & FMCG Distributor">Retail & FMCG Distributor</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">City / Base Location:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. South City Central Hub"
                      value={newDonorData.location}
                      onChange={(e) => setNewDonorData({ ...newDonorData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-teal btn-sm w-100 fw-bold">
                      Save & Switch
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* 2. Donor Impact Metric Counters */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
              <span className="text-muted small fw-semibold">Total Goods Contributed</span>
              <h3 className="fw-bold my-1 text-teal" style={{ color: 'var(--ib-primary)' }}>
                {totalUnitsDonated.toLocaleString()} Units
              </h3>
              <small className="text-muted">Across {myResources.length} consignment entries</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
              <span className="text-muted small fw-semibold">Claimed & Allocated to NGOs</span>
              <h3 className="fw-bold my-1 text-success">
                {totalUnitsAllocated.toLocaleString()} Units
              </h3>
              <small className="text-muted">{myConsignments.length} active delivery orders</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
              <span className="text-muted small fw-semibold">Remaining in Central Stock</span>
              <h3 className="fw-bold my-1 text-dark">
                {totalUnitsAvailable.toLocaleString()} Units
              </h3>
              <small className="text-muted">Ready for instant NGO booking</small>
            </div>
          </div>
        </div>

        {/* 3. Section: What NGOs Need Right Now (Direct-to-Need Donations) */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-5">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-2 border-bottom">
            <div>
              <span className="badge bg-danger-subtle text-danger border px-3 py-1 mb-1">
                Live Community Demands
              </span>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                What NGOs Currently Need
              </h3>
              <p className="text-muted small mb-0">
                Verified ground requirements posted by partner NGOs. Click <strong>"Donate for this Need"</strong> to fund exact supplies.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="d-flex flex-wrap gap-1 mt-3 mt-md-0">
              {['All', 'Food', 'Healthcare', 'Clothing', 'Education Supplies', 'Emergency Relief'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm ${selectedCategory === cat ? 'btn-teal' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {openNeeds.length > 0 ? (
              openNeeds.map((need) => {
                const remaining = Number(need.quantityRequired || 0) - Number(need.quantityFulfilled || 0);
                const percent = Math.min(100, Math.round((Number(need.quantityFulfilled || 0) / Number(need.quantityRequired || 1)) * 100));

                return (
                  <div key={need.id} className="col-lg-6">
                    <div className="card h-100 border p-4 rounded-3 bg-light d-flex flex-column justify-content-between ib-card">
                      <div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="badge bg-secondary-subtle text-secondary border small">
                            {need.category}
                          </span>
                          <span className={`badge ${need.urgency === 'Urgent' ? 'badge-urgent' : need.urgency === 'High' ? 'badge-high' : 'badge-medium'}`}>
                            Urgency: {need.urgency}
                          </span>
                        </div>

                        <h5 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                          {need.title}
                        </h5>
                        <div className="text-muted small mb-2">
                          Requested by: <strong className="text-dark">{need.ngoName}</strong> &bull; Location: <strong>{need.location}</strong>
                        </div>

                        <p className="text-muted small mb-3">
                          {need.description}
                        </p>

                        {/* Quantity Fulfillment Progress */}
                        <div className="p-3 bg-white rounded border mb-3 small">
                          <div className="d-flex justify-content-between mb-1">
                            <span className="text-muted">Fulfillment Progress:</span>
                            <strong>{need.quantityFulfilled || 0} / {need.quantityRequired} {need.unit} ({percent}%)</strong>
                          </div>
                          <div className="progress" style={{ height: '6px' }}>
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: `${percent}%` }}
                              aria-valuenow={percent}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between mt-2 text-xs text-muted">
                            <span>Target Beneficiaries: ~{need.beneficiaryCount || 250} people</span>
                            <span className="fw-bold text-danger">Still Needed: {remaining} {need.unit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-top d-flex align-items-center justify-content-between">
                        <span className="text-muted text-xs">Requirement #{need.id}</span>
                        <button
                          type="button"
                          className="btn btn-teal btn-sm px-3 py-2 fw-semibold"
                          onClick={() => handleDonateForNeed(need)}
                        >
                          Donate for this Need 🎁
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-4 text-muted">
                No open community needs found in "{selectedCategory}".
              </div>
            )}
          </div>
        </div>

        {/* 4. Section: Surplus Resource Intake Form */}
        <div id="donation-intake-form" className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-5">
          <div className="mb-4 pb-2 border-bottom">
            <span className="section-tag mb-1">Stock Contribution</span>
            <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Add Resources to Central Pool
            </h3>
            <p className="text-muted small mb-0">
              Log surplus inventory, packages, or bulk items into the ImpactBridge depot so verified NGOs can book and receive them.
            </p>
          </div>

          {linkedNeedId && (
            <div className="alert alert-info py-2 px-3 small mb-3 d-flex align-items-center justify-content-between">
              <span>
                🎯 <strong>Direct Donation Mode:</strong> Pre-filling details to satisfy requirement <strong>{linkedNeedId}</strong>.
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary py-0 px-2"
                onClick={() => setLinkedNeedId('')}
              >
                Clear Link
              </button>
            </div>
          )}

          {formError && (
            <div className="alert alert-danger py-2 px-3 small mb-3">
              ⚠️ {formError}
            </div>
          )}

          <form onSubmit={handleResourceSubmit}>
            <div className="row g-3">
              {/* Item Name */}
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-dark">
                  Resource / Item Title: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dry Staple Food Kits, Winter Thermal Blankets"
                  value={resourceName}
                  onChange={(e) => setResourceName(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="col-md-3">
                <label className="form-label small fw-semibold text-dark">
                  Category: <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Food">Food & Nutrition</option>
                  <option value="Healthcare">Healthcare & Medicines</option>
                  <option value="Clothing">Clothing & Woolens</option>
                  <option value="Education Supplies">Education Supplies</option>
                  <option value="Emergency Relief">Emergency Relief</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="col-md-3">
                <label className="form-label small fw-semibold text-dark">
                  Quantity Donating: <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="e.g. 100, 250, 500"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control text-muted"
                    style={{ maxWidth: '90px' }}
                    placeholder="Unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    title="e.g. Units, Kits, Boxes, Packs"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-dark">
                  Origin Depot / Pickup Location: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Kalyanpur Central Depot, Bay 4"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              {/* Donor Name (Readonly) */}
              <div className="col-md-6">
                <label className="form-label small fw-semibold text-dark">
                  Contributing Donor:
                </label>
                <input
                  type="text"
                  className="form-control bg-light"
                  value={donorName}
                  readOnly
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label small fw-semibold text-dark">
                  Item Specifications, Expiry, or Packaging Details:
                </label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Describe contents, batch numbers, storage instructions, or expiry timeline..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="col-12 pt-2 text-end">
                <button type="submit" className="btn btn-teal px-4 py-2 fw-bold shadow-sm">
                  Confirm & Deposit Into Central Stock ✓
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 5. Section: My Contributed Stock & Allocation Ledger */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
            <div>
              <span className="badge bg-secondary-subtle text-secondary border px-3 py-1 mb-1">
                Donor Inventory Ledger
              </span>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                My Contributed Stock & NGO Claims
              </h3>
              <p className="text-muted small mb-0">
                Track how much of your contributed stock has been booked by partner NGOs and follow active deliveries.
              </p>
            </div>
            <span className="badge bg-light text-muted border px-3 py-2">
              {myResources.length} Items Listed
            </span>
          </div>

          {myResources.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-light small text-muted">
                  <tr>
                    <th>Item ID & Name</th>
                    <th>Category</th>
                    <th>Total Donated</th>
                    <th>Available in Depot</th>
                    <th>Claimed by NGOs</th>
                    <th>Origin Hub</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {myResources.map((item) => {
                    const total = Number(item.totalQuantity || item.quantity || 0);
                    const avail = Number(item.availableQuantity ?? item.quantity ?? 0);
                    const alloc = Number(item.allocatedQuantity || 0);
                    const allocPercent = total > 0 ? Math.round((alloc / total) * 100) : 0;

                    return (
                      <tr key={item.id}>
                        <td>
                          <strong className="text-dark d-block">{item.resourceName}</strong>
                          <span className="text-muted text-xs">ID: {item.id}</span>
                        </td>
                        <td>
                          <span className="badge bg-secondary-subtle text-secondary border">
                            {item.category}
                          </span>
                        </td>
                        <td>
                          <strong>{total} {item.unit || 'Units'}</strong>
                        </td>
                        <td>
                          <strong className="text-teal" style={{ color: 'var(--ib-primary)' }}>
                            {avail} {item.unit || 'Units'}
                          </strong>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <strong className="text-success">{alloc} {item.unit || 'Units'}</strong>
                            <span className="badge bg-light text-muted border text-xs">
                              {allocPercent}%
                            </span>
                          </div>
                        </td>
                        <td>{item.location}</td>
                        <td>
                          <span className={`badge ${avail > 0 ? 'badge-open' : 'badge-fulfilled'}`}>
                            {avail > 0 ? 'Available in Depot' : 'Fully Allocated'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5 bg-light rounded-3 p-4 border">
              <div className="fs-1 mb-2">📦</div>
              <h5 className="fw-bold text-muted mb-2">No donations recorded for {donorName} yet</h5>
              <p className="text-muted small mb-3" style={{ maxWidth: '450px', margin: '0 auto' }}>
                Use the intake form above to add your first batch of supplies to the central humanitarian pool.
              </p>
              <a href="#donation-intake-form" className="btn btn-outline-teal btn-sm">
                + Add Resource to Pool
              </a>
            </div>
          )}

          {/* Consignments Table for this donor */}
          {myConsignments.length > 0 && (
            <div className="mt-5 pt-3 border-top">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold mb-0 text-dark">
                  Active Consignment Orders Booked from Your Stock ({myConsignments.length})
                </h5>
                <Link to="/tracking" className="btn btn-outline-teal btn-sm">
                  View Full Tracking Hub &rarr;
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table table-sm table-hover align-middle border">
                  <thead className="table-light small text-muted">
                    <tr>
                      <th>Order ID</th>
                      <th>Item Description</th>
                      <th>Quantity</th>
                      <th>Beneficiary NGO</th>
                      <th>Delivery Stage</th>
                      <th>ETA</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="small">
                    {myConsignments.map((c) => (
                      <tr key={c.id}>
                        <td><strong>{c.id}</strong></td>
                        <td>{c.resourceName}</td>
                        <td><strong className="text-teal">{c.quantity} {c.unit}</strong></td>
                        <td><strong>{c.ngoName}</strong></td>
                        <td>
                          <span className="badge bg-success-subtle text-success border">
                            Phase {c.stage}/4: {c.stageLabel}
                          </span>
                        </td>
                        <td>{c.eta}</td>
                        <td>
                          <Link to="/tracking" className="btn btn-outline-secondary btn-sm py-0 px-2 text-xs">
                            Track Delivery &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DonorPortal;
