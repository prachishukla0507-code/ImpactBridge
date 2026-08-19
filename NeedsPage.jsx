import { useState } from 'react';
import NeedCard from '../components/NeedCard';

const CATEGORIES = ['All', 'Food', 'Healthcare', 'Education Supplies', 'Clothing', 'Emergency Relief'];
const URGENCIES = ['All', 'Urgent', 'High', 'Medium'];
const CONTRIBUTION_TYPES = ['All', 'Funding Needed', 'Supplies Needed'];
const SORT_OPTIONS = ['Most Urgent First', 'Most Underfunded', 'Most Recent'];

const urgencyOrder = { 'Urgent': 1, 'High': 2, 'Medium': 3 };

function NeedsPage({ needs = [] }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [contributionFilter, setContributionFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Most Urgent First');

  let filtered = [...needs];

  // Search
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.ngoName || '').toLowerCase().includes(q) ||
      (n.location || '').toLowerCase().includes(q)
    );
  }

  // Category
  if (categoryFilter !== 'All') {
    filtered = filtered.filter(n => n.category === categoryFilter);
  }

  // Urgency
  if (urgencyFilter !== 'All') {
    filtered = filtered.filter(n => n.urgency === urgencyFilter);
  }

  // Contribution Type
  if (contributionFilter === 'Funding Needed') {
    filtered = filtered.filter(n => (n.fundingRaised || 0) < (n.fundingTarget || 0));
  } else if (contributionFilter === 'Supplies Needed') {
    filtered = filtered.filter(n => (n.quantityRemaining || 0) > 0);
  }

  // Sort
  if (sortBy === 'Most Urgent First') {
    filtered.sort((a, b) => (urgencyOrder[a.urgency] || 99) - (urgencyOrder[b.urgency] || 99));
  } else if (sortBy === 'Most Underfunded') {
    filtered.sort((a, b) => {
      const ratioA = (a.fundingTarget || 1) > 0 ? (a.fundingRaised || 0) / a.fundingTarget : 1;
      const ratioB = (b.fundingTarget || 1) > 0 ? (b.fundingRaised || 0) / b.fundingTarget : 1;
      return ratioA - ratioB;
    });
  }
  // 'Most Recent' keeps original order

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Browse NGO Needs</h1>
        <p className="text-muted lead mb-0">Discover and support verified community requirements.</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg rounded-pill px-4"
          placeholder="🔍 Search needs by title, NGO, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters Row */}
      <div className="row g-3 mb-4 align-items-end">
        <div className="col-sm-6 col-md-3">
          <label className="form-label small fw-bold text-muted">Category</label>
          <select className="form-select rounded-pill" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-sm-6 col-md-3">
          <label className="form-label small fw-bold text-muted">Urgency</label>
          <select className="form-select rounded-pill" value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)}>
            {URGENCIES.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="col-sm-6 col-md-3">
          <label className="form-label small fw-bold text-muted">Contribution Type</label>
          <select className="form-select rounded-pill" value={contributionFilter} onChange={(e) => setContributionFilter(e.target.value)}>
            {CONTRIBUTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="col-sm-6 col-md-3">
          <label className="form-label small fw-bold text-muted">Sort By</label>
          <select className="form-select rounded-pill" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-muted small mb-4">
        Showing <strong>{filtered.length}</strong> of {needs.length} needs
      </p>

      {/* Grid */}
      <div className="row g-4">
        {filtered.length > 0 ? (
          filtered.map(need => (
            <NeedCard key={need.id} {...need} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">No needs match your filters.</h4>
            <p className="text-muted">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NeedsPage;
