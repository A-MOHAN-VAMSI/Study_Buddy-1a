import { motion } from "framer-motion";

import ExamActions from "./ExamActions";
import ExamStats from "./ExamStats";

export default function ExamCard({
  exam,
  stat,
  navigate,
  handleDeleteExam,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        hover:border-indigo-500/40
        hover:bg-white/[0.06]
        transition
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        {/* Left Side */}

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-2xl font-bold text-white">
              {exam.title}
            </h3>

            <span
              className="
                rounded-full
                bg-emerald-500/20
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-400
              "
            >
              Published
            </span>

          </div>

          <p className="mt-3 text-slate-400 leading-relaxed">
            {exam.description || "No description available."}
          </p>

          <ExamStats
            exam={exam}
            stat={stat}
          />

          {/* Average Score Progress */}

          <div className="mt-6">

            <div className="mb-2 flex justify-between text-sm">

              <span className="text-slate-400">
                Average Score
              </span>

              <span className="font-semibold text-emerald-400">
                {stat.averageScore || 0}%
              </span>

            </div>

            <div className="h-2 rounded-full bg-white/10">

              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700"
                style={{
                  width: `${stat.averageScore || 0}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Right Side */}

        <ExamActions
          exam={exam}
          navigate={navigate}
          handleDeleteExam={handleDeleteExam}
        />

      </div>
    </motion.div>
  );
}