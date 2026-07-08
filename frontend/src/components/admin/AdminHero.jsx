import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function AdminHero({ user, onCreateExam }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-8 mb-8 flex items-center justify-between"
    >
      <div>
        <p className="text-indigo-400 font-semibold mb-2">
          Faculty Admin Portal
        </p>

        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user?.name || "Administrator"} 👋
        </h1>

        <p className="text-slate-400 max-w-2xl">
          Manage examinations, monitor student performance,
          create assessments and analyze results from one place.
        </p>
      </div>

      <button
        onClick={onCreateExam}
        className="
          flex items-center gap-2
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          shadow-indigo-600/30
          transition
          hover:scale-105
        "
      >
        <Plus size={20} />
        Create Exam
      </button>
    </motion.section>
  );
}