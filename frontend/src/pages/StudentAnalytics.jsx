import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Target,
  BarChart3,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import PageContainer from "../components/layout/PageContainer";
import AnimatedPage from "../components/common/AnimatedPage";
import api from "../services/api";

export default function StudentAnalytics() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const { data } = await api.get("/results/student");
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  const analytics = useMemo(() => {
    if (!results.length) {
      return {
        average: 0,
        attempts: 0,
        passed: 0,
        failed: 0,
        best: 0,
      };
    }

    const attempts = results.length;
    const passed = results.filter(r => r.passed).length;
    const failed = attempts - passed;

    const average = Math.round(
      results.reduce((sum, r) => sum + r.percentage, 0) / attempts
    );

    const best = Math.max(
      ...results.map(r => r.percentage)
    );

    return {
      average,
      attempts,
      passed,
      failed,
      best,
    };
  }, [results]);

  const cards = [
    {
      title: "Average Score",
      value: `${analytics.average}%`,
      icon: Target,
      color: "text-cyan-400",
    },
    {
      title: "Total Attempts",
      value: analytics.attempts,
      icon: BarChart3,
      color: "text-blue-400",
    },
    {
      title: "Passed",
      value: analytics.passed,
      icon: CheckCircle2,
      color: "text-emerald-400",
    },
    {
      title: "Failed",
      value: analytics.failed,
      icon: XCircle,
      color: "text-red-400",
    },
    {
      title: "Best Score",
      value: `${analytics.best}%`,
      icon: Trophy,
      color: "text-yellow-400",
    },
  ];

  return (
    <AnimatedPage>
      <DashboardLayout>
        <PageContainer>

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-white">
              Performance Analytics
            </h1>

            <p className="mt-2 text-slate-400">
              Overview of your exam performance.
            </p>

          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400">
              Loading analytics...
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

                {cards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <motion.div
                      key={card.title}
                      whileHover={{ y: -5 }}
                      className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/5
                        p-6
                      "
                    >
                      <Icon
                        size={32}
                        className={card.color}
                      />

                      <div className="mt-5 text-4xl font-bold text-white">
                        {card.value}
                      </div>

                      <div className="mt-2 text-slate-400">
                        {card.title}
                      </div>

                    </motion.div>
                  );
                })}

              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">

                <h2 className="mb-6 text-2xl font-bold text-white">
                  Recent Performance
                </h2>

                <div className="space-y-4">

                  {results.slice(0, 5).map((attempt) => (

                    <div
                      key={attempt.id}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        bg-white/5
                        p-4
                      "
                    >

                      <div>

                        <div className="font-semibold text-white">
                          {attempt.exam.title}
                        </div>

                        <div className="text-sm text-slate-400">
                          {new Date(
                            attempt.submittedAt
                          ).toLocaleDateString()}
                        </div>

                      </div>

                      <div
                        className={`text-xl font-bold ${
                          attempt.passed
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {attempt.percentage}%
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </>
          )}

        </PageContainer>
      </DashboardLayout>
    </AnimatedPage>
  );
}