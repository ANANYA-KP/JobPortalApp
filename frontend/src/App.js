import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import CandidateRegistration from './pages/CandidateRegistration';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateProfile from './pages/CandidateProfile';
import ProfileSettings from './pages/ProfileSettings';
import CompanyDashboard from './pages/CompanyDashboard';
import EmployerPostJob from './pages/EmployerPostJob';
import EmployerCandidates from './pages/EmployerCandidates';
import EmployerProfile from './pages/EmployerProfile';
import EmployerRegistration from './pages/EmployerRegistration';
import Jobs from './pages/Jobs';
import SavedJobs from './pages/SavedJobs';
import ResumeUpload from './pages/ResumeUpload';
import CandidateResumes from './components/CandidateResumes';
import NotificationsPage, { NotificationBell } from './pages/Notifications';
import LandingPage from './pages/LandingPage';
import PlatformFeatures from './pages/PlatformFeatures';
import RoleSelection from './pages/RoleSelection';
import AccountVerified from './pages/AccountVerified';
import WelcomeScreen from './pages/WelcomeScreen';
import UserOnboarding from './pages/UserOnboarding';
import ProfileSetupWizard from './pages/ProfileSetupWizard';
import SkillManagement from './pages/SkillManagement';
import EducationDetails from './pages/EducationDetails';
import WorkExperienceEditor from './pages/WorkExperienceEditor';
import PortfolioLinks from './pages/PortfolioLinks';
import JobPreferences from './pages/JobPreferences';
import SalaryExpectations from './pages/SalaryExpectations';
import ProfileVisibility from './pages/ProfileVisibility';
import JobAlerts from './pages/JobAlerts';
import AdvancedFilters from './pages/AdvancedFilters';
import RecentlyViewed from './pages/RecentlyViewed';
import JobSearchHome from './pages/JobSearchHome';
import RecommendedJobs from './pages/RecommendedJobs';
import TrendingJobs from './pages/TrendingJobs';
import SimilarJobs from './pages/SimilarJobs';
import JobDetail from './pages/JobDetail';
import CompanyReviews from './pages/CompanyReviews';
import JobListings from './pages/JobListings';
import CompanyProfile from './pages/CompanyProfile';
import MapJobSearch from './pages/MapJobSearch';
import RemoteJobs from './pages/RemoteJobs';
import SkillBasedJobRecommendations from './pages/SkillBasedJobRecommendations';
import ApplyJob from './pages/ApplyJob';
import ResumeSelection from './pages/ResumeSelection';
import ResumeUploadFlow from './pages/ResumeUploadFlow';
import CoverLetterEditor from './pages/CoverLetterEditor';
import ApplicationPreview from './pages/ApplicationPreview';
import SubmitConfirmation from './pages/SubmitConfirmation';
import ApplicationSuccess from './pages/ApplicationSuccess';
import ApplicationTracking from './pages/ApplicationTracking';
import ApplicationStatusTimeline from './pages/ApplicationStatusTimeline';
import InterviewInvitation from './pages/InterviewInvitation';
import InterviewScheduling from './pages/InterviewScheduling';
import OfferLetter from './pages/OfferLetter';
import EmployerLogin from './pages/EmployerLogin';
import EmployerDashboard from './pages/EmployerDashboard';
import CompanyProfileSetup from './pages/CompanyProfileSetup';
import CompanyProfileEdit from './pages/CompanyProfileEdit';
import JobDescriptionBuilder from './pages/JobDescriptionBuilder';
import ManageJobListings from './pages/ManageJobListings';
import EditJobPosting from './pages/EditJobPosting';
import CandidateApplicationsList from './pages/CandidateApplicationsList';
import CandidateProfileView from './pages/CandidateProfileView';
import ResumeViewer from './pages/ResumeViewer';
import ShortlistCandidates from './pages/ShortlistCandidates';
import RejectCandidate from './pages/RejectCandidate';
import RecruitmentAnalytics from './pages/RecruitmentAnalytics';
import MessagingInbox from './pages/MessagingInbox';
import CandidateChat from './pages/CandidateChat';
import MessageCenter from './pages/MessageCenter';
import InterviewNotifications from './pages/InterviewNotifications';
import ApplicationUpdates from './pages/ApplicationUpdates';
import RecruiterNotifications from './pages/RecruiterNotifications';
import EmailNotificationPreferences from './pages/EmailNotificationPreferences';
import PushNotificationSettings from './pages/PushNotificationSettings';
import CandidateAlerts from './pages/CandidateAlerts';
import SystemAnnouncements from './pages/SystemAnnouncements';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import EmployerManagement from './pages/EmployerManagement';
import AdminJobListings from './pages/AdminJobListings';
import JobApprovalQueue from './pages/JobApprovalQueue';
import AdminReportedJobs from './pages/AdminReportedJobs';
import AdminRevenueDashboard from './pages/AdminRevenueDashboard';
import PlatformAnalytics from './pages/PlatformAnalytics';
import SubscriptionPlans from './pages/SubscriptionPlans';
import PaymentTransactions from './pages/PaymentTransactions';
import SupportTickets from './pages/SupportTickets';
import CMSPageEditor from './pages/CMSPageEditor';
import AdminNotificationsManagement from './pages/AdminNotificationsManagement';
import AdminSystemSettings from './pages/AdminSystemSettings';
import AdminActivityLogs from './pages/AdminActivityLogs';
import AIResumeScreening from './pages/AIResumeScreening';
import AIJobRecommendations from './pages/AIJobRecommendations';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import CareerInsightsDashboard from './pages/CareerInsightsDashboard';
import OnlineAssessmentTests from './pages/OnlineAssessmentTests';
import CertificationTracking from './pages/CertificationTracking';
import LearningRecommendations from './pages/LearningRecommendations';
import InternshipListings from './pages/InternshipListings';
import FreelanceJobMarketplace from './pages/FreelanceJobMarketplace';
import CommunityDiscussionForum from './pages/CommunityDiscussionForum';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function Navbar() {
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  let userRole = null;
  if (storedUser) {
    try {
      userRole = JSON.parse(storedUser).role || null;
    } catch (err) {
      userRole = null;
    }
  }

  const hiddenRoutes = new Set([
    '/', '/register', '/forgot-password', '/otp-verification', '/reset-password',
    '/landing', '/platform', '/select-role', '/account-verified',
  ]);
  if (hiddenRoutes.has(location.pathname)) return null;

  const navLink = (to, label) => (
    <Link to={to} style={{
      padding: '8px 18px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontFamily: "'Syne', sans-serif",
      fontSize: '13px',
      fontWeight: '700',
      background: location.pathname === to ? '#ff6b35' : 'transparent',
      color: location.pathname === to ? '#fff' : '#555',
      border: '1px solid',
      borderColor: location.pathname === to ? '#ff6b35' : '#222',
      transition: 'all .15s'
    }}>{label}</Link>
  );

  return (
    <nav style={{
      background: '#0d0d0d',
      borderBottom: '1px solid #1a1a1a',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: "'Syne', sans-serif"
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: '10px', height: '10px', background: '#ff6b35',
          borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 12px #ff6b35'
        }} />
        <span style={{
          color: '#fff', fontWeight: '800', fontSize: '16px',
          textTransform: 'uppercase', letterSpacing: '.05em'
        }}>JobPortal</span>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {userRole === 'employer' ? (
          <>
            {navLink('/company-dashboard', 'Dashboard')}
            {navLink('/employer/post-job', 'Post Job')}
            {navLink('/employer/candidates', 'Candidates')}
            {navLink('/employer/profile', 'Profile')}
          </>
        ) : (
          <>
            {navLink('/candidate-dashboard', 'Dashboard')}
            {navLink('/candidate-profile', 'Profile')}
            {navLink('/jobs', 'Jobs')}
            {navLink('/saved-jobs', '♥ Saved')}
            {navLink('/resumes', '📄 Resumes')}
            {navLink('/alerts', '🔔 Alerts')}
            {navLink('/profile-settings', 'Settings')}
            {navLink('/skill-jobs', '🎯 For You')}
          </>
        )}

        {/* Notification Bell */}
        <NotificationBell />

        {/* Logout */}
        <button
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          style={{
            padding: '8px 18px', borderRadius: '8px', border: '1px solid #222',
            background: 'transparent', color: '#555', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: '700'
          }}
        >Logout</button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/"                   element={<Login />} />
        <Route path="/register"           element={<CandidateRegistration />} />
        <Route path="/forgot-password"    element={<ForgotPassword />} />
        <Route path="/otp-verification"   element={<OtpVerification />} />
        <Route path="/reset-password"     element={<ResetPassword />} />
        <Route path="/landing"            element={<LandingPage />} />
        <Route path="/platform"           element={<PlatformFeatures />} />
        <Route path="/select-role"        element={<RoleSelection />} />
        <Route path="/account-verified"   element={<AccountVerified />} />
        <Route path="/employer/register"  element={<EmployerRegistration />} />

        {/* ── Candidate Routes ── */}
        <Route path="/candidate-dashboard"  element={<PrivateRoute><CandidateDashboard /></PrivateRoute>} />
        <Route path="/candidate-profile"    element={<PrivateRoute><CandidateProfile /></PrivateRoute>} />
        <Route path="/profile-settings"     element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
        <Route path="/jobs"                 element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/saved-jobs"           element={<PrivateRoute><SavedJobs /></PrivateRoute>} />
        <Route path="/resumes"              element={<PrivateRoute><ResumeUpload /></PrivateRoute>} />
        <Route path="/candidates/resumes"   element={<PrivateRoute><CandidateResumes /></PrivateRoute>} />
        <Route path="/notifications"        element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
        <Route path="/welcome"              element={<PrivateRoute><WelcomeScreen /></PrivateRoute>} />
        <Route path="/onboarding"           element={<PrivateRoute><UserOnboarding /></PrivateRoute>} />
        <Route path="/profile-setup"        element={<PrivateRoute><ProfileSetupWizard /></PrivateRoute>} />
        <Route path="/skills"               element={<PrivateRoute><SkillManagement /></PrivateRoute>} />
        <Route path="/education"            element={<PrivateRoute><EducationDetails /></PrivateRoute>} />
        <Route path="/work-experience"      element={<PrivateRoute><WorkExperienceEditor /></PrivateRoute>} />

        {/* ── New Candidate Settings & Tools ── */}
        <Route path="/portfolio"            element={<PrivateRoute><PortfolioLinks /></PrivateRoute>} />
        <Route path="/job-preferences"      element={<PrivateRoute><JobPreferences /></PrivateRoute>} />
        <Route path="/salary"               element={<PrivateRoute><SalaryExpectations /></PrivateRoute>} />
        <Route path="/privacy"              element={<PrivateRoute><ProfileVisibility /></PrivateRoute>} />
        <Route path="/alerts"               element={<PrivateRoute><JobAlerts /></PrivateRoute>} />
        <Route path="/filters"              element={<PrivateRoute><AdvancedFilters /></PrivateRoute>} />
        <Route path="/history"              element={<PrivateRoute><RecentlyViewed /></PrivateRoute>} />

        {/* ── Employer Routes ── */}
        <Route path="/company-dashboard"    element={<PrivateRoute><CompanyDashboard /></PrivateRoute>} />
        <Route path="/employer/post-job"    element={<PrivateRoute><EmployerPostJob /></PrivateRoute>} />
        <Route path="/employer/candidates"  element={<PrivateRoute><EmployerCandidates /></PrivateRoute>} />
        <Route path="/employer/profile"     element={<PrivateRoute><EmployerProfile /></PrivateRoute>} />
        <Route path="/home" element={<JobSearchHome />} />
        <Route path="/recommended" element={<PrivateRoute><RecommendedJobs /></PrivateRoute>} />
        <Route path="/trending" element={<PrivateRoute><TrendingJobs /></PrivateRoute>} />
        <Route path="/jobs/:id/similar" element={<PrivateRoute><SimilarJobs /></PrivateRoute>} />
        <Route path="/jobs/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} />
        <Route path="/companies/:id/reviews" element={<PrivateRoute><CompanyReviews /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><JobListings /></PrivateRoute>} />
        <Route path="/companies/:id" element={<PrivateRoute><CompanyProfile /></PrivateRoute>} />
        <Route path="/jobs/map" element={<PrivateRoute><MapJobSearch /></PrivateRoute>} />
        <Route path="/remote" element={<RemoteJobs />} />
        <Route path="/skill-jobs" element={<PrivateRoute><SkillBasedJobRecommendations /></PrivateRoute>} />
        <Route path="/apply/:id" element={<PrivateRoute><ApplyJob /></PrivateRoute>} />
        <Route path="/apply/:id/resume" element={<PrivateRoute><ResumeSelection /></PrivateRoute>} />
        <Route path="/apply/:id/upload-resume" element={<PrivateRoute><ResumeUploadFlow /></PrivateRoute>} />
        <Route path="/apply/:id/cover-letter" element={<PrivateRoute><CoverLetterEditor /></PrivateRoute>} />
        <Route path="/apply/:id/review" element={<PrivateRoute><ApplicationPreview /></PrivateRoute>} />
        <Route path="/jobs/:id/apply/confirm" element={<PrivateRoute><SubmitConfirmation /></PrivateRoute>} />
        <Route path="/apply/:id/success" element={<PrivateRoute><ApplicationSuccess /></PrivateRoute>} />
        <Route path="/applications" element={<PrivateRoute><ApplicationTracking /></PrivateRoute>} />
        <Route path="/applications/:id/timeline" element={<PrivateRoute><ApplicationStatusTimeline /></PrivateRoute>} />
        <Route path="/interviews/:id/invitation" element={<PrivateRoute><InterviewInvitation /></PrivateRoute>} />
        <Route path="/interviews/:id/schedule" element={<PrivateRoute><InterviewScheduling /></PrivateRoute>} />
        <Route path="/offers/:id" element={<PrivateRoute><OfferLetter /></PrivateRoute>} />
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/dashboard" element={<PrivateRoute><EmployerDashboard /></PrivateRoute>} />
        <Route path="/employer/profile-setup" element={<PrivateRoute><CompanyProfileSetup /></PrivateRoute>} />
        <Route path="/employer/profile-edit" element={<PrivateRoute><CompanyProfileEdit /></PrivateRoute>} />
        <Route path="/employer/post-job" element={<PrivateRoute><EmployerPostJob /></PrivateRoute>} />
        <Route path="/employer/job-description" element={<PrivateRoute><JobDescriptionBuilder /></PrivateRoute>} />
        <Route path="/employer/manage-jobs" element={<PrivateRoute><ManageJobListings /></PrivateRoute>} />
        <Route path="/employer/edit-job/:id" element={<PrivateRoute><EditJobPosting /></PrivateRoute>} />
        <Route path="/employer/candidates/:jobId" element={<PrivateRoute><CandidateApplicationsList /></PrivateRoute>} />
        <Route path="/employer/candidate/:id" element={<PrivateRoute><CandidateProfileView /></PrivateRoute>} />
        <Route path="/employer/resume/:id" element={<PrivateRoute><ResumeViewer /></PrivateRoute>} />
        <Route path="/employer/shortlist/:jobId" element={<PrivateRoute><ShortlistCandidates /></PrivateRoute>} />
        <Route path="/employer/reject/:id" element={<PrivateRoute><RejectCandidate /></PrivateRoute>} />
        <Route path="/employer/analytics" element={<PrivateRoute><RecruitmentAnalytics /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><MessagingInbox /></PrivateRoute>} />
        <Route path="/employer/chat/:id" element={<PrivateRoute><CandidateChat /></PrivateRoute>} />
        <Route path="/employer/messages" element={<PrivateRoute><MessageCenter /></PrivateRoute>} />
        <Route path="/interviews/notifications" element={<PrivateRoute><InterviewNotifications /></PrivateRoute>} />
        <Route path="/candidate/notifications" element={<PrivateRoute><ApplicationUpdates /></PrivateRoute>} />
        <Route path="/recruiter/notifications" element={<PrivateRoute><RecruiterNotifications /></PrivateRoute>} />
        <Route path="/settings/notifications" element={<PrivateRoute><EmailNotificationPreferences /></PrivateRoute>} />
        <Route path="/settings/notifications/push" element={<PrivateRoute><PushNotificationSettings /></PrivateRoute>} />
        <Route path="/candidate/alerts" element={<PrivateRoute><CandidateAlerts /></PrivateRoute>} />
        <Route path="/announcements" element={<PrivateRoute><SystemAnnouncements /></PrivateRoute>} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path="/admin/employers" element={<PrivateRoute><EmployerManagement /></PrivateRoute>} />
        <Route path="/admin/jobs" element={<PrivateRoute><AdminJobListings /></PrivateRoute>} />
        <Route path="/admin/jobs/queue" element={<PrivateRoute><JobApprovalQueue /></PrivateRoute>} />
        <Route path="/admin/reported-jobs" element={<PrivateRoute><AdminReportedJobs /></PrivateRoute>} />
        <Route path="/admin/revenue" element={<PrivateRoute><AdminRevenueDashboard /></PrivateRoute>} />
        <Route path="/admin/analytics" element={<PrivateRoute><PlatformAnalytics /></PrivateRoute>} />
        <Route path="/admin/subscriptions" element={<PrivateRoute><SubscriptionPlans /></PrivateRoute>} />
        <Route path="/admin/payments" element={<PrivateRoute><PaymentTransactions /></PrivateRoute>} />
        <Route path="/admin/support" element={<PrivateRoute><SupportTickets /></PrivateRoute>} />
        <Route path="/admin/cms" element={<PrivateRoute><CMSPageEditor /></PrivateRoute>} />
        <Route path="/admin/notifications" element={<PrivateRoute><AdminNotificationsManagement /></PrivateRoute>} />
        <Route path="/admin/settings" element={<PrivateRoute><AdminSystemSettings /></PrivateRoute>} />
        <Route path="/admin/logs" element={<PrivateRoute><AdminActivityLogs /></PrivateRoute>} />
        <Route path="/employer/ai-screening/:jobId" element={<PrivateRoute><AIResumeScreening /></PrivateRoute>} />
        <Route path="/ai-jobs" element={<PrivateRoute><AIJobRecommendations /></PrivateRoute>} />
        <Route path="/skill-gap" element={<PrivateRoute><SkillGapAnalysis /></PrivateRoute>} />
        <Route path="/career-insights" element={<PrivateRoute><CareerInsightsDashboard /></PrivateRoute>} />
        <Route path="/assessments" element={<PrivateRoute><OnlineAssessmentTests /></PrivateRoute>} />
        <Route path="/certifications" element={<PrivateRoute><CertificationTracking /></PrivateRoute>} />
        <Route path="/learning" element={<PrivateRoute><LearningRecommendations /></PrivateRoute>} />
        <Route path="/internships" element={<InternshipListings />} />
        <Route path="/freelance" element={<FreelanceJobMarketplace />} />
        <Route path="/community" element={<PrivateRoute><CommunityDiscussionForum /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;