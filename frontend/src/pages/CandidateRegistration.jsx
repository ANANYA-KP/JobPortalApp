import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'http://127.0.0.1:8000';

const CandidateRegistration = () => {
  const [fullName, setFullName]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed]             = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [fieldErrors, setFieldErrors]   = useState({});
  const navigate = useNavigate();

  const getStrength = (pwd) => {
    if (!pwd)         return { label:'',       color:'#E2E8F0', w:'0%' };
    if (pwd.length<6) return { label:'Weak',   color:'#EF4444', w:'25%' };
    if (pwd.length<8) return { label:'Fair',   color:'#F59E0B', w:'50%' };
    if (pwd.length<12)return { label:'Good',   color:'#3B82F6', w:'75%' };
    return                   { label:'Strong', color:'#10B981', w:'100%' };
  };
  const strength = getStrength(password);

  const validate = () => {
    const e = {};
    if (!fullName.trim())              e.fullName = 'Full name is required';
    if (!email.trim())                 e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password)                     e.password = 'Password is required';
    else if (password.length < 8)      e.password = 'Minimum 8 characters required';
    if (!agreed)                       e.agreed   = 'Please agree to Terms of Service';
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setLoading(true);
    setError('');

    const parts     = fullName.trim().split(' ');
    const firstName = parts[0] || '';
    const lastName  = parts.slice(1).join(' ') || '';

    try {
      const res = await fetch(`${API}/api/users/register/`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name:  lastName,
          role:       'candidate',
        }),
      });
      const data = await res.json();

      if (res.ok) {
        // Save email for OTP page
        localStorage.setItem('pendingEmail', email);
        // Save OTP for dev testing (shows in console)
        if (data.otp) {
          localStorage.setItem('devOTP', data.otp);
          console.log('🔐 Dev OTP:', data.otp);
        }
        // Save tokens if returned
        if (data.access) {
          localStorage.setItem('token', data.access);
          localStorage.setItem('refresh', data.refresh);
        }
        navigate('/otp-verification');
      } else {
        // Handle field-level errors
        const fe = {};
        if (data.email)    fe.email    = Array.isArray(data.email)    ? data.email[0]    : data.email;
        if (data.password) fe.password = Array.isArray(data.password) ? data.password[0] : data.password;
        if (Object.keys(fe).length) setFieldErrors(fe);
        setError(data.detail || data.message || data.error || 'Registration failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit(); };
  const clearErr = (field) => setFieldErrors(p => ({ ...p, [field]: '' }));

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", minHeight:'100vh', background:'#F6F7F8', display:'flex', flexDirection:'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .inp { width:100%; padding:13px 13px 13px 40px; background:#F8FAFC; border:1.5px solid #E2E8F0; border-radius:8px; font-size:14px; font-family:'Inter',sans-serif; color:#0F172A; outline:none; transition:border .2s,background .2s; }
        .inp::placeholder { color:#94A3B8; }
        .inp:focus { border-color:#137FEC; background:#fff; }
        .inp-err { border-color:#EF4444 !important; background:#FEF2F2 !important; }
        .sbtn { flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:12px; border:1.5px solid #E2E8F0; border-radius:8px; background:#fff; font-size:14px; font-weight:600; color:#0F172A; cursor:pointer; font-family:'Inter',sans-serif; transition:all .2s; }
        .sbtn:hover { background:#F8FAFC; border-color:#137FEC; }
        .pbtn { width:100%; padding:14px; background:#137FEC; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; transition:background .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .pbtn:hover:not(:disabled) { background:#0f6fd4; }
        .pbtn:disabled { background:#94A3B8; cursor:not-allowed; }
        .lnk { color:#137FEC; font-weight:600; cursor:pointer; }
        .lnk:hover { text-decoration:underline; }
        .ferr { font-size:12px; color:#EF4444; margin-top:4px; }
      `}</style>

      {/* NAV */}
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', height:'65px', background:'#fff', borderBottom:'1px solid #E2E8F0' }}>
        <div onClick={() => navigate('/landing')} style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }}>
          <div style={{ background:'#137FEC', borderRadius:'8px', width:'33px', height:'33px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'#fff', fontSize:'14px', fontWeight:'800' }}>J</span>
          </div>
          <span style={{ fontWeight:'700', fontSize:'20px', color:'#0F172A' }}>JobPortal</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <span style={{ fontSize:'14px', color:'#64748B' }}>Already have an account?</span>
          <button onClick={() => navigate('/')} style={{ background:'transparent', color:'#137FEC', border:'1.5px solid #137FEC', padding:'8px 18px', borderRadius:'8px', fontSize:'14px', fontWeight:'700', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            Log In
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 16px' }}>
        <div style={{ background:'#fff', borderRadius:'16px', padding:'44px', width:'100%', maxWidth:'420px', boxShadow:'0 25px 50px -12px rgba(0,0,0,0.15)' }}>

          <div style={{ textAlign:'center', marginBottom:'28px' }}>
            <h1 style={{ fontSize:'26px', fontWeight:'800', color:'#0F172A', marginBottom:'6px' }}>Create your account</h1>
            <p style={{ fontSize:'14px', color:'#64748B' }}>Join thousands of professionals finding dream jobs</p>
          </div>

          {/* Global Error */}
          {error && (
            <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'8px', padding:'11px 14px', marginBottom:'16px', fontSize:'13px', color:'#DC2626' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Social */}
          <div style={{ display:'flex', gap:'10px', marginBottom:'20px' }}>
            <button className="sbtn" onClick={() => alert('Google OAuth — coming soon!')}>
              <div style={{ width:'18px', height:'18px', background:'#4285F4', borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:'#fff', fontSize:'10px', fontWeight:'800' }}>G</span>
              </div>
              Google
            </button>
            <button className="sbtn" onClick={() => alert('GitHub OAuth — coming soon!')}>
              <div style={{ width:'18px', height:'18px', background:'#24292e', borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:'#fff', fontSize:'10px', fontWeight:'800' }}>GH</span>
              </div>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
            <div style={{ flex:1, height:'1px', background:'#E2E8F0' }} />
            <span style={{ fontSize:'11px', color:'#94A3B8', fontWeight:'500', letterSpacing:'0.05em' }}>OR SIGN UP WITH EMAIL</span>
            <div style={{ flex:1, height:'1px', background:'#E2E8F0' }} />
          </div>

          {/* Full Name */}
          <div style={{ marginBottom:'14px' }}>
            <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#0F172A', marginBottom:'5px' }}>Full Name</label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'15px' }}>👤</span>
              <input className={`inp${fieldErrors.fullName ? ' inp-err' : ''}`} type="text" placeholder="John Doe" value={fullName}
                onChange={e => { setFullName(e.target.value); clearErr('fullName'); }} onKeyDown={handleKeyDown} autoComplete="name" />
            </div>
            {fieldErrors.fullName && <p className="ferr">⚠️ {fieldErrors.fullName}</p>}
          </div>

          {/* Email */}
          <div style={{ marginBottom:'14px' }}>
            <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#0F172A', marginBottom:'5px' }}>Email Address</label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'15px' }}>✉️</span>
              <input className={`inp${fieldErrors.email ? ' inp-err' : ''}`} type="email" placeholder="name@company.com" value={email}
                onChange={e => { setEmail(e.target.value); clearErr('email'); }} onKeyDown={handleKeyDown} autoComplete="email" />
            </div>
            {fieldErrors.email && <p className="ferr">⚠️ {fieldErrors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom:'14px' }}>
            <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#0F172A', marginBottom:'5px' }}>Password</label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'15px' }}>🔒</span>
              <input className={`inp${fieldErrors.password ? ' inp-err' : ''}`} type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters" value={password}
                onChange={e => { setPassword(e.target.value); clearErr('password'); }}
                onKeyDown={handleKeyDown} autoComplete="new-password" style={{ paddingRight:'44px' }} />
              <button onClick={() => setShowPassword(!showPassword)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:'16px' }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {/* Strength Bar */}
            {password.length > 0 && (
              <div style={{ marginTop:'6px' }}>
                <div style={{ height:'3px', background:'#E2E8F0', borderRadius:'4px', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:strength.w, background:strength.color, transition:'width .3s' }} />
                </div>
                <p style={{ fontSize:'11px', color:strength.color, marginTop:'3px', fontWeight:'600' }}>{strength.label} password</p>
              </div>
            )}
            {fieldErrors.password && <p className="ferr">⚠️ {fieldErrors.password}</p>}
            <p style={{ fontSize:'11px', color:'#94A3B8', marginTop:'4px' }}>ℹ️ Must be at least 8 characters</p>
          </div>

          {/* Terms */}
          <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', marginBottom:'6px' }}>
            <input type="checkbox" id="agree" checked={agreed}
              onChange={e => { setAgreed(e.target.checked); clearErr('agreed'); }}
              style={{ width:'15px', height:'15px', accentColor:'#137FEC', cursor:'pointer', marginTop:'2px', flexShrink:0 }} />
            <label htmlFor="agree" style={{ fontSize:'13px', color:'#475569', cursor:'pointer', lineHeight:'1.5' }}>
              I agree to the{' '}
              <span className="lnk" onClick={() => navigate('/platform')}>Terms of Service</span>
              {' '}and{' '}
              <span className="lnk" onClick={() => navigate('/privacy')}>Privacy Policy</span>
            </label>
          </div>
          {fieldErrors.agreed && <p className="ferr" style={{ marginBottom:'10px' }}>⚠️ {fieldErrors.agreed}</p>}

          <div style={{ marginBottom:'20px' }} />

          {/* Submit */}
          <button className="pbtn" onClick={handleSubmit} disabled={loading} style={{ marginBottom:'16px' }}>
            {loading ? '⏳ Creating account...' : 'Create Account →'}
          </button>

          {/* Employer */}
          <div style={{ textAlign:'center', marginBottom:'12px' }}>
            <span style={{ fontSize:'13px', color:'#475569' }}>
              Registering as Employer?{' '}
              <span className="lnk" onClick={() => navigate('/employer/login')}>Employer Login</span>
            </span>
          </div>

          {/* Login link */}
          <p style={{ textAlign:'center', fontSize:'13px', color:'#475569' }}>
            Already have an account?{' '}
            <span className="lnk" onClick={() => navigate('/')}>Sign in</span>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign:'center', padding:'20px', borderTop:'1px solid #E2E8F0' }}>
        <p style={{ fontSize:'12px', color:'#94A3B8' }}>© 2024 JobPortal Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CandidateRegistration;