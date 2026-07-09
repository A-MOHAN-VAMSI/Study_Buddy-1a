import {
  Edit,
  Trash2,
  Search,
  Eye,
  Copy,
  Clock3,
  Users,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function ExamManagement({
  exams,
  examStats,
  navigate,
  handleDeleteExam,
}) {
  const [search, setSearch] = useState("");

  const filteredExams = useMemo(() => {
    return exams.filter((exam) =>
      exam.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, exams]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Manage Exams
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            {filteredExams.length} Exams
          </p>

        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exams..."
            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              py-2.5
              pl-10
              pr-4
              text-white
              outline-none
              focus:border-indigo-500
            "
          />

        </div>

      </div>

      <div className="space-y-5">

  {filteredExams.map((exam) => {

    const stat =
      examStats.find((s) => s.id === exam.id) || {};

    return (

      <motion.div
        key={exam.id}
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

        <div className="flex justify-between items-start">

          <div>

            <div className="flex items-center gap-3">

              <h3 className="text-xl font-bold text-white">
                {exam.title}
              </h3>

              <span className="
                rounded-full
                bg-emerald-500/20
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-400
              ">
                Published
              </span>

            </div>

            <p className="text-slate-400 mt-2">
              {exam.description || "No description provided."}
            </p>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                navigate(`/admin/create-exam?edit=${exam.id}`)
              }
              className="
                rounded-xl
                bg-indigo-500/10
                p-3
                hover:bg-indigo-500/20
              "
            >
              <Edit
                size={18}
                className="text-indigo-400"
              />
            </button>

            <button
              className="
                rounded-xl
                bg-sky-500/10
                p-3
                hover:bg-sky-500/20
              "
            >
              <Eye
                size={18}
                className="text-sky-400"
              />
            </button>

            <button
              className="
                rounded-xl
                bg-yellow-500/10
                p-3
                hover:bg-yellow-500/20
              "
            >
              <Copy
                size={18}
                className="text-yellow-400"
              />
            </button>

            <button
              onClick={() =>
                handleDeleteExam(exam.id, exam.title)
              }
              className="
                rounded-xl
                bg-red-500/10
                p-3
                hover:bg-red-500/20
              "
            >
              <Trash2
                size={18}
                className="text-red-400"
              />
            </button>

          </div>

        </div>

        <div className="
          mt-6
          grid
          grid-cols-4
          gap-5
        ">

          <div>

            <div className="flex items-center gap-2 text-slate-400">

              <Clock3 size={16} />

              Duration

            </div>

            <div className="mt-2 text-lg font-bold text-white">

              {exam.duration} mins

            </div>

          </div>

          <div>

            <div className="flex items-center gap-2 text-slate-400">

              <Users size={16} />

              Attempts

            </div>

            <div className="mt-2 text-lg font-bold text-white">

              {stat.attemptCount || 0}

            </div>

          </div>

          <div>

            <div className="flex items-center gap-2 text-slate-400">

              <FileText size={16} />

              Questions

            </div>

            <div className="mt-2 text-lg font-bold text-white">

              {exam.questions?.length || 0}

            </div>

          </div>

          <div>

            <div className="text-slate-400">

              Average Score

            </div>

            <div className="mt-2 text-lg font-bold text-emerald-400">

              {stat.averageScore || 0}%

            </div>

          </div>

        </div>

      </motion.div>

    );

  })}

</div>

    </motion.section>
  );
}