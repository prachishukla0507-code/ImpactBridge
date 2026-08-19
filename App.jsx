import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DonorPortal from './pages/DonorPortal';
import ReceiverPortal from './pages/ReceiverPortal';
import MatchesPage from './pages/MatchesPage';
import TrackingPage from './pages/TrackingPage';
import DonatePage from './pages/DonatePage';
import NeedDetailPage from './pages/NeedDetailPage';
import NeedsPage from './pages/NeedsPage';
import {
  initialDonors,
  initialNGOs,
  availableResources as defaultResources,
  communityNeeds as defaultNeeds,
  initialConsignments as defaultConsignments,
  initialDonations
} from './data/mockData';

/**
 * Main Application Component - ImpactBridge
 * NGO-Need-centric humanitarian platform
 */
function App() {
  // === State Management ===
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('ib_resources');
    return saved ? JSON.parse(saved) : defaultResources;
  });

  const [needs, setNeeds] = useState(() => {
    const saved = localStorage.getItem('ib_needs');
    return saved ? JSON.parse(saved) : defaultNeeds;
  });

  const [consignments, setConsignments] = useState(() => {
    const saved = localStorage.getItem('ib_consignments');
    return saved ? JSON.parse(saved) : defaultConsignments;
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('ib_donations');
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [donors, setDonors] = useState(() => {
    const saved = localStorage.getItem('ib_donors');
    return saved ? JSON.parse(saved) : initialDonors;
  });

  const [ngos, setNgos] = useState(() => {
    const saved = localStorage.getItem('ib_ngos');
    return saved ? JSON.parse(saved) : initialNGOs;
  });

  const [activeDonor, setActiveDonor] = useState(initialDonors[0]);
  const [activeNGO, setActiveNGO] = useState(initialNGOs[0]);
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [notification, setNotification] = useState('');

  // === Persist to localStorage ===
  useEffect(() => { localStorage.setItem('ib_resources', JSON.stringify(resources)); }, [resources]);
  useEffect(() => { localStorage.setItem('ib_needs', JSON.stringify(needs)); }, [needs]);
  useEffect(() => { localStorage.setItem('ib_consignments', JSON.stringify(consignments)); }, [consignments]);
  useEffect(() => { localStorage.setItem('ib_donations', JSON.stringify(donations)); }, [donations]);
  useEffect(() => { localStorage.setItem('ib_donors', JSON.stringify(donors)); }, [donors]);
  useEffect(() => { localStorage.setItem('ib_ngos', JSON.stringify(ngos)); }, [ngos]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 6000);
  };

  // === Reset Demo ===
  const handleResetDemo = () => {
    setResources(defaultResources);
    setNeeds(defaultNeeds);
    setConsignments(defaultConsignments);
    setDonations(initialDonations);
    setDonors(initialDonors);
    setNgos(initialNGOs);
    setActiveDonor(initialDonors[0]);
    setActiveNGO(initialNGOs[0]);
    showNotification("Demo reset successful. Initial data restored.");
  };

  // === Profile Handlers ===
  const handleSelectDonor = (donor) => setActiveDonor(donor);
  const handleSelectNGO = (ngo) => setActiveNGO(ngo);

  const handleRegisterDonor = (newDonor) => {
    setDonors((prev) => [newDonor, ...prev]);
    setActiveDonor(newDonor);
    showNotification(`Welcome, ${newDonor.name}! Your donor account is active.`);
  };

  const handleRegisterNGO = (newNGO) => {
    setNgos((prev) => [newNGO, ...prev]);
    setActiveNGO(newNGO);
    showNotification(`Welcome, ${newNGO.name}! Your NGO profile is registered.`);
  };

  // === Add Resource (Central Reserve or Direct) ===
  const handleAddResource = (newResource, linkedNeedId = null) => {
    setResources((prev) => [newResource, ...prev]);
    if (linkedNeedId) {
      const linkedNeed = needs.find((n) => n.id === linkedNeedId);
      if (linkedNeed) {
        const qtyToAllocate = Math.min(
          Number(newResource.availableQuantity ?? newResource.quantity),
          Math.max(0, Number(linkedNeed.quantityRequired) - Number(linkedNeed.quantityFulfilled || 0))
        );
        handleBookResource({
          resourceId: newResource.id,
          resourceName: newResource.resourceName,
          donorName: newResource.donor,
          category: newResource.category,
          ngoName: linkedNeed.ngoName,
          quantityRequested: qtyToAllocate,
          unit: newResource.unit || linkedNeed.unit,
          needId: linkedNeed.id,
          destination: linkedNeed.location,
          notes: `Direct donor fulfillment for ${linkedNeed.title}.`
        });
        return;
      }
    }
    showNotification(`✓ Deposited ${newResource.totalQuantity || newResource.quantity} ${newResource.unit || 'units'} of "${newResource.resourceName}" into central reserve!`);
  };

  // === Add Need ===
  const handleAddNeed = (newNeed) => {
    setNeeds((prev) => [newNeed, ...prev]);
    showNotification(`✓ Posted community requirement: "${newNeed.title}" (${newNeed.quantityRequired} ${newNeed.unit})!`);
  };

  // === Core Booking Bridge ===
  const handleBookResource = ({
    resourceId, resourceName, donorName, category,
    ngoName, quantityRequested, unit = 'Units',
    needId = null, destination = '', notes = ''
  }) => {
    const qty = Number(quantityRequested);
    if (isNaN(qty) || qty <= 0) return;

    setResources((prev) =>
      prev.map((res) => {
        if (res.id === resourceId) {
          const currentAvail = Number(res.availableQuantity ?? res.quantity ?? 0);
          const currentAlloc = Number(res.allocatedQuantity || 0);
          return {
            ...res,
            availableQuantity: Math.max(0, currentAvail - qty),
            allocatedQuantity: currentAlloc + qty,
            status: Math.max(0, currentAvail - qty) === 0 ? 'Fully Allocated' : 'Available'
          };
        }
        return res;
      })
    );

    if (needId) {
      setNeeds((prev) =>
        prev.map((need) => {
          if (need.id === needId) {
            const newFulfilled = (Number(need.quantityFulfilled) || 0) + qty;
            const totalRequired = Number(need.quantityRequired) || 0;
            const newRemaining = Math.max(0, totalRequired - newFulfilled);
            return {
              ...need,
              quantityFulfilled: newFulfilled,
              quantityRemaining: newRemaining,
              status: newFulfilled >= totalRequired ? 'Fulfilled' : newFulfilled > 0 ? 'Partially Fulfilled' : 'Open'
            };
          }
          return need;
        })
      );
    }

    const newConsignmentId = `ORD-${Date.now().toString().slice(-4)}`;
    setConsignments((prev) => [{
      id: newConsignmentId,
      resourceId,
      resourceName: resourceName || 'Humanitarian Aid Package',
      needId: needId || null,
      ngoName: ngoName || activeNGO.name,
      donorName: donorName || 'Verified Donor Partner',
      category: category || 'General Aid',
      quantity: qty,
      unit,
      origin: 'Regional Donor Logistics Depot',
      destination: destination || 'NGO Distribution Center',
      stage: 1,
      stageLabel: 'Booked & Allocated',
      driverName: 'Assigned upon depot packaging',
      vehicleNumber: `DL-0${Math.floor(Math.random() * 9) + 1}-TR-${Math.floor(Math.random() * 8999) + 1000}`,
      eta: 'Tomorrow, 11:30 AM',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      notes: notes || 'Standard priority humanitarian allocation.'
    }, ...prev]);

    showNotification(`🎉 Successfully booked ${qty} ${unit} for "${ngoName}"! Consignment #${newConsignmentId} created.`);
  };

  // === Match Resource ===
  const handleMatchResource = (resourceId, needId, customAllocQty = null) => {
    const res = resources.find((r) => r.id === resourceId);
    const need = needs.find((n) => n.id === needId);
    if (!res || !need) return;

    const available = Number(res.availableQuantity ?? res.quantity ?? 0);
    const needed = Math.max(0, Number(need.quantityRequired) - Number(need.quantityFulfilled || 0));
    const qtyToAllocate = customAllocQty ? Math.min(available, Number(customAllocQty)) : Math.min(available, needed);

    handleBookResource({
      resourceId: res.id, resourceName: res.resourceName, donorName: res.donor,
      category: res.category, ngoName: need.ngoName, quantityRequested: qtyToAllocate,
      unit: res.unit || need.unit, needId: need.id, destination: need.location,
      notes: `Match executed between ${res.id} and ${need.id}.`
    });
    setSelectedResourceId(null);
  };

  // === Advance Tracking Stage ===
  const handleAdvanceTrackingStage = (consignmentId) => {
    setConsignments((prev) =>
      prev.map((c) => {
        if (c.id === consignmentId) {
          const nextStage = Math.min(4, c.stage + 1);
          let label = c.stageLabel, eta = c.eta, driver = c.driverName;
          if (nextStage === 2) { label = 'Packaged at Donor Depot'; eta = 'Dispatched within 2 hours'; driver = 'Rameshwar Yadav'; }
          else if (nextStage === 3) { label = 'In-Transit (GPS Live)'; eta = 'Arriving in 45 mins'; driver = 'Rameshwar Yadav (On-Road)'; }
          else if (nextStage === 4) { label = 'Delivered & Distributed'; eta = 'Handover Confirmed ✓'; driver = 'Delivery Complete'; }
          showNotification(`📦 Consignment #${c.id} advanced to Phase 0${nextStage}: ${label}!`);
          return { ...c, stage: nextStage, stageLabel: label, eta, driverName: driver };
        }
        return c;
      })
    );
  };

  // === Money Donation ===
  const handleDonateMoney = (needId, amount, paymentMethod) => {
    setNeeds((prev) => prev.map((need) => {
      if (need.id === needId) {
        return { ...need, fundingRaised: (need.fundingRaised || 0) + Number(amount) };
      }
      return need;
    }));

    const targetNeed = needs.find(n => n.id === needId);
    setDonations(prev => [{
      id: `DON-${Date.now().toString().slice(-4)}`,
      donorId: activeDonor.id,
      donorName: activeDonor.name,
      type: "money",
      needId,
      needTitle: targetNeed?.title || "Unknown Need",
      amount: Number(amount),
      status: "Demo Confirmed",
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      paymentMethod: paymentMethod || "Demo UPI"
    }, ...prev]);
    showNotification(`Demo Donation Successful! ₹${amount} contribution recorded.`);
  };

  // === Supply Donation (Direct to Need) ===
  const handleDonateSuppliesToNeed = (needId, quantity, category, unit, itemName) => {
    const qty = Number(quantity);
    setNeeds((prev) => prev.map((need) => {
      if (need.id === needId) {
        const newFulfilled = (need.quantityFulfilled || 0) + qty;
        const newRemaining = Math.max(0, (need.quantityRequired || 0) - newFulfilled);
        return {
          ...need,
          quantityFulfilled: newFulfilled,
          quantityRemaining: newRemaining,
          status: newFulfilled >= (need.quantityRequired || 0) ? 'Fulfilled' : 'Partially Fulfilled'
        };
      }
      return need;
    }));

    const targetNeed = needs.find(n => n.id === needId);
    setDonations(prev => [{
      id: `DON-${Date.now().toString().slice(-4)}`,
      donorId: activeDonor.id,
      donorName: activeDonor.name,
      type: "supplies",
      needId,
      needTitle: targetNeed?.title || "Unknown Need",
      quantity: qty,
      unit,
      status: "Demo Confirmed",
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    }, ...prev]);

    setConsignments(prev => [{
      id: `ORD-${Date.now().toString().slice(-4)}`,
      resourceId: 'DIRECT-DONATION',
      resourceName: itemName || 'Direct Supply Donation',
      needId,
      ngoName: targetNeed?.ngoName || 'Unknown NGO',
      donorName: activeDonor.name,
      category: category || targetNeed?.category || 'General Aid',
      quantity: qty,
      unit,
      origin: 'Donor Direct Drop-off',
      destination: targetNeed?.location || 'NGO Distribution Center',
      stage: 1,
      stageLabel: 'Booked & Allocated',
      driverName: 'Assigned upon depot packaging',
      vehicleNumber: `DL-0${Math.floor(Math.random() * 9) + 1}-TR-${Math.floor(Math.random() * 8999) + 1000}`,
      eta: 'Tomorrow, 11:30 AM',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      notes: 'Direct physical supply donation to NGO need.'
    }, ...prev]);

    showNotification(`✓ Demo Supply Donation successful! ${qty} ${unit} allocated directly to need.`);
  };

  // === Supply Donation (Central Reserve) ===
  const handleDonateSuppliesToReserve = (itemName, category, quantity, unit, description, location) => {
    const qty = Number(quantity);
    setResources(prev => [{
      id: `RES-${Date.now().toString().slice(-4)}`,
      resourceName: itemName,
      category,
      totalQuantity: qty,
      availableQuantity: qty,
      allocatedQuantity: 0,
      unit,
      location: location || activeDonor.location,
      donor: activeDonor.name,
      status: "Available",
      description: description || "Demo Central Reserve Deposit",
      dateAdded: new Date().toISOString().split('T')[0]
    }, ...prev]);

    setDonations(prev => [{
      id: `DON-${Date.now().toString().slice(-4)}`,
      donorId: activeDonor.id,
      donorName: activeDonor.name,
      type: "supplies_reserve",
      needId: null,
      needTitle: "ImpactBridge Central Reserve",
      quantity: qty,
      unit,
      status: "Demo Confirmed",
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    }, ...prev]);
    showNotification(`✓ Deposited ${qty} ${unit} into Central Reserve!`);
  };

  const selectedResource = resources.find((r) => r.id === selectedResourceId) || null;

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      {/* Navbar */}
      <Navbar
        activeNGO={activeNGO}
        activeDonor={activeDonor}
        donors={donors}
        ngos={ngos}
        onSelectDonor={handleSelectDonor}
        onSelectNGO={handleSelectNGO}
        onResetDemo={handleResetDemo}
      />

      {/* Notification Banner */}
      {notification && (
        <div
          className="text-white py-2 px-3 text-center small fw-semibold sticky-top shadow-sm"
          style={{ top: '65px', zIndex: 1020, backgroundColor: 'var(--ib-primary)' }}
        >
          <div className="container d-flex align-items-center justify-content-between">
            <span>{notification}</span>
            <button type="button" className="btn-close btn-close-white btn-sm" aria-label="Close" onClick={() => setNotification('')}></button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow-1">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <HomePage
                resources={resources}
                needs={needs}
                donations={donations}
                consignments={consignments}
              />
            }
          />

          {/* Browse Needs */}
          <Route
            path="/needs"
            element={<NeedsPage needs={needs} />}
          />

          {/* Need Detail */}
          <Route
            path="/needs/:needId"
            element={
              <NeedDetailPage
                needs={needs}
                resources={resources}
                onDonateMoney={handleDonateMoney}
                onDonateSupplies={handleDonateSuppliesToNeed}
                onDonateSuppliesToReserve={handleDonateSuppliesToReserve}
              />
            }
          />

          {/* Donate Hub */}
          <Route
            path="/donate"
            element={
              <DonatePage
                needs={needs}
                onDonateMoney={handleDonateMoney}
                onDonateSuppliesToNeed={handleDonateSuppliesToNeed}
                onDonateSuppliesToReserve={handleDonateSuppliesToReserve}
              />
            }
          />

          {/* Donor / My Contributions */}
          <Route
            path="/donor"
            element={
              <DonorPortal
                resources={resources}
                needs={needs}
                donors={donors}
                activeDonor={activeDonor}
                onSelectDonor={handleSelectDonor}
                onRegisterDonor={handleRegisterDonor}
                onAddResource={handleAddResource}
                consignments={consignments}
                donations={donations}
              />
            }
          />

          {/* NGO Dashboard */}
          <Route
            path="/receiver"
            element={
              <ReceiverPortal
                resources={resources}
                needs={needs}
                ngos={ngos}
                activeNGO={activeNGO}
                onSelectNGO={handleSelectNGO}
                onRegisterNGO={handleRegisterNGO}
                onAddNeed={handleAddNeed}
                onBookResource={handleBookResource}
                consignments={consignments}
              />
            }
          />

          {/* Smart Matching */}
          <Route
            path="/matches"
            element={
              <MatchesPage
                resources={resources}
                needs={needs}
                selectedResource={selectedResource}
                onMatchResource={handleMatchResource}
                onClearSelection={() => setSelectedResourceId(null)}
                onSelectResource={(id) => setSelectedResourceId(id)}
                consignments={consignments}
              />
            }
          />

          {/* Tracking */}
          <Route
            path="/tracking"
            element={
              <TrackingPage
                consignments={consignments}
                onAdvanceTrackingStage={handleAdvanceTrackingStage}
              />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
