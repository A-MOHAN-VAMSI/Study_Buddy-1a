import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Award, Clock, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

const ExamResults = () => {
  const { id: attemptId } = useParams();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAttemptDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/results/attempt/${attemptId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load results');
        setAttempt(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttemptDetails();
  }, [attemptId]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading result review sheet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div className="glass-panel" style={styles.emptyState}>
          <XCircle size={48} color="#ef4444" />
          <h2>Error Loading Results</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { exam = {}, student = {}, score, percentage, passed, submittedAt, answers = [] } = attempt || {};

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate(user.role === 'admin' ? '/admin' : '/')} className="btn btn-secondary" style={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <h1 style={styles.pageTitle}>Performance Review</h1>
      </header>

      {/* Hero Result Banner */}
      <section
        className="glass-panel animate-fade-in"
        style={{
          ...styles.heroCard,
          borderLeft: passed ? '6px solid #10b981' : '6px solid #ef4444'
        }}
      >
        <div style={styles.heroLeft}>
          <div style={{ ...styles.iconGlow, background: passed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)' }}>
            <Award size={36} color={passed ? '#10b981' : '#ef4444'} />
          </div>
          <div>
            <h2 style={styles.examTitle}>{exam.title}</h2>
            <p style={styles.studentName}>Taken by: {student.name} ({student.email})</p>
            <p style={styles.dateTime}>
              Completed on: {new Date(submittedAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.scoreCircle}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1 }}>{percentage}%</span>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>
              Score
            </span>
          </div>
          <span className={`badge ${passed ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: '0.75rem', fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
            {passed ? 'PASSED' : 'FAILED'}
          </span>
        </div>
      </section>

      {/* Metrics Row */}
      <section style={styles.metricsGrid}>
        <div className="glass-panel" style={styles.metricCard}>
          <FileText size={18} color="#6366f1" />
          <div style={styles.metricTexts}>
            <span style={styles.metricLabel}>Earned Score</span>
            <span style={styles.metricValue}>{score} Points</span>
          </div>
        </div>

        <div className="glass-panel" style={styles.metricCard}>
          <Award size={18} color="#10b981" />
          <div style={styles.metricTexts}>
            <span style={styles.metricLabel}>Passing score</span>
            <span style={styles.metricValue}>{exam.passingScore || 40}%</span>
          </div>
        </div>

        <div className="glass-panel" style={styles.metricCard}>
          <Clock size={18} color="#06b6d4" />
          <div style={styles.metricTexts}>
            <span style={styles.metricLabel}>Exam duration</span>
            <span style={styles.metricValue}>{exam.duration} Minutes</span>
          </div>
        </div>
      </section>

      {/* Detailed Questions Review */}
      <section style={styles.reviewSection}>
        <h3 style={styles.reviewTitle}>Question-by-Question Review</h3>
        <div style={styles.questionsList}>
          {answers.map((ans, index) => {
            const q = ans.question || {};
            const isCorrect = String(ans.studentAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();

            return (
              <div key={ans.id} className="glass-panel animate-fade-in" style={{ ...styles.questionReviewCard, animationDelay: `${index * 0.05}s` }}>
                <div style={styles.qHeader}>
                  <div style={styles.qTitleBox}>
                    <span style={styles.qNumber}>Question {index + 1}</span>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                      {q.points} {q.points === 1 ? 'Point' : 'Points'}
                    </span>
                  </div>

                  <div style={styles.qStatus}>
                    {isCorrect ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: '600', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={18} />
                        Correct
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontWeight: '600', fontSize: '0.9rem' }}>
                        <XCircle size={18} />
                        Incorrect
                      </div>
                    )}
                  </div>
                </div>

                <p style={styles.qText}>{q.questionText}</p>

                <div style={styles.answersGrid}>
                  <div style={styles.answerBox}>
                    <span style={styles.answerLabel}>Your Answer:</span>
                    <span style={{
                      ...styles.answerVal,
                      color: isCorrect ? '#10b981' : '#fca5a5',
                      fontWeight: '600'
                    }}>
                      {ans.studentAnswer || '(No answer provided)'}
                    </span>
                  </div>

                  <div style={styles.answerBox}>
                    <span style={styles.answerLabel}>Correct Answer:</span>
                    <span style={{ ...styles.answerVal, color: '#10b981', fontWeight: '600' }}>
                      {q.correctAnswer}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    padding: '1rem 2rem 4rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '2rem',
  },
  backBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontSize: '0.85rem',
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
  },
  heroCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2.5rem',
    borderRadius: '24px',
    marginBottom: '2rem',
  },
  heroLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  iconGlow: {
    width: '70px',
    height: '70px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  examTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    marginBottom: '0.25rem',
  },
  studentName: {
    fontSize: '0.95rem',
    color: '#f3f4f6',
    fontWeight: '500',
  },
  dateTime: {
    fontSize: '0.85rem',
    color: '#9ca3af',
    marginTop: '0.2rem',
  },
  heroRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scoreCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '3px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.25rem',
    marginBottom: '2.5rem',
  },
  metricCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
    borderRadius: '16px',
  },
  metricTexts: {
    display: 'flex',
    flexDirection: 'column',
  },
  metricLabel: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  metricValue: {
    fontSize: '1.05rem',
    fontWeight: '700',
  },
  reviewSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  reviewTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  },
  questionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  questionReviewCard: {
    padding: '1.75rem',
    borderRadius: '18px',
  },
  qHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '0.75rem',
    marginBottom: '1rem',
  },
  qTitleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  qNumber: {
    fontWeight: '700',
    fontSize: '1rem',
  },
  qStatus: {
    display: 'flex',
    alignItems: 'center',
  },
  qText: {
    fontSize: '1.15rem',
    lineHeight: '1.4',
    marginBottom: '1.5rem',
    color: '#f3f4f6',
  },
  answersGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    background: 'rgba(0, 0, 0, 0.15)',
    padding: '1.25rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.02)',
  },
  answerBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  answerLabel: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  answerVal: {
    fontSize: '0.95rem',
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
};

export default ExamResults;
