# 🚀 HireFilter — HR Resume Screening Frontend

A production-grade React frontend for HR teams to filter and shortlist candidates based on company requirements.

---

## ✨ Features

- **Requirements Panel** — Set job title, required skills, experience level, education, and minimum match score
- **Smart Scoring** — Candidates are dynamically scored based on how well they match requirements
- **PDF Resume Upload** — Upload PDF resumes per candidate via drag-and-drop or file browser
- **Shortlisting** — Mark candidates and view them in a dedicated tab
- **Sort & Filter** — Sort by match score, name, or experience
- **Stats Dashboard** — See total, filtered, shortlisted count, and average match score at a glance

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **No backend required** — Pure frontend, all state in memory
- **Fonts**: Syne, Space Mono, DM Sans (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Install & Run

```bash
npm install
npm start
```

App runs at: http://localhost:3000

---

## 📁 Project Structure

```
src/
├── App.js                    # Main app with state management
├── data.js                   # Mock candidates + constants
├── index.js                  # React entry point
├── index.css                 # Global styles & CSS variables
└── components/
    ├── RequirementsPanel.jsx  # Left sidebar: filter controls
    ├── CandidateCard.jsx      # Candidate card with PDF upload
    └── StatsBar.jsx           # Top stats dashboard
```

---

## 📄 PDF Resume Feature

Each candidate card has an expandable section with a **PDF uploader**:

- Drag & drop a `.pdf` file onto the upload zone
- Or click "browse" to select from your file system
- Once uploaded, a **VIEW** button opens the PDF in a new tab
- You can replace an uploaded resume anytime

> ⚠️ Only PDF files are accepted. Files are stored in-memory (not sent to any server).

---

## 🔧 How Scoring Works

When you click **Filter Candidates**, each candidate receives a match score:

1. **Skills match** — % of required skills the candidate has
2. **Experience bonus/penalty** — ±5–10 points based on experience level match
3. **Education bonus/penalty** — ±5–8 points based on education level

Candidates scoring below the **Min Match Score** threshold are hidden.

---

## 🔌 Backend Integration (Future)

To connect to a real backend:
- Replace mock data in `src/data.js` with API calls
- POST requirements to `/api/filter` and receive scored candidates
- Store uploaded PDFs via multipart form upload to your server

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `build/` folder, ready to deploy on Vercel, Netlify, or any static host.
