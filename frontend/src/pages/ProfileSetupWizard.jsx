import React, { useState } from 'react';

const ProfileSetupWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [workPreference, setWorkPreference] = useState('Remote');
  const [bio, setBio] = useState('');

  const userName = JSON.parse(localStorage.getItem('user') || '{}')?.full_name || 'Alex Rivera';

  const steps = [
    { title: 'Basic Info', icon: '👤' },
    { title: 'Experience', icon: '💼' },
    { title: 'Education', icon: '🎓' },
    { title: 'Skills & Tools', icon: '🔧' },
  ];

  const completion = 25;

  const handleNext = () => {
    window.location.href = '/candidate-profile';
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 18px 16px; background: #F6F7F8; border: 1px solid #E2E8F0; border-radius: 12px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field::placeholder { color: #6B7280; }
        .input-field:focus { border-color: #137FEC; background: #fff; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .step-active { background: rgba(19,127,236,0.1); border: 1px solid rgba(19,127,236,0.2); border-radius: 12px; }
        .step-inactive { border-radius: 12px; cursor: pointer; }
        .step-inactive:hover { background: #f1f5f9; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 80px', height: '73px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '18px' }}>💼</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobPortal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{userName}</p>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Candidate Account</p>
          </div>
          <div style={{ width: '40px', height: '40px', background: 'rgba(19,127,236,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(19,127,236,0.2)' }}>
            <span style={{ fontSize: '20px' }}>👤</span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, padding: '48px', display: 'flex', gap: '48px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>

        {/* LEFT SIDEBAR */}
        <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', lineHeight: '32px' }}>Profile Setup</h1>
            <p style={{ fontSize: '16px', fontWeight: '500', color: '#64748B', lineHeight: '24px' }}>Step 1 of 4: The Basics</p>
          </div>

          {/* Steps Nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={currentStep === i ? 'step-active' : 'step-inactive'}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', gap: '16px' }}
                onClick={() => setCurrentStep(i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '18px', color: currentStep === i ? '#137FEC' : '#64748B' }}>{step.icon}</span>
                  <span style={{ fontSize: '16px', fontWeight: currentStep === i ? '600' : '500', color: currentStep === i ? '#137FEC' : '#64748B', lineHeight: '24px' }}>{step.title}</span>
                </div>
                {currentStep === i && <span style={{ color: '#137FEC', fontSize: '12px' }}>›</span>}
              </div>
            ))}
          </div>

          {/* Completion Card */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '21px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Completion</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC' }}>{completion}%</span>
              </div>
              <div style={{ background: '#F1F5F9', borderRadius: '9999px', height: '10px', marginBottom: '8px' }}>
                <div style={{ background: '#137FEC', borderRadius: '9999px', height: '10px', width: `${completion}%`, transition: 'width 0.3s ease' }} />
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>Add your work experience to reach 50%</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div style={{ flex: 1 }}>
          <div style={{
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            borderRadius: '24px', padding: '48px',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column', gap: '32px',
            height: '776px'
          }}>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.75px', lineHeight: '36px' }}>
                Tell us about yourself
              </h2>
              <p style={{ fontSize: '18px', color: '#64748B', lineHeight: '28px' }}>
                Your headline and location help recruiters find you for the right roles in your area.
              </p>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>

              {/* Professional Headline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#334155' }}>Professional Headline</label>
                <input
                  className="input-field"
                  placeholder="e.g. Senior Full Stack Developer | React & Node.js"
                  value={headline}
                  onChange={e => setHeadline(e.target.value.slice(0, 80))}
                />
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>Briefly describe your role and expertise (max 80 chars)</p>
              </div>

              {/* Location + Work Preference */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '16px', fontWeight: '600', color: '#334155' }}>Current Location</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '16px' }}>📍</span>
                    <input
                      className="input-field"
                      placeholder="San Francisco, CA"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      style={{ paddingLeft: '44px' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '16px', fontWeight: '600', color: '#334155' }}>Work Preference</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '16px' }}>🏠</span>
                    <select
                      value={workPreference}
                      onChange={e => setWorkPreference(e.target.value)}
                      style={{ width: '100%', padding: '18px 16px 18px 44px', background: '#F6F7F8', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '16px', fontFamily: "'Inter', sans-serif", color: '#0F172A', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                    <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#334155' }}>Bio (Optional)</label>
                <textarea
                  className="input-field"
                  placeholder="Write a short summary about your professional journey..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={5}
                  style={{ resize: 'vertical', fontFamily: "'Inter', sans-serif", lineHeight: '24px' }}
                />
              </div>

              {/* Buttons */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <button
                  onClick={() => window.location.href = '/candidate-dashboard'}
                  style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: 'transparent', fontSize: '16px', fontWeight: '600', color: '#64748B', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                >Skip for now</button>
                <button
                  onClick={handleNext}
                  style={{
                    padding: '16px 40px', borderRadius: '12px', border: 'none',
                    background: '#137FEC', color: '#fff', fontSize: '16px',
                    fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                    boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)'
                  }}
                >Next Step: Experience →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#94A3B8' }}>© 2024 JobPortal Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ProfileSetupWizard;