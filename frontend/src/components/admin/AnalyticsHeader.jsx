import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      <div className="flex items-center gap-4">

        <div
          className="
            h-16
            w-16
            rounded-2xl
            bg-indigo-500/15
            flex
            items-center
            justify-center
          "
        >
          <BarChart3
            className="text-indigo-400"
            size={34}
          />
        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor student performance and examination statistics.
          </p>

        </div>

      </div>
    </motion.div>
  );
}