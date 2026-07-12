import {
  Users,
  GraduationCap,
  Trophy,
  ClipboardCheck,
} from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter";
const StatCard = ({
  title,
  value,
  icon,
  color,
}) => (
  <div
    className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-6
      transition
      hover:-translate-y-1
      hover:border-indigo-500/30
    "
  >
    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
  <AnimatedCounter
    value={
      typeof value === "string"
        ? parseInt(value)
        : value
    }
    suffix={
      typeof value === "string" && value.includes("%")
        ? "%"
        : ""
    }
  />
</h2>

      </div>

      <div
        className="rounded-xl p-3"
        style={{
          background: color,
        }}
      >
        {icon}
      </div>

    </div>
  </div>
);

export default function StudentStats({
  students,
}) {

  const totalStudents = students.length;

  const totalAttempts = students.reduce(
    (sum, s) => sum + s.totalAttempts,
    0
  );

  const avgScore =
    totalStudents > 0
      ? Math.round(
          students.reduce(
            (sum, s) =>
              sum + s.averageScore,
            0
          ) / totalStudents
        )
      : 0;

  const activeStudents =
    students.filter(
      (s) => s.totalAttempts > 0
    ).length;

  return (

    <section className="grid grid-cols-4 gap-6">

      <StatCard
        title="Students"
        value={totalStudents}
        color="rgba(99,102,241,.2)"
        icon={
          <Users
            size={24}
            className="text-indigo-400"
          />
        }
      />

      <StatCard
        title="Active"
        value={activeStudents}
        color="rgba(16,185,129,.2)"
        icon={
          <GraduationCap
            size={24}
            className="text-emerald-400"
          />
        }
      />

      <StatCard
        title="Average Score"
        value={`${avgScore}%`}
        color="rgba(245,158,11,.2)"
        icon={
          <Trophy
            size={24}
            className="text-yellow-400"
          />
        }
      />

      <StatCard
        title="Attempts"
        value={totalAttempts}
        color="rgba(6,182,212,.2)"
        icon={
          <ClipboardCheck
            size={24}
            className="text-cyan-400"
          />
        }
      />

    </section>

  );
}