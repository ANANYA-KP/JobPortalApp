import React, { useState } from 'react';

const ResumeUploadFlow = () => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress] = useState(85);

  const parsedData = {
    fileName: 'John_Doe_CV_2024.pdf',
    fileSize: '1.2 MB • Uploaded 2 mins ago',
    fullName: 'John Alexander Doe',
    email: 'john.doe@example.com',
    latestExp: 'Senior Product Designer at TechGlobal Inc.',
  };

  const helpCards = [
    { icon: '🛡️', title: 'Secure Upload', sub: 'Encrypted transmission' },
    { icon: '🔒', title: 'GDPR Compliant', sub: 'Your data is protected' },
    { icon: '💬', title: 'Need Help?', sub: 'Contact support center' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#F6F7F8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .nav-link { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; transition: color 0.15s; }
        .nav-link:hover { color: #137FEC; }
        .btn-primary { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 11.5px 32px 12.5px; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2), 0px 4px 6px -4px rgba(19,127,236,0.2); transition: background 0.2s; white-space: nowrap; }
        .btn-primary:hover { background: #0e6fd4; }
        .btn-outline { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #334155; cursor: pointer; padding: 10.5px 24px 11.5px; transition: background 0.2s; white-space: nowrap; }
        .btn-outline:hover { background: #F8FAFC; }
        .btn-browse { background: #137FEC; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; padding: 11.5px 24px 12.5px; box-shadow: 0px 10px 15px -3px rgba(19,127,236,0.2); transition: background 0.2s; }
        .btn-browse:hover { background: #0e6fd4; }
        .btn-linkedin { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #334155; cursor: pointer; padding: 10.5px 24px 11.5px; transition: background 0.2s; }
        .btn-linkedin:hover { background: #F8FAFC; }
        .btn-back { background: none; border: none; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #475569; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 0; transition: color 0.15s; }
        .btn-back:hover { color: #0F172A; }
        .drop-zone { border: 2px dashed rgba(19,127,236,0.3); border-radius: 12px; background: rgba(19,127,236,0.05); transition: border-color 0.2s, background 0.2s; cursor: pointer; }
        .drop-zone.dragover { border-color: #137FEC; background: rgba(19,127,236,0.1); }
        .drop-zone:hover { border-color: rgba(19,127,236,0.5); }
        .crumb { font-size: 14px; font-weight: 500; color: #64748B; text-decoration: none; display: flex; align-items: center; gap: 4px; }
        .crumb:hover { color: #137FEC; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(19,127,236,0.1)',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
        padding: '16px 160px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: 32, height: 32,
            background: 'rgba(19,127,236,0.1)', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
          }}>💼</div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>TalentFlow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {['Explore Jobs', 'My Applications', 'Talent Profile'].map(l => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(19,127,236,0.2)',
            border: '2px solid rgba(19,127,236,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', cursor: 'pointer', color: '#137FEC',
          }}>👤</div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, padding: '32px 160px' }}>
        <div style={{ width: '960px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* BREADCRUMBS */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 0' }}>
            <a href="#" className="crumb">🏠 Home</a>
            <span style={{ color: '#CBD5E1', fontSize: '14px' }}>/</span>
            <a href="#" className="crumb">Senior Product Designer</a>
            <span style={{ color: '#CBD5E1', fontSize: '14px' }}>/</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#137FEC' }}>Resume Upload</span>
          </nav>

          {/* MAIN CARD */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column', gap: '32px',
          }}>

            {/* STEPPER HEADER */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '24px', borderBottom: '1px solid #F1F5F9',
            }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>
                  Apply for Senior Product Designer
                </h1>
                <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                  Complete your application profile to stand out
                </p>
              </div>

              {/* Step bubbles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[1, 2, 3].map((n, i) => (
                  <React.Fragment key={n}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: n === 1 ? '#137FEC' : '#F1F5F9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '14px',
                      color: n === 1 ? '#FFFFFF' : '#94A3B8',
                    }}>{n}</div>
                    {i < 2 && <div style={{ width: 32, height: 2, background: '#E2E8F0' }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* TWO-COLUMN CONTENT */}
            <div style={{ display: 'flex', gap: '48px', padding: '0 24px' }}>

              {/* LEFT: Upload Zone */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Section title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0' }}>
                  <span style={{ fontSize: '18px', color: '#137FEC' }}>📄</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Resume Upload</h3>
                </div>

                {/* Drop zone */}
                <div
                  className={`drop-zone${dragOver ? ' dragover' : ''}`}
                  style={{ padding: '64px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); }}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input id="file-upload" type="file" accept=".pdf,.docx" style={{ display: 'none' }} />

                  {/* Upload icon circle */}
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'rgba(19,127,236,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
                  }}>☁️</div>

                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Drag and drop your resume here</p>
                    <p style={{ fontSize: '14px', color: '#64748B' }}>Maximum file size 5MB. PDF or DOCX formats only.</p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-browse" onClick={e => { e.stopPropagation(); }}>Browse Files</button>
                    <button className="btn-linkedin" onClick={e => e.stopPropagation()}>Import from LinkedIn</button>
                  </div>
                </div>

                {/* Info box */}
                <div style={{
                  background: '#EFF6FF', borderRadius: '8px',
                  padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '16px', color: '#137FEC', flexShrink: 0, marginTop: '1px' }}>ℹ️</span>
                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: '20px' }}>
                    Our AI will automatically parse your information to pre-fill your application form, saving you time. Review the extracted data on the next step.
                  </p>
                </div>
              </div>

              {/* RIGHT: Parsing Status */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Section title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px', color: '#137FEC' }}>📊</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Parsing Status</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Active File Card */}
                  <div style={{
                    background: '#F8FAFC', border: '1px solid #E2E8F0',
                    borderRadius: '8px', padding: '16px', display: 'flex',
                    flexDirection: 'column', gap: '16px',
                  }}>
                    {/* File row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '4px',
                          background: '#FEE2E2',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '16px', color: '#DC2626',
                        }}>📕</div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{parsedData.fileName}</p>
                          <p style={{ fontSize: '12px', color: '#64748B' }}>{parsedData.fileSize}</p>
                        </div>
                      </div>
                      <button style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '16px', color: '#94A3B8',
                      }}>🗑️</button>
                    </div>

                    {/* Progress bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '10px', color: '#137FEC' }}>⟳</span>
                          <span style={{ fontSize: '12px', fontWeight: 500, color: '#137FEC' }}>Processing Information...</span>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>{uploadProgress}%</span>
                      </div>
                      <div style={{ height: 8, background: '#E2E8F0', borderRadius: '9999px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{
                          position: 'absolute', left: 0, top: 0, bottom: 0,
                          width: `${uploadProgress}%`, background: '#137FEC', borderRadius: '9999px',
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Extracted Preview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Extracted Preview:</p>

                    {/* 2x2 parsed fields grid */}
                    <div style={{ position: 'relative', height: '146px' }}>
                      {/* Full Name */}
                      <div style={{
                        position: 'absolute', left: 0, right: '51%', top: 0,
                        background: '#FFFFFF', border: '1px solid #F1F5F9',
                        borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px',
                      }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Full Name</span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{parsedData.fullName}</span>
                      </div>

                      {/* Email */}
                      <div style={{
                        position: 'absolute', left: '51%', right: 0, top: 0,
                        background: '#FFFFFF', border: '1px solid #F1F5F9',
                        borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px',
                      }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Email</span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{parsedData.email}</span>
                      </div>

                      {/* Latest Experience */}
                      <div style={{
                        position: 'absolute', left: 0, right: 0, top: '81px',
                        background: '#FFFFFF', border: '1px solid #F1F5F9',
                        borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px',
                      }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Latest Experience</span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{parsedData.latestExp}</span>
                      </div>
                    </div>

                    {/* Success message */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#16A34A' }}>✅</span>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: '#16A34A' }}>Resume parsed successfully</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '24px',
              background: '#F8FAFC', borderTop: '1px solid #F1F5F9',
            }}>
              <button className="btn-back">
                <span>←</span> Back to job details
              </button>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-outline">Save Draft</button>
                <button className="btn-primary">Next: Review Profile</button>
              </div>
            </div>
          </div>

          {/* HELP CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px' }}>
            {helpCards.map(card => (
              <div key={card.title} style={{
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex', alignItems: 'center', gap: '16px',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>{card.icon}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{card.title}</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid #E2E8F0',
        padding: '32px 160px',
        display: 'flex', justifyContent: 'center',
      }}>
        <p style={{ fontSize: '14px', color: '#64748B', textAlign: 'center' }}>
          © 2024 TalentFlow Recruitment Platforms. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ResumeUploadFlow;