import React, { useState } from 'react';

const CandidateDashboard = () => {
  const userName = JSON.parse(localStorage.getItem('user') || '{}')?.full_name || 'Alex';

  const stats = [
    { icon: '▶', label: 'Applied Jobs', value: '24', change: '+2', color: '#EFF6FF', iconColor: '#2563EB' },
    { icon: '📅', label: 'Interviews', value: '5', change: '+1', color: '#FAF5FF', iconColor: '#9333EA' },
    { icon: '🔖', label: 'Saved Jobs', value: '12', change: '0 new', color: '#FFFBEB', iconColor: '#D97706' },
  ];

  const jobs = [
    { title: 'Senior Product Designer', company: 'DesignFlow', location: 'Remote', type: 'FULL-TIME', salary: '$120K - $160K', posted: 'Posted 2 days ago', applicants: '14 applicants', gradient: 'linear-gradient(135deg, #6366F1 0%, #9333EA 100%)', saved: false },
    { title: 'UI/UX Interaction Lead', company: 'Sphere Labs', location: 'San Francisco, CA', type: 'ON-SITE', salary: '$140K - $180K', posted: 'Posted 5 hours ago', applicants: '28 applicants', gradient: 'linear-gradient(135deg, #34D399 0%, #14B8A6 100%)', saved: true },
    { title: 'Product Design Manager', company: 'TechGig', location: 'Austin, TX', type: 'HYBRID', salary: '$180K+', posted: 'Posted 1 day ago', applicants: '6 applicants', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)', saved: false },
  ];

  const interviews = [
    { month: 'OCT', day: '12', title: 'UI Designer Interview', subtitle: 'Zoom • 10:30 AM', status: 'Confirmed', statusColor: '#137FEC' },
    { month: 'OCT', day: '15', title: 'Creative Lead Sync', subtitle: 'Office • 02:00 PM', status: 'Pending Ref.', statusColor: '#F59E0B' },
  ];

  const companies = [
    { initial: 'G', name: 'Google', positions: '12 Open Positions' },
    { initial: 'M', name: 'Meta', positions: '4 Open Positions' },
    { initial: 'S', name: 'Stripe', positions: '7 Open Positions' },
  ];

  const navItems = [
    { icon: '⊞', label: 'Dashboard', active: true, badge: null },
    { icon: '💼', label: 'Jobs', active: false, badge: null },
    { icon: '▶', label: 'Applications', active: false, badge: '12' },
    { icon: '🔖', label: 'Saved Jobs', active: false, badge: null },
    { icon: '💬', label: 'Messages', active: false, badge: '3', badgeBlue: true },
    { icon: '👤', label: 'My Profile', active: false, badge: null },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .job-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; box-shadow: 0px 1px 2px rgba(0,0,0,0.05); transition: all 0.2s; }
        .job-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-1px); }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; width: 100%; }
        .nav-item:hover { background: #F1F5F9; }
        .search-input { border: none; outline: none; font-size: 14px; font-family: 'Inter', sans-serif; background: transparent; width: 100%; color: #0F172A; }
        .search-input::placeholder { color: #94A3B8; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#137FEC', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '14px' }}>💼</span>
            </div>
            <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>JobPortal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0', width: '256px', height: '40px', overflow: 'hidden' }}>
            <div style={{ padding: '0 0 0 16px', background: '#F8FAFC', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#64748B', fontSize: '14px' }}>🔍</span>
            </div>
            <input className="search-input" placeholder="Search jobs, companies..." style={{ padding: '10px 12px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>⚙️</button>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{userName} Johnson</p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>Product Designer</p>
            </div>
            <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.2)', borderRadius: '50%', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '18px' }}>👤</span>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* SIDEBAR */}
        <aside style={{ width: '256px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'calc(100vh - 65px)' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => (
              <div key={item.label} className="nav-item" style={{ background: item.active ? '#137FEC' : 'transparent' }}
                onClick={() => {
                  if (item.label === 'Jobs') window.location.href = '/jobs';
                  if (item.label === 'Saved Jobs') window.location.href = '/saved-jobs';
                  if (item.label === 'My Profile') window.location.href = '/candidate-profile';
                  if (item.label === 'Messages') window.location.href = '/notifications';
                }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: '16px', fontWeight: '500', color: item.active ? '#fff' : '#475569', flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ background: item.badgeBlue ? '#137FEC' : '#F1F5F9', color: item.badgeBlue ? '#fff' : '#475569', fontSize: '10px', fontWeight: '500', padding: '2px 6px', borderRadius: '9999px' }}>
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* Profile Strength */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '17px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Profile Strength</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>Excellent</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>85%</span>
            </div>
            <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '6px', marginBottom: '8px' }}>
              <div style={{ background: '#137FEC', borderRadius: '9999px', height: '6px', width: '85%' }} />
            </div>
            <button
              onClick={() => window.location.href = '/profile-setup'}
              style={{ width: '100%', padding: '8px', background: 'rgba(19,127,236,0.1)', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Improve Profile
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: '32px', background: '#F6F7F8' }}>
          <div style={{ maxWidth: '960px' }}>

            {/* Welcome Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>Welcome back, {userName} 👋</h1>
                <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '24px', marginTop: '4px' }}>Here's what's happening with your job applications today.</p>
              </div>
              <button style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}
                onClick={() => window.location.href = '/resumes'}>
                📄 Update Resume
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {stats.map(stat => (
                <div key={stat.label} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '25px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: stat.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{stat.icon}</div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#059669' }}>↑ {stat.change}</span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#64748B', marginBottom: '4px' }}>{stat.label}</p>
                  <p style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 298px', gap: '32px' }}>

              {/* Left: Recommended Jobs */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Recommended for you</h2>
                  <a href="/jobs" style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', textDecoration: 'none' }}>View all</a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {jobs.map((job, i) => (
                    <div key={i} className="job-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                          <div style={{ width: '48px', height: '48px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                            <div style={{ width: '46px', height: '46px', background: job.gradient }} />
                          </div>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{job.title}</h3>
                            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>{job.company} • {job.location}</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <span style={{ background: 'rgba(19,127,236,0.1)', color: '#137FEC', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{job.type}</span>
                              <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: '18px', color: job.saved ? '#137FEC' : '#94A3B8', cursor: 'pointer' }}>{job.saved ? '🔖' : '🔖'}</span>
                      </div>
                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#94A3B8' }}>{job.posted} • {job.applicants}</p>
                        <button style={{ background: '#0F172A', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Apply Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Upcoming Interviews */}
                <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Upcoming Interviews</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {interviews.map((interview, i) => (
                      <div key={i} style={{ display: 'flex', gap: '16px', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ background: interview.statusColor === '#137FEC' ? 'rgba(19,127,236,0.1)' : '#ECFDF5', borderRadius: '8px', width: '50px', minWidth: '50px', height: '55px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: interview.statusColor, textTransform: 'uppercase' }}>{interview.month}</span>
                          <span style={{ fontSize: '18px', fontWeight: '900', color: interview.statusColor }}>{interview.day}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>{interview.title}</p>
                          <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>{interview.subtitle}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', background: interview.statusColor, borderRadius: '50%' }} />
                            <span style={{ fontSize: '10px', fontWeight: '500', color: interview.statusColor }}>{interview.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button style={{ width: '100%', padding: '10px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif", marginTop: '8px' }}>
                    Calendar View
                  </button>
                </div>

                {/* Resume Score */}
                <div style={{ background: 'linear-gradient(135deg, #137FEC 0%, #1D4ED8 100%)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '20px' }}>💡</span>
                    <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Resume Score</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '23px', marginBottom: '16px' }}>
                    Your resume matches 88% of requirements for the Product Design roles you've viewed.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', height: '6px', marginBottom: '8px' }}>
                        <div style={{ background: '#fff', borderRadius: '9999px', height: '6px', width: '88%' }} />
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Good Performance</span>
                    </div>
                    <button style={{ background: '#fff', color: '#137FEC', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>
                      Check Tips
                    </button>
                  </div>
                </div>

                {/* Top Companies */}
                <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Top Companies for you</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {companies.map(company => (
                      <div key={company.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '16px', fontWeight: '700', color: '#137FEC' }}>{company.initial}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>{company.name}</p>
                          <p style={{ fontSize: '11px', color: '#64748B' }}>{company.positions}</p>
                        </div>
                        <span style={{ color: '#137FEC', fontSize: '14px', cursor: 'pointer' }}>›</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;