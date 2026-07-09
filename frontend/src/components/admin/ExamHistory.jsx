import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ExamHistory({ history }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >
      <h2 className="mb-8 text-2xl font-bold text-white">
        Exam History
      </h2>

      {history.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          No exam attempts yet.
        </div>
      ) : (
        <div className="space-y-4">

          {history.map((attempt) => (

            <div
              key={attempt.id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                transition
                hover:border-indigo-500/40
              "
            >

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {attempt.exam}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">

                  <Clock size={14} />

                  {new Date(
                    attempt.submittedAt
                  ).toLocaleDateString()}

                </div>

              </div>

              <div className="flex items-center gap-8">

                <div className="text-right">

                  <p className="text-2xl font-bold text-white">
                    {attempt.score}%
                  </p>

                  <p className="text-xs text-slate-400">
                    Score
                  </p>

                </div>

                {attempt.passed ? (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      bg-emerald-500/10
                      px-4
                      py-2
                      text-emerald-400
                    "
                  >

                    <CheckCircle2 size={18} />

                    Passed

                  </div>

                ) : (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      bg-red-500/10
                      px-4
                      py-2
                      text-red-400
                    "
                  >

                    <XCircle size={18} />

                    Failed

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>
      )}
    </motion.div>
  );
}