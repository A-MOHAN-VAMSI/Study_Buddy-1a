import { useEffect, useState } from "react";

import api from "../services/api";

import AnalyticsHeader from "../components/admin/AnalyticsHeader";
import AnalyticsSummary from "../components/admin/AnalyticsSummary";
import PassRateChart from "../components/admin/PassRateChart";
import ExamPerformanceChart from "../components/admin/ExamPerformanceChart";
import TopStudents from "../components/admin/TopStudents";
import AnimatedPage from "../components/common/AnimatedPage";
export default function Analytics() {

  const [analytics, setAnalytics] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {

    try {

      const [
        analyticsRes,
        studentsRes,
      ] = await Promise.all([
        api.get("/results/analytics"),
        api.get("/admin/students"),
      ]);

      setAnalytics(analyticsRes.data);
      setStudents(studentsRes.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {

    return (
      <div className="flex h-[70vh] items-center justify-center text-slate-400">
        Loading Analytics...
      </div>
    );

  }

  return (
    <AnimatedPage>

    <div className="space-y-8">

      <AnalyticsHeader />

      <AnalyticsSummary
        summary={analytics.summary}
      />

      <div className="grid grid-cols-2 gap-8">

        <PassRateChart
          summary={analytics.summary}
        />

        <ExamPerformanceChart
          examStats={analytics.examStats}
        />

      </div>

      <TopStudents
        students={students}
      />

    </div>
    </AnimatedPage>

  );

}