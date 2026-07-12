import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { motion } from "framer-motion";

export default function ExamPerformanceChart({
  examStats,
}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >

      <h2 className="mb-6 text-2xl font-bold text-white">
        Exam Performance
      </h2>

      <div style={{ width: "100%", height: 380 }}>

        <ResponsiveContainer>

          <BarChart
            data={examStats}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2d3748"
            />

            <XAxis
              dataKey="title"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

            <Bar
              dataKey="averageScore"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}