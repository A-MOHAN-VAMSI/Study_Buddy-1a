import { motion } from "framer-motion";
import {
  User,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock3,
} from "lucide-react";

export default function RecentSubmissions({
  recentAttempts,
  navigate,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="text-slate-400 text-sm">
            Latest student submissions
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {recentAttempts.length === 0 && (

          <div className="text-center py-12 text-slate-500">

            No recent submissions.

          </div>

        )}

        {recentAttempts.map((attempt) => (

          <motion.div
            whileHover={{ y: -3 }}
            key={attempt.id}
            onClick={() =>
              navigate(`/results/attempt/${attempt.id}`)
            }
            className="
              cursor-pointer
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-4
              transition
              hover:border-indigo-500/40
            "
          >

            <div className="flex justify-between">

              <div className="flex gap-3">

                <div className="
                  h-11
                  w-11
                  rounded-full
                  bg-indigo-500/20
                  flex
                  items-center
                  justify-center
                ">

                  <User
                    size={18}
                    className="text-indigo-400"
                  />

                </div>

                <div>

                  <h4 className="font-semibold text-white">

                    {attempt.student?.name}

                  </h4>

                  <p className="text-sm text-slate-400">

                    {attempt.exam?.title}

                  </p>

                </div>

              </div>

              <div>

                {attempt.passed ? (

                  <CheckCircle
                    className="text-emerald-400"
                    size={20}
                  />

                ) : (

                  <XCircle
                    className="text-red-400"
                    size={20}
                  />

                )}

              </div>

            </div>

            <div className="mt-5 flex justify-between items-center">

              <div>

                <span className="text-2xl font-bold text-white">

                  {attempt.percentage}%

                </span>

                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">

                  <Clock3 size={13} />

                  {new Date(
                    attempt.submittedAt
                  ).toLocaleDateString()}

                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-indigo-400"
              />

            </div>

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
}