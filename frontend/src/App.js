jobportelteam
jobportelteam
import React, { useState, useCallback } from 'react';
import RequirementsPanel from './components/RequirementsPanel';
import CandidateCard from './components/CandidateCard';
import StatsBar from './components/StatsBar';
import OnlineAssessmentTest from './components/OnlineAssessmentTest';
import { MOCK_CANDIDATES, EXPERIENCE_LEVELS, EDUCATION_LEVELS } from './data';

const EDUCATION_ORDER = ["Any", "High School", "Associate's", "Bachelor's", "Master's", "PhD"];

const defaultRequirements = {
  jobTitle: '',
  skills: [],
  experienceLevel: 'Any',
  education: 'Any',
  minScore: 0,
};

function computeScore(candidate, requirements) {
  let score = 50;
  if (requirements.skills.length > 0) {
    const matched = requirements.skills.filter(s => candidate.skills.includes(s)).length;
    score = Math.round((matched / requirements.skills.length) * 100);
  } else {
    score = 60 + Math.floor(Math.random() * 35);
  }
  const expLevel = EXPERIENCE_LEVELS.find(l => l.label === requirements.experienceLevel);
  if (expLevel && expLevel.label !== 'Any') {
    if (candidate.experienceYears >= expLevel.min && candidate.experienceYears <= expLevel.max) {
      score = Math.min(100, score + 5);
    } else {
      score = Math.max(0, score - 10);
    }
  }
  const reqEduIndex = EDUCATION_ORDER.indexOf(requirements.education);
  const candEduIndex = EDUCATION_ORDER.indexOf(candidate.education);
  if (requirements.education !== 'Any') {
    if (candEduIndex >= reqEduIndex) {
      score = Math.min(100, score + 5);
    } else {
      score = Math.max(0, score - 8);
    }
  }
  return score;
}

function meetsRequirements(candidate, requirements) {
  const expLevel = EXPERIENCE_LEVELS.find(l => l.label === requirements.experienceLevel);
  if (expLevel && expLevel.label !== 'Any') {
    if (candidate.experienceYears < expLevel.min || candidate.experienceYears > expLevel.max) return false;
  }
  if (requirements.education !== 'Any') {
    const reqIdx = EDUCATION_ORDER.indexOf(requirements.education);
    const candIdx = EDUCATION_ORDER.indexOf(candidate.education);
    if (candIdx < reqIdx) return false;
  }
  if (candidate.score < requirements.minScore) return false;
  return true;

import React from 'react';

import React from 'react';
jobportelteam
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

// ── Auth Pages ──
import Login from './pages/Login';
import CandidateRegistration from './pages/CandidateRegistration';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import RoleSelection from './pages/RoleSelection';
import AccountVerified from './pages/AccountVerified';

// ── Landing & Public ──
import LandingPage from './pages/LandingPage';
import PlatformFeatures from './pages/PlatformFeatures';
import WelcomeScreen from './pages/WelcomeScreen';
import RemoteJobs from './pages/RemoteJobs';
import InternshipListings from './pages/InternshipListings';
import FreelanceJobMarketplace from './pages/FreelanceJobMarketplace';
import JobSearchHome from './pages/JobSearchHome';

// ── Candidate Pages ──
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateProfile from './pages/CandidateProfile';
import ProfileSettings from './pages/ProfileSettings';
import ProfileSetupWizard from './pages/ProfileSetupWizard';
import ProfileVisibility from './pages/ProfileVisibility';
import CandidateProfileView from './pages/CandidateProfileView';
import UserOnboarding from './pages/UserOnboarding';

// ── Resume Pages ──
import ResumeUpload from './pages/ResumeUpload';
import ResumeUploadFlow from './pages/ResumeUploadFlow';
import ResumeSelection from './pages/ResumeSelection';
import ResumeViewer from './pages/ResumeViewer';
import ResumeBuilder from './pages/ResumeBuilder';
import CandidateResumes from './components/CandidateResumes';

// ── Skills & Learning ──
import SkillManagement from './pages/SkillManagement';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import SkillBasedJobRecommendations from './pages/SkillBasedJobRecommendations';
import LearningRecommendations from './pages/LearningRecommendations';
import CertificationTracking from './pages/CertificationTracking';
import CareerInsightsDashboard from './pages/CareerInsightsDashboard';
import OnlineAssessmentTests from './pages/OnlineAssessmentTests';
import AIJobRecommendations from './pages/AIJobRecommendations';

// ── Profile Tools ──
import EducationDetails from './pages/EducationDetails';
import WorkExperienceEditor from './pages/WorkExperienceEditor';
import PortfolioLinks from './pages/PortfolioLinks';
import JobPreferences from './pages/JobPreferences';
import SalaryExpectations from './pages/SalaryExpectations';
import CoverLetterEditor from './pages/CoverLetterEditor';

// ── Job Pages ──
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import JobAlerts from './pages/JobAlerts';
import JobDescriptionBuilder from './pages/JobDescriptionBuilder';
import TrendingJobs from './pages/TrendingJobs';
import SimilarJobs from './pages/SimilarJobs';
import RecommendedJobs from './pages/RecommendedJobs';
import RecentlyViewed from './pages/RecentlyViewed';
import AdvancedFilters from './pages/AdvancedFilters';
import MapJobSearch from './pages/MapJobSearch';
import SavedJobs from './pages/SavedJobs';

// ── Application Pages ──
import ApplyJob from './pages/ApplyJob';
import ApplicationPreview from './pages/ApplicationPreview';
import SubmitConfirmation from './pages/SubmitConfirmation';
import ApplicationSuccess from './pages/ApplicationSuccess';
import ApplicationTracking from './pages/ApplicationTracking';
import ApplicationStatusTimeline from './pages/ApplicationStatusTimeline';
import ApplicationUpdates from './pages/ApplicationUpdates';

// ── Interview Pages ──
import InterviewInvitation from './pages/InterviewInvitation';
import InterviewScheduling from './pages/InterviewScheduling';
import InterviewNotifications from './pages/InterviewNotifications';
import OfferLetter from './pages/OfferLetter';

// ── Company Pages ──
import CompanyProfile from './pages/CompanyProfile';
import CompanyProfileSetup from './pages/CompanyProfileSetup';
import CompanyProfileEdit from './pages/CompanyProfileEdit';
import CompanyReviews from './pages/CompanyReviews';

// ── Employer Pages ──
import EmployerLogin from './pages/EmployerLogin';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerProfile from './pages/EmployerProfile';
import EmployerManagement from './pages/EmployerManagement';
import ManageJobListings from './pages/ManageJobListings';
import EditJobPosting from './pages/EditJobPosting';
import CandidateApplicationsList from './pages/CandidateApplicationsList';
import ShortlistCandidates from './pages/ShortlistCandidates';
import RejectCandidate from './pages/RejectCandidate';
import RecruitmentAnalytics from './pages/RecruitmentAnalytics';
import AIResumeScreening from './pages/AIResumeScreening';

// ── Messaging Pages ──
import MessagingInbox from './pages/MessagingInbox';
import CandidateChat from './pages/CandidateChat';
import MessageCenter from './pages/MessageCenter';
import RecruiterMessageCenter from './pages/RecruiterMessageCenter';

// ── Notification Pages ──
import RecruiterNotifications from './pages/RecruiterNotifications';
import EmailNotificationPreferences from './pages/EmailNotificationPreferences';
import PushNotificationSettings from './pages/PushNotificationSettings';
import CandidateAlerts from './pages/CandidateAlerts';
import SystemAnnouncements from './pages/SystemAnnouncements';
import NotificationsPage, { NotificationBell } from './pages/Notifications';

// ── Admin Pages ──
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import AdminJobListings from './pages/AdminJobListings';
import JobApprovalQueue from './pages/JobApprovalQueue';
import AdminReportedJobs from './pages/AdminReportedJobs';
import AdminRevenueDashboard from './pages/AdminRevenueDashboard';
import PlatformAnalytics from './pages/PlatformAnalytics';
import AdminNotificationsManagement from './pages/AdminNotificationsManagement';
import AdminSystemSettings from './pages/AdminSystemSettings';
import AdminActivityLogs from './pages/AdminActivityLogs';
import CMSPageEditor from './pages/CMSPageEditor';
import SupportTickets from './pages/SupportTickets';
import SubscriptionPlans from './pages/SubscriptionPlans';
import PaymentTransactions from './pages/PaymentTransactions';

// ── Other Pages ──
import CommunityDiscussionForum from './pages/CommunityDiscussionForum';


// ─────────────────────────────────────────────────────
// PrivateRoute — redirect to login if no token
// ─────────────────────────────────────────────────────
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};


// ─────────────────────────────────────────────────────
// PublicRoute — if already logged in, skip login page
// and go straight to the correct dashboard
// ─────────────────────────────────────────────────────
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'employer') return <Navigate to="/employer/dashboard"  replace />;
      if (user.role === 'admin')    return <Navigate to="/admin/dashboard"     replace />;
    } catch {}
    return <Navigate to="/candidate-dashboard" replace />;
  }
  return children;
};


// ─────────────────────────────────────────────────────
// Global Navbar — hidden on pages with their own navbar
// ─────────────────────────────────────────────────────
function Navbar() {
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  let userRole = null;
  if (storedUser) {
    try { userRole = JSON.parse(storedUser).role || null; }
    catch { userRole = null; }
  }

  const pagesWithOwnNavbar = [
    '/', '/register', '/forgot-password', '/otp-verification', '/reset-password',
    '/landing', '/platform', '/select-role', '/account-verified',
    '/employer/login', '/employer/register',
    '/candidate-dashboard', '/candidate-profile', '/profile-settings',
    '/profile-setup', '/privacy', '/portfolio', '/job-preferences',
    '/salary', '/education', '/work-experience', '/welcome', '/onboarding',
    '/resumes', '/resume-builder', '/candidates/resumes',
    '/skills', '/skill-gap', '/skill-jobs', '/learning', '/certifications',
    '/career-insights', '/assessments', '/ai-jobs',
    '/jobs', '/jobs/map', '/home', '/remote', '/recommended', '/trending',
    '/saved-jobs', '/alerts', '/filters', '/history', '/internships', '/freelance',
    '/applications', '/apply', '/interviews', '/offers', '/companies',
    '/employer/dashboard', '/employer/profile', '/employer/profile-setup',
    '/employer/profile-edit', '/employer/job-description', '/employer/post-job',
    '/employer/manage-jobs', '/employer/edit-job', '/employer/candidates',
    '/employer/candidate', '/employer/resume', '/employer/shortlist',
    '/employer/reject', '/employer/analytics', '/employer/ai-screening',
    '/employer/management', '/employer/messages', '/employer/chat',
    '/company-dashboard',
    '/messages', '/candidate/chat',
    '/notifications', '/recruiter/notifications', '/settings/notifications',
    '/candidate/alerts', '/candidate/notifications', '/announcements',
    '/admin/dashboard', '/admin/users', '/admin/employers', '/admin/jobs',
    '/admin/reported-jobs', '/admin/revenue', '/admin/billing', '/admin/analytics',
    '/admin/subscriptions', '/admin/payments', '/admin/support', '/admin/cms',
    '/admin/notifications', '/admin/settings', '/admin/logs', '/admin/security',
    '/community',
  ];

  const shouldHide = pagesWithOwnNavbar.some(path =>
    location.pathname === path || location.pathname.startsWith(path + '/')
  );

  if (shouldHide) return null;

  const navLink = (to, label) => (
    <Link to={to} style={{
      padding: '8px 18px', borderRadius: '8px', textDecoration: 'none',
      fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700',
      background: location.pathname === to ? '#ff6b35' : 'transparent',
      color: location.pathname === to ? '#fff' : '#555',
      border: '1px solid',
      borderColor: location.pathname === to ? '#ff6b35' : '#222',
      transition: 'all .15s',
    }}>{label}</Link>
  );

  return (
    <nav style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "'Syne', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '10px', height: '10px', background: '#ff6b35', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 12px #ff6b35' }} />
        <span style={{ color: '#fff', fontWeight: '800', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '.05em' }}>JobPortal</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {userRole === 'employer' ? (
          <>
            {navLink('/employer/dashboard',   'Dashboard')}
            {navLink('/employer/post-job',    'Post Job')}
            {navLink('/employer/manage-jobs', 'Manage Jobs')}
            {navLink('/employer/profile',     'Profile')}
            {navLink('/employer/analytics',   'Analytics')}
            {navLink('/employer/messages',    'Messages')}
          </>
        ) : (
          <>
            {navLink('/candidate-dashboard', 'Dashboard')}
            {navLink('/candidate-profile',   'Profile')}
            {navLink('/jobs',                'Jobs')}
            {navLink('/saved-jobs',          '♥ Saved')}
            {navLink('/resumes',             '📄 Resumes')}
            {navLink('/alerts',              '🔔 Alerts')}
            {navLink('/profile-settings',    'Settings')}
            {navLink('/skill-jobs',          '🎯 For You')}
          </>
        )}
        <NotificationBell />
        <button
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid #222', background: 'transparent', color: '#555', cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}
jobportelteam
export default function App() {
  // ── Page routing state ──────────────────────────────────
  const [currentPage, setCurrentPage] = useState('hirefilter'); // 'hirefilter' | 'assessments'

  // ── HireFilter state ────────────────────────────────────
  const [requirements, setRequirements] = useState(defaultRequirements);
  const [candidates, setCandidates] = useState(
    MOCK_CANDIDATES.map(c => ({ ...c, score: 70 + Math.floor(Math.random() * 25) }))
  );
  const [filtered, setFiltered] = useState(null);
  const [sortBy, setSortBy] = useState('score');
  const [filterApplied, setFilterApplied] = useState(false);
  const [tab, setTab] = useState('all');

  const handleFilter = useCallback(() => {
    const updated = candidates.map(c => ({ ...c, score: computeScore(c, requirements) }));
    const result = updated.filter(c => meetsRequirements(c, requirements));
    setCandidates(updated);
    setFiltered(result);
    setFilterApplied(true);
  }, [candidates, requirements]);

  const handleReset = () => {
    setRequirements(defaultRequirements);
    setFiltered(null);
    setFilterApplied(false);
    setTab('all');
  };

  const handleToggleShortlist = (id) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, shortlisted: !c.shortlisted } : c));
    if (filtered) setFiltered(prev => prev.map(c => c.id === id ? { ...c, shortlisted: !c.shortlisted } : c));
  };

  const handleUpload = (candidateId, file, url) => {
    const update = (list) => list.map(c =>
      c.id === candidateId ? { ...c, resumeFile: file, resumeUrl: url } : c
    );
    setCandidates(prev => update(prev));
    if (filtered) setFiltered(prev => update(prev));
  };

  const displayList = (filtered !== null ? filtered : candidates)
    .filter(c => tab === 'shortlisted' ? c.shortlisted : true);

  const sorted = [...displayList].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    return 0;
  });

  const shortlistedCount = candidates.filter(c => c.shortlisted).length;
  const avgScore = sorted.length > 0
    ? Math.round(sorted.reduce((s, c) => s + c.score, 0) / sorted.length)
    : 0;

  // ── If Assessments page ─────────────────────────────────
  if (currentPage === 'assessments') {
    return (
      <div>
        {/* Back nav */}
        <div style={{
          background: '#0a1018',
          borderBottom: '1px solid #ffffff08',
          padding: '12px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <button
            onClick={() => setCurrentPage('hirefilter')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ← Back to HireFilter
          </button>
          <span style={{ fontSize: 13, color: '#445566' }}>Online Assessment Tests</span>
        </div>
        <OnlineAssessmentTest />
      </div>
    );
  }

  // ── HireFilter page ─────────────────────────────────────
  return (
jobportelteam
    <div style={{ minHeight: '100vh', background: '#070d14' }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid #ffffff08',
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0a1018',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #00e5a0, #00c885)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>⚡</div>
          <div>
            <h1 style={{
              margin: 0, fontSize: 18, fontWeight: 800,
              fontFamily: "'Syne', sans-serif", color: '#e8f0fe',
              letterSpacing: '-0.02em',
            }}>HireFilter</h1>
            <p style={{ margin: 0, fontSize: 10, color: '#445566', fontFamily: "'Space Mono', monospace" }}>
              Smart Resume Screening Platform
            </p>
          </div>
        </div>

        {/* ── Nav: added Assessments link ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setCurrentPage('assessments')}
            style={{
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.3)',
              color: '#60a5fa',
              borderRadius: 8,
              padding: '7px 16px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.3px',
            }}
          >
            📋 Online Assessments
          </button>

          {filterApplied && (
            <span style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 6,
              background: '#00e5a015', color: '#00e5a0',
              border: '1px solid #00e5a030', fontWeight: 700,
            }}>
              {filtered?.length} results
            </span>
          )}

          {shortlistedCount > 0 && (
            <span style={{ fontSize: 12, color: '#f5c518' }}>
              ⭐ {shortlistedCount} shortlisted
            </span>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '28px 24px',
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 24,
        alignItems: 'start',
      }}>
        {/* Left: Requirements Panel */}
        <RequirementsPanel
          requirements={requirements}
          onChange={setRequirements}
          onFilter={handleFilter}
          onReset={handleReset}
        />

        {/* Right: Candidates */}
        <div>
          <StatsBar
            total={candidates.length}
            filtered={filtered?.length ?? candidates.length}
            shortlisted={shortlistedCount}
            avgScore={avgScore}
          />

          {/* Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 12,
          }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, background: '#0d1520', borderRadius: 10, padding: 4, border: '1px solid #ffffff08' }}>
              {[
                { id: 'all', label: 'All Candidates' },
                { id: 'shortlisted', label: `Shortlisted (${shortlistedCount})` },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: '6px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700,
                    border: 'none', transition: 'all 0.18s',
                    background: tab === t.id ? '#00e5a0' : 'transparent',
                    color: tab === t.id ? '#070d14' : '#445566',
                    cursor: 'pointer',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: '#445566' }}>Sort by:</span>
              {['score', 'name', 'experience'].map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  style={{
                    padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                    border: `1px solid ${sortBy === s ? '#00e5a040' : '#ffffff10'}`,
                    background: sortBy === s ? '#00e5a015' : 'transparent',
                    color: sortBy === s ? '#00e5a0' : '#445566',
                    textTransform: 'capitalize',
                    transition: 'all 0.18s',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate list */}
          {sorted.length === 0 ? (
            <div style={{
              background: '#0d1520', border: '1px solid #ffffff0f', borderRadius: 14,
              padding: '60px 32px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: '#445566', fontWeight: 700, marginBottom: 6 }}>
                No candidates found
              </h3>
              <p style={{ fontSize: 13, color: '#2a3a4a' }}>
                {tab === 'shortlisted'
                  ? 'Shortlist candidates to see them here.'
                  : 'Try adjusting your filter criteria.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {sorted.map((candidate, i) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  requiredSkills={requirements.skills}
                  onToggleShortlist={handleToggleShortlist}
                  onUpload={handleUpload}
                  index={i}
                />
              ))}
            </div>
          )}

          {shortlistedCount > 0 && (
            <div style={{
              marginTop: 20, padding: '14px 18px',
              background: '#f5c51810', border: '1px solid #f5c51825',
              borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>⭐</span>
              <span style={{ fontSize: 12, color: '#f5c518' }}>
                {shortlistedCount} candidate{shortlistedCount !== 1 ? 's' : ''} shortlisted.
                Export or share with your team when ready.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



// ─────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────
function App() {
  return (
jobportelteam
    <Router>
      <Navbar />
      <Routes>

        {/* ══════════════════════════════════
            PUBLIC ROUTES
            Wrapped in PublicRoute so logged-in
            users skip back to their dashboard
        ══════════════════════════════════ */}
        <Route path="/"               element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register"       element={<PublicRoute><CandidateRegistration /></PublicRoute>} />
        <Route path="/employer/login" element={<PublicRoute><EmployerLogin /></PublicRoute>} />

        {/* These pages are always public */}
        <Route path="/forgot-password"  element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password"   element={<ResetPassword />} />
        <Route path="/select-role"      element={<RoleSelection />} />
        <Route path="/account-verified" element={<AccountVerified />} />
        <Route path="/landing"          element={<LandingPage />} />
        <Route path="/platform"         element={<PlatformFeatures />} />
        <Route path="/home"             element={<JobSearchHome />} />
        <Route path="/remote"           element={<RemoteJobs />} />
        <Route path="/internships"      element={<InternshipListings />} />
        <Route path="/freelance"        element={<FreelanceJobMarketplace />} />

        {/* ══════════════════════════════════
            CANDIDATE ROUTES
        ══════════════════════════════════ */}
        <Route path="/welcome"           element={<PrivateRoute><WelcomeScreen /></PrivateRoute>} />
        <Route path="/onboarding"        element={<PrivateRoute><UserOnboarding /></PrivateRoute>} />
        <Route path="/candidate-dashboard" element={<PrivateRoute><CandidateDashboard /></PrivateRoute>} />
        <Route path="/candidate-profile" element={<PrivateRoute><CandidateProfile /></PrivateRoute>} />
        <Route path="/profile-settings"  element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
        <Route path="/profile-setup"     element={<PrivateRoute><ProfileSetupWizard /></PrivateRoute>} />
        <Route path="/privacy"           element={<PrivateRoute><ProfileVisibility /></PrivateRoute>} />
        <Route path="/portfolio"         element={<PrivateRoute><PortfolioLinks /></PrivateRoute>} />
        <Route path="/job-preferences"   element={<PrivateRoute><JobPreferences /></PrivateRoute>} />
        <Route path="/salary"            element={<PrivateRoute><SalaryExpectations /></PrivateRoute>} />
        <Route path="/education"         element={<PrivateRoute><EducationDetails /></PrivateRoute>} />
        <Route path="/work-experience"   element={<PrivateRoute><WorkExperienceEditor /></PrivateRoute>} />

        {/* Resume */}
        <Route path="/resumes"                 element={<PrivateRoute><ResumeUpload /></PrivateRoute>} />
        <Route path="/resume-builder"          element={<PrivateRoute><ResumeBuilder /></PrivateRoute>} />
        <Route path="/candidates/resumes"      element={<PrivateRoute><CandidateResumes /></PrivateRoute>} />
        <Route path="/apply/:id/upload-resume" element={<PrivateRoute><ResumeUploadFlow /></PrivateRoute>} />
        <Route path="/apply/:id/resume"        element={<PrivateRoute><ResumeSelection /></PrivateRoute>} />

        {/* Skills & Learning */}
        <Route path="/skills"        element={<PrivateRoute><SkillManagement /></PrivateRoute>} />
        <Route path="/skill-gap"     element={<PrivateRoute><SkillGapAnalysis /></PrivateRoute>} />
        <Route path="/skill-jobs"    element={<PrivateRoute><SkillBasedJobRecommendations /></PrivateRoute>} />
        <Route path="/learning"      element={<PrivateRoute><LearningRecommendations /></PrivateRoute>} />
        <Route path="/certifications" element={<PrivateRoute><CertificationTracking /></PrivateRoute>} />
        <Route path="/career-insights" element={<PrivateRoute><CareerInsightsDashboard /></PrivateRoute>} />
        <Route path="/assessments"   element={<PrivateRoute><OnlineAssessmentTests /></PrivateRoute>} />
        <Route path="/ai-jobs"       element={<PrivateRoute><AIJobRecommendations /></PrivateRoute>} />

        {/* Jobs */}
        <Route path="/jobs"            element={<PrivateRoute><JobListings /></PrivateRoute>} />
        <Route path="/jobs/map"        element={<PrivateRoute><MapJobSearch /></PrivateRoute>} />
        <Route path="/jobs/:id/similar" element={<PrivateRoute><SimilarJobs /></PrivateRoute>} />
        <Route path="/jobs/:id"        element={<PrivateRoute><JobDetail /></PrivateRoute>} />
        <Route path="/saved-jobs"      element={<PrivateRoute><SavedJobs /></PrivateRoute>} />
        <Route path="/alerts"          element={<PrivateRoute><JobAlerts /></PrivateRoute>} />
        <Route path="/filters"         element={<PrivateRoute><AdvancedFilters /></PrivateRoute>} />
        <Route path="/history"         element={<PrivateRoute><RecentlyViewed /></PrivateRoute>} />
        <Route path="/recommended"     element={<PrivateRoute><RecommendedJobs /></PrivateRoute>} />
        <Route path="/trending"        element={<PrivateRoute><TrendingJobs /></PrivateRoute>} />

        {/* Applications */}
        <Route path="/apply/:id"                  element={<PrivateRoute><ApplyJob /></PrivateRoute>} />
        <Route path="/apply/:id/cover-letter"     element={<PrivateRoute><CoverLetterEditor /></PrivateRoute>} />
        <Route path="/apply/:id/review"           element={<PrivateRoute><ApplicationPreview /></PrivateRoute>} />
        <Route path="/apply/:id/confirm"          element={<PrivateRoute><SubmitConfirmation /></PrivateRoute>} />
        <Route path="/apply/:id/success"          element={<PrivateRoute><ApplicationSuccess /></PrivateRoute>} />
        <Route path="/applications"               element={<PrivateRoute><ApplicationTracking /></PrivateRoute>} />
        <Route path="/applications/:id/timeline"  element={<PrivateRoute><ApplicationStatusTimeline /></PrivateRoute>} />
        <Route path="/candidate/notifications"    element={<PrivateRoute><ApplicationUpdates /></PrivateRoute>} />

        {/* Interviews */}
        <Route path="/interviews/:id/invitation"  element={<PrivateRoute><InterviewInvitation /></PrivateRoute>} />
        <Route path="/interviews/:id/schedule"    element={<PrivateRoute><InterviewScheduling /></PrivateRoute>} />
        <Route path="/interviews/notifications"   element={<PrivateRoute><InterviewNotifications /></PrivateRoute>} />
        <Route path="/offers/:id"                 element={<PrivateRoute><OfferLetter /></PrivateRoute>} />

        {/* Companies */}
        <Route path="/companies/:id"         element={<PrivateRoute><CompanyProfile /></PrivateRoute>} />
        <Route path="/companies/:id/reviews" element={<PrivateRoute><CompanyReviews /></PrivateRoute>} />

        {/* ══════════════════════════════════
            EMPLOYER ROUTES
        ══════════════════════════════════ */}
        <Route path="/employer/dashboard"    element={<PrivateRoute><EmployerDashboard /></PrivateRoute>} />
        <Route path="/employer/profile"      element={<PrivateRoute><EmployerProfile /></PrivateRoute>} />
        <Route path="/employer/profile-setup" element={<PrivateRoute><CompanyProfileSetup /></PrivateRoute>} />
        <Route path="/employer/profile-edit" element={<PrivateRoute><CompanyProfileEdit /></PrivateRoute>} />
        <Route path="/employer/post-job"     element={<PrivateRoute><JobDescriptionBuilder /></PrivateRoute>} />
        <Route path="/employer/job-description" element={<PrivateRoute><JobDescriptionBuilder /></PrivateRoute>} />
        <Route path="/employer/manage-jobs"  element={<PrivateRoute><ManageJobListings /></PrivateRoute>} />
        <Route path="/employer/edit-job/:id" element={<PrivateRoute><EditJobPosting /></PrivateRoute>} />
        <Route path="/employer/candidates/:jobId" element={<PrivateRoute><CandidateApplicationsList /></PrivateRoute>} />
        <Route path="/employer/candidate/:id" element={<PrivateRoute><CandidateProfileView /></PrivateRoute>} />
        <Route path="/employer/resume/:id"   element={<PrivateRoute><ResumeViewer /></PrivateRoute>} />
        <Route path="/employer/shortlist/:jobId" element={<PrivateRoute><ShortlistCandidates /></PrivateRoute>} />
        <Route path="/employer/reject/:id"   element={<PrivateRoute><RejectCandidate /></PrivateRoute>} />
        <Route path="/employer/analytics"    element={<PrivateRoute><RecruitmentAnalytics /></PrivateRoute>} />
        <Route path="/employer/ai-screening/:jobId" element={<PrivateRoute><AIResumeScreening /></PrivateRoute>} />
        <Route path="/employer/management"   element={<PrivateRoute><EmployerManagement /></PrivateRoute>} />
        <Route path="/employer/messages"     element={<PrivateRoute><RecruiterMessageCenter /></PrivateRoute>} />
        <Route path="/employer/chat/:id"     element={<PrivateRoute><CandidateChat /></PrivateRoute>} />

        {/* ══════════════════════════════════
            MESSAGING ROUTES
        ══════════════════════════════════ */}
        <Route path="/messages"       element={<PrivateRoute><MessagingInbox /></PrivateRoute>} />
        <Route path="/candidate/chat" element={<PrivateRoute><MessageCenter /></PrivateRoute>} />

        {/* ══════════════════════════════════
            NOTIFICATION ROUTES
        ══════════════════════════════════ */}
        <Route path="/notifications"                element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
        <Route path="/recruiter/notifications"      element={<PrivateRoute><RecruiterNotifications /></PrivateRoute>} />
        <Route path="/settings/notifications"       element={<PrivateRoute><EmailNotificationPreferences /></PrivateRoute>} />
        <Route path="/settings/notifications/push"  element={<PrivateRoute><PushNotificationSettings /></PrivateRoute>} />
        <Route path="/candidate/alerts"             element={<PrivateRoute><CandidateAlerts /></PrivateRoute>} />
        <Route path="/announcements"                element={<PrivateRoute><SystemAnnouncements /></PrivateRoute>} />

        {/* ══════════════════════════════════
            ADMIN ROUTES
        ══════════════════════════════════ */}
        <Route path="/admin/dashboard"    element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users"        element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path="/admin/employers"    element={<PrivateRoute><EmployerManagement /></PrivateRoute>} />
        <Route path="/admin/jobs"         element={<PrivateRoute><AdminJobListings /></PrivateRoute>} />
        <Route path="/admin/jobs/queue"   element={<PrivateRoute><JobApprovalQueue /></PrivateRoute>} />
        <Route path="/admin/reported-jobs" element={<PrivateRoute><AdminReportedJobs /></PrivateRoute>} />
        <Route path="/admin/revenue"      element={<PrivateRoute><AdminRevenueDashboard /></PrivateRoute>} />
        <Route path="/admin/billing"      element={<PrivateRoute><AdminRevenueDashboard /></PrivateRoute>} />
        <Route path="/admin/analytics"    element={<PrivateRoute><PlatformAnalytics /></PrivateRoute>} />
        <Route path="/admin/subscriptions" element={<PrivateRoute><SubscriptionPlans /></PrivateRoute>} />
        <Route path="/admin/payments"     element={<PrivateRoute><PaymentTransactions /></PrivateRoute>} />
        <Route path="/admin/support"      element={<PrivateRoute><SupportTickets /></PrivateRoute>} />
        <Route path="/admin/cms"          element={<PrivateRoute><CMSPageEditor /></PrivateRoute>} />
        <Route path="/admin/notifications" element={<PrivateRoute><AdminNotificationsManagement /></PrivateRoute>} />
        <Route path="/admin/settings"     element={<PrivateRoute><AdminSystemSettings /></PrivateRoute>} />
        <Route path="/admin/logs"         element={<PrivateRoute><AdminActivityLogs /></PrivateRoute>} />
        <Route path="/admin/security"     element={<PrivateRoute><AdminActivityLogs /></PrivateRoute>} />

        {/* ══════════════════════════════════
            OTHER ROUTES
        ══════════════════════════════════ */}
        <Route path="/community" element={<PrivateRoute><CommunityDiscussionForum /></PrivateRoute>} />

        {/* 404 → Login */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;