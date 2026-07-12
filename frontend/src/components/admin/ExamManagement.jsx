import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import EmptyState from "../ui/EmptyState";
import ExamCard from "./ExamCard";

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
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Manage Exams
          </h2>

          <p className="mt-2 text-slate-400">
            {filteredExams.length} Exam
            {filteredExams.length !== 1 ? "s" : ""}
          </p>

        </div>

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exams..."
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              py-3
              pl-10
              pr-4
              text-white
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

      </div>

      {/* Empty State */}

      {filteredExams.length === 0 ? (

        <EmptyState
          title="No Exams Found"
          description="Create your first exam to start conducting examinations."
          action={
            <button
              onClick={() => navigate("/admin/create-exam")}
              className="
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:scale-105
              "
            >
              Create Exam
            </button>
          }
        />

      ) : (

        <div className="space-y-6">

          {filteredExams.map((exam) => {

            const stat =
              examStats.find(
                (s) => s.id === exam.id
              ) || {};

            return (

              <ExamCard
                key={exam.id}
                exam={exam}
                stat={stat}
                navigate={navigate}
                handleDeleteExam={handleDeleteExam}
              />

            );

          })}

        </div>

      )}

    </motion.section>
  );
}