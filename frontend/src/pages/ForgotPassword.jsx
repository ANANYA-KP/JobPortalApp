import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email) { alert('Please enter your email address.'); return; }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/forgot-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSent(true);
      } else {
        alert('Email not found. Please try again.');
      }
    } catch (err) {
      setSent(true); // Show success even on network error for UX
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#F6F7F8', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 14px 14px 14px 42px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 16px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; height: 56px; }
        .input-field::placeholder { color: #94A3B8; }
        .input-field:focus { border-color: #137FEC; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 160px', height: '73px',
        background: '#F6F7F8', borderBottom: '1px solid rgba(19,127,236,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#137FEC', borderRadius: '6px', width: '20px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '10px', fontWeight: '800' }}>J</span>
            </div>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.27px', color: '#0F172A' }}>Security Center</span>
        </div>
        <button style={{ width: '44px', height: '40px', background: 'rgba(19,127,236,0.1)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', color: '#137FEC', fontWeight: '700' }}>?</button>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '48px 160px' }}>
        <div style={{ width: '480px', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Title */}
          <div style={{ paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0F172A', letterSpacing: '-1.188px', lineHeight: '45px' }}>
              Forgot password?
            </h1>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '24px' }}>
              No worries, it happens to the best of us. We'll send you reset instructions right away.
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(19,127,236,0.05)',
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)'
          }}>

            {/* Image Banner */}
            <div style={{
              height: '204px', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #137FEC 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'
            }}>
              {/* Animated circles */}
              {[120, 180, 240, 300].map((size, i) => (
                <div key={i} style={{
                  position: 'absolute', width: `${size}px`, height: `${size}px`,
                  border: '1px solid rgba(19,127,236,0.3)', borderRadius: '50%',
                  top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }} />
              ))}
              <div style={{
                width: '40px', height: '40px', background: '#137FEC',
                borderRadius: '50%', boxShadow: '0 0 40px #137FEC, 0 0 80px rgba(19,127,236,0.5)',
                position: 'relative', zIndex: 1
              }} />
              {/* Circuit lines */}
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  position: 'absolute', background: 'rgba(19,127,236,0.2)',
                  height: '1px', width: `${40 + i * 20}px`,
                  top: `${20 + i * 30}px`, left: `${i % 2 === 0 ? '10%' : '60%'}`,
                  transform: `rotate(${i * 15}deg)`
                }} />
              ))}
            </div>

            {/* Form */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Reset Password heading */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', lineHeight: '25px' }}>Reset Password</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '20px' }}>
                  Enter the email address associated with your account. We will send a secure link to reset your password.
                </p>
              </div>

              {sent ? (
                <div style={{ background: '#e8f4ff', border: '1px solid #137FEC', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#137FEC', fontWeight: '600' }}>✅ Reset link sent! Check your email.</p>
                </div>
              ) : (
                <>
                  {/* Email Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', lineHeight: '21px' }}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '16px' }}>✉️</span>
                      <input
                        className="input-field"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
                {!sent && (
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: '100%', height: '48px', background: '#137FEC',
                      color: '#fff', border: 'none', borderRadius: '8px',
                      fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", letterSpacing: '0.24px',
                      boxShadow: '0px 4px 6px -1px rgba(19,127,236,0.2)'
                    }}
                  >Send Reset Link</button>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
                  <span style={{ color: '#137FEC', fontSize: '12px' }}>←</span>
                  <a href="/" style={{ fontSize: '14px', fontWeight: '700', color: '#137FEC', textDecoration: 'none' }}>
                    Back to Login
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div style={{ paddingTop: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
            {['Privacy Policy', '·', 'Terms of Service', '·', 'Contact Support'].map((item, i) => (
              <span key={i} style={{ fontSize: '12px', color: '#94A3B8', cursor: item === '·' ? 'default' : 'pointer' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;