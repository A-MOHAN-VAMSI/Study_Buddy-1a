import { useEffect, useState } from "react";
import {
  BookOpen,
  Trophy,
  Clock3,
  Target,
} from "lucide-react";

import api from "../../services/api";
import StatsCard from "./StatsCard";

export default function StatsGrid() {
  const [stats, setStats] = useState({
    completed: 0,
    average: 0,
    upcoming: 0,
    rank: "--",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch both APIs at the same time
        const [resultsRes, examsRes] = await Promise.all([
          api.get("/results/student"),
          api.get("/exams"),
        ]);

        const results = resultsRes.data;
        const exams = examsRes.data;

        const completed = results.length;

        const average =
          completed > 0
            ? Math.round(
                results.reduce(
                  (sum, item) => sum + item.percentage,
                  0
                ) / completed
              )
            : 0;

        setStats({
          completed,
          average,
          upcoming: exams.length,
          rank: "--", // Rank feature not implemented yet
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <section className="sb-stats-grid">
        <p>Loading statistics...</p>
      </section>
    );
  }

  return (
    <section className="sb-stats-grid">

      <StatsCard
        title="Completed Exams"
        value={stats.completed}
        color="linear-gradient(135deg,#6D5DF6,#8B5CF6)"
        icon={<BookOpen size={24} />}
      />

      <StatsCard
        title="Average Score"
        value={`${stats.average}%`}
        color="linear-gradient(135deg,#10B981,#34D399)"
        icon={<Target size={24} />}
      />

      <StatsCard
        title="Available Exams"
        value={stats.upcoming}
        color="linear-gradient(135deg,#F59E0B,#FBBF24)"
        icon={<Clock3 size={24} />}
      />

      <StatsCard
        title="Current Rank"
        value={stats.rank}
        color="linear-gradient(135deg,#06B6D4,#3B82F6)"
        icon={<Trophy size={24} />}
      />

    </section>
  );
}