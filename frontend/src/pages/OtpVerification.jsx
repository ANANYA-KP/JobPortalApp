import React, { useState, useRef } from 'react';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resent, setResent] = useState(false);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(''));
      inputs.current[5].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) { alert('Please enter the complete 6-digit code.'); return; }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: code }),
      });
      if (response.ok) {
        alert('Account verified successfully!');
        window.location.href = '/account-verified';
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (err) {
      alert('Verification failed. Please try again.');
    }
  };

  const handleResend = () => {
    setResent(true);
    setOtp(['', '', '', '', '', '']);
    inputs.current[0].focus();
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .otp-input { width: 48px; height: 56px; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 8px; text-align: center; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: all 0.2s; }
        .otp-input:focus { border-color: #137FEC; background: #fff; box-shadow: 0 0 0 3px rgba(19,127,236,0.1); }
        .otp-input:not(:placeholder-shown) { border-color: #137FEC; background: #fff; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 160px', height: '73px',
        background: '#FFFFFF', borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#137FEC', borderRadius: '8px', padding: '6px', width: '33px', height: '33px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}>J</span>
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.45px', color: '#0F172A' }}>JobPortal</span>
        </div>
        <button style={{ width: '40px', height: '40px', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>?</button>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '130px 32px' }}>
        {/* Card */}
        <div style={{
          background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
          width: '480px', maxWidth: '480px',
          boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>

          {/* Top Blue Banner */}
          <div style={{
            background: 'rgba(19,127,236,0.1)', height: '128px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(51.76% 193.3% at 50% 50%, #137FEC 0%, rgba(19,127,236,0) 50%)',
              opacity: 0.2
            }} />
            <div style={{
              background: '#FFFFFF', borderRadius: '9999px', padding: '16px',
              boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', zIndex: 1
            }}>
              <span style={{ fontSize: '28px' }}>✉️</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.6px', textAlign: 'center' }}>
                Verify your identity
              </h1>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '20px', textAlign: 'center' }}>
                We've sent a 6-digit verification code to{' '}
                <strong style={{ color: '#0F172A' }}>m***@example.com</strong>.
                <br />Please enter it below to secure your account.
              </p>
            </div>

            {/* OTP Inputs */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputs.current[index] = el}
                    className="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    placeholder="·"
                    onChange={e => handleChange(e.target.value, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                onClick={handleVerify}
                style={{
                  width: '100%', height: '48px', background: '#137FEC',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0px 10px 15px -3px rgba(19,127,236,0.2)'
                }}
              >
                Verify Account →
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontSize: '14px', color: '#64748B' }}>Didn't receive the code?</p>
                <button
                  onClick={handleResend}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '14px', fontWeight: '600', color: '#137FEC',
                    fontFamily: "'Inter', sans-serif",
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  🔄 {resent ? 'Code Sent!' : 'Resend Code'}
                </button>
              </div>
            </div>

            {/* Footer info */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>🔒</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>End-to-end encrypted</span>
              </div>
              <div style={{ width: '4px', height: '4px', background: '#CBD5E1', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>🛡️</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Identity verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px 160px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#64748B' }}>© 2024 SecureGuard Verification Services. All rights reserved.</p>
      </div>
    </div>
  );
};

export default OtpVerification;