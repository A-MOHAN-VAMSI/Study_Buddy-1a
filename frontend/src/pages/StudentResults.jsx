import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Trophy,
  CheckCircle2,
  XCircle,
  Eye,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import PageContainer from "../components/layout/PageContainer";
import AnimatedPage from "../components/common/AnimatedPage";
import api from "../services/api";

export default function StudentResults() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
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

  const filteredResults = useMemo(() => {
    return results.filter((attempt) =>
      attempt.exam.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [results, search]);

  return (
    <AnimatedPage>
      <DashboardLayout>
        <PageContainer>

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold text-white">
                My Results
              </h1>

              <p className="mt-2 text-slate-400">
                View all your exam attempts.
              </p>

            </div>

            <div className="rounded-xl bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300">
              {filteredResults.length} Attempts
            </div>

          </div>

          <div className="relative mb-8">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search results..."
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
                outline-none
                placeholder:text-slate-500
                focus:border-cyan-500
              "
            />

          </div>

          {loading ? (

            <div className="py-20 text-center text-slate-400">
              Loading Results...
            </div>

          ) : filteredResults.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-white/10 p-20 text-center">

              <Trophy
                size={60}
                className="mx-auto mb-5 text-slate-500"
              />

              <h2 className="text-2xl font-bold text-white">
                No Results Found
              </h2>

              <p className="mt-3 text-slate-400">
                You haven't attempted any exams yet.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredResults.map((attempt) => (

                <motion.div
                  key={attempt.id}
                  whileHover={{ y: -4 }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-6
                    transition
                    hover:border-cyan-500/30
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-bold text-white">
                        {attempt.exam.title}
                      </h2>

                      <div className="mt-3 flex gap-6 text-sm text-slate-400">

                        <span className="flex items-center gap-2">

                          <CalendarDays size={15} />

                          {new Date(
                            attempt.submittedAt
                          ).toLocaleDateString()}

                        </span>

                        <span>

                          Duration : {attempt.exam.duration} mins

                        </span>

                      </div>

                    </div>

                    {attempt.passed ? (

                      <span className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 font-semibold text-emerald-400">

                        <CheckCircle2 size={18} />

                        Passed

                      </span>

                    ) : (

                      <span className="flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 font-semibold text-red-400">

                        <XCircle size={18} />

                        Failed

                      </span>

                    )}

                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    <div>

                      <div className="text-slate-400">

                        Score

                      </div>

                      <div className="mt-1 text-4xl font-bold text-cyan-400">

                        {attempt.percentage}%

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        navigate(`/results/attempt/${attempt.id}`)
                      }
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-cyan-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-cyan-700
                      "
                    >

                      <Eye size={18} />

                      View Details

                    </button>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </PageContainer>
      </DashboardLayout>
    </AnimatedPage>
  );
}