import {
  User,
  GraduationCap,
  Trophy,
  ArrowRight,
  Mail,
} from "lucide-react";

import { motion } from "framer-motion";

export default function StudentCard({
  student,
  onView,
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
        transition
        hover:border-indigo-500/40
      "
    >
      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div
            className="
              h-14
              w-14
              rounded-full
              bg-indigo-500/20
              flex
              items-center
              justify-center
            "
          >
            <User
              size={26}
              className="text-indigo-400"
            />
          </div>

          <div>

            <h3 className="text-xl font-bold text-white">
              {student.name}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-slate-400">

              <Mail size={15} />

              {student.email}

            </div>

          </div>

        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${
              student.totalAttempts > 0
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-yellow-500/20 text-yellow-400"
            }
          `}
        >
          {student.totalAttempts > 0
            ? "Active"
            : "New"}
        </span>

      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div>

          <div className="flex items-center gap-2 text-slate-400">

            <GraduationCap size={16} />

            Attempts

          </div>

          <div className="text-2xl font-bold text-white mt-2">

            {student.totalAttempts}

          </div>

        </div>

        <div>

          <div className="text-slate-400">

            Passed

          </div>

          <div className="text-2xl font-bold text-emerald-400 mt-2">

            {student.passedAttempts}

          </div>

        </div>

        <div>

          <div className="flex items-center gap-2 text-slate-400">

            <Trophy size={16} />

            Average

          </div>

          <div className="text-2xl font-bold text-yellow-400 mt-2">

            {student.averageScore}%

          </div>

        </div>

      </div>

      <div
        className="
          mt-8
          flex
          justify-between
          items-center
        "
      >

        <div>

          <p className="text-xs text-slate-500">

            Latest Exam

          </p>

          <h4 className="text-white font-medium">

            {student.latestExam}

          </h4>

        </div>

        <button
          onClick={() => onView(student)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-indigo-500/10
            px-4
            py-2
            text-indigo-400
            hover:bg-indigo-500/20
          "
        >
          View

          <ArrowRight size={16} />

        </button>

      </div>

    </motion.div>
  );
}