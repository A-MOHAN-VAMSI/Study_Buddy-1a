import {
  Clock3,
  Users,
  FileText,
  Trophy,
} from "lucide-react";

export default function ExamStats({
  exam,
  stat,
}) {
  return (
    <div
      className="
        mt-6
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-5
      "
    >

      <div>

        <div className="flex items-center gap-2 text-slate-400">

          <Clock3 size={16} />

          Duration

        </div>

        <div className="mt-2 text-lg font-bold text-white">

          {exam.duration} mins

        </div>

      </div>

      <div>

        <div className="flex items-center gap-2 text-slate-400">

          <Users size={16} />

          Attempts

        </div>

        <div className="mt-2 text-lg font-bold text-white">

          {stat.attemptCount || 0}

        </div>

      </div>

      <div>

        <div className="flex items-center gap-2 text-slate-400">

          <FileText size={16} />

          Questions

        </div>

        <div className="mt-2 text-lg font-bold text-white">

          {exam.questions?.length || 0}

        </div>

      </div>

      <div>

        <div className="flex items-center gap-2 text-slate-400">

          <Trophy size={16} />

          Average

        </div>

        <div className="mt-2 text-lg font-bold text-emerald-400">

          {stat.averageScore || 0}%

        </div>

      </div>

    </div>
  );
}