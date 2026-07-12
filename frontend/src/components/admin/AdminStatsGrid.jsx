import { BookOpen, Users, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";
const cards = [
  {
    key: "examCount",
    title: "Total Exams",
    icon: BookOpen,
    color: "#6366f1",
    bg: "rgba(99,102,241,.12)",
  },
  {
    key: "studentCount",
    title: "Students",
    icon: Users,
    color: "#10b981",
    bg: "rgba(16,185,129,.12)",
  },
  {
    key: "attemptCount",
    title: "Attempts",
    icon: FileText,
    color: "#f59e0b",
    bg: "rgba(245,158,11,.12)",
  },
  {
    key: "passRate",
    title: "Pass Rate",
    icon: CheckCircle2,
    color: "#06b6d4",
    bg: "rgba(6,182,212,.12)",
    suffix: "%",
  },
];

export default function AdminStatsGrid({ summary }) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="glass rounded-3xl p-6 flex items-center gap-5"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: card.bg }}
            >
              <Icon size={26} color={card.color} />
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-slate-400">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-white">
  <AnimatedCounter
    value={card.key}
    suffix={card.suffix || ""}
  />
</h2>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}