/**
 * Mock data for ImpactBridge platform
 * Demonstrates Module 1 (JavaScript / ES6+): Objects, Arrays, and ES Modules
 */

export const initialDonors = [
  {
    id: "DON-01",
    name: "Apex Food Security Initiative",
    type: "Corporate CSR Foundation",
    email: "relief@apexfoundation.org",
    phone: "+91 98102 34567",
    location: "Kalyanpur, Urban Ward 4",
    verified: true,
    donatedCount: 12
  },
  {
    id: "DON-02",
    name: "CarePlus Pharma Coalition",
    type: "Healthcare Provider",
    email: "outreach@careplus.in",
    phone: "+91 98234 56789",
    location: "Navi Basti Community Clinic",
    verified: true,
    donatedCount: 8
  },
  {
    id: "DON-03",
    name: "WarmthForAll Foundation",
    type: "Non-Profit Trust",
    email: "contact@warmthforall.org",
    phone: "+91 98456 78901",
    location: "North Sector Night Shelters",
    verified: true,
    donatedCount: 15
  },
  {
    id: "DON-04",
    name: "BrightMinds Educational Trust",
    type: "Philanthropic Fund",
    email: "support@brightminds.edu",
    phone: "+91 98321 65498",
    location: "Rampur Rural School Cluster",
    verified: true,
    donatedCount: 6
  }
];

export const initialNGOs = [
  {
    id: "NGO-01",
    name: "Asha Relief Foundation",
    regNumber: "NGO-DL-2018-8841",
    focusArea: "Food Security & Disaster Response",
    contactPerson: "Dr. Ananya Sen",
    phone: "+91 98765 43210",
    location: "Kalyanpur, Urban Ward 4",
    verified: true
  },
  {
    id: "NGO-02",
    name: "Vidya Jyoti Learning Center",
    regNumber: "NGO-UP-2019-3321",
    focusArea: "Rural Primary & STEM Education",
    contactPerson: "Rajeshwar Tiwari",
    phone: "+91 98111 22334",
    location: "Rampur Rural School Cluster",
    verified: true
  },
  {
    id: "NGO-03",
    name: "Seva Health Mission",
    regNumber: "NGO-MH-2020-5590",
    focusArea: "Slum Community Healthcare & First-Aid",
    contactPerson: "Dr. Farooq Khan",
    phone: "+91 98999 88776",
    location: "Navi Basti Community Clinic",
    verified: true
  },
  {
    id: "NGO-04",
    name: "Care & Shelter Coalition",
    regNumber: "NGO-DL-2017-1049",
    focusArea: "Urban Homeless & Night Shelters",
    contactPerson: "Sunita Verma",
    phone: "+91 98777 66554",
    location: "North Sector Night Shelters",
    verified: true
  },
  {
    id: "NGO-05",
    name: "Rapid Response Alliance",
    regNumber: "NGO-WB-2021-9901",
    focusArea: "Flood & Emergency Relief",
    contactPerson: "Amitava Das",
    phone: "+91 98333 44556",
    location: "Riverbank Zone B",
    verified: true
  }
];

export const howItWorksSteps = [
  {
    stepNumber: "01",
    title: "Donors Pool Inventory",
    description: "Donors register surplus resources or fund specific open requirements into the verified central bridge inventory."
  },
  {
    stepNumber: "02",
    title: "NGOs Demand & Book",
    description: "NGOs browse active stock and book exact quantities needed (e.g., claiming 70 units out of 100 in stock) with real-time deduction."
  },
  {
    stepNumber: "03",
    title: "Consignment Dispatched",
    description: "Allocations generate instant verified consignment notes, moving from Donor Hub to In-Transit GPS logistics."
  },
  {
    stepNumber: "04",
    title: "Ground Impact Delivered",
    description: "Supplies reach verified community beneficiaries, and digital distribution confirmation is documented."
  }
];

export const impactStats = [
  {
    id: 1,
    value: "18,450+",
    label: "Total Units Mobilized",
    unit: "Verified Goods"
  },
  {
    id: 2,
    value: "480+",
    label: "NGO Demands Fulfilled",
    unit: "Community Orders"
  },
  {
    id: 3,
    value: "98.8%",
    label: "On-Time Dispatch",
    unit: "Logistics Score"
  },
  {
    id: 4,
    value: "64,000+",
    label: "Lives Impacted",
    unit: "Grassroots Beneficiaries"
  },
  {
    id: 5,
    value: "140+",
    label: "Partner NGOs & Donors",
    unit: "Verified Network"
  }
];

export const communityNeeds = [
  {
    id: "NEED-101",
    title: "Dry Ration Kits & Staple Grains",
    category: "Food",
    ngoName: "Asha Relief Foundation",
    location: "Kalyanpur, Urban Ward 4",
    quantityRequired: 250,
    quantityFulfilled: 120,
    quantityRemaining: 130,
    unit: "Family Kits",
    urgency: "Urgent",
    status: "Partially Fulfilled",
    beneficiaryCount: 1000,
    fundingTarget: 125000,
    fundingRaised: 45000,
    description: "Demo scenario: Essential staple food kits (rice, pulses, oil, wheat flour) needed for daily-wage families affected by seasonal disruption."
  },
  {
    id: "NEED-102",
    title: "STEM Textbooks & Stationery",
    category: "Education Supplies",
    ngoName: "Vidya Jyoti Learning Center",
    location: "Rampur Rural School Cluster",
    quantityRequired: 180,
    quantityFulfilled: 0,
    quantityRemaining: 180,
    unit: "Student Sets",
    urgency: "High",
    status: "Open",
    beneficiaryCount: 360,
    fundingTarget: 45000,
    fundingRaised: 10000,
    description: "Demo scenario: Science and math curriculum books, notebooks, and geometry sets for primary and middle school students."
  },
  {
    id: "NEED-103",
    title: "Basic First-Aid & Hygiene Kits",
    category: "Healthcare",
    ngoName: "Seva Health Mission",
    location: "Navi Basti Community Clinic",
    quantityRequired: 120,
    quantityFulfilled: 60,
    quantityRemaining: 60,
    unit: "Medical Kits",
    urgency: "Urgent",
    status: "Partially Fulfilled",
    beneficiaryCount: 450,
    fundingTarget: 60000,
    fundingRaised: 30000,
    description: "Demo scenario: Antiseptic solutions, bandages, ORS packets, and basic diagnostic monitoring tools for primary health camps."
  },
  {
    id: "NEED-104",
    title: "Heavy Fleece Thermal Blankets",
    category: "Clothing",
    ngoName: "Care & Shelter Coalition",
    location: "North Sector Night Shelters",
    quantityRequired: 100,
    quantityFulfilled: 70,
    quantityRemaining: 30,
    unit: "Blankets",
    urgency: "Urgent",
    status: "Partially Fulfilled",
    beneficiaryCount: 100,
    fundingTarget: 50000,
    fundingRaised: 32500,
    description: "Demo scenario: 50 families affected by severe flooding require emergency blankets. Warm fleece blankets and sweaters for night shelter residents and vulnerable elderly community members."
  },
  {
    id: "NEED-105",
    title: "Emergency Tarpaulins & Clean Water Units",
    category: "Emergency Relief",
    ngoName: "Rapid Response Alliance",
    location: "Riverbank Zone B",
    quantityRequired: 85,
    quantityFulfilled: 40,
    quantityRemaining: 45,
    unit: "Tarpaulin Sheets",
    urgency: "Urgent",
    status: "Partially Fulfilled",
    beneficiaryCount: 340,
    fundingTarget: 85000,
    fundingRaised: 40000,
    description: "Demo scenario: Waterproof temporary shelter sheets and portable water purification canisters for displaced households."
  },
  {
    id: "NEED-106",
    title: "Digital Learning Tablets",
    category: "Education Supplies",
    ngoName: "Udaan Youth Initiative",
    location: "Subhash Nagar Community Center",
    quantityRequired: 20,
    quantityFulfilled: 20,
    quantityRemaining: 0,
    unit: "Tablets",
    urgency: "Medium",
    status: "Fulfilled",
    beneficiaryCount: 80,
    fundingTarget: 200000,
    fundingRaised: 200000,
    description: "Demo scenario: Functional tablets for community vocational computer literacy and after-school remedial sessions."
  }
];

export const availableResources = [
  {
    id: "RES-201",
    resourceName: "Staple Grain & Nutrition Kits",
    category: "Food",
    totalQuantity: 300,
    availableQuantity: 180,
    allocatedQuantity: 120,
    unit: "Family Kits",
    location: "Kalyanpur, Urban Ward 4",
    donor: "Apex Food Security Initiative",
    status: "Available",
    description: "Packed staple boxes containing rice, lentils, refined wheat flour, and cooking oil.",
    dateAdded: "2026-08-10"
  },
  {
    id: "RES-202",
    resourceName: "Emergency First-Aid Supplies",
    category: "Healthcare",
    totalQuantity: 150,
    availableQuantity: 90,
    allocatedQuantity: 60,
    unit: "Medical Packs",
    location: "Navi Basti Community Clinic",
    donor: "CarePlus Pharma Coalition",
    status: "Available",
    description: "Sterilized gauze, antiseptic wash, burn dressings, and primary diagnostic supplies.",
    dateAdded: "2026-08-12"
  },
  {
    id: "RES-203",
    resourceName: "Heavy Fleece Thermal Blankets",
    category: "Clothing",
    totalQuantity: 400,
    availableQuantity: 400,
    allocatedQuantity: 0,
    unit: "Blankets",
    location: "North Sector Night Shelters",
    donor: "WarmthForAll Foundation",
    status: "Available",
    description: "High-insulation thermal blankets suitable for night shelter distribution.",
    dateAdded: "2026-08-14"
  },
  {
    id: "RES-204",
    resourceName: "Primary Science Modules",
    category: "Education Supplies",
    totalQuantity: 50,
    availableQuantity: 50,
    allocatedQuantity: 0,
    unit: "Science Kits",
    location: "Rampur Rural School Cluster",
    donor: "BrightMinds Educational Trust",
    status: "Available",
    description: "Elementary science experiment modules and illustrative learning charts.",
    dateAdded: "2026-08-15"
  },
  {
    id: "RES-205",
    resourceName: "Monsoon Shelter Tarpaulins",
    category: "Emergency Relief",
    totalQuantity: 100,
    availableQuantity: 60,
    allocatedQuantity: 40,
    unit: "Tarpaulins",
    location: "Riverbank Zone B",
    donor: "Rotary Disaster Support Wing",
    status: "Available",
    description: "Reinforced UV-resistant waterproof tarpaulin sheets for temporary settlements.",
    dateAdded: "2026-08-16"
  },
  {
    id: "RES-206",
    resourceName: "Packaged Safe Drinking Water",
    category: "Food",
    totalQuantity: 500,
    availableQuantity: 500,
    allocatedQuantity: 0,
    unit: "Water Cases",
    location: "South City Central Hub",
    donor: "HydroPure Relief Drive",
    status: "Available",
    description: "Certified sealed 1L drinking water bottles for emergency deployment.",
    dateAdded: "2026-08-17"
  }
];

export const initialConsignments = [
  {
    id: "ORD-901",
    resourceId: "RES-201",
    resourceName: "Staple Grain & Nutrition Kits",
    needId: "NEED-101",
    ngoName: "Asha Relief Foundation",
    donorName: "Apex Food Security Initiative",
    category: "Food",
    quantity: 120,
    unit: "Family Kits",
    origin: "Kalyanpur Central Depot, Bay 4",
    destination: "Asha Relief Community Center, Ward 4",
    stage: 3, // 1: Booked, 2: Packaged, 3: In-Transit, 4: Delivered
    stageLabel: "In-Transit",
    driverName: "Vikram Rathore",
    vehicleNumber: "DL-01-AX-9942",
    eta: "Today, 6:30 PM",
    timestamp: "2026-08-18 14:30",
    notes: "Consignment dispatched via climate-controlled truck."
  },
  {
    id: "ORD-902",
    resourceId: "RES-202",
    resourceName: "Emergency First-Aid Supplies",
    needId: "NEED-103",
    ngoName: "Seva Health Mission",
    donorName: "CarePlus Pharma Coalition",
    category: "Healthcare",
    quantity: 60,
    unit: "Medical Packs",
    origin: "CarePlus Regional Warehouse, Gate 2",
    destination: "Navi Basti Community Clinic",
    stage: 4, // Delivered
    stageLabel: "Delivered & Distributed",
    driverName: "Sunil Sharma",
    vehicleNumber: "MH-04-BB-1120",
    eta: "Delivered",
    timestamp: "2026-08-17 11:15",
    notes: "Handed over to Dr. Farooq Khan at clinic premises."
  },
  {
    id: "ORD-903",
    resourceId: "RES-205",
    resourceName: "Monsoon Shelter Tarpaulins",
    needId: "NEED-105",
    ngoName: "Rapid Response Alliance",
    donorName: "Rotary Disaster Support Wing",
    category: "Emergency Relief",
    quantity: 40,
    unit: "Tarpaulins",
    origin: "Rotary Central Logistics Hub",
    destination: "Riverbank Zone B Relief Camp",
    stage: 2, // Packaged
    stageLabel: "Packaged at Donor Hub",
    driverName: "Assigned upon dispatch",
    vehicleNumber: "WB-02-ZZ-4819",
    eta: "Tomorrow Morning",
    timestamp: "2026-08-18 16:00",
    notes: "Bundled and inspected for immediate dispatch."
  }
];

export const transparencySteps = [
  {
    step: "01",
    title: "Booked & Allocated",
    badgeText: "Demand Matched",
    description: "NGO selects stock quantity or matches open demand. Real-time inventory reservation occurs."
  },
  {
    step: "02",
    title: "Packaged at Depot",
    badgeText: "QA Verified",
    description: "Donor warehouse prepares consignment note, barcodes packaging, and verifies batch standards."
  },
  {
    step: "03",
    title: "In Transit Logistics",
    badgeText: "GPS Tracked",
    description: "Transport fleet moves goods with live ETA updates and digital chain-of-custody handshakes."
  },
  {
    step: "04",
    title: "Delivered to Beneficiaries",
    badgeText: "Impact Recorded",
    description: "NGO confirms physical receipt and documents distribution to end community beneficiaries."
  }
];

export const successStories = [
  {
    id: 1,
    title: "Nutritional Support for 1,200 Children",
    location: "Dharavi Community Cluster",
    supportType: "Food & Nutrition",
    description: "When supply chains were disrupted, 400 ration boxes and nutrition supplements were claimed by local NGOs within 48 hours.",
    result: "1,200+ children received consistent hot meals across four community centers for an entire month."
  },
  {
    id: 2,
    title: "Equipping 5 Rural Learning Centers",
    location: "Sonbhadra District",
    supportType: "Education Supplies",
    description: "Surplus notebooks, desks, and solar study lamps from a corporate drive were allocated directly to remote rural schools.",
    result: "320 first-generation learners gained access to furnished classrooms and evening study aids."
  },
  {
    id: 3,
    title: "Monsoon Emergency Medical Relief",
    location: "Majuli Island Camp",
    supportType: "Emergency Relief & Healthcare",
    description: "A batch of 500 first-aid kits and emergency hygiene packs were booked and redirected to mobile health clinics during flood season.",
    result: "Zero delay in primary healthcare response, aiding over 2,100 flood-affected individuals."
  }
];

export const initialDonations = [
  {
    id: "DON-1001",
    donorId: "DON-01",
    donorName: "Apex Food Security Initiative",
    type: "money",
    needId: "NEED-104",
    needTitle: "Heavy Fleece Thermal Blankets",
    amount: 1000,
    status: "Demo Confirmed",
    createdAt: "2026-08-18 10:00",
    paymentMethod: "Demo UPI"
  },
  {
    id: "DON-1002",
    donorId: "DON-02",
    donorName: "CarePlus Pharma Coalition",
    type: "supplies",
    needId: "NEED-103",
    needTitle: "Basic First-Aid & Hygiene Kits",
    quantity: 10,
    unit: "Medical Kits",
    status: "Demo Confirmed",
    createdAt: "2026-08-17 14:00"
  }
];
