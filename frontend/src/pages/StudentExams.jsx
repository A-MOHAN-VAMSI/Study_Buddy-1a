import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight, Search, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import PageContainer from "../components/layout/PageContainer";
import AnimatedPage from "../components/common/AnimatedPage";
import api from "../services/api";

export default function StudentExams() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const loadExams = async () => {
      try {
        const { data } = await api.get("/exams");
        setExams(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, []);

  const filteredExams = useMemo(() => {
    return exams.filter((exam) =>
      exam.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, exams]);

  return (
    <AnimatedPage>
      <DashboardLayout>
        <PageContainer>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Student Exams
              </h1>

              <p className="mt-2 text-slate-400">
                View and attempt available examinations.
              </p>
            </div>

            <div className="rounded-xl bg-cyan-500/10 px-5 py-3 text-cyan-300 font-semibold">
              {filteredExams.length} Available
            </div>
          </div>

          {/* Search */}

          <div className="relative mb-8">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/5
                py-4
                pl-12
                pr-5
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-500
              "
            />
          </div>

          {loading ? (
            <div className="text-center py-16 text-slate-400">
              Loading exams...
            </div>
          ) : filteredExams.length === 0 ? (
            <div
              className="
                rounded-3xl
                border
                border-dashed
                border-white/10
                p-16
                text-center
              "
            >
              <CalendarDays
                size={60}
                className="mx-auto mb-5 text-slate-500"
              />

              <h2 className="text-2xl font-bold text-white">
                No Exams Found
              </h2>

              <p className="mt-2 text-slate-400">
                Try searching with another keyword.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredExams.map((exam) => (

                <motion.div
                  key={exam.id}
                  whileHover={{ y: -6 }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-6
                    transition
                    hover:border-cyan-500/40
                  "
                >

                  <div className="mb-5 flex items-center justify-between">

                    <div className="rounded-xl bg-cyan-500/10 p-3">
                      <CalendarDays
                        className="text-cyan-400"
                        size={22}
                      />
                    </div>

                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                      Available
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    {exam.title}
                  </h2>

                  <p className="mt-2 min-h-[48px] text-slate-400">
                    {exam.description || "No description available."}
                  </p>

                  <div className="mt-6 space-y-3 text-sm">

                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock size={16} />
                      Duration : {exam.duration} mins
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                      <Target size={16} />
                      Passing Score : {exam.passingScore}%
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                      ❓ Questions : {exam.questions?.length || 0}
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(`/take-exam/${exam.id}`)
                    }
                    className="
                      mt-8
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-cyan-600
                      px-5
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-cyan-700
                    "
                  >
                    Start Exam
                    <ArrowRight size={18} />
                  </button>

                </motion.div>

              ))}

            </div>
          )}

        </PageContainer>
      </DashboardLayout>
    </AnimatedPage>
  );
}