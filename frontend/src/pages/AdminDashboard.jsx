import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";

import AdminHero from "../components/admin/AdminHero";
import AdminStatsGrid from "../components/admin/AdminStatsGrid";
import GradeDistribution from "../components/admin/GradeDistribution";
import ExamManagement from "../components/admin/ExamManagement";
import RecentSubmissions from "../components/admin/RecentSubmissions";
import api from "../services/api";
import ConfirmModal from "../components/ui/ConfirmModal";
import toast from "react-hot-toast";
import Skeleton from "../components/ui/Skeleton";
import AnimatedPage from "../components/common/AnimatedPage";
const AdminDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [analytics, setAnalytics] = useState(null);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedExam, setSelectedExam] = useState(null);

  const fetchAdminData = async () => {

    try {

        setLoading(true);

        const { data: analyticsData } =
            await api.get("/results/analytics");

        setAnalytics(analyticsData);

        const { data: examsData } =
            await api.get("/exams");

        setExams(examsData);

    } catch (err) {

        setError(
            err.response?.data?.message ||
            err.message
        );

    } finally {

        setLoading(false);

    }

};

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteExam = (exam) => {
  setSelectedExam(exam);
  setDeleteModalOpen(true);
};

const confirmDeleteExam = async () => {
  if (!selectedExam) return;

  try {
    const res = await fetch(`/api/exams/${selectedExam.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    toast.success("Exam deleted successfully");

    setDeleteModalOpen(false);
    setSelectedExam(null);

    fetchAdminData();

  } catch (err) {
    toast.error(err.message);
  }
};

  
  if (loading) {
  return (
    <div className="space-y-6 p-8">

      <Skeleton className="h-24 w-full" />

      <div className="grid grid-cols-4 gap-6">

        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />

      </div>

      <Skeleton className="h-96 w-full" />

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
    <AnimatedPage>

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

          <RecentSubmissions
          recentAttempts={recentAttempts}
          navigate={navigate}
          />
          <ConfirmModal
  open={deleteModalOpen}
  title="Delete Exam?"
  message={`Delete "${selectedExam?.title}" permanently?`}
  onCancel={() => {
    setDeleteModalOpen(false);
    setSelectedExam(null);
  }}
  onConfirm={confirmDeleteExam}
/>


        </div>

      </div>

    </AnimatedPage>
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