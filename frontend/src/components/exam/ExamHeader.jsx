import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExamHeader() {
  const navigate = useNavigate();

  return (
    <div className="mb-10 flex items-center justify-between">

      <div>

        <button
          onClick={() => navigate("/admin")}
          className="
            mb-4
            flex
            items-center
            gap-2
            text-slate-400
            transition
            hover:text-white
          "
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-white">
          Create New Examination
        </h1>

        <p className="mt-2 text-slate-400">
          Build an examination for your students.
        </p>

      </div>

    </div>
  );
}