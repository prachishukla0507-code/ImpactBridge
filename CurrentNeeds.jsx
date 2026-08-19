import { useState } from 'react';
import { communityNeeds } from '../data/mockData';
import NeedCard from './NeedCard';

/**
 * CurrentNeeds Section Component
 * Demonstrates Module 2 (useState for dynamic filtering, Props) & Module 3 (Bootstrap Grid, Badges, Buttons)
 */
function CurrentNeeds({ needs = communityNeeds }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food', 'Healthcare', 'Clothing', 'Education Supplies', 'Emergency Relief'];

  // Filter list based on selected state
  const filteredNeeds = selectedCategory === 'All'
    ? needs
    : needs.filter((need) => need.category === selectedCategory);

  return (
    <section id="needs" className="py-5 bg-white border-bottom">
      <div className="container py-3">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
          <div>
            <span className="section-tag">Urgent Requirements</span>
            <h2 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Current Community Demands
            </h2>
            <p className="text-muted small mb-0">
              Direct requests verified from partner grassroots NGOs requiring immediate resource allocation.
            </p>
          </div>

          {/* Result Counter Badge */}
          <div className="mt-2 mt-md-0">
            <span className="badge bg-light text-muted border px-3 py-2">
              Showing {filteredNeeds.length} of {needs.length} Demands
            </span>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm px-3 py-1 rounded-pill ${
                selectedCategory === cat
                  ? 'btn-teal shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Needs Grid */}
        <div className="row g-4">
          {filteredNeeds.map((need) => (
            <NeedCard
              key={need.id}
              id={need.id}
              title={need.title}
              category={need.category}
              ngoName={need.ngoName}
              location={need.location}
              quantityRequired={need.quantityRequired}
              quantityFulfilled={need.quantityFulfilled}
              unit={need.unit}
              urgency={need.urgency}
              status={need.status}
              description={need.description}
              beneficiaryCount={need.beneficiaryCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CurrentNeeds;
