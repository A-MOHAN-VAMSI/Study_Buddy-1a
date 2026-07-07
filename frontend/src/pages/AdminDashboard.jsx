import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Award, BookOpen, FileText, CheckCircle2, BarChart3, Trash2, Edit } from 'lucide-react';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${user.token}` };

      // Fetch overall analytics
      const analyticsRes = await fetch('/api/results/analytics', { headers });
      const analyticsData = await analyticsRes.json();
      if (!analyticsRes.ok) throw new Error(analyticsData.message || 'Failed to fetch analytics');
      setAnalytics(analyticsData);

      // Fetch exams list
      const examsRes = await fetch('/api/exams', { headers });
      const examsData = await examsRes.json();
      if (!examsRes.ok) throw new Error(examsData.message || 'Failed to fetch exams');
      setExams(examsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteExam = async (examId, examTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${examTitle}"? This will delete all student attempts and questions under it.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/exams/${examId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete exam');

      // Refresh list
      fetchAdminData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  const { summary = {}, distribution = {}, recentAttempts = [], examStats = [] } = analytics || {};

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Faculty Admin Portal</h1>
          <p style={styles.subtitle}>Create exams, grade performance, and monitor analytics.</p>
        </div>
        <button onClick={() => navigate('/admin/create-exam')} className="btn btn-primary">
          <Plus size={18} />
          Create Exam
        </button>
      </header>

      {error && (
        <div className="badge badge-danger" style={{ display: 'block', padding: '1rem', margin: '1rem 0' }}>
          Error: {error}
        </div>
      )}

      {/* Metrics Row */}
      <section style={styles.metricsGrid}>
        <div className="glass-panel animate-fade-in" style={styles.metricCard}>
          <div style={{ ...styles.iconBadge, background: 'rgba(99, 102, 241, 0.12)' }}>
            <BookOpen size={22} color="#6366f1" />
          </div>
          <div>
            <h3 style={styles.metricTitle}>Total Exams</h3>
            <p style={styles.metricValue}>{summary.examCount || 0}</p>
          </div>
        </div>

        <div className="glass-panel animate-fade-in" style={{ ...styles.metricCard, animationDelay: '0.05s' }}>
          <div style={{ ...styles.iconBadge, background: 'rgba(16, 185, 129, 0.12)' }}>
            <Users size={22} color="#10b981" />
          </div>
          <div>
            <h3 style={styles.metricTitle}>Students</h3>
            <p style={styles.metricValue}>{summary.studentCount || 0}</p>
          </div>
        </div>

        <div className="glass-panel animate-fade-in" style={{ ...styles.metricCard, animationDelay: '0.1s' }}>
          <div style={{ ...styles.iconBadge, background: 'rgba(245, 158, 11, 0.12)' }}>
            <FileText size={22} color="#f59e0b" />
          </div>
          <div>
            <h3 style={styles.metricTitle}>Attempts</h3>
            <p style={styles.metricValue}>{summary.attemptCount || 0}</p>
          </div>
        </div>

        <div className="glass-panel animate-fade-in" style={{ ...styles.metricCard, animationDelay: '0.15s' }}>
          <div style={{ ...styles.iconBadge, background: 'rgba(6, 182, 212, 0.12)' }}>
            <CheckCircle2 size={22} color="#06b6d4" />
          </div>
          <div>
            <h3 style={styles.metricTitle}>Avg Pass Rate</h3>
            <p style={styles.metricValue}>{summary.passRate || 0}%</p>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section style={styles.analyticsSection} className="glass-panel animate-fade-in">
        <h2 style={styles.sectionTitle}>
          <BarChart3 size={18} color="#6366f1" />
          Grade Distribution (Percentage bins)
        </h2>
        <div style={styles.chartContainer}>
          <div style={styles.chartCol}>
            <div style={styles.chartBarLabel}>Excellent (80%+)</div>
            <div style={styles.chartBarTrack}>
              <div
                style={{
                  ...styles.chartBarFill,
                  width: `${summary.attemptCount > 0 ? (distribution.excellent / summary.attemptCount) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                }}
              ></div>
            </div>
            <div style={styles.chartValue}>{distribution.excellent || 0} attempts</div>
          </div>

          <div style={styles.chartCol}>
            <div style={styles.chartBarLabel}>Good (60%-79%)</div>
            <div style={styles.chartBarTrack}>
              <div
                style={{
                  ...styles.chartBarFill,
                  width: `${summary.attemptCount > 0 ? (distribution.good / summary.attemptCount) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, #6366f1, #4f46e5)',
                }}
              ></div>
            </div>
            <div style={styles.chartValue}>{distribution.good || 0} attempts</div>
          </div>

          <div style={styles.chartCol}>
            <div style={styles.chartBarLabel}>Average (40%-59%)</div>
            <div style={styles.chartBarTrack}>
              <div
                style={{
                  ...styles.chartBarFill,
                  width: `${summary.attemptCount > 0 ? (distribution.average / summary.attemptCount) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                }}
              ></div>
            </div>
            <div style={styles.chartValue}>{distribution.average || 0} attempts</div>
          </div>

          <div style={styles.chartCol}>
            <div style={styles.chartBarLabel}>Poor (Below 40%)</div>
            <div style={styles.chartBarTrack}>
              <div
                style={{
                  ...styles.chartBarFill,
                  width: `${summary.attemptCount > 0 ? (distribution.poor / summary.attemptCount) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, #ef4444, #dc2626)',
                }}
              ></div>
            </div>
            <div style={styles.chartValue}>{distribution.poor || 0} attempts</div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div style={styles.mainGrid}>
        {/* Exams List */}
        <section style={styles.listSection} className="glass-panel animate-fade-in">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Manage Exams</h2>
            <span className="badge badge-primary">{exams.length} Active</span>
          </div>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Exam Name</th>
                  <th style={styles.th}>Duration</th>
                  <th style={styles.th}>Attempts</th>
                  <th style={styles.th}>Avg Score</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => {
                  const stat = examStats.find((s) => s.id === exam.id) || {};
                  return (
                    <tr key={exam.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={styles.examName}>{exam.title}</div>
                      </td>
                      <td style={styles.td}>{exam.duration} mins</td>
                      <td style={styles.td}>{stat.attemptCount || 0}</td>
                      <td style={styles.td}>{stat.averageScore || 0}%</td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <button
                            onClick={() => navigate(`/admin/create-exam?edit=${exam.id}`)}
                            style={styles.actionIconBtn}
                            title="Edit"
                          >
                            <Edit size={16} color="#6366f1" />
                          </button>
                          <button
                            onClick={() => handleDeleteExam(exam.id, exam.title)}
                            style={styles.actionIconBtn}
                            title="Delete"
                          >
                            <Trash2 size={16} color="#ef4444" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {exams.length === 0 && (
                  <tr>
                    <td colSpan="5" style={styles.noDataCell}>
                      No exams configured yet. Click "Create Exam" to start.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Submissions */}
        <section style={styles.listSection} className="glass-panel animate-fade-in">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Submissions</h2>
          </div>
          <div style={styles.recentAttemptsList}>
            {recentAttempts.map((attempt) => (
              <div
                key={attempt.id}
                style={styles.submissionRow}
                className="glass-panel-interactive"
                onClick={() => navigate(`/results/attempt/${attempt.id}`)}
              >
                <div>
                  <div style={styles.subStudentName}>{attempt.student ? attempt.student.name : 'Unknown'}</div>
                  <div style={styles.subExamTitle}>{attempt.exam ? attempt.exam.title : 'Deleted Exam'}</div>
                </div>
                <div style={styles.subResults}>
                  <div style={{ fontWeight: '700' }}>{attempt.percentage}%</div>
                  <div style={{ fontSize: '0.75rem', color: attempt.passed ? '#10b981' : '#ef4444' }}>
                    {attempt.passed ? 'PASSED' : 'FAILED'}
                  </div>
                </div>
              </div>
            ))}
            {recentAttempts.length === 0 && (
              <div style={styles.noDataCell}>No submissions recorded yet.</div>
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
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.25rem',
    marginBottom: '2rem',
  },
  metricCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    borderRadius: '18px',
  },
  iconBadge: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  metricTitle: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: '#9ca3af',
    letterSpacing: '0.05em',
    fontWeight: '600',
    marginBottom: '0.2rem',
  },
  metricValue: {
    fontSize: '1.75rem',
    fontWeight: '800',
    lineHeight: '1',
  },
  analyticsSection: {
    padding: '2rem',
    borderRadius: '20px',
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  chartCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  chartBarLabel: {
    width: '160px',
    fontSize: '0.9rem',
    color: '#9ca3af',
    fontWeight: '500',
  },
  chartBarTrack: {
    flex: 1,
    height: '10px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: '999px',
    transition: 'width 1s ease-out',
  },
  chartValue: {
    width: '100px',
    textAlign: 'right',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.55fr 1fr',
    gap: '2rem',
  },
  listSection: {
    padding: '1.75rem',
    borderRadius: '20px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: '0.85rem',
  },
  tr: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    transition: 'background 0.2s',
  },
  td: {
    padding: '1rem',
    fontSize: '0.95rem',
  },
  examName: {
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionIconBtn: {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '0.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  recentAttemptsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  submissionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  subStudentName: {
    fontWeight: '600',
    fontSize: '0.95rem',
    marginBottom: '0.1rem',
  },
  subExamTitle: {
    fontSize: '0.8rem',
    color: '#9ca3af',
  },
  subResults: {
    textAlign: 'right',
  },
  noDataCell: {
    textAlign: 'center',
    padding: '2.5rem 1rem',
    color: '#6b7280',
    fontSize: '0.9rem',
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

export default AdminDashboard;
