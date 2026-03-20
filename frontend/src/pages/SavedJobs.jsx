import React, { useState } from 'react';

const SavedJobs = () => {
  const [category, setCategory] = useState('All Jobs');
  const [jobTypes, setJobTypes] = useState(['Remote']);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Date Saved');
  const [page, setPage] = useState(1);

  const [jobs, setJobs] = useState([
    {
      id: 1, title: 'Senior Product Designer', status: 'ACTIVE',
      company: 'TechFlow Inc.', location: 'Remote',
      savedDate: 'Saved Oct 12, 2023', salary: '$120k – $160k', timeLeft: '4 days left',
      applicants: '12 applicants', note: null,
      logo: '🔷', logoBg: '#1e293b',
      action: 'Quick Apply', actionStyle: 'primary',
    },
    {
      id: 2, title: 'Frontend Engineer (React)', status: 'EXPIRED',
      company: 'Creative Solutions', location: 'New York, NY',
      savedDate: 'Saved Sep 28, 2023', salary: '$110k – $145k', timeLeft: null,
      applicants: null, note: 'This job posting has expired.',
      logo: '🟩', logoBg: '#86efac',
      action: 'View Similar Jobs', actionStyle: 'outline-blue',
      closedMsg: 'Applications closed',
    },
    {
      id: 3, title: 'Marketing Manager', status: 'ACTIVE',
      company: 'Global Brands Co.', location: 'Chicago, IL',
      savedDate: 'Saved Oct 20, 2023', salary: '$95k – $130k', timeLeft: '12 days left',
      applicants: 'Be among the first to apply', note: null,
      logo: 'G', logoBg: '#0f172a',
      action: 'Quick Apply', actionStyle: 'primary',
    },
  ]);

  const categories = [
    { label: 'All Jobs', count: 12 },
    { label: 'Active', count: 8 },
    { label: 'Expired', count: 4 },
  ];
  const jobTypeOpts = ['Remote', 'Full-time', 'Contract'];

  const toggleJobType = (t) => setJobTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const filtered = jobs.filter(j => {
    if (category === 'Active' && j.status !== 'ACTIVE') return false;
    if (category === 'Expired' && j.status !== 'EXPIRED') return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const unsave = (id) => setJobs(jobs.filter(j => j.id !== id));

  const statusConfig = {
    ACTIVE: { bg: '#D1FAE5', color: '#047857' },
    EXPIRED: { bg: '#FFE4E6', color: '#BE123C' },
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cat-link { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s; }
        .cat-link:hover { background: #F8FAFC; }
        .job-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: box-shadow 0.2s; }
        .job-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.07); }
        .pg-btn { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; font-size: 15px; font-family: 'Inter', sans-serif; transition: all 0.15s; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', color: '#137FEC' }}>💼</span>
            <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>CareerHub</span>
          </div>
          {[
            { label: 'Find Jobs', path: '/jobs', active: false },
            { label: 'Saved', path: '/saved-jobs', active: true },
            { label: 'Applications', path: '/candidate-dashboard', active: false },
          ].map(item => (
            <a key={item.label} href={item.path} style={{ fontSize: '14px', fontWeight: item.active ? '600' : '500', color: item.active ? '#137FEC' : '#475569', textDecoration: 'none', borderBottom: item.active ? '2px solid #137FEC' : 'none', paddingBottom: item.active ? '2px' : '0' }}>{item.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F1F5F9', borderRadius: '8px', padding: '8px 12px', width: '280px' }}>
            <span style={{ color: '#94A3B8', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search saved jobs..." style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Inter', sans-serif", background: 'transparent', flex: 1, color: '#0F172A' }} />
          </div>
          <button style={{ width: '32px', height: '32px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>🔔</button>
          <div style={{ width: '32px', height: '32px', background: 'rgba(19,127,236,0.2)', border: '1px solid rgba(19,127,236,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: '#137FEC', fontWeight: '700' }}>JD</span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '32px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '32px', width: '100%', maxWidth: '1200px' }}>

          {/* LEFT SIDEBAR */}
          <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Categories */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: '12px' }}>Categories</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {categories.map(c => (
                  <div key={c.label} className="cat-link" style={{ background: category === c.label ? 'rgba(19,127,236,0.1)' : 'transparent' }} onClick={() => setCategory(c.label)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px' }}>{c.label === 'All Jobs' ? '🔖' : c.label === 'Active' ? '✅' : '⏰'}</span>
                      <span style={{ fontSize: '16px', fontWeight: category === c.label ? '600' : '400', color: category === c.label ? '#137FEC' : '#475569' }}>{c.label}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: category === c.label ? '600' : '400', color: category === c.label ? '#137FEC' : '#475569' }}>{c.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', letterSpacing: '0.7px', textTransform: 'uppercase', marginBottom: '12px' }}>Job Type</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {jobTypeOpts.map(t => (
                  <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '11px', cursor: 'pointer' }} onClick={() => toggleJobType(t)}>
                    <div style={{ width: '18px', height: '18px', background: jobTypes.includes(t) ? '#137FEC' : '#fff', border: jobTypes.includes(t) ? 'none' : '1px solid #CBD5E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {jobTypes.includes(t) && <span style={{ color: '#fff', fontSize: '11px', fontWeight: '700' }}>✓</span>}
                    </div>
                    <span style={{ fontSize: '14px', color: '#334155' }}>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* JOB LIST */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A' }}>
                Saved Jobs <span style={{ color: '#137FEC', fontWeight: '600', fontSize: '20px' }}>({filtered.length})</span>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#64748B' }}>Sort by:</span>
                <div style={{ position: 'relative' }}>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '6px 28px 6px 10px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#137FEC', background: '#fff', outline: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", appearance: 'none' }}>
                    {['Date Saved', 'Deadline', 'Salary', 'Relevance'].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#137FEC', fontSize: '11px' }}>▾</span>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filtered.map(job => {
                const sc = statusConfig[job.status];
                return (
                  <div key={job.id} className="job-card">
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                      {/* Logo */}
                      <div style={{ width: '64px', height: '64px', background: job.logoBg, border: '1px solid #F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: job.logo.length === 1 && !job.logo.match(/[\u{1F300}-\u{1F9FF}]/u) ? '22px' : '26px', color: '#fff', fontWeight: '700', flexShrink: 0 }}>{job.logo}</div>
                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{job.title}</h3>
                            <span style={{ background: sc.bg, color: sc.color, fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{job.status}</span>
                          </div>
                          <button onClick={() => unsave(job.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#137FEC', padding: '4px' }} title="Unsave">🔖</button>
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '12px' }}>{job.company} • {job.location}</p>

                        {/* Meta */}
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '14px', color: '#64748B' }}>📅 {job.savedDate}</span>
                          <span style={{ fontSize: '14px', color: '#64748B' }}>💰 {job.salary}</span>
                          {job.timeLeft && <span style={{ fontSize: '14px', color: '#64748B' }}>⏰ {job.timeLeft}</span>}
                          {job.closedMsg && <span style={{ fontSize: '14px', color: '#F43F5E', display: 'flex', alignItems: 'center', gap: '4px' }}>⚠️ {job.closedMsg}</span>}
                        </div>

                        {/* Divider + Footer */}
                        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {/* Applicant info */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {job.applicants && (
                              <>
                                <div style={{ display: 'flex' }}>
                                  {[...Array(2)].map((_, i) => (
                                    <div key={i} style={{ width: '20px', height: '20px', background: i === 0 ? '#CBD5E1' : '#94A3B8', border: '2px solid #fff', borderRadius: '50%', marginLeft: i > 0 ? '-6px' : 0 }} />
                                  ))}
                                </div>
                                <span style={{ fontSize: '12px', color: '#94A3B8' }}>{job.applicants}</span>
                              </>
                            )}
                            {job.note && <span style={{ fontSize: '13px', color: '#94A3B8', fontStyle: 'italic' }}>{job.note}</span>}
                          </div>

                          {/* Actions */}
                          <div style={{ display: 'flex', gap: '12px' }}>
                            {job.actionStyle === 'primary' && (
                              <>
                                <button onClick={() => window.location.href = '/jobs'} style={{ padding: '8px 16px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Details</button>
                                <button style={{ padding: '8px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Quick Apply</button>
                              </>
                            )}
                            {job.actionStyle === 'outline-blue' && (
                              <button style={{ padding: '8px 24px', background: '#fff', border: '1px solid #137FEC', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>View Similar Jobs</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 0', color: '#94A3B8' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔖</div>
                  <p style={{ fontSize: '16px', fontWeight: '600' }}>No saved jobs found</p>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>Browse jobs and save ones you're interested in.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', paddingTop: '32px' }}>
                <button className="pg-btn" onClick={() => setPage(Math.max(1, page - 1))} style={{ border: '1px solid #E2E8F0', background: '#fff', color: '#64748B', fontSize: '13px' }}>‹</button>
                {[1, 2, 3].map(p => (
                  <button key={p} className="pg-btn" onClick={() => setPage(p)} style={{ border: p === page ? 'none' : '1px solid #E2E8F0', background: p === page ? '#137FEC' : '#fff', color: p === page ? '#fff' : '#475569', fontWeight: p === page ? '700' : '400' }}>{p}</button>
                ))}
                <button className="pg-btn" onClick={() => setPage(Math.min(3, page + 1))} style={{ border: '1px solid #E2E8F0', background: '#fff', color: '#64748B', fontSize: '13px' }}>›</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px', color: '#94A3B8' }}>💼</span>
          <span style={{ fontSize: '14px', color: '#94A3B8' }}>© 2023 CareerHub. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Help Center', 'Terms of Service', 'Privacy Policy'].map(l => (
            <a key={l} href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default SavedJobs;