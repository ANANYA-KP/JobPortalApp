import React, { useState } from 'react';

const CandidateResumes = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [startMonth, setStartMonth] = useState('Month');
  const [startYear, setStartYear] = useState('Year');
  const [endMonth, setEndMonth] = useState('Month');
  const [endYear, setEndYear] = useState('Year');
  const [description, setDescription] = useState('');
  const [currentlyWork, setCurrentlyWork] = useState(false);
  const [activeSection, setActiveSection] = useState('Work Experience');

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const years = Array.from({length: 30}, (_, i) => String(2024 - i));

  const sections = [
    { icon: '👤', label: 'Personal Info' },
    { icon: '🎓', label: 'Education' },
    { icon: '💼', label: 'Work Experience' },
    { icon: '🔧', label: 'Skills' },
    { icon: '📁', label: 'Projects' },
    { icon: '🏆', label: 'Certifications' },
  ];

  const Select = ({ value, onChange, options, style }) => (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: '10px 12px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '16px', fontFamily: "'Inter', sans-serif", color: value === 'Month' || value === 'Year' ? '#6B7280' : '#0F172A', outline: 'none', cursor: 'pointer', appearance: 'none', paddingRight: '32px', ...style }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 10px 12px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #137FEC; }
        .input-field::placeholder { color: #6B7280; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: #f1f5f9; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 40px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px' }}>📄</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>ResumeCraft</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['Templates', 'My Resumes', 'Expert Tips'].map(item => (
            <span key={item} style={{ fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>{item}</span>
          ))}
          <div style={{ width: '1px', height: '24px', background: '#E2E8F0' }} />
          <button style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
            ↓ Export PDF
          </button>
          <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>👤</div>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: '256px', background: '#FFFFFF', borderRight: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Resume Builder</h2>
            <p style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase', lineHeight: '16px' }}>Draft: Senior Product Designer</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sections.map(section => (
              <div key={section.label} className="nav-item"
                style={{ background: activeSection === section.label ? 'rgba(19,127,236,0.1)' : 'transparent', border: activeSection === section.label ? '1px solid rgba(19,127,236,0.2)' : '1px solid transparent' }}
                onClick={() => setActiveSection(section.label)}>
                <span style={{ fontSize: '16px' }}>{section.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: activeSection === section.label ? '700' : '500', color: activeSection === section.label ? '#137FEC' : '#475569' }}>{section.label}</span>
              </div>
            ))}
          </div>

          {/* Profile Strength */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>Profile Strength</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#137FEC' }}>65%</span>
              </div>
              <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '6px' }}>
                <div style={{ background: '#137FEC', borderRadius: '9999px', height: '6px', width: '65%' }} />
              </div>
              <p style={{ fontSize: '10px', color: '#64748B', lineHeight: '16px' }}>Add your skills to reach 80% and unlock premium templates.</p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: '40px', background: '#F6F7F8', overflowY: 'auto' }}>
          <div style={{ maxWidth: '624px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Breadcrumbs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>Dashboard</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>›</span>
              <span style={{ fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>Resume Editor</span>
              <span style={{ fontSize: '12px', color: '#0F172A' }}>›</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>{activeSection}</span>
            </div>

            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.75px' }}>{activeSection}</h1>
                <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>List your professional history starting from your most recent role.</p>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter', sans-serif", height: '58px' }}>
                + Add New Role
              </button>
            </div>

            {/* Form Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Job Title + Company */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Job Title</label>
                    <input className="input-field" placeholder="e.g. Senior Product Designer" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Company</label>
                    <input className="input-field" placeholder="e.g. TechFlow Inc." value={company} onChange={e => setCompany(e.target.value)} />
                  </div>
                </div>

                {/* Start Date + End Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Start Date</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <Select value={startMonth} onChange={setStartMonth} options={['Month', ...months]} style={{ width: '100%' }} />
                        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                      </div>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <Select value={startYear} onChange={setStartYear} options={['Year', ...years]} style={{ width: '100%' }} />
                        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>End Date</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <Select value={endMonth} onChange={setEndMonth} options={['Month', ...months]} style={{ width: '100%' }} />
                        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                      </div>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <Select value={endYear} onChange={setEndYear} options={['Year', ...years]} style={{ width: '100%' }} />
                        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>▾</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Description</label>
                    <button style={{ background: 'none', border: 'none', color: '#137FEC', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ✨ AI Write
                    </button>
                  </div>
                  <textarea className="input-field" placeholder="Describe your responsibilities and achievements..." value={description} onChange={e => setDescription(e.target.value)} rows={6} style={{ resize: 'vertical', fontFamily: "'Inter', sans-serif", lineHeight: '24px' }} />
                </div>

                {/* Currently Work Here */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px' }}>
                  <input type="checkbox" id="current" checked={currentlyWork} onChange={e => setCurrentlyWork(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#137FEC', cursor: 'pointer' }} />
                  <label htmlFor="current" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer' }}>I currently work here</label>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '500', color: '#64748B', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                  🗑️ Remove Entry
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ padding: '8px 24px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#0F172A', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Save Draft</button>
                  <button style={{ padding: '8px 24px', background: '#137FEC', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)' }}>Save and Next</button>
                </div>
              </div>
            </div>

            {/* Bottom Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'stretch' }}>
              {/* Pro Tip */}
              <div style={{ background: '#137FEC', borderRadius: '16px', padding: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ width: '32px', height: '64px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>💡</div>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Pro Tip: Quantify your impact</h4>
                  <p style={{ fontSize: '14px', color: '#fff', lineHeight: '20px' }}>Instead of "Managed team", try "Managed a team of 12 designers and increased output by 25%."</p>
                </div>
              </div>

              {/* Quick Preview */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '192px', justifyContent: 'center' }}>
                <span style={{ fontSize: '22px', color: '#94A3B8' }}>👁️</span>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', textAlign: 'center' }}>Quick Preview</p>
                <p style={{ fontSize: '12px', color: '#64748B', textAlign: 'center', lineHeight: '16px' }}>See how this entry looks on your template.</p>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT PREVIEW SIDEBAR */}
        <aside style={{ width: '320px', background: '#FFFFFF', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
          {/* Preview Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Live Preview</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ width: '22px', height: '22px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>🔍</button>
              <button style={{ width: '21px', height: '21px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>🔄</button>
            </div>
          </div>

          {/* Resume Preview */}
          <div style={{ flex: 1, background: '#F1F5F9', padding: '24px', overflowY: 'auto' }}>
            {/* Mock Resume */}
            <div style={{ background: '#FFFFFF', padding: '24px', boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)' }}>
              {/* Header */}
              <div style={{ borderBottom: '2px solid #137FEC', paddingBottom: '16px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {jobTitle ? jobTitle.split(' ').slice(0,2).join(' ').toUpperCase() : 'JOHNATHAN DOE'}
                </h2>
                <p style={{ fontSize: '10px', fontWeight: '500', color: '#64748B' }}>{jobTitle || 'Senior Product Designer'}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {['john@example.com', '+1 234 567 890', 'San Francisco, CA'].map(item => (
                    <span key={item} style={{ fontSize: '6px', color: '#94A3B8' }}>{item}</span>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '8px', fontWeight: '700', color: '#137FEC', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '8px' }}>SUMMARY</p>
                <p style={{ fontSize: '8px', color: '#475569', lineHeight: '10px' }}>Dynamic and creative Product Designer with 8+ years of experience in building scalable design systems and user-centric mobile applications...</p>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '8px', fontWeight: '700', color: '#137FEC', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '8px' }}>EXPERIENCE</p>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p style={{ fontSize: '8px', fontWeight: '700', color: '#0F172A' }}>
                      {jobTitle && company ? `${jobTitle} | ${company}` : 'Senior Product Designer | TechFlow Inc.'}
                    </p>
                    <p style={{ fontSize: '8px', color: '#94A3B8' }}>Jan 2023 - Present</p>
                  </div>
                  <p style={{ fontSize: '8px', color: '#475569', lineHeight: '10px' }}>
                    {description || 'Lead design for the flagship enterprise dashboard used by 50k+ daily active users.'}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p style={{ fontSize: '8px', fontWeight: '700', color: '#137FEC', textTransform: 'uppercase', borderBottom: '1px solid #E2E8F0', paddingBottom: '2px', marginBottom: '8px' }}>SKILLS</p>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {['Figma', 'UI/UX', 'React', 'Design Systems'].map(skill => (
                    <span key={skill} style={{ background: '#F1F5F9', borderRadius: '4px', padding: '2px 6px', fontSize: '8px', color: '#0F172A' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Change Template Button */}
          <div style={{ padding: '16px', borderTop: '1px solid #F1F5F9' }}>
            <button style={{ width: '100%', padding: '8px', background: '#0F172A', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Change Template
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CandidateResumes;