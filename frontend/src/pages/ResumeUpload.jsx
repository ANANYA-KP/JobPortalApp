import React, { useState, useRef } from 'react';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef();

  const userName = JSON.parse(localStorage.getItem('user') || '{}')?.full_name || 'Alex Smith';

  const navItems = [
    { icon: '⊞', label: 'Dashboard', path: '/candidate-dashboard' },
    { icon: '💼', label: 'My Jobs', path: '/jobs' },
    { icon: '📄', label: 'Resume & Profile', path: '/resumes', active: true },
    { icon: '⚙️', label: 'Settings', path: '/profile-settings' },
  ];

  const handleFile = (f) => {
    if (!f) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(f.type)) { alert('Only PDF or DOCX files allowed.'); return; }
    if (f.size > 10 * 1024 * 1024) { alert('File must be under 10MB.'); return; }
    setFile(f);
    setUploading(true);
    setTimeout(() => { setUploading(false); setUploaded(true); }, 1500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUploadToServer = async () => {
    if (!file) return;
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));
      const response = await fetch('http://127.0.0.1:8000/api/resumes/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (response.ok) {
        alert('Resume uploaded successfully!');
        window.location.href = '/candidate-profile';
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (err) {
      alert('Upload failed. Please try again.');
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: #f1f5f9; }
        .nav-link { color: #475569; text-decoration: none; font-size: 14px; font-weight: 500; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 160px', height: '65px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px' }}>💼</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>JobPortal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            <a href="/jobs" className="nav-link">Jobs</a>
            <a href="#" className="nav-link">Applications</a>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>🔔</button>
            <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>👤</button>
            <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>👤</div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '32px 160px' }}>
        <div style={{ display: 'flex', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>

            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(19,127,236,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>👤</div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{userName}</p>
                <p style={{ fontSize: '12px', color: '#64748B' }}>Product Designer</p>
              </div>
            </div>

            {/* Nav Items */}
            {navItems.map(item => (
              <div key={item.label} className="nav-item"
                style={{ background: item.active ? 'rgba(19,127,236,0.1)' : 'transparent', border: item.active ? '1px solid rgba(19,127,236,0.2)' : '1px solid transparent' }}
                onClick={() => window.location.href = item.path}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: item.active ? '700' : '600', color: item.active ? '#137FEC' : '#475569' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>Upload your resume</h1>
              <p style={{ fontSize: '18px', color: '#64748B', lineHeight: '28px' }}>We'll parse your resume to automatically build your professional profile.</p>
            </div>

            {/* Upload Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '32px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
              <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onClick={() => fileInputRef.current.click()}
                style={{
                  background: dragging ? 'rgba(19,127,236,0.1)' : 'rgba(19,127,236,0.05)',
                  border: `2px dashed ${dragging ? '#137FEC' : 'rgba(19,127,236,0.3)'}`,
                  borderRadius: '12px', padding: '48px 24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>
                {/* Upload Icon */}
                <div style={{ width: '64px', height: '64px', background: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '28px' }}>
                  ☁️
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>
                    {file ? file.name : 'Click or drag & drop to upload'}
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748B' }}>PDF, DOCX up to 10MB</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}
                  style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.25)' }}>
                  Select Resume File
                </button>
              </div>
            </div>

            {/* Parsing Status + File Preview */}
            {file && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                {/* Parsing Status */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>Parsing Status</h2>
                    {uploaded && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#D1FAE5', borderRadius: '9999px', padding: '4px 8px' }}>
                        <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} />
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#047857' }}>Completed</span>
                      </div>
                    )}
                    {uploading && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FEF3C7', borderRadius: '9999px', padding: '4px 8px' }}>
                        <div style={{ width: '6px', height: '6px', background: '#F59E0B', borderRadius: '50%' }} />
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#92400E' }}>Processing...</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { icon: '✅', label: 'Personal Information', detail: 'Found: Name, Email, Phone', done: uploaded },
                      { icon: '✅', label: 'Work Experience', detail: 'Extracted: 3 roles, 5 years', done: uploaded },
                      { icon: uploading ? '🔄' : '✅', label: 'Skills & Expertise', detail: uploading ? 'Analyzing keywords...' : 'Found 12 skills', done: uploaded },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '18px', color: item.done ? '#10B981' : '#137FEC' }}>{item.done ? '✅' : (uploading ? '🔄' : '⭕')}</span>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{item.label}</p>
                          <p style={{ fontSize: '12px', color: '#64748B' }}>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: '16px' }}>
                    <button style={{ width: '100%', padding: '8px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#fff', fontSize: '14px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      ✏️ Verify Information
                    </button>
                  </div>
                </div>

                {/* File Preview */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>File Preview</h2>
                    <button onClick={() => { setFile(null); setUploaded(false); }} style={{ background: 'none', border: 'none', color: '#137FEC', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Replace file</button>
                  </div>

                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '8px', padding: '38px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minHeight: '200px', justifyContent: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(19,127,236,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '4px' }}>📄</div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', textAlign: 'center' }}>{file.name}</p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>Uploaded just now • {formatSize(file.size)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps CTA */}
            <div style={{ background: 'rgba(19,127,236,0.05)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', flexShrink: 0 }}>✨</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Your profile is 85% complete!</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px' }}>Finish adding your skills to attract 3x more employers.</p>
                </div>
              </div>
              <button
                onClick={file ? handleUploadToServer : () => window.location.href = '/profile-setup'}
                style={{ background: '#137FEC', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', height: '48px', boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)' }}>
                {file ? 'Upload Resume' : 'Complete Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '32px 160px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '14px', color: '#64748B' }}>© 2024 JobPortal Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
              <a key={link} href="#" style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeUpload;