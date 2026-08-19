import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import ResourceForm from '../components/ResourceForm';

/**
 * ResourcesPage Component (Route: /resources)
 * 
 * Demonstrates:
 * - Module 1: ES6 Array methods, Destructuring, Promises, async/await
 * - Module 2: useState, Props, Reusable Components
 * - Module 3: Bootstrap Grid, Badges, Spinners, Alerts, and Cards
 * - Module 4: useEffect hook, Fetch API, Local JSON loading (/data/resources.json), Loading/Error state handling
 */
function ResourcesPage({ resources, onAddResource, onFindMatch, selectedResourceId, isLoading, fetchError }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const categories = ['All', 'Food', 'Healthcare', 'Education Supplies', 'Clothing', 'Emergency Relief'];

  // Filter list based on selected category
  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter((res) => res.category === selectedCategory);

  const handleCardFindMatch = (resource) => {
    onFindMatch(resource);
    // Navigate smoothly to the Matches page
    navigate('/matches');
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container py-3">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 pb-3 border-bottom">
          <div>
            <span className="section-tag">Module 4: Fetch + JSON Data</span>
            <h1 className="display-6 fw-bold mb-1" style={{ color: 'var(--ib-text-main)' }}>
              Donor Resources Directory
            </h1>
            <p className="text-muted small mb-0">
              Browse available community aid inventory loaded asynchronously via <code>fetch()</code> from local JSON data.
            </p>
          </div>

          <div className="mt-3 mt-md-0 d-flex gap-2">
            <button
              type="button"
              className={`btn ${showAddForm ? 'btn-secondary' : 'btn-teal'} px-4 py-2 fw-semibold shadow-sm`}
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '✕ Close Intake Form' : '+ Register New Resource'}
            </button>
          </div>
        </div>

        {/* 1. Loading State (Module 4) */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-teal mb-3" role="status" style={{ color: 'var(--ib-primary)' }}>
              <span className="visually-hidden">Loading resources...</span>
            </div>
            <p className="text-muted small">Loading initial inventory from <code>/data/resources.json</code> via <code>fetch()</code>...</p>
          </div>
        )}

        {/* 2. Error State (Module 4) */}
        {fetchError && (
          <div className="alert alert-danger p-4 rounded-3 mb-4 shadow-sm" role="alert">
            <h5 className="alert-heading fw-bold">⚠️ Fetch Error Encountered</h5>
            <p className="small mb-0">{fetchError}</p>
          </div>
        )}

        {/* 3. Successful Data Display */}
        {!isLoading && !fetchError && (
          <>
            {/* Conditional Intake Form */}
            {showAddForm && (
              <ResourceForm
                onAddResource={(newRes) => {
                  onAddResource(newRes);
                  setShowAddForm(false);
                }}
              />
            )}

            {/* Category Filter Controls */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
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

              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-white text-muted border px-3 py-2">
                  {filteredResources.length} of {resources.length} Items Listed
                </span>
                <span className="badge bg-teal-subtle text-teal border px-3 py-2 small" style={{ backgroundColor: '#e6fffa', color: 'var(--ib-primary)' }}>
                  JSON Source: <code>public/data/resources.json</code>
                </span>
              </div>
            </div>

            {/* Resource Cards Grid */}
            <div className="row g-4">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onFindMatch={handleCardFindMatch}
                  isSelected={selectedResourceId === resource.id}
                />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-5 card border-0 bg-white p-5 rounded-4 shadow-sm">
                <h5 className="fw-bold text-muted mb-2">No resources found in this category</h5>
                <p className="text-muted small mb-3">Try selecting "All" or record a new item using the intake form above.</p>
                <button
                  type="button"
                  className="btn btn-outline-teal btn-sm mx-auto"
                  onClick={() => setSelectedCategory('All')}
                >
                  View All Resources
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResourcesPage;
