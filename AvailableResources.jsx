import { useState } from 'react';
import ResourceCard from './ResourceCard';
import ResourceForm from './ResourceForm';

/**
 * AvailableResources Section Component
 * Demonstrates:
 * - Module 2: Component composition, props passing, useState for tab/category filtering and form toggle
 * - Module 3: Bootstrap Grid, Badges, Accordions/Cards
 */
function AvailableResources({ resources, onAddResource, onFindMatch, selectedResourceId }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['All', 'Food', 'Healthcare', 'Education Supplies', 'Clothing', 'Emergency Relief'];

  // Filter resources based on active category
  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter((res) => res.category === selectedCategory);

  return (
    <section id="resources-section" className="py-5 bg-light border-bottom">
      <div className="container py-3">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
          <div>
            <span className="section-tag">Donor Inventory</span>
            <h2 className="fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Available Resources
            </h2>
            <p className="text-muted small mb-0">
              Browse donor contributions ready to be matched with verified community requirements.
            </p>
          </div>

          {/* Action to Toggle Intake Form */}
          <div className="mt-3 mt-md-0 d-flex align-items-center gap-2">
            <button
              type="button"
              className={`btn btn-sm ${showAddForm ? 'btn-secondary' : 'btn-teal'} px-3 py-2 fw-semibold`}
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '✕ Close Intake Form' : '+ Record New Resource'}
            </button>
          </div>
        </div>

        {/* Conditional Intake Form (Module 2 Conditional Rendering) */}
        {showAddForm && (
          <ResourceForm onAddResource={(newRes) => {
            onAddResource(newRes);
            setShowAddForm(false);
          }} />
        )}

        {/* Category Filters */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
          <div className="d-flex flex-wrap gap-2">
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

          <span className="badge bg-white text-muted border px-3 py-2">
            {filteredResources.length} Available Resources
          </span>
        </div>

        {/* Resource Cards Grid */}
        <div className="row g-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onFindMatch={onFindMatch}
              isSelected={selectedResourceId === resource.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AvailableResources;
