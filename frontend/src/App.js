import React, { useState, useCallback } from 'react';
import RequirementsPanel from './components/RequirementsPanel';
import CandidateCard from './components/CandidateCard';
import StatsBar from './components/StatsBar';
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

  // Skills match
  if (requirements.skills.length > 0) {
    const matched = requirements.skills.filter(s => candidate.skills.includes(s)).length;
    score = Math.round((matched / requirements.skills.length) * 100);
  } else {
    score = 60 + Math.floor(Math.random() * 35);
  }

  // Experience bonus
  const expLevel = EXPERIENCE_LEVELS.find(l => l.label === requirements.experienceLevel);
  if (expLevel && expLevel.label !== 'Any') {
    if (candidate.experienceYears >= expLevel.min && candidate.experienceYears <= expLevel.max) {
      score = Math.min(100, score + 5);
    } else {
      score = Math.max(0, score - 10);
    }
  }

  // Education bonus
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
  // Experience filter
  const expLevel = EXPERIENCE_LEVELS.find(l => l.label === requirements.experienceLevel);
  if (expLevel && expLevel.label !== 'Any') {
    if (candidate.experienceYears < expLevel.min || candidate.experienceYears > expLevel.max) {
      return false;
    }
  }

  // Education filter
  if (requirements.education !== 'Any') {
    const reqIdx = EDUCATION_ORDER.indexOf(requirements.education);
    const candIdx = EDUCATION_ORDER.indexOf(candidate.education);
    if (candIdx < reqIdx) return false;
  }

  // Score filter
  if (candidate.score < requirements.minScore) return false;

  return true;
}

export default function App() {
  const [requirements, setRequirements] = useState(defaultRequirements);
  const [candidates, setCandidates] = useState(
    MOCK_CANDIDATES.map(c => ({ ...c, score: 70 + Math.floor(Math.random() * 25) }))
  );
  const [filtered, setFiltered] = useState(null);
  const [sortBy, setSortBy] = useState('score');
  const [filterApplied, setFilterApplied] = useState(false);
  const [tab, setTab] = useState('all'); // 'all' | 'shortlisted'

  const handleFilter = useCallback(() => {
    const updated = candidates.map(c => ({
      ...c,
      score: computeScore(c, requirements),
    }));
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
    if (filtered) {
      setFiltered(prev => prev.map(c => c.id === id ? { ...c, shortlisted: !c.shortlisted } : c));
    }
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

  return (
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {filterApplied && (
            <span style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 6,
              background: '#00e5a015', color: '#00e5a0',
              border: '1px solid #00e5a030', fontWeight: 700,
            }}>
              {filtered?.length} results
            </span>
          )}
          <div style={{ fontSize: 12, color: '#445566' }}>
            {shortlistedCount > 0 && (
              <span style={{ color: '#f5c518' }}>⭐ {shortlistedCount} shortlisted</span>
            )}
          </div>
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
          {/* Stats */}
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
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate list or empty state */}
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

          {/* Shortlist export note */}
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
