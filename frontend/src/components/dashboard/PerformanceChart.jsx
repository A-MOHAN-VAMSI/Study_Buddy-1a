import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PerformanceChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPerformance = async () => {
      try {
        const { data } = await api.get("/results/student");

        const chartData = data.map((attempt, index) => ({
          exam: attempt.exam?.title || `Exam ${index + 1}`,
          score: attempt.percentage,
        }));

        setData(chartData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPerformance();
  }, []);

  if (loading) {
    return (
      <div className="sb-chart-card">
        Loading Performance...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="sb-chart-card">
        <div className="sb-card-header">
          <h2>Performance Overview</h2>
        </div>

        <p
          style={{
            color: "#94a3b8",
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          No exam attempts yet.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="sb-chart-card"
    >
      <div className="sb-card-header">
        <h2>Performance Overview</h2>
        <span>Exam History</span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="exam"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
            domain={[0, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#8B5CF6"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}