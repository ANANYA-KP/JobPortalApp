import React, { useState } from 'react';

const CandidateRegistration = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async () => {
    if (!agreed) { alert('Please agree to the Terms of Service and Privacy Policy.'); return; }
    if (password.length < 8) { alert('Password must be at least 8 characters long.'); return; }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Account created successfully!');
        window.location.href = '/otp-verification';
      } else {
        alert(data.detail || 'Registration failed. Please try again.');
      }
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 14px 14px 14px 42px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 15px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field::placeholder { color: #94A3B8; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
        .social-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; font-size: 15px; font-weight: 500; color: #0F172A; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
        .social-btn:hover { background: #F8FAFC; border-color: #137FEC; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '65px', background: '#fff',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '6px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>JobPortal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#64748B' }}>Already have an account?</span>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              background: 'transparent', color: '#137FEC', border: '1px solid #137FEC',
              padding: '8px 20px', borderRadius: '8px', fontSize: '14px',
              fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
            }}>Log In</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '62.5px 32px'
      }}>
        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '48px',
          width: '100%', maxWidth: '440px',
          boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)'
        }}>
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
              Create your account
            </h1>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.6' }}>
              Join thousands of professionals finding their dream jobs today.
            </p>
          </div>

          {/* Social Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button className="social-btn">
              <div style={{ width: '20px', height: '20px', background: '#4285F4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '11px', fontWeight: '800' }}>G</span>
              </div>
              Google
            </button>
            <button className="social-btn">
              <div style={{ width: '20px', height: '20px', background: '#24292e', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '11px', fontWeight: '800' }}>GH</span>
              </div>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500', letterSpacing: '0.05em' }}>OR SIGN UP WITH EMAIL</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Full Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '16px' }}>👤</span>
              <input className="input-field" type="text" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '16px' }}>✉️</span>
              <input className="input-field" type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '16px' }}>🔒</span>
              <input
                className="input-field"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: '48px' }}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>👁</button>
            </div>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ℹ️ Must be at least 8 characters long
            </p>
          </div>

          {/* Terms Checkbox */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '24px' }}>
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#137FEC', cursor: 'pointer', marginTop: '2px', flexShrink: 0 }}
            />
            <label htmlFor="agree" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer', lineHeight: '1.5' }}>
              I agree to the{' '}
              <a href="#" style={{ color: '#137FEC', fontWeight: '600', textDecoration: 'none' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" style={{ color: '#137FEC', fontWeight: '600', textDecoration: 'none' }}>Privacy Policy</a>.
            </label>
          </div>

          {/* Create Account Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '14px', background: '#137FEC',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontSize: '16px', fontWeight: '700', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            Create Account →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <p style={{ fontSize: '13px', color: '#64748B' }}>© 2024 JobPortal Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CandidateRegistration;