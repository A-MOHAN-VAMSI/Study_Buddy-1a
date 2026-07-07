import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, BookOpen, Clock, FileText, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${user.token}` };

        // Fetch active exams
        const examsRes = await fetch('/api/exams', { headers });
        const examsData = await examsRes.json();
        if (!examsRes.ok) throw new Error(examsData.message || 'Failed to fetch exams');
        setExams(examsData);

        // Fetch past attempts
        const attemptsRes = await fetch('/api/results/student', { headers });
        const attemptsData = await attemptsRes.json();
        if (!attemptsRes.ok) throw new Error(attemptsData.message || 'Failed to fetch attempts');
        setAttempts(attemptsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate quick metrics
  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((att) => att.passed).length;
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;
  const avgScore =
    totalAttempts > 0
      ? Math.round(attempts.reduce((sum, att) => sum + att.percentage, 0) / totalAttempts)
      : 0;

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading your study panel...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Hello, {user.name} 👋</h1>
          <p style={styles.subtitle}>Welcome back to your StudyBuddy learning space.</p>
        </div>
        <div style={styles.dateBadge} className="glass-panel">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </header>

      {error && (
        <div className="badge badge-danger" style={{ display: 'block', padding: '1rem', margin: '1rem 0' }}>
          Error: {error}
        </div>
      )}

      {/* Metrics Section */}
      <section style={styles.metricsGrid}>
        <div className="glass-panel animate-fade-in" style={styles.metricCard}>
          <div style={{ ...styles.iconBadge, background: 'rgba(99, 102, 241, 0.12)' }}>
            <FileText size={24} color="#6366f1" />
          </div>
          <div>
            <h3 style={styles.metricTitle}>Exams Taken</h3>
            <p style={styles.metricValue}>{totalAttempts}</p>
          </div>
        </div>

        <div className="glass-panel animate-fade-in" style={{ ...styles.metricCard, animationDelay: '0.1s' }}>
          <div style={{ ...styles.iconBadge, background: 'rgba(16, 185, 129, 0.12)' }}>
            <Award size={24} color="#10b981" />
          </div>
          <div>
            <h3 style={styles.metricTitle}>Average Score</h3>
            <p style={styles.metricValue}>{avgScore}%</p>
          </div>
        </div>

        <div className="glass-panel animate-fade-in" style={{ ...styles.metricCard, animationDelay: '0.2s' }}>
          <div style={{ ...styles.iconBadge, background: 'rgba(6, 182, 212, 0.12)' }}>
            <CheckCircle2 size={24} color="#06b6d4" />
          </div>
          <div>
            <h3 style={styles.metricTitle}>Pass Rate</h3>
            <p style={styles.metricValue}>{passRate}%</p>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div style={styles.contentGrid}>
        {/* Available Exams */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Available Examinations</h2>
          <div style={styles.listContainer}>
            {exams.length === 0 ? (
              <div className="glass-panel" style={styles.emptyState}>
                <BookOpen size={48} color="#6b7280" />
                <p>No exams available right now.</p>
              </div>
            ) : (
              exams.map((exam) => (
                <div key={exam.id} className="glass-panel-interactive animate-fade-in" style={styles.examCard}>
                  <div style={styles.examHeader}>
                    <h3 style={styles.examTitle}>{exam.title}</h3>
                    <div style={styles.examDuration}>
                      <Clock size={16} color="#9ca3af" />
                      <span>{exam.duration} mins</span>
                    </div>
                  </div>
                  <p style={styles.examDesc}>{exam.description || 'No description provided.'}</p>
                  <div style={styles.examFooter}>
                    <div style={styles.examMeta}>
                      <span className="badge badge-primary">
                        {exam.questions ? exam.questions.length : 0} Questions
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                        Passing: {exam.passingScore}%
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/take-exam/${exam.id}`)}
                      className="btn btn-primary"
                      style={styles.actionBtn}
                    >
                      Take Exam
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Previous Results */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Performance History</h2>
          <div style={styles.listContainer}>
            {attempts.length === 0 ? (
              <div className="glass-panel" style={styles.emptyState}>
                <Award size={48} color="#6b7280" />
                <p>You haven't taken any exams yet.</p>
              </div>
            ) : (
              attempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="glass-panel animate-fade-in"
                  style={styles.resultCard}
                  onClick={() => navigate(`/results/attempt/${attempt.id}`)}
                >
                  <div style={styles.resultHeader}>
                    <div>
                      <h4 style={styles.resultTitle}>{attempt.exam ? attempt.exam.title : 'Deleted Exam'}</h4>
                      <p style={styles.resultDate}>
                        {new Date(attempt.submittedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div style={styles.resultScoreContainer}>
                      <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>{attempt.percentage}%</span>
                      <span
                        className={`badge ${attempt.passed ? 'badge-success' : 'badge-danger'}`}
                        style={{ marginTop: '0.25rem' }}
                      >
                        {attempt.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem 3rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    marginBottom: '0.25rem',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '1rem',
  },
  dateBadge: {
    padding: '0.6rem 1.2rem',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#9ca3af',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  metricCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    padding: '1.75rem',
    borderRadius: '20px',
  },
  iconBadge: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  metricTitle: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    color: '#9ca3af',
    letterSpacing: '0.05em',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: '800',
    lineHeight: '1',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: '2.5rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  sectionTitle: {
    fontSize: '1.35rem',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '4rem 2rem',
    textAlign: 'center',
    color: '#9ca3af',
  },
  examCard: {
    padding: '1.75rem',
    borderRadius: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  examHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  examTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  examDuration: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.85rem',
    color: '#9ca3af',
    background: 'rgba(255,255,255,0.05)',
    padding: '0.35rem 0.75rem',
    borderRadius: '8px',
  },
  examDesc: {
    color: '#9ca3af',
    fontSize: '0.95rem',
    lineHeight: '1.4',
  },
  examFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  examMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  actionBtn: {
    padding: '0.6rem 1.2rem',
    borderRadius: '10px',
    fontSize: '0.85rem',
  },
  resultCard: {
    padding: '1.25rem',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    marginBottom: '0.2rem',
  },
  resultDate: {
    fontSize: '0.8rem',
    color: '#6b7280',
  },
  resultScoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem',
    color: '#9ca3af',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(99, 102, 241, 0.1)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default StudentDashboard;
