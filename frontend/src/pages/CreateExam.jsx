import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, Plus, Trash2, ArrowLeft, HelpCircle } from 'lucide-react';
import api from "../services/api";
const CreateExam = () => {
  const [searchParams] = useSearchParams();
  const editExamId = searchParams.get('edit');
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [passingScore, setPassingScore] = useState(40);
  const [questions, setQuestions] = useState([
    { questionText: '', type: 'mcq', options: ['', '', '', ''], correctAnswer: '', points: 1 }
  ]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const token = localStorage.getItem("token");

  // Load exam details if in edit mode
  useEffect(() => {
    if (editExamId) {
      const fetchExamDetails = async () => {
        try {
          setFetching(true);
          const res = await fetch(`/api/exams/${editExamId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Failed to fetch exam');

          setTitle(data.title);
          setDescription(data.description || '');
          setDuration(data.duration);
          setPassingScore(data.passingScore);
          
          // Format questions options if they come as string list
          const formattedQuestions = data.questions.map(q => ({
            id: q.id,
            questionText: q.questionText,
            type: q.type,
            options: Array.isArray(q.options) ? q.options : ['', '', '', ''],
            correctAnswer: q.correctAnswer,
            points: q.points
          }));
          setQuestions(formattedQuestions);
        } catch (err) {
          alert(`Error loading exam details: ${err.message}`);
          navigate('/admin');
        } finally {
          setFetching(false);
        }
      };

      fetchExamDetails();
    }
  }, [editExamId]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', type: 'mcq', options: ['', '', '', ''], correctAnswer: '', points: 1 }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length === 1) return; // Keep at least 1 question
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !duration) {
      return alert('Title and Duration are required fields.');
    }

    // Basic questions validation
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        return alert(`Question #${i + 1} text is empty.`);
      }
      if (!q.correctAnswer.trim()) {
        return alert(`Question #${i + 1} does not have a correct answer specified.`);
      }
      if (q.type === 'mcq') {
        if (q.options.some(opt => !opt.trim())) {
          return alert(`Question #${i + 1} (MCQ) must have all 4 options filled out.`);
        }
      }
    }

    try {
      setLoading(true);
      const url = editExamId ? `/api/exams/${editExamId}` : '/api/exams';
      const method = editExamId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          duration,
          passingScore,
          questions
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save exam');

      navigate('/admin');
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Fetching examination outline...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button onClick={() => navigate('/admin')} className="btn btn-secondary" style={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to Admin
        </button>
        <h1 style={styles.pageTitle}>{editExamId ? 'Edit Examination' : 'Create New Examination'}</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Basic Details Panel */}
        <section className="glass-panel" style={styles.sectionPanel}>
          <h2 style={styles.sectionTitle}>1. Examination Profile</h2>
          
          <div className="input-group">
            <label className="input-label">Exam Title</label>
            <input
              type="text"
              className="text-input"
              placeholder="e.g. Database Management Systems - MidTerm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Description (Optional)</label>
            <textarea
              className="text-input"
              style={{ minHeight: '80px', resize: 'vertical' }}
              placeholder="Instructions or syllabus covered..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={styles.detailsRow}>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Duration (Minutes)</label>
              <input
                type="number"
                className="text-input"
                min="1"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                required
              />
            </div>
            
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Passing Score (%)</label>
              <input
                type="number"
                className="text-input"
                min="0"
                max="100"
                value={passingScore}
                onChange={(e) => setPassingScore(parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>
        </section>

        {/* Questions Builder */}
        <section style={styles.questionsListSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>2. Question Bank Builder</h2>
            <button type="button" onClick={handleAddQuestion} className="btn btn-secondary" style={styles.addQBtn}>
              <Plus size={16} />
              Add Question
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="glass-panel animate-fade-in" style={styles.questionPanel}>
              <div style={styles.qPanelHeader}>
                <span style={styles.qIndex}>Question #{qIndex + 1}</span>
                <div style={styles.qPanelActions}>
                  <div style={styles.pointsGroup}>
                    <label style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '500' }}>Points:</label>
                    <input
                      type="number"
                      className="text-input"
                      style={styles.pointsInput}
                      min="1"
                      value={q.points}
                      onChange={(e) => handleQuestionChange(qIndex, 'points', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(qIndex)}
                    style={styles.deleteQBtn}
                    disabled={questions.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Question Text</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="Enter the question query..."
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                  required
                />
              </div>

              <div style={styles.detailsRow}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label">Question Type</label>
                  <select
                    className="select-input"
                    value={q.type}
                    onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                  >
                    <option value="mcq">Multiple Choice (MCQ)</option>
                    <option value="short">Short Answer (Text)</option>
                  </select>
                </div>
              </div>

              {/* Options panel for MCQ */}
              {q.type === 'mcq' ? (
                <div style={styles.mcqBuilder}>
                  <label className="input-label">Configure MCQ Options & Correct Choice</label>
                  <div style={styles.mcqGrid}>
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} style={styles.mcqOptionField}>
                        <span style={styles.optLetter}>{String.fromCharCode(65 + oIndex)}.</span>
                        <input
                          type="text"
                          className="text-input"
                          style={{ flex: 1 }}
                          placeholder={`Option value...`}
                          value={opt}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          required={q.type === 'mcq'}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="input-group" style={{ marginTop: '1rem' }}>
                    <label className="input-label">Correct Option</label>
                    <select
                      className="select-input"
                      value={q.correctAnswer}
                      onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                    >
                      <option value="">-- Choose Correct Answer --</option>
                      {q.options.map((opt, oIndex) => {
                        const val = opt.trim();
                        return (
                          <option key={oIndex} value={val} disabled={!val}>
                            Option {String.fromCharCode(65 + oIndex)}: {val || '(empty option)'}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ) : (
                /* Short answer answer input */
                <div className="input-group">
                  <label className="input-label">Expected Answer Keywords (Case-insensitive match)</label>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Enter the correct answer code or text word..."
                    value={q.correctAnswer}
                    onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                    required={q.type === 'short'}
                  />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Form Actions Footer */}
        <div style={styles.actionsFooter}>
          <button
            type="submit"
            className="btn btn-success"
            style={styles.saveBtn}
            disabled={loading}
          >
            <Save size={18} />
            {loading ? 'Saving Exam...' : editExamId ? 'Update Exam' : 'Publish Examination'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    padding: '1rem 2rem 4rem',
  },
  navHeader: {
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  sectionPanel: {
    padding: '2rem',
    borderRadius: '20px',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#f3f4f6',
  },
  detailsRow: {
    display: 'flex',
    gap: '1.5rem',
  },
  questionsListSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addQBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontSize: '0.85rem',
  },
  questionPanel: {
    padding: '1.75rem',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  qPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '0.75rem',
  },
  qIndex: {
    fontWeight: '700',
    fontSize: '1.05rem',
    color: '#6366f1',
  },
  qPanelActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  pointsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  pointsInput: {
    width: '65px',
    padding: '0.4rem 0.6rem',
    textAlign: 'center',
  },
  deleteQBtn: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  mcqBuilder: {
    background: 'rgba(0, 0, 0, 0.15)',
    padding: '1.25rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.03)',
  },
  mcqGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '0.75rem',
    marginBottom: '1rem',
  },
  mcqOptionField: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  optLetter: {
    fontWeight: '700',
    color: '#9ca3af',
  },
  actionsFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
  },
  saveBtn: {
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1rem',
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

export default CreateExam;
