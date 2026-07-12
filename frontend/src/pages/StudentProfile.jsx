import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import StudentHeader from "../components/admin/StudentHeader";
import StudentOverview from "../components/admin/StudentOverview";
import PerformanceChart from "../components/admin/PerformanceChart";
import ExamHistory from "../components/admin/ExamHistory";
import AnimatedPage from "../components/common/AnimatedPage";
export default function StudentProfile() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStudent = async () => {
    try {
      const { data } = await api.get(`/admin/students/${id}`);

      setStudent(data.student);
      setSummary(data.summary);
      setHistory(data.history);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-slate-400">
        Loading student...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-400">
        Student not found.
      </div>
    );
  }

  return (
    <AnimatedPage>
    <div className="space-y-8">

      <StudentHeader
        student={student}
      />

      <StudentOverview
        summary={summary}
      />

      <PerformanceChart
        history={history}
      />

      <ExamHistory
        history={history}
      />

    </div>
    </AnimatedPage>
  );
}