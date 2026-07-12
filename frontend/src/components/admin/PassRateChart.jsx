import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

const COLORS = ["#10b981", "#ef4444"];

export default function PassRateChart({ summary }) {

  const data = [
    {
      name: "Passed",
      value: summary.passRate,
    },
    {
      name: "Failed",
      value: 100 - summary.passRate,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >
      <h2 className="mb-6 text-2xl font-bold text-white">
        Overall Pass Rate
      </h2>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}