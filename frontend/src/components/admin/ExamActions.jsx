import {
  Edit,
  Eye,
  Copy,
  Trash2,
} from "lucide-react";

export default function ExamActions({
  exam,
  navigate,
  handleDeleteExam,
}) {
  return (

    <div className="flex gap-2">

      <button
        onClick={() =>
          navigate(`/admin/create-exam?edit=${exam.id}`)
        }
        className="rounded-xl bg-indigo-500/10 p-3 hover:bg-indigo-500/20"
      >
        <Edit
          size={18}
          className="text-indigo-400"
        />
      </button>

      <button
        className="rounded-xl bg-sky-500/10 p-3 hover:bg-sky-500/20"
      >
        <Eye
          size={18}
          className="text-sky-400"
        />
      </button>

      <button
        className="rounded-xl bg-yellow-500/10 p-3 hover:bg-yellow-500/20"
      >
        <Copy
          size={18}
          className="text-yellow-400"
        />
      </button>

      <button
        onClick={() =>
          handleDeleteExam(exam)
        }
        className="rounded-xl bg-red-500/10 p-3 hover:bg-red-500/20"
      >
        <Trash2
          size={18}
          className="text-red-400"
        />
      </button>

    </div>

  );
}