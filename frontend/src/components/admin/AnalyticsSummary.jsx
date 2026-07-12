import {
  Users,
  FileCheck,
  Trophy,
  BarChart3,
} from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter";

const cards = [
  {
    key: "studentCount",
    title: "Students",
    icon: Users,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    key: "attemptCount",
    title: "Attempts",
    icon: FileCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    key: "passRate",
    title: "Pass Rate",
    icon: Trophy,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    suffix: "%",
  },
  {
    key: "avgScore",
    title: "Average Score",
    icon: BarChart3,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    suffix: "%",
  },
];

export default function AnalyticsSummary({ summary }) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-10">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.key}
            className="glass rounded-3xl p-6"
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
                className={card.color}
                size={24}
              />

            </div>

            <p className="mt-5 text-slate-400">

              {card.title}

            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">

              <AnimatedCounter
  value={summary[card.key]}
  suffix={card.suffix || ""}
/>

            </h2>

          </div>

        );

      })}

    </div>
  );
}