import {
  BookOpen,
  CheckCircle2,
  Trophy,
  BarChart3,
} from "lucide-react";

import { motion } from "framer-motion";

export default function StudentOverview({ summary }) {
  const cards = [
    {
      title: "Total Attempts",
      value: summary.totalAttempts,
      icon: BookOpen,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Passed",
      value: summary.passedAttempts,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Average Score",
      value: `${summary.averageScore}%`,
      icon: Trophy,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Pass Rate",
      value:
        summary.totalAttempts > 0
          ? `${Math.round(
              (summary.passedAttempts /
                summary.totalAttempts) *
                100
            )}%`
          : "0%",
      icon: BarChart3,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="
              glass
              rounded-3xl
              p-6
            "
          >

            <div
              className={`
                h-12
                w-12
                rounded-xl
                flex
                items-center
                justify-center
                ${card.bg}
              `}
            >

              <Icon
                size={24}
                className={card.color}
              />

            </div>

            <p className="mt-5 text-slate-400">
              {card.title}
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              {card.value}
            </h2>

          </motion.div>

        );

      })}

    </div>
  );
}