import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ShieldAlert, Flag, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import AnimatedPage from "../components/common/AnimatedPage";
import api from "../services/api";
const TakeExam = () => {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Quiz State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores questionId -> studentAnswer
  const [flagged, setFlagged] = useState({}); // Stores questionId -> boolean
  const [startedAt] = useState(new Date().toISOString());
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(0); // In seconds
  const timerRef = useRef(null);

  // Anti-Cheat State
  const [cheatWarnings, setCheatWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const warningModalTimer = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // 1. Fetch Exam details
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/exams/${examId}`);
setExam(data);
setTimeLeft(data.duration * 60);
        
        setExam(data);
        setTimeLeft(data.duration * 60); // convert minutes to seconds
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  // 2. Countdown Timer
  useEffect(() => {
    if (timeLeft > 0 && exam) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Trigger auto-submit when timer hits zero
            handleAutoSubmit('Time has expired! Submitting your answers.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, exam]);

  // 3. Tab Visibility Cheat Prevention
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs/minimized window
        setCheatWarnings((prev) => {
          const next = prev + 1;
          if (next >= 3) {
            handleAutoSubmit('Anti-cheat triggered: Exceeded maximum tab-switching allowance (3 times). Exam auto-submitted.');
          } else {
            setShowWarningModal(true);
          }
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (warningModalTimer.current) clearTimeout(warningModalTimer.current);
    };
  }, []);

  const handleSelectAnswer = (qId, val) => {
    setAnswers({
      ...answers,
      [qId]: val
    });
  };

  const handleToggleFlag = (qId) => {
    setFlagged({
      ...flagged,
      [qId]: !flagged[qId]
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 4. Submit logic
  const handleAutoSubmit = async (reasonMessage) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reasonMessage) alert(reasonMessage);
    
    await submitQuizAnswers();
  };

  const submitQuizAnswers = async () => {
    try {
      setLoading(true);
      // Format answers for API
      const formattedAnswers = Object.keys(answers).map(qId => ({
        questionId: qId,
        studentAnswer: answers[qId]
      }));

      const { data } = await api.post(`/exams/${examId}/submit`, {
  answers: formattedAnswers,
  startedAt,
});

      navigate(`/results/attempt/${data.attemptId}`, { replace: true });
    } catch (err) {
      alert(`Submission error: ${err.message}. Retrying...`);
      setLoading(false);
    }
  };

  const handleManualSubmit = () => {
    const unansweredCount = exam.questions.length - Object.keys(answers).length;
    let confirmMsg = 'Are you sure you want to submit your exam?';
    if (unansweredCount > 0) {
      confirmMsg = `You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`;
    }
    
    if (window.confirm(confirmMsg)) {
      submitQuizAnswers();
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading timed exam session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div className="glass-panel" style={{ ...styles.emptyState, borderColor: '#ef4444' }}>
          <ShieldAlert size={48} color="#ef4444" />
          <h2>Unable to Load Exam</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = exam.questions[currentIdx];
  const isTimeCritical = timeLeft < 60; // Less than 1 minute

  return (
    <AnimatedPage>
    <div style={styles.container}>
      {/* Top sticky timer bar */}
      <header className="glass-panel animate-fade-in" style={styles.quizHeader}>
        <div style={styles.examTitleBox}>
          <h2 style={styles.examTitle}>{exam.title}</h2>
          <span className="badge badge-primary">Active Exam Session</span>
        </div>

        <div style={{
          ...styles.timerBox,
          borderColor: isTimeCritical ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.08)',
          background: isTimeCritical ? 'rgba(239, 68, 68, 0.1)' : 'rgba(20, 30, 50, 0.45)'
        }}>
          <Clock size={20} color={isTimeCritical ? '#ef4444' : '#6366f1'} />
          <span style={{
            ...styles.timerText,
            color: isTimeCritical ? '#ef4444' : '#f3f4f6',
            animation: isTimeCritical ? 'pulse-glow 1s infinite' : 'none'
          }}>{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div style={styles.quizGrid}>
        {/* Left Navigator Panel */}
        <aside className="glass-panel animate-fade-in" style={styles.navPanel}>
          <h3 style={styles.navTitle}>Questions Navigation</h3>
          <div style={styles.qGrid}>
            {exam.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flagged[q.id];
              const isCurrent = idx === currentIdx;

              let btnStyle = styles.qNavBtn;
              if (isCurrent) btnStyle = { ...btnStyle, ...styles.qNavCurrent };
              else if (isFlagged) btnStyle = { ...btnStyle, ...styles.qNavFlagged };
              else if (isAnswered) btnStyle = { ...btnStyle, ...styles.qNavAnswered };

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  style={btnStyle}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <span style={{ ...styles.legendDot, background: '#6366f1' }}></span>
              <span>Current</span>
            </div>
            <div style={styles.legendItem}>
              <span style={{ ...styles.legendDot, background: '#10b981' }}></span>
              <span>Answered</span>
            </div>
            <div style={styles.legendItem}>
              <span style={{ ...styles.legendDot, background: '#f59e0b' }}></span>
              <span>Flagged</span>
            </div>
          </div>

          <button onClick={handleManualSubmit} className="btn btn-primary" style={styles.submitExamBtn}>
            <Send size={16} />
            Submit Examination
          </button>
        </aside>

        {/* Right Active Question Card */}
        <main className="glass-panel animate-fade-in" style={styles.questionCard}>
          <div style={styles.qHeader}>
            <span style={styles.qHeaderIndex}>Question {currentIdx + 1} of {exam.questions.length}</span>
            <div style={styles.qHeaderActions}>
              <span className="badge badge-primary">{currentQ.points} Points</span>
              <button
                onClick={() => handleToggleFlag(currentQ.id)}
                style={{
                  ...styles.flagBtn,
                  background: flagged[currentQ.id] ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: flagged[currentQ.id] ? '#f59e0b' : 'rgba(255, 255, 255, 0.08)',
                  color: flagged[currentQ.id] ? '#f59e0b' : '#9ca3af'
                }}
              >
                <Flag size={14} />
                {flagged[currentQ.id] ? 'Flagged' : 'Flag for review'}
              </button>
            </div>
          </div>

          <div style={styles.qBody}>
            <h3 style={styles.qText}>{currentQ.questionText}</h3>

            {/* Render options for MCQ */}
            {currentQ.type === 'mcq' ? (
              <div style={styles.optionsContainer}>
                {currentQ.options.map((opt, oIndex) => {
                  const isSelected = answers[currentQ.id] === opt;
                  return (
                    <div
                      key={oIndex}
                      onClick={() => handleSelectAnswer(currentQ.id, opt)}
                      style={{
                        ...styles.optionRow,
                        borderColor: isSelected ? '#6366f1' : 'rgba(255,255,255,0.06)',
                        background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255,0.02)'
                      }}
                      className="glass-panel-interactive"
                    >
                      <div style={{
                        ...styles.optionSelector,
                        borderColor: isSelected ? '#6366f1' : 'rgba(255,255,255,0.2)',
                        background: isSelected ? '#6366f1' : 'transparent'
                      }}>
                        {isSelected && <span style={styles.optionCheck}></span>}
                      </div>
                      <span style={styles.optionLetter}>{String.fromCharCode(65 + oIndex)}.</span>
                      <span style={styles.optionText}>{opt}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Render text input for short answers */
              <div className="input-group" style={{ marginTop: '1.5rem' }}>
                <label className="input-label">Your Answer</label>
                <input
                  type="text"
                  className="text-input"
                  style={{ width: '100%' }}
                  placeholder="Type your answer here..."
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleSelectAnswer(currentQ.id, e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Card navigation footer */}
          <footer style={styles.qFooter}>
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              className="btn btn-secondary"
              disabled={currentIdx === 0}
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <button
              onClick={() => setCurrentIdx(prev => Math.min(exam.questions.length - 1, prev + 1))}
              className="btn btn-secondary"
              disabled={currentIdx === exam.questions.length - 1}
            >
              Next
              <ArrowRight size={16} />
            </button>
          </footer>
        </main>
      </div>

      {/* Warning Overlay Modal for Cheat tab-switching */}
      {showWarningModal && (
        <div style={styles.warningOverlay}>
          <div className="glass-panel animate-fade-in" style={styles.warningCard}>
            <ShieldAlert size={48} color="#f59e0b" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.5rem' }}>
              Warning: Navigation Detected!
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
              You have switched windows or tabs. Navigating away from this exam page is monitored. 
              <br />
              <strong>Warning {cheatWarnings} of 3</strong>. Exceeding 3 warnings will result in automatic submission.
            </p>
            <button
              onClick={() => setShowWarningModal(false)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Understand & Resume Exam
            </button>
          </div>
        </div>
      )}
    </div>
    </AnimatedPage>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem 3rem',
  },
  quizHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 2rem',
    borderRadius: '20px',
    marginBottom: '2rem',
  },
  examTitleBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  examTitle: {
    fontSize: '1.35rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
  },
  timerBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.65rem 1.25rem',
    border: '1px solid',
    borderRadius: '12px',
    transition: 'all 0.3s',
  },
  timerText: {
    fontSize: '1.3rem',
    fontWeight: '800',
    fontVariantNumeric: 'tabular-nums',
  },
  quizGrid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
  },
  navPanel: {
    padding: '1.75rem',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignSelf: 'start',
  },
  navTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
  },
  qGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '0.6rem',
  },
  qNavBtn: {
    aspectRatio: '1',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  qNavCurrent: {
    background: 'rgba(99, 102, 241, 0.15)',
    borderColor: '#6366f1',
    color: '#6366f1',
    boxShadow: '0 0 10px rgba(99, 102, 241, 0.25)',
  },
  qNavAnswered: {
    background: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
    color: '#10b981',
  },
  qNavFlagged: {
    background: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#f59e0b',
    color: '#f59e0b',
  },
  legend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    fontSize: '0.85rem',
    color: '#9ca3af',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    paddingBottom: '1.25rem',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  submitExamBtn: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
  },
  questionCard: {
    padding: '2.5rem',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '450px',
  },
  qHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '1.25rem',
    marginBottom: '2rem',
  },
  qHeaderIndex: {
    color: '#9ca3af',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  qHeaderActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  flagBtn: {
    border: '1px solid',
    padding: '0.35rem 0.75rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  qBody: {
    flex: 1,
  },
  qText: {
    fontSize: '1.35rem',
    fontWeight: '600',
    lineHeight: '1.4',
    marginBottom: '2rem',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    padding: '1.1rem 1.5rem',
    borderRadius: '12px',
    border: '1px solid',
    cursor: 'pointer',
  },
  optionSelector: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCheck: {
    width: '8px',
    height: '8px',
    background: '#fff',
    borderRadius: '50%',
  },
  optionLetter: {
    fontWeight: '700',
    color: '#9ca3af',
  },
  optionText: {
    fontSize: '1rem',
  },
  qFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '3rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '1.5rem',
  },
  warningOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(5, 7, 12, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  warningCard: {
    width: '90%',
    maxWidth: '420px',
    padding: '2.5rem',
    textAlign: 'center',
    borderRadius: '24px',
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
    borderRadius: '20px',
  },
};

export default TakeExam;
