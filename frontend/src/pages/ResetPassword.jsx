import React, { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(newPassword);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength] || '';
  const strengthPercent = [0, 25, 50, 75, 85][strength] || 0;
  const strengthColor = ['#e2e8f0', '#ef4444', '#f59e0b', '#3b82f6', '#137FEC'][strength] || '#e2e8f0';

  const checks = [
    { label: '8+ Characters', pass: newPassword.length >= 8 },
    { label: 'Mixed Case', pass: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) },
    { label: 'Numbers', pass: /[0-9]/.test(newPassword) },
    { label: 'Special Symbol', pass: /[^a-zA-Z0-9]/.test(newPassword) },
  ];

  const handleSubmit = async () => {
    if (newPassword.length < 8) { alert('Password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { alert('Passwords do not match.'); return; }
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const response = await fetch('http://127.0.0.1:8000/api/users/reset-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      });
      if (response.ok) {
        alert('Password updated successfully!');
        window.location.href = '/';
      } else {
        alert('Reset failed. Please try again.');
      }
    } catch (err) {
      alert('Reset failed. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 14px 44px 14px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; height: 49px; }
        .input-field::placeholder { color: #6B7280; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '65px',
        background: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(19,127,236,0.1)',
        backdropFilter: 'blur(6px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '8px', width: '32px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>SecureVault</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'transparent', border: 'none', fontSize: '14px', fontWeight: '500', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Support</button>
          <div style={{ width: '1px', height: '16px', background: '#E2E8F0' }} />
          <button style={{ background: 'rgba(19,127,236,0.1)', border: '1px solid rgba(19,127,236,0.2)', borderRadius: '8px', padding: '6px 12px', fontSize: '14px', fontWeight: '600', color: '#137FEC', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛡️ Secure Mode
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '51.5px 24px' }}>
        <div style={{ width: '448px', maxWidth: '448px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Card */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(19,127,236,0.1)',
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)'
          }}>

            {/* Card Header */}
            <div style={{ padding: '32px 32px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Icon */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(19,127,236,0.1)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '28px' }}>🔄</span>
                </div>
              </div>

              {/* Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.6px', textAlign: 'center' }}>
                  Reset Password
                </h1>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px', textAlign: 'center' }}>
                  Please choose a strong password that you haven't used before.
                </p>
              </div>
            </div>

            {/* Form */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* New Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="input-field"
                    type={showNew ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <button onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>👁</button>
                </div>

                {/* Password Strength */}
                {newPassword && (
                  <div style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Security Strength</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: strengthColor }}>{strengthLabel} ({strengthPercent}%)</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ background: '#E2E8F0', borderRadius: '9999px', height: '6px', position: 'relative' }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${strengthPercent}%`, background: strengthColor,
                        borderRadius: '9999px', boxShadow: `0 0 8px ${strengthColor}50`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>

                    {/* Checks */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {checks.map(check => (
                        <div key={check.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '12px', color: check.pass ? '#16A34A' : '#94A3B8' }}>
                            {check.pass ? '✅' : '⭕'}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: '500', color: check.pass ? '#16A34A' : '#94A3B8' }}>
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="input-field"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{ borderColor: confirmPassword && confirmPassword !== newPassword ? '#ef4444' : '#E2E8F0' }}
                  />
                  <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>👁</button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p style={{ fontSize: '12px', color: '#ef4444' }}>Passwords do not match</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%', height: '52px', background: '#137FEC',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.25)'
                }}
              >
                Update Password →
              </button>

              {/* Back to Login */}
              <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748B' }}>
                Changed your mind?{' '}
                <a href="/" style={{ color: '#137FEC', fontWeight: '600', textDecoration: 'none' }}>Back to Login</a>
              </p>
            </div>

            {/* Card Footer */}
            <div style={{ background: '#F8FAFC', borderTop: '1px solid #F1F5F9', padding: '16px 32px' }}>
              <p style={{ fontSize: '12px', color: '#64748B', textAlign: 'center', marginBottom: '8px' }}>
                Your password is encrypted before transmission
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px' }}>🛡️</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '1.2px', textTransform: 'uppercase' }}>ISO 27001</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px' }}>🔒</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '1.2px', textTransform: 'uppercase' }}>256-BIT AES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid rgba(19,127,236,0.05)', padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#94A3B8' }}>© 2024 SecureVault Inc. All rights reserved. Your security is our priority.</p>
      </div>
    </div>
  );
};

export default ResetPassword;