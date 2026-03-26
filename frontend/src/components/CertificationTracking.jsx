import { useState } from "react";

// ── Data ───────────────────────────────────────────────────────────────────────
const CERTS = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services (AWS)",
    issued: "Jan 12, 2023",
    expires: "Jan 12, 2026",
    status: "active",
    icon: "☁",
    iconBg: "#e0f2fe",
    iconColor: "#0284c7",
    credentialId: "CERT-92831-AO",
  },
  {
    id: 2,
    title: "Google Cloud Professional Security Engineer",
    issuer: "Google Cloud Platform",
    issued: "Nov 04, 2022",
    expires: "Oct 30, 2024",
    status: "expiring",
    icon: "🛡",
    iconBg: "#fef9c3",
    iconColor: "#ca8a04",
    credentialId: "CERT-74820-GC",
  },
  {
    id: 3,
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    issued: "Mar 22, 2023",
    expires: "Mar 22, 2026",
    status: "active",
    icon: "</>",
    iconBg: "#e0f2fe",
    iconColor: "#2563eb",
    credentialId: "CERT-55310-CK",
  },
  {
    id: 4,
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    issued: "Feb 15, 2024",
    expires: "Feb 15, 2026",
    status: "active",
    icon: "⊟",
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
    credentialId: "CERT-61290-HT",
  },
  {
    id: 5,
    title: "Microsoft Azure Administrator",
    issuer: "Microsoft",
    issued: "Aug 10, 2022",
    expires: "Aug 10, 2024",
    status: "expiring",
    icon: "◫",
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    credentialId: "CERT-38820-AZ",
  },
  {
    id: 6,
    title: "Certified Information Security Manager",
    issuer: "ISACA",
    issued: "Jun 01, 2021",
    expires: "Jun 01, 2024",
    status: "expired",
    icon: "🔒",
    iconBg: "#fef2f2",
    iconColor: "#dc2626",
    credentialId: "CERT-20910-CI",
  },
];

const VERIFICATION_LOG = [
  { date: "2024-02-15", cert: "Terraform Associate",    action: "New Submission",      status: "verified", method: "API Callback" },
  { date: "2023-11-10", cert: "AWS Solutions Architect", action: "Manual Renewal",     status: "verified", method: "Document Review" },
  { date: "2023-09-22", cert: "Azure Administrator",     action: "Verification Check", status: "pending",  method: "External Sync" },
  { date: "2023-07-04", cert: "CKA",                     action: "New Submission",     status: "verified", method: "API Callback" },
  { date: "2023-03-15", cert: "GCP Security Engineer",   action: "Renewal Reminder",   status: "pending",  method: "Email Trigger" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const STATUS_META = {
  active:   { label: "ACTIVE",        bg: "#dcfce7", color: "#15803d", dot: "#16a34a" },
  expiring: { label: "EXPIRING SOON", bg: "#fef9c3", color: "#a16207", dot: "#ca8a04" },
  expired:  { label: "EXPIRED",       bg: "#fee2e2", color: "#b91c1c", dot: "#dc2626" },
};

// ── Detail Modal ───────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  const sm = STATUS_META[cert.status];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "36px 40px", maxWidth: 480, width: "100%", boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: cert.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: cert.iconColor, fontWeight: 700 }}>{cert.icon}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", marginBottom: 4 }}>CERTIFICATE DETAILS</div>
              <span style={{ background: sm.bg, color: sm.color, fontSize: 10, fontWeight: 700, borderRadius: 99, padding: "3px 10px" }}>{sm.label}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: "#94a3b8", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", lineHeight: 1.3 }}>{cert.title}</h2>
        <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 24px" }}>{cert.issuer}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Credential ID", value: cert.credentialId },
            { label: "Issuer",        value: cert.issuer },
            { label: "Issue Date",    value: cert.issued },
            { label: "Expiry Date",   value: cert.expires },
          ].map(row => (
            <div key={row.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>{row.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{row.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ flex: 1, background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            ↓ Download Certificate
          </button>
          {cert.status === "expiring" && (
            <button style={{ flex: 1, background: "#fef9c3", color: "#a16207", border: "1px solid #fde68a", borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              ↻ Renew Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Add Certificate Modal ──────────────────────────────────────────────────────
function AddCertModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", issuer: "", issued: "", expires: "", credentialId: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit() {
    if (!form.title || !form.issuer) return;
    onAdd({
      id: Date.now(),
      ...form,
      status: "active",
      icon: "✦",
      iconBg: "#f5f3ff",
      iconColor: "#7c3aed",
    });
    onClose();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "36px 40px", maxWidth: 460, width: "100%", boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}>Add New Certificate</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: "#94a3b8", cursor: "pointer" }}>✕</button>
        </div>
        {[
          { label: "Certificate Title *", key: "title",        placeholder: "e.g. AWS Solutions Architect" },
          { label: "Issuing Organization *", key: "issuer",    placeholder: "e.g. Amazon Web Services" },
          { label: "Credential ID",       key: "credentialId", placeholder: "e.g. CERT-12345-AB" },
          { label: "Issue Date",          key: "issued",       placeholder: "e.g. Jan 01, 2024" },
          { label: "Expiry Date",         key: "expires",      placeholder: "e.g. Jan 01, 2027" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>{f.label}</label>
            <input
              value={form[f.key]}
              onChange={e => set(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#0f172a", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 10, padding: 11, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSubmit} style={{ flex: 2, background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, padding: 11, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add Certificate</button>
        </div>
      </div>
    </div>
  );
}

// ── Cert Card ──────────────────────────────────────────────────────────────────
function CertCard({ cert, onView }) {
  const [hovered, setHovered] = useState(false);
  const sm = STATUS_META[cert.status];
  return (
    <div
      style={{ background: "#fff", border: cert.status === "expiring" ? "1.5px solid #fde68a" : "1px solid #e2e8f0", borderRadius: 16, padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 0, transition: "all .2s", boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)", transform: hovered ? "translateY(-3px)" : "none", cursor: "pointer", position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: cert.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: cert.iconColor, fontWeight: 700 }}>{cert.icon}</div>
        <span style={{ background: sm.bg, color: sm.color, fontSize: 10, fontWeight: 800, borderRadius: 99, padding: "4px 10px", letterSpacing: 0.5 }}>{sm.label}</span>
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", lineHeight: 1.35 }}>{cert.title}</h3>
      <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 18px" }}>{cert.issuer}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 18 }}>
        {[{ label: "Issued", value: cert.issued }, { label: "Expires", value: cert.expires }].map(row => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{row.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: cert.status === "expiring" && row.label === "Expires" ? "#ca8a04" : "#0f172a" }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
        <button
          style={{ background: "none", border: "none", fontSize: 13, fontWeight: 700, color: cert.status === "expiring" ? "#ca8a04" : "#2563eb", cursor: "pointer", padding: 0 }}
          onClick={() => onView(cert)}
        >
          {cert.status === "expiring" ? "Renew Now" : "View Details"}
        </button>
        <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 16, padding: 0 }}>↓</button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CertificationTracking() {
  const [certs, setCerts]           = useState(CERTS);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showAdd, setShowAdd]       = useState(false);
  const [activePage, setActivePage] = useState("certificates");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const totalCount    = certs.length;
  const activeCount   = certs.filter(c => c.status === "active").length;
  const expiringCount = certs.filter(c => c.status === "expiring").length;

  const filteredCerts = certs.filter(c => {
    const matchQ = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   c.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchS = filterStatus === "all" || c.status === filterStatus;
    return matchQ && matchS;
  });

  function handleAdd(cert) {
    setCerts(prev => [...prev, cert]);
  }

  const navItems = [
    { id: "dashboard",    icon: "⊞", label: "Dashboard" },
    { id: "certificates", icon: "🛡", label: "Certificates" },
    { id: "learning",     icon: "🎓", label: "Learning Paths" },
    { id: "history",      icon: "⏱", label: "Renewal History" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "#0f172a" }}>

      {/* Modals */}
      {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
      {showAdd && <AddCertModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}

      {/* ── Sidebar ── */}
      <aside style={{ width: 200, minWidth: 200, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "24px 14px", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, padding: "0 6px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>🛡</div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.3px" }}>CertTrack Pro</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, fontSize: 14, fontWeight: activePage === item.id ? 700 : 500, background: activePage === item.id ? "#f0f9ff" : "transparent", color: activePage === item.id ? "#0284c7" : "#64748b", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", transition: "all .15s" }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "6px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#94a3b8", marginBottom: 10 }}>QUICK ACTIONS</div>
          <button
            onClick={() => setShowAdd(true)}
            style={{ width: "100%", background: "#0284c7", color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}
          >
            🛡 Verify New
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {/* Top nav */}
        <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Certification Dashboard</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}>🔔</button>
            <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}>⚙</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Alex Johnson</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Senior Architect</div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#0284c7,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff" }}>AJ</div>
            </div>
          </div>
        </header>

        <div style={{ padding: "28px 32px" }}>

          {/* Profile card */}
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #e2e8f0", padding: "24px 28px", display: "flex", alignItems: "center", gap: 24, marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: "linear-gradient(135deg,#bfdbfe,#ddd6fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>👤</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#0f172a" }}>Alex Johnson</h2>
              <p style={{ margin: "0 0 10px", fontSize: 14, color: "#64748b" }}>Senior Cloud Solutions Architect</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, borderRadius: 99, padding: "4px 12px", border: "1px solid #bfdbfe" }}>Level 4 Architect</span>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>• ID: CERT-92831-AO</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              {[{ val: totalCount, label: "TOTAL", color: "#0f172a" }, { val: activeCount, label: "ACTIVE", color: "#16a34a" }, { val: expiringCount, label: "EXPIRING", color: "#ca8a04" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Renewal alert */}
          {expiringCount > 0 && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>⚠</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>Renewals Required Soon</div>
                  <div style={{ fontSize: 12, color: "#a16207" }}>{expiringCount} certification{expiringCount > 1 ? "s are" : " is"} expiring within the next 45 days. Schedule your recertification exams to maintain active status.</div>
                </div>
              </div>
              <button style={{ background: "none", border: "none", fontSize: 13, fontWeight: 700, color: "#92400e", cursor: "pointer", whiteSpace: "nowrap" }}>View All</button>
            </div>
          )}

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>✦</span> Verified Certificates
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Filter */}
              <div style={{ display: "flex", gap: 4, background: "#f1f5f9", borderRadius: 8, padding: 3 }}>
                {["all", "active", "expiring", "expired"].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer", background: filterStatus === s ? "#fff" : "transparent", color: filterStatus === s ? "#0f172a" : "#94a3b8", textTransform: "capitalize", fontFamily: "inherit", boxShadow: filterStatus === s ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>
                    {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f1f5f9", borderRadius: 8, padding: "6px 12px" }}>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>🔍</span>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#0f172a", width: 120, fontFamily: "inherit" }} />
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
            {filteredCerts.map(cert => (
              <CertCard key={cert.id} cert={cert} onView={setSelectedCert} />
            ))}

            {/* Add new card */}
            <div
              onClick={() => setShowAdd(true)}
              style={{ background: "#fff", border: "1.5px dashed #cbd5e1", borderRadius: 16, padding: "22px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", minHeight: 220, transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#94a3b8"; e.currentTarget.style.background = "#f8fafc"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.background = "#fff"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#94a3b8" }}>+</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#64748b" }}>Add New Certificate</div>
              <div style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>Upload a PDF or verify via credential URL</div>
            </div>
          </div>

          {/* Verification Log */}
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #e2e8f0", padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: "#0f172a" }}>Verification Log</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>Audit trail of all certificate submissions and manual verifications.</p>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["Date", "Certification Name", "Action", "Status", "Method"].map(h => (
                    <th key={h} style={{ textAlign: "left", fontSize: 12, fontWeight: 700, color: "#94a3b8", padding: "8px 12px", letterSpacing: 0.3 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VERIFICATION_LOG.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ padding: "13px 12px", fontSize: 13, color: "#64748b" }}>{row.date}</td>
                    <td style={{ padding: "13px 12px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{row.cert}</td>
                    <td style={{ padding: "13px 12px", fontSize: 13, color: "#64748b" }}>{row.action}</td>
                    <td style={{ padding: "13px 12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: row.status === "verified" ? "#16a34a" : "#ca8a04" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: row.status === "verified" ? "#16a34a" : "#ca8a04", display: "inline-block" }} />
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: "13px 12px", fontSize: 13, color: "#94a3b8" }}>{row.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
