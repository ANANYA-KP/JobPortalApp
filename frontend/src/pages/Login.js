import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.access) {
        localStorage.setItem('token', data.access);
        window.location.href = '/jobs';
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; padding: 14px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 15px; font-family: 'Inter', sans-serif; color: #0F172A; outline: none; transition: border 0.2s; }
        .input-field::placeholder { color: #94A3B8; }
        .input-field:focus { border-color: #137FEC; background: #fff; }
        .social-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; font-size: 15px; font-weight: 500; color: #0F172A; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
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
          <span style={{ fontSize: '14px', color: '#64748B' }}>Don't have an account?</span>
          <button style={{
            background: '#137FEC', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: '8px', fontSize: '14px',
            fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
          }}>Sign Up</button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
        {/* Login Card */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '48px',
          width: '100%', maxWidth: '440px',
          boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)'
        }}>
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: '15px', color: '#64748B' }}>Please enter your details to sign in</p>
          </div>

          {/* Social Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <button className="social-btn">
              <div style={{ width: '20px', height: '20px', background: '#4285F4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '11px', fontWeight: '800' }}>G</span>
              </div>
              Continue with Google
            </button>
            <button className="social-btn">
              <div style={{ width: '20px', height: '20px', background: '#0A66C2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: '800' }}>in</span>
              </div>
              Continue with LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500', letterSpacing: '0.05em' }}>OR CONTINUE WITH EMAIL</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              className="input-field"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Password</label>
              <a href="/forgot-password" style={{ fontSize: '14px', fontWeight: '600', color: '#137FEC', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                className="input-field"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: '48px' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}
              >👁</button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#137FEC', cursor: 'pointer' }}
            />
            <label htmlFor="remember" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer' }}>
              Remember me for 30 days
            </label>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '14px', background: '#137FEC',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontSize: '16px', fontWeight: '700', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", marginBottom: '24px',
              transition: 'background 0.2s'
            }}
          >Sign In</button>

          {/* Create Account */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#475569' }}>
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#137FEC', fontWeight: '600', textDecoration: 'none' }}>Create an account</a>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '8px' }}>
          {['Privacy Policy', 'Terms of Service', 'Help Center'].map(link => (
            <a key={link} href="#" style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#64748B' }}>© 2024 JobPortal Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;