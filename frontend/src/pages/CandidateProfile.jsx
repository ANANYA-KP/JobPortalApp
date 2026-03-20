import React, { useState } from 'react';

const CandidateProfile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Experience', 'Education', 'Skills & Endorsements'];

  const skills = [
    { name: 'Product Design', blue: true },
    { name: 'UI/UX Strategy', blue: true },
    { name: 'Design Systems', blue: true },
    { name: 'Figma Mastery', blue: true },
    { name: 'Prototyping', blue: true },
    { name: 'User Research', blue: false },
    { name: 'HTML/CSS', blue: false },
    { name: 'Interaction Design', blue: false },
    { name: '+16 more', blue: false },
  ];

  const experiences = [
    {
      icon: '📋',
      title: 'Senior Product Designer',
      company: 'TechFlow Systems • Full-time',
      period: 'Jan 2021 — Present (3.5 yrs)',
      desc: 'Leading the design effort for the flagship SaaS product. Managed a team of 4 junior designers and established the company\'s first scalable design system.'
    },
    {
      icon: '🔗',
      title: 'UX/UI Designer',
      company: 'Innova Digital Agency',
      period: 'Mar 2017 — Dec 2020 (3.9 yrs)',
      desc: 'Worked on multiple high-profile client projects including mobile banking apps and e-commerce platforms. Improved user retention by 25% for a key retail client.'
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-link { padding: 16px 16px 14px; font-size: 14px; font-weight: 700; cursor: pointer; border: none; background: none; font-family: 'Inter', sans-serif; transition: color 0.2s; }
        .skill-tag-blue { background: rgba(19,127,236,0.1); border: 1px solid rgba(19,127,236,0.2); color: #137FEC; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 9999px; }
        .skill-tag-gray { background: #F1F5F9; border: 1px solid #E2E8F0; color: #475569; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 9999px; }
        .nav-link { color: #475569; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #137FEC; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '28px' }}>🌐</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>CareerPort</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/jobs" className="nav-link">Jobs</a>
          <a href="#" className="nav-link">Network</a>
          <a href="/candidate-profile" style={{ color: '#137FEC', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Profile</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
          <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>⚙️</button>
          <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.2)', borderRadius: '50%', border: '2px solid rgba(19,127,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px' }}>👤</span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '32px 160px' }}>
        <div style={{ display: 'flex', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ width: '309px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Profile Card */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              {/* Avatar */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', position: 'relative' }}>
                <div style={{ position: 'relative', width: '128px', height: '128px' }}>
                  <div style={{ width: '128px', height: '128px', background: 'linear-gradient(135deg, #e0f0ff, #c7e0ff)', borderRadius: '50%', border: '4px solid #fff', boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>👤</div>
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '24px', height: '24px', background: '#22C55E', borderRadius: '50%', border: '4px solid #fff' }} />
                </div>
              </div>

              {/* Name & Title */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Alex Rivera</h1>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#137FEC', marginBottom: '4px' }}>Senior Product Designer</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>📍</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>San Francisco, CA • Remote</span>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => window.location.href = '/profile-setup'} style={{ width: '100%', padding: '10px', background: '#137FEC', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Edit Profile</button>
                <button style={{ width: '100%', padding: '10px', background: '#F1F5F9', color: '#334155', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Download CV</button>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Quick Stats</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { value: '8', label: 'YEARS EXP.' },
                  { value: '12', label: 'PROJECTS' },
                  { value: '24', label: 'SKILLS' },
                  { value: '4', label: 'AWARDS' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'rgba(248,250,252,0.5)', border: '1px solid #F1F5F9', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#137FEC', marginBottom: '4px' }}>{stat.value}</p>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Contact Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '✉️', label: 'EMAIL', value: 'alex.rivera@design.com' },
                  { icon: '📱', label: 'PHONE', value: '+1 (555) 902-3456' },
                  { icon: '🔗', label: 'PORTFOLIO', value: 'arivera.design', link: true },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '32px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{item.icon}</div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>{item.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: item.link ? '#137FEC' : '#0F172A' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Tabs Card */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              {/* Tab Bar */}
              <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', padding: '0 24px' }}>
                {tabs.map(tab => (
                  <button key={tab} className="tab-link"
                    onClick={() => setActiveTab(tab)}
                    style={{ color: activeTab === tab ? '#137FEC' : '#64748B', borderBottom: activeTab === tab ? '2px solid #137FEC' : '2px solid transparent', marginBottom: '-1px' }}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* About Me */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#137FEC' }}>👤</span> About Me
                  </h3>
                  <p style={{ fontSize: '16px', color: '#475569', lineHeight: '26px' }}>
                    Passionate Product Designer with over 8 years of experience in creating user-centered digital products. Specialist in Design Systems and interactive prototyping. I thrive on bridging the gap between design and engineering to deliver seamless user experiences.
                  </p>
                </div>

                {/* Work Experience */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#137FEC' }}>💼</span> Work Experience
                    </h3>
                    <button style={{ background: 'none', border: 'none', color: '#137FEC', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '4px' }}>
                      + Add New
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {experiences.map((exp, i) => (
                      <div key={i} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ marginTop: '4px' }}>
                          <div style={{ width: '48px', height: '48px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{exp.icon}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <div>
                              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{exp.title}</h4>
                              <p style={{ fontSize: '16px', fontWeight: '500', color: '#475569' }}>{exp.company}</p>
                            </div>
                            <p style={{ fontSize: '14px', color: '#94A3B8', whiteSpace: 'nowrap' }}>{exp.period}</p>
                          </div>
                          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '23px' }}>{exp.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#137FEC' }}>🎓</span> Education
                  </h3>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, marginTop: '4px' }}>🎓</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>BFA in Graphic Design</h4>
                          <p style={{ fontSize: '16px', fontWeight: '500', color: '#475569' }}>Rhode Island School of Design</p>
                        </div>
                        <p style={{ fontSize: '14px', color: '#94A3B8' }}>2013 — 2017</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Skills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#137FEC' }}>⚙️</span> Top Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.map(skill => (
                      <span key={skill.name} className={skill.blue ? 'skill-tag-blue' : 'skill-tag-gray'}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: '#137FEC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🚀</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Ready for your next challenge?</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>Your profile is 85% complete. Completing it increases visibility to recruiters by 40%.</p>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/profile-setup'}
                style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '8px 27px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', height: '56px' }}>
                Finish Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '32px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#64748B' }}>© 2024 CareerPort. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CandidateProfile;