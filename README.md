# ImpactBridge — NGO-Need-Centric Humanitarian Platform

An interactive prototype that connects **verified NGO requirements** with **donor funding and supplies**. Built with React 19, Vite 8, Bootstrap 5, and React Router.

> ⚠️ **Demo/Prototype**: All payments, user accounts, and logistics tracking are simulated for demonstration purposes. No real financial transactions occur.

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| Bootstrap | 5.3 | CSS framework & responsive layout |
| React Router DOM | 7 | Client-side routing |
| localStorage | — | State persistence (demo mode) |

**No backend / No API / No database** — this is a fully static frontend app.

---

## 📁 Project Structure

```
impact-bridge/
├── index.html              ← HTML entry point
├── package.json            ← Dependencies & scripts
├── vite.config.js          ← Vite build configuration
├── vercel.json             ← Vercel deployment config (SPA routing)
├── .gitignore              ← Git ignored files
├── README.md               ← This file
│
├── public/                 ← Static assets (copied as-is to build)
│   ├── favicon.svg
│   └── _redirects          ← Netlify SPA routing fallback
│
├── src/                    ← Source code
│   ├── main.jsx            ← React entry point
│   ├── App.jsx             ← Central state management & routing
│   ├── index.css           ← Design system (CSS variables & custom classes)
│   │
│   ├── data/
│   │   └── mockData.js     ← Seed data (donors, NGOs, needs, resources)
│   │
│   ├── components/         ← Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── NeedCard.jsx
│   │   ├── MoneyDonationModal.jsx
│   │   ├── SupplyDonationModal.jsx
│   │   ├── BookingModal.jsx
│   │   ├── ConsignmentVoucherModal.jsx
│   │   ├── ResourceCard.jsx
│   │   ├── ResourceForm.jsx
│   │   ├── MatchingDemo.jsx
│   │   ├── Footer.jsx
│   │   ├── AvailableResources.jsx
│   │   ├── CurrentNeeds.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── ImpactStats.jsx
│   │   ├── PlatformSides.jsx
│   │   ├── SuccessStories.jsx
│   │   ├── Transparency.jsx
│   │   └── FinalCTA.jsx
│   │
│   └── pages/              ← Route-level page components
│       ├── HomePage.jsx          ← /
│       ├── NeedsPage.jsx         ← /needs
│       ├── NeedDetailPage.jsx    ← /needs/:needId
│       ├── DonatePage.jsx        ← /donate
│       ├── ReceiverPortal.jsx    ← /receiver (NGO Dashboard)
│       ├── DonorPortal.jsx       ← /donor (My Contributions)
│       ├── TrackingPage.jsx      ← /tracking
│       ├── MatchesPage.jsx       ← /matches
│       └── ResourcesPage.jsx
│
└── dist/                   ← Production build output (auto-generated)
```

---

## 🚀 How to Run Locally (VS Code)

### Prerequisites
- **Node.js 18+** — Download from https://nodejs.org
- **VS Code** — Download from https://code.visualstudio.com

### Steps

1. **Open the project folder in VS Code**
   - Open VS Code
   - Click `File → Open Folder`
   - Navigate to the `impact-bridge` folder and select it

2. **Open the terminal in VS Code**
   - Press `` Ctrl + ` `` (backtick) to open the integrated terminal

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - The terminal will show: `Local: http://localhost:5173/`
   - Click the URL or paste it in your browser

6. **Stop the server**
   - Press `Ctrl + C` in the terminal

---

## 📦 How to Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files ready for deployment.

To preview the production build locally:
```bash
npm run preview
```

---

## 📤 How to Upload to GitHub

### First time setup

1. **Create a GitHub account** at https://github.com (if you don't have one)

2. **Install Git** — Download from https://git-scm.com/downloads

3. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `impact-bridge`
   - Leave it **Public**
   - Do NOT check "Add a README" (we already have one)
   - Click **Create repository**

4. **Push your code** — Open terminal in VS Code and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ImpactBridge platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/impact-bridge.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Updating later
```bash
git add .
git commit -m "Your update message"
git push
```

---

## 🌍 How to Deploy Publicly (Get HTTPS Link)

### Option A: Vercel (Recommended — Easiest)

1. Go to https://vercel.com and sign in with your **GitHub account**
2. Click **"Add New Project"**
3. Select your `impact-bridge` repository
4. Vercel auto-detects Vite — just click **"Deploy"**
5. Wait ~30 seconds
6. ✅ You get a public link like: `https://impact-bridge.vercel.app`

**That's it!** Every time you push to GitHub, Vercel auto-deploys the update.

### Option B: Netlify (Alternative)

1. Go to https://app.netlify.com and sign in with GitHub
2. Click **"Add new site" → "Import an existing project"**
3. Select your `impact-bridge` repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **"Deploy site"**
7. ✅ You get a public link like: `https://impact-bridge.netlify.app`

### Why NOT GitHub Pages?

This project uses **React Router** (client-side routing). GitHub Pages doesn't natively handle SPA routing — refreshing on `/needs/NEED-104` would show a 404 error. Vercel and Netlify handle this correctly.

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, active needs, impact counters, how it works |
| `/needs` | Browse Needs | Search, filter, sort all NGO needs |
| `/needs/:needId` | Need Detail | Full story, progress bars, donate money/supplies |
| `/donate` | Donate Hub | Choose money or supplies pathway |
| `/receiver` | NGO Dashboard | Active needs, stock booking, inbound deliveries |
| `/donor` | My Contributions | Donor profile, inventory, contribution history |
| `/tracking` | Track Deliveries | 4-phase delivery timeline, demo controls |
| `/matches` | Supply Matching | Resource-to-need matching engine |

---

## 🧪 Demo Scenarios

1. **Money Donation**: `/needs/NEED-104` → Give Money → ₹1,000 → Demo UPI → Receipt
2. **Supply Donation**: `/needs/NEED-104` → Give Supplies → 10 Blankets → Count decreases
3. **Central Reserve**: `/donate` → Central Reserve → Add 100 tarpaulins
4. **NGO Stock Booking**: `/receiver` → Find 400 Blankets → Request 70 → Stock becomes 330
5. **Delivery Tracking**: `/tracking` → Advance Demo Stage → 4 phases

---

## 📋 License

This is a prototype/demo project for educational and demonstration purposes.
