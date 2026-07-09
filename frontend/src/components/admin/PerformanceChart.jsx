import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { motion } from "framer-motion";

export default function PerformanceChart({ history }) {

  const data = history.map((item, index) => ({
    exam: `Exam ${index + 1}`,
    score: item.score,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >
      <h2 className="mb-8 text-2xl font-bold text-white">
        Performance Trend
      </h2>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2a2d3a"
            />

            <XAxis
              dataKey="exam"
              stroke="#94a3b8"
            />

            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}