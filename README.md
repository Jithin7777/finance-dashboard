# Project Overview
A interactive Finance Dashboard built with React, Tailwind CSS, and Zustand for state management. This dashboard allows users to track income, expenses, and balance trends with charts and transaction management.


## Features

### Dashboard Overview

- Summary cards: Total Balance, Income, Expenses
- Balance Trend (Line Chart)
- Spending Breakdown (Pie Chart)
- Recent Transactions

### Transactions 

- Transaction table with Date, Category, Type, Amount
- Search, filter, and group options
- Export CSV
- Reset filters

### Role-Based UI

- Viewer: Read-only
- Admin: Add/Edit/Delete (simulated)
- Role switch dropdown

### Insights Section

- Highest spending category
- Monthly comparison
- Financial observations

### UI/UX

- Dark mode support
- Responsive design
- Hover effects and smooth animations
- Graceful handling of empty states


## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Recharts
- **UI Components:** Shadcn UI
- **Notifications:** Sonner
- **Icons:** Lucide React, Heroicons
- **Data:** Static JSON (mock transactions)


```txt
finance-dashboard/
├─ public/                     # Static assets like favicon, images
├─ src/
│  ├─ assets/                  # Images, icons, and other static assets
│  ├─ components/              # Shared UI components
│  │  ├─ charts/               # LineChart, PieChart, BarCharts
│  │  ├─ dashboard/            # SummaryCards, RecentTransactions
│  │  ├─ insights/             # InsightCards, FinancialObservation
│  │  ├─ layout/               # Navbar, Sidebar, Layout
│  │  ├─ transactions/         # TransactionTable, Toolbar, Modals
│  │  └─ ui/                   # Shadcn UI components (Button, Select, etc.)
│  ├─ data/                     # Mock JSON data
│  │  └─ transactions.json
│  ├─ lib/                      # Utilities and helper libraries
│  │  └─ utils.js
│  ├─ pages/                    # Main pages
│  │  ├─ Dashboard.jsx
│  │  ├─ Insights.jsx
│  │  ├─ NotFound.jsx
│  │  └─ Transactions.jsx
│  ├─ store/                    # Zustand state management
│  │  └─ financeStore.js
│  ├─ utils/                    # Utility functions
│  │  ├─ exportCSV.js
│  │  ├─ filters.js
│  │  └─ grouping.js
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  └─ App.css
├─ .gitignore
├─ README.md
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package.json
├─ package-lock.json
├─ tailwind.config.js
└─ vite.config.js
```


## Steps to Run the Project Locally

1. Clone the repository

```bash
git clone git@github.com:Jithin7777/finance-dashboard.git
cd finance-dashboard
```

2. Install dependencies

```bash
npm install
```


3. Start the development server

```bash
npm run dev
```
