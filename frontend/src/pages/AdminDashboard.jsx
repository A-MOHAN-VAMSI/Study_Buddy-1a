import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";

import AdminHero from "../components/admin/AdminHero";
import AdminStatsGrid from "../components/admin/AdminStatsGrid";
import GradeDistribution from "../components/admin/GradeDistribution";
import ExamManagement from "../components/admin/ExamManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [analytics, setAnalytics] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Analytics
      const analyticsRes = await fetch("/api/results/analytics", {
        headers,
      });

      const analyticsData = await analyticsRes.json();

      if (!analyticsRes.ok) {
        throw new Error(
          analyticsData.message || "Failed to fetch analytics"
        );
      }

      setAnalytics(analyticsData);

      // Exams
      const examsRes = await fetch("/api/exams", {
        headers,
      });

      const examsData = await examsRes.json();

      if (!examsRes.ok) {
        throw new Error(
          examsData.message || "Failed to fetch exams"
        );
      }

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

    const confirmDelete = window.confirm(
      `Delete "${examTitle}"?\n\nAll questions and student attempts will also be removed.`
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(`/api/exams/${examId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      fetchAdminData();

    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  const {
    summary = {},
    distribution = {},
    examStats = [],
    recentAttempts = [],
  } = analytics || {};

  return (
    <AdminLayout>

      <div style={styles.container}>

        <AdminHero
          user={user}
          onCreateExam={() =>
            navigate("/admin/create-exam")
          }
        />

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <AdminStatsGrid
          summary={summary}
        />

        <GradeDistribution
          summary={summary}
          distribution={distribution}
        />

        <div style={styles.grid}>

          <ExamManagement
            exams={exams}
            examStats={examStats}
            navigate={navigate}
            handleDeleteExam={handleDeleteExam}
          />

          <section
            className="glass rounded-3xl p-6"
          >

            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Recent Submissions
            </h2>

            {recentAttempts.length === 0 ? (

              <p style={{ color: "#94a3b8" }}>
                No recent submissions.
              </p>

            ) : (

              recentAttempts.map((attempt) => (

                <div
                  key={attempt.id}
                  onClick={() =>
                    navigate(
                      `/results/attempt/${attempt.id}`
                    )
                  }
                  style={styles.submission}
                >

                  <div>

                    <h4
                      style={{
                        margin: 0,
                        color: "white",
                      }}
                    >
                      {attempt.student?.name}
                    </h4>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#94a3b8",
                        fontSize: ".9rem",
                      }}
                    >
                      {attempt.exam?.title}
                    </p>

                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >

                    <strong>
                      {attempt.percentage}%
                    </strong>

                    <br />

                    <small
                      style={{
                        color: attempt.passed
                          ? "#10b981"
                          : "#ef4444",
                      }}
                    >
                      {attempt.passed
                        ? "PASSED"
                        : "FAILED"}
                    </small>

                  </div>

                </div>

              ))

            )}

          </section>

        </div>

      </div>

    </AdminLayout>
  );
};

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "2rem",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
    marginTop: "2rem",
  },

  submission: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "14px",
    marginBottom: ".8rem",
    background: "rgba(255,255,255,.04)",
    cursor: "pointer",
    transition: ".25s",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "#94a3b8",
    gap: "1rem",
  },

  spinner: {
    width: "42px",
    height: "42px",
    border: "4px solid rgba(255,255,255,.1)",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  error: {
    marginBottom: "1.5rem",
    background: "rgba(239,68,68,.12)",
    color: "#f87171",
    padding: "1rem",
    borderRadius: "12px",
    border: "1px solid rgba(239,68,68,.2)",
  },
};

export default AdminDashboard;