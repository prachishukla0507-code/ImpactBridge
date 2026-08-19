import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import NeedCard from '../components/NeedCard';

function HomePage({
  resources = [],
  needs = [],
  donations = [],
  consignments = []
}) {
  const activeNeeds = needs.filter(n => n.status !== 'Fulfilled');
  const topNeeds = activeNeeds.slice(0, 3);

  const totalSuppliesAvailable = resources.reduce((sum, r) => sum + (r.availableQuantity || 0), 0);
  const totalFundingCommitted = needs.reduce((sum, n) => sum + (n.fundingRaised || 0), 0);
  const totalBeneficiaries = needs.reduce((sum, n) => sum + (n.beneficiaryCount || 0), 0);

  const impactCounters = [
    { label: 'Active Needs', value: activeNeeds.length, icon: '📋' },
    { label: 'Supplies Available', value: totalSuppliesAvailable.toLocaleString(), icon: '📦' },
    { label: 'Funding Committed', value: `₹${totalFundingCommitted.toLocaleString()}`, icon: '💳' },
    { label: 'Families Supported', value: totalBeneficiaries.toLocaleString(), icon: '👥' }
  ];

  const howItWorks = [
    { step: '01', title: 'Donors Pool Inventory', desc: 'Donors register surplus resources or fund specific open requirements into the verified central bridge inventory.' },
    { step: '02', title: 'NGOs Demand & Book', desc: 'NGOs browse active stock and book exact quantities needed (e.g., claiming 70 units out of 100 in stock).' },
    { step: '03', title: 'Consignment Dispatched', desc: 'Allocations generate verified consignment notes, moving from Donor Hub to In-Transit GPS logistics.' },
    { step: '04', title: 'Ground Impact Delivered', desc: 'Supplies reach verified community beneficiaries with documented digital distribution confirmation.' }
  ];

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* What Communities Need Right Now */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">ACTIVE NEEDS</span>
            <h2 className="fw-bold mt-2">What Communities Need Right Now</h2>
          </div>
          <div className="row g-4">
            {topNeeds.map(need => (
              <NeedCard key={need.id} {...need} />
            ))}
          </div>
          {activeNeeds.length > 3 && (
            <div className="text-center mt-4">
              <Link to="/needs" className="btn btn-outline-teal rounded-pill fw-bold px-4">
                View All {activeNeeds.length} Needs →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-5" style={{ backgroundColor: 'var(--ib-bg)' }}>
        <div className="container">
          <div className="row g-4">
            {impactCounters.map((stat, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="ib-card text-center p-4 h-100">
                  <div className="fs-2 mb-2">{stat.icon}</div>
                  <h2 className="fw-bold mb-1" style={{ color: 'var(--ib-primary)' }}>{stat.value}</h2>
                  <p className="text-muted small mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag-emerald">HOW IT WORKS</span>
            <h2 className="fw-bold mt-2">From Surplus to Impact in 4 Steps</h2>
          </div>
          <div className="row g-4">
            {howItWorks.map((item) => (
              <div className="col-md-3" key={item.step}>
                <div className="text-center">
                  <div className="step-number-badge mb-3 mx-auto">{item.step}</div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partial Stock Allocation Visual */}
      <section className="py-5" style={{ backgroundColor: 'var(--ib-bg)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag-amber">FLEXIBLE ALLOCATION</span>
            <h2 className="fw-bold mt-2">One donation can help multiple NGOs</h2>
            <p className="text-muted">Partial stock booking lets NGOs request exactly what they need.</p>
          </div>
          <div className="row justify-content-center align-items-center g-3">
            <div className="col-auto">
              <div className="ib-card p-3 text-center" style={{ minWidth: '140px' }}>
                <div className="fs-3 mb-1">📦</div>
                <h6 className="fw-bold mb-0">100 Blankets</h6>
                <small className="text-muted">WarmthForAll</small>
              </div>
            </div>
            <div className="col-auto d-none d-sm-block">
              <span className="fs-3 text-muted">→</span>
            </div>
            <div className="col-auto">
              <div className="ib-card p-3 text-center" style={{ minWidth: '140px', borderColor: 'var(--ib-primary)', borderWidth: '2px' }}>
                <div className="fs-3 mb-1">🤝</div>
                <h6 className="fw-bold mb-0" style={{ color: 'var(--ib-primary)' }}>NGO A: 70</h6>
                <small className="text-muted">Care & Shelter</small>
              </div>
            </div>
            <div className="col-auto d-none d-sm-block">
              <span className="fs-3 text-muted">→</span>
            </div>
            <div className="col-auto">
              <div className="ib-card p-3 text-center" style={{ minWidth: '140px' }}>
                <div className="fs-3 mb-1">📊</div>
                <h6 className="fw-bold mb-0 text-danger">30 remaining</h6>
                <small className="text-muted">in reserve</small>
              </div>
            </div>
            <div className="col-auto d-none d-sm-block">
              <span className="fs-3 text-muted">→</span>
            </div>
            <div className="col-auto">
              <div className="ib-card p-3 text-center" style={{ minWidth: '140px', borderColor: 'var(--ib-secondary)', borderWidth: '2px' }}>
                <div className="fs-3 mb-1">🤝</div>
                <h6 className="fw-bold mb-0" style={{ color: 'var(--ib-secondary)' }}>NGO B: 30</h6>
                <small className="text-muted">Rapid Response</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Notice */}
      <section className="py-4 border-top">
        <div className="container text-center">
          <p className="text-muted small mb-0">
            💡 This is an interactive prototype. All payments, profiles, inventory allocation and delivery tracking are simulated for demonstration purposes.
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
