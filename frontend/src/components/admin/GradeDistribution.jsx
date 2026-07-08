import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const grades = [
  {
    key: "excellent",
    label: "Excellent (80%+)",
    color: "linear-gradient(90deg,#10b981,#059669)",
  },
  {
    key: "good",
    label: "Good (60-79%)",
    color: "linear-gradient(90deg,#6366f1,#4f46e5)",
  },
  {
    key: "average",
    label: "Average (40-59%)",
    color: "linear-gradient(90deg,#f59e0b,#d97706)",
  },
  {
    key: "poor",
    label: "Poor (<40%)",
    color: "linear-gradient(90deg,#ef4444,#dc2626)",
  },
];

export default function GradeDistribution({
  summary,
  distribution,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8 mb-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 size={22} color="#6366f1" />
        <h2 className="text-2xl font-bold text-white">
          Grade Distribution
        </h2>
      </div>

      <div className="space-y-6">
        {grades.map((grade) => {
          const value = distribution?.[grade.key] || 0;

          const percent =
            summary?.attemptCount > 0
              ? (value / summary.attemptCount) * 100
              : 0;

          return (
            <div key={grade.key}>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300">
                  {grade.label}
                </span>

                <span className="text-slate-400">
                  {value}
                </span>
              </div>

              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percent}%`,
                    background: grade.color,
                    transition: "width .8s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}