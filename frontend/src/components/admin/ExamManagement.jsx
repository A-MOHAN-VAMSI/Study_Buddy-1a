import { Edit, Trash2, Search } from "lucide-react";
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

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 text-slate-400">

              <th className="py-4 text-left">Exam</th>
              <th className="text-left">Duration</th>
              <th className="text-left">Attempts</th>
              <th className="text-left">Average</th>
              <th className="text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredExams.map((exam) => {

              const stat =
                examStats.find((s) => s.id === exam.id) || {};

              return (

                <tr
                  key={exam.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >

                  <td className="py-5 font-semibold">
                    {exam.title}
                  </td>

                  <td>{exam.duration} mins</td>

                  <td>{stat.attemptCount || 0}</td>

                  <td>{stat.averageScore || 0}%</td>

                  <td>

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          navigate(`/admin/create-exam?edit=${exam.id}`)
                        }
                        className="rounded-lg bg-indigo-500/10 p-2 hover:bg-indigo-500/20"
                      >
                        <Edit size={17} color="#818cf8" />
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteExam(exam.id, exam.title)
                        }
                        className="rounded-lg bg-red-500/10 p-2 hover:bg-red-500/20"
                      >
                        <Trash2 size={17} color="#ef4444" />
                      </button>

                    </div>

                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </motion.section>
  );
}