import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import ConsignmentVoucherModal from '../components/ConsignmentVoucherModal';

/**
 * ReceiverPortal Component (Route: /receiver)
 * The primary NGO command center and stock booking bridge.
 * 
 * Demonstrates:
 * - Module 1: Array .filter() and .map() methods, Object restructuring, Template literals
 * - Module 2: Controlled forms, local state, multi-step tab flows, conditional rendering
 * - Module 3: Bootstrap responsive grids, cards, badges, range sliders, progress bars
 * - Module 4: Integrated React Router navigation
 */
function ReceiverPortal({
  resources,
  needs,
  ngos,
  activeNGO,
  onSelectNGO,
  onRegisterNGO,
  onAddNeed,
  onBookResource,
  consignments = []
}) {
  // Filters & State
  const [stockCategory, setStockCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse-stock'); // 'browse-stock', 'post-demand', 'my-allocations'
  
  // Registration Drawer
  const [showRegForm, setShowRegForm] = useState(false);
  const [newNGOData, setNewNGOData] = useState({
    name: '',
    regNumber: '',
    focusArea: 'Food Security & Disaster Response',
    contactPerson: '',
    phone: '',
    location: ''
  });

  // Post Need Form State
  const [needTitle, setNeedTitle] = useState('');
  const [needCategory, setNeedCategory] = useState('Food');
  const [quantityRequired, setQuantityRequired] = useState('');
  const [unit, setUnit] = useState('Units');
  const [urgency, setUrgency] = useState('Urgent');
  const [beneficiaryCount, setBeneficiaryCount] = useState('');
  const [needLocation, setNeedLocation] = useState(activeNGO?.location || 'Kalyanpur, Urban Ward 4');
  const [description, setDescription] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Booking Modal State
  const [selectedStockResource, setSelectedStockResource] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Voucher Modal State
  const [selectedConsignmentForVoucher, setSelectedConsignmentForVoucher] = useState(null);

  const ngoName = activeNGO?.name || (ngos[0]?.name || '');

  // Filter available stock
  const filteredStock = resources.filter((res) => {
    const isCat = stockCategory === 'All' || res.category === stockCategory;
    const isSearch =
      (res.resourceName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.donor || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    return isCat && isSearch;
  });

  // Filter demands raised by this NGO
  const myDemands = needs.filter(
    (n) => (n.ngoName || '').toLowerCase() === ngoName.toLowerCase()
  );

  // Filter consignments booked by this NGO
  const myConsignments = consignments.filter(
    (c) => (c.ngoName || '').toLowerCase() === ngoName.toLowerCase()
  );

  // Handle NGO Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!newNGOData.name.trim() || !newNGOData.location.trim()) {
      return;
    }
    const createdNGO = {
      id: `NGO-${Date.now().toString().slice(-4)}`,
      name: newNGOData.name.trim(),
      regNumber: newNGOData.regNumber || `NGO-REG-${Date.now().toString().slice(-4)}`,
      focusArea: newNGOData.focusArea,
      contactPerson: newNGOData.contactPerson || 'Authorized Representative',
      phone: newNGOData.phone || '+91 98000 11223',
      location: newNGOData.location.trim(),
      verified: true
    };
    onRegisterNGO(createdNGO);
    setShowRegForm(false);
    setNeedLocation(createdNGO.location);
    setFormSuccess(`Registered and switched to ${createdNGO.name}!`);
    setTimeout(() => setFormSuccess(''), 4000);
  };

  // Handle Post Community Need Submit
  const handleNeedSubmit = (e) => {
    e.preventDefault();
    const qtyNum = Number(quantityRequired);

    if (!needTitle.trim()) {
      setFormError('Please enter a descriptive requirement title.');
      return;
    }

    if (isNaN(qtyNum) || qtyNum <= 0) {
      setFormError('Required quantity must be a positive number.');
      return;
    }

    const newNeed = {
      id: `NEED-${Date.now().toString().slice(-4)}`,
      title: needTitle.trim(),
      category: needCategory,
      ngoName: ngoName,
      location: needLocation.trim(),
      quantityRequired: qtyNum,
      quantityFulfilled: 0,
      unit: unit.trim() || 'Units',
      urgency,
      status: 'Open',
      beneficiaryCount: Number(beneficiaryCount) || Math.round(qtyNum * 4),
      description: description.trim() || `Community requirement posted by ${ngoName}.`
    };

    onAddNeed(newNeed);
    setFormSuccess(`✓ Posted requirement "${newNeed.title}" for ${qtyNum} ${newNeed.unit}!`);
    setFormError('');

    // Reset fields
    setNeedTitle('');
    setQuantityRequired('');
    setBeneficiaryCount('');
    setDescription('');

    setActiveTab('my-allocations');
    setTimeout(() => setFormSuccess(''), 5000);
  };

  const handleOpenBooking = (resource) => {
    setSelectedStockResource(resource);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container py-3">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-3 border-bottom">
          <div>
            <span className="section-tag-emerald">NGO & Community Hub</span>
            <h1 className="display-6 fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              NGO Resource Allocation Portal
            </h1>
            <p className="text-muted small mb-0">
              Browse central verified donor stock to book exact quantities needed, or post new community demands for rapid matching.
            </p>
          </div>

          <div className="mt-3 mt-md-0 d-flex align-items-center gap-2">
            <Link to="/donor" className="btn btn-outline-teal btn-sm px-3 py-2 fw-semibold">
              Switch to Donor Portal &rarr;
            </Link>
            <Link to="/matches" className="btn btn-emerald btn-sm px-3 py-2 fw-semibold shadow-sm">
              ⚡ Smart Match Engine
            </Link>
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

        {/* 1. NGO Identity & Profile Switcher */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div className="p-3 rounded-circle me-3" style={{ backgroundColor: '#ecfdf5', color: 'var(--ib-secondary)', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="fs-4">🤝</span>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h4 className="fw-bold mb-0 text-dark">{ngoName}</h4>
                  <span className="badge bg-success-subtle text-success border px-2 py-1 small">
                    ✓ Verified NGO Partner
                  </span>
                </div>
                <div className="text-muted small">
                  Focus: <strong>{activeNGO?.focusArea || 'Community Welfare'}</strong> &bull; Location: <strong>{activeNGO?.location || 'Regional Cluster'}</strong> &bull; Reg: <code>{activeNGO?.regNumber || 'NGO-VERIFIED'}</code>
                </div>
              </div>
            </div>

            {/* Profile Switcher & Registration Button */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="dropdown">
                <select
                  className="form-select form-select-sm"
                  style={{ minWidth: '220px' }}
                  value={ngoName}
                  onChange={(e) => {
                    const match = ngos.find((n) => n.name === e.target.value);
                    if (match) {
                      onSelectNGO(match);
                      setNeedLocation(match.location);
                    }
                  }}
                >
                  {ngos.map((ngo) => (
                    <option key={ngo.id} value={ngo.name}>
                      {ngo.name} ({ngo.location})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setShowRegForm(!showRegForm)}
              >
                {showRegForm ? '✕ Close Registration' : '+ Register New NGO'}
              </button>
            </div>
          </div>

          {/* Quick Registration Form Modal/Drawer */}
          {showRegForm && (
            <div className="mt-4 pt-3 border-top bg-light p-3 rounded-3">
              <h6 className="fw-bold text-dark mb-3">Register as a Verified NGO / Community Group</h6>
              <form onSubmit={handleRegisterSubmit}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">NGO Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Samarth Relief Trust"
                      value={newNGOData.name}
                      onChange={(e) => setNewNGOData({ ...newNGOData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Focus Area:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Flood Relief, Child Nutrition"
                      value={newNGOData.focusArea}
                      onChange={(e) => setNewNGOData({ ...newNGOData, focusArea: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Location / Operational City:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g. Ward 4 Community Clinic"
                      value={newNGOData.location}
                      onChange={(e) => setNewNGOData({ ...newNGOData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="submit" className="btn btn-emerald btn-sm w-100 fw-bold">
                      Save & Switch NGO
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* 2. Main Navigation Tabs */}
        <div className="card border-0 shadow-sm rounded-4 p-2 bg-white mb-4">
          <ul className="nav nav-pills nav-fill gap-2 p-1">
            <li className="nav-item">
              <button
                className={`nav-link py-2 fw-semibold ${activeTab === 'browse-stock' ? 'active bg-teal' : 'text-dark'}`}
                style={activeTab === 'browse-stock' ? { backgroundColor: 'var(--ib-primary)' } : {}}
                onClick={() => setActiveTab('browse-stock')}
              >
                📦 1. Browse Donor Stock & Book What You Need
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link py-2 fw-semibold ${activeTab === 'post-demand' ? 'active bg-teal' : 'text-dark'}`}
                style={activeTab === 'post-demand' ? { backgroundColor: 'var(--ib-primary)' } : {}}
                onClick={() => setActiveTab('post-demand')}
              >
                📢 2. Post a Custom Community Requirement
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link py-2 fw-semibold ${activeTab === 'my-allocations' ? 'active bg-teal' : 'text-dark'}`}
                style={activeTab === 'my-allocations' ? { backgroundColor: 'var(--ib-primary)' } : {}}
                onClick={() => setActiveTab('my-allocations')}
              >
                📋 3. My Demands ({myDemands.length}) & Booked Deliveries ({myConsignments.length})
              </button>
            </li>
          </ul>
        </div>

        {/* TAB 1: BROWSE DONOR STOCK & BOOK */}
        {activeTab === 'browse-stock' && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-5">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-2 border-bottom">
              <div>
                <span className="badge bg-teal-subtle text-teal border px-3 py-1 mb-1" style={{ backgroundColor: '#e6fffa', color: 'var(--ib-primary)' }}>
                  Central Verified Reserve
                </span>
                <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                  Available Donor Inventory
                </h3>
                <p className="text-muted small mb-0">
                  Multiple items donated by philanthropists and CSR wings. Click <strong>"Book / Request from Stock"</strong> to claim any quantity your community needs.
                </p>
              </div>

              {/* Search Box */}
              <div className="mt-3 mt-md-0" style={{ minWidth: '260px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="🔍 Search items, donors, or cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="d-flex flex-wrap gap-1 mb-4">
              {['All', 'Food', 'Healthcare', 'Clothing', 'Education Supplies', 'Emergency Relief'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm ${stockCategory === cat ? 'btn-teal' : 'btn-outline-secondary'}`}
                  onClick={() => setStockCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid of Stock Items */}
            <div className="row g-4">
              {filteredStock.length > 0 ? (
                filteredStock.map((res) => {
                  const total = Number(res.totalQuantity || res.quantity || 0);
                  const avail = Number(res.availableQuantity ?? res.quantity ?? 0);
                  const alloc = Number(res.allocatedQuantity || 0);
                  const availPercent = total > 0 ? Math.round((avail / total) * 100) : 0;
                  const isDepleted = avail <= 0;

                  return (
                    <div key={res.id} className="col-lg-6 col-xl-4">
                      <div className={`card h-100 border p-4 rounded-3 d-flex flex-column justify-content-between ib-card ${isDepleted ? 'bg-light opacity-75' : 'bg-white'}`}>
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="badge bg-secondary-subtle text-secondary border small">
                              {res.category}
                            </span>
                            <span className={`badge ${avail > 0 ? 'badge-open' : 'badge-fulfilled'}`}>
                              {avail > 0 ? 'In Stock' : 'Depleted'}
                            </span>
                          </div>

                          <h5 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                            {res.resourceName}
                          </h5>
                          <div className="text-muted small mb-2">
                            Donor: <strong className="text-dark">{res.donor}</strong> &bull; Origin: <strong>{res.location}</strong>
                          </div>

                          <p className="text-muted small mb-3" style={{ minHeight: '40px' }}>
                            {res.description}
                          </p>

                          {/* Live Stock Meter */}
                          <div className="p-3 bg-light rounded border mb-3 small">
                            <div className="d-flex justify-content-between mb-1">
                              <span className="text-muted">Available in Stock:</span>
                              <strong className={avail > 0 ? 'text-teal' : 'text-danger'} style={{ color: avail > 0 ? 'var(--ib-primary)' : '#dc2626' }}>
                                {avail} / {total} {res.unit || 'Units'}
                              </strong>
                            </div>
                            <div className="progress" style={{ height: '6px' }}>
                              <div
                                className={`progress-bar ${avail > 0 ? 'bg-teal' : 'bg-secondary'}`}
                                role="progressbar"
                                style={{ width: `${availPercent}%`, backgroundColor: avail > 0 ? 'var(--ib-primary)' : '#94a3b8' }}
                                aria-valuenow={availPercent}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="d-flex justify-content-between mt-2 text-xs text-muted">
                              <span>Allocated: {alloc} {res.unit || 'Units'}</span>
                              <span>Batch #{res.id}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-top d-flex align-items-center justify-content-between">
                          <span className="text-muted text-xs">Ready for Dispatch</span>
                          <button
                            type="button"
                            className="btn btn-emerald btn-sm px-3 py-2 fw-bold shadow-sm"
                            disabled={isDepleted}
                            onClick={() => handleOpenBooking(res)}
                          >
                            {isDepleted ? 'Fully Booked' : 'Book from Stock ➔'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center py-5 text-muted">
                  No stock items match your search in "{stockCategory}".
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: POST A CUSTOM COMMUNITY REQUIREMENT */}
        {activeTab === 'post-demand' && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-5">
            <div className="mb-4 pb-2 border-bottom">
              <span className="section-tag-emerald mb-1">Grassroots Demand Intake</span>
              <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                Raise a Community Requirement
              </h3>
              <p className="text-muted small mb-0">
                Can't find what your community needs in donor stock? Post a formal demand so verified donors and the matching engine can mobilize aid directly.
              </p>
            </div>

            {formError && (
              <div className="alert alert-danger py-2 px-3 small mb-3">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleNeedSubmit}>
              <div className="row g-3">
                {/* Title */}
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">
                    Requirement Title / Needed Supplies: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Dry Ration Kits for Flood Affected Families"
                    value={needTitle}
                    onChange={(e) => setNeedTitle(e.target.value)}
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
                    value={needCategory}
                    onChange={(e) => setNeedCategory(e.target.value)}
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
                    Quantity Required: <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      placeholder="e.g. 70, 250"
                      value={quantityRequired}
                      onChange={(e) => setQuantityRequired(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-control text-muted"
                      style={{ maxWidth: '90px' }}
                      placeholder="Unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      title="e.g. Kits, Blankets, Boxes"
                    />
                  </div>
                </div>

                {/* Urgency */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-dark">
                    Urgency Level: <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    required
                  >
                    <option value="Urgent">🔴 Urgent (Immediate relief)</option>
                    <option value="High">🟠 High Priority (Within 48h)</option>
                    <option value="Medium">🔵 Medium Priority (Weekly)</option>
                  </select>
                </div>

                {/* Target Beneficiaries */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-dark">
                    Estimated Beneficiaries:
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="e.g. 500 people"
                    value={beneficiaryCount}
                    onChange={(e) => setBeneficiaryCount(e.target.value)}
                  />
                </div>

                {/* Location */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-dark">
                    Destination Location / Ward: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={needLocation}
                    onChange={(e) => setNeedLocation(e.target.value)}
                    required
                  />
                </div>

                {/* Requesting NGO (Readonly) */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-dark">
                    Requesting Organization:
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    value={ngoName}
                    readOnly
                  />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label small fw-semibold text-dark">
                    Community Context & Specific Needs:
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Describe specific items, distribution logistics, and the community situation..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="col-12 pt-2 text-end">
                  <button type="submit" className="btn btn-emerald px-4 py-2 fw-bold shadow-sm">
                    Publish Community Requirement ✓
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: MY DEMANDS & BOOKED DELIVERIES */}
        {activeTab === 'my-allocations' && (
          <div className="d-flex flex-column gap-5 mb-5">
            {/* Section A: Demands posted by this NGO */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                <div>
                  <span className="badge bg-secondary-subtle text-secondary border px-3 py-1 mb-1">
                    Requirement Tracking
                  </span>
                  <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                    Demands Raised by {ngoName}
                  </h3>
                  <p className="text-muted small mb-0">
                    Live status and fulfillment percentage of your community requirements.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-teal btn-sm"
                  onClick={() => setActiveTab('post-demand')}
                >
                  + Post New Demand
                </button>
              </div>

              {myDemands.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle border">
                    <thead className="table-light small text-muted">
                      <tr>
                        <th>Need ID & Title</th>
                        <th>Category</th>
                        <th>Required</th>
                        <th>Fulfilled</th>
                        <th>Urgency</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {myDemands.map((need) => {
                        const remaining = Number(need.quantityRequired || 0) - Number(need.quantityFulfilled || 0);
                        const percent = Math.min(100, Math.round((Number(need.quantityFulfilled || 0) / Number(need.quantityRequired || 1)) * 100));

                        return (
                          <tr key={need.id}>
                            <td>
                              <strong className="text-dark d-block">{need.title}</strong>
                              <span className="text-muted text-xs">ID: {need.id} &bull; {need.location}</span>
                            </td>
                            <td>
                              <span className="badge bg-secondary-subtle text-secondary border">
                                {need.category}
                              </span>
                            </td>
                            <td><strong>{need.quantityRequired} {need.unit}</strong></td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <strong className="text-success">{need.quantityFulfilled || 0} {need.unit}</strong>
                                <span className="text-xs text-muted">({percent}%)</span>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${need.urgency === 'Urgent' ? 'badge-urgent' : need.urgency === 'High' ? 'badge-high' : 'badge-medium'}`}>
                                {need.urgency}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${need.status === 'Fulfilled' ? 'badge-fulfilled' : need.status === 'Partially Fulfilled' ? 'badge-partial' : 'badge-open'}`}>
                                {need.status}
                              </span>
                            </td>
                            <td>
                              <Link to="/matches" className="btn btn-outline-teal btn-sm py-1 px-2 text-xs">
                                Smart Match ⚡
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-muted">
                  No demands raised yet by {ngoName}. Click "+ Post New Demand" to create one.
                </div>
              )}
            </div>

            {/* Section B: Booked Deliveries / Consignments for this NGO */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                <div>
                  <span className="badge bg-success-subtle text-success border px-3 py-1 mb-1">
                    Inbound Logistics
                  </span>
                  <h3 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
                    Booked Consignments & Inbound Supplies ({myConsignments.length})
                  </h3>
                  <p className="text-muted small mb-0">
                    Live delivery chain-of-custody for goods booked from donor stock or matched directly.
                  </p>
                </div>
                <Link to="/tracking" className="btn btn-teal btn-sm px-3 py-2 fw-semibold">
                  View Full Tracking Hub ➔
                </Link>
              </div>

              {myConsignments.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {myConsignments.map((c) => (
                    <div key={c.id} className="p-3 border rounded-3 bg-light d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                      <div className="mb-2 mb-md-0">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h6 className="fw-bold mb-0 text-dark">{c.resourceName}</h6>
                          <span className="badge bg-secondary-subtle text-secondary border small">{c.category}</span>
                          <span className="badge bg-success-subtle text-success border small">Phase {c.stage}/4: {c.stageLabel}</span>
                        </div>
                        <div className="text-muted small">
                          Order: <strong>{c.id}</strong> &bull; Quantity: <strong className="text-teal">{c.quantity} {c.unit}</strong> &bull; Donor: <strong>{c.donorName}</strong> &bull; ETA: <strong>{c.eta}</strong>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm py-1 px-2 text-xs"
                          onClick={() => setSelectedConsignmentForVoucher(c)}
                        >
                          📄 Delivery Voucher
                        </button>
                        <Link
                          to="/tracking"
                          className="btn btn-teal btn-sm py-1 px-3 text-xs fw-semibold"
                        >
                          Live GPS Track ➔
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted">
                  No active booked deliveries for {ngoName}. Browse available stock to book supplies.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        resource={selectedStockResource}
        ngos={ngos}
        activeNGO={activeNGO}
        needs={needs}
        onConfirmBooking={(bookingData) => {
          onBookResource(bookingData);
          setFormSuccess(`✓ Successfully booked ${bookingData.quantityRequested} ${bookingData.unit} of "${bookingData.resourceName}"!`);
          setActiveTab('my-allocations');
          setTimeout(() => setFormSuccess(''), 5000);
        }}
      />

      {/* Consignment Voucher Modal */}
      <ConsignmentVoucherModal
        isOpen={!!selectedConsignmentForVoucher}
        onClose={() => setSelectedConsignmentForVoucher(null)}
        consignment={selectedConsignmentForVoucher}
      />
    </div>
  );
}

export default ReceiverPortal;
