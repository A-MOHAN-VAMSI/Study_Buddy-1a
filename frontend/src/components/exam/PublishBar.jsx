import { Plus, Save } from "lucide-react";

export default function PublishBar({
  addQuestion,
  loading,
  submitExam,
}) {
  return (
    <div
      className="
        sticky
        bottom-6
        z-20
        mt-10
        flex
        flex-col
        gap-4
        rounded-3xl
        border
        border-white/10
        bg-[#111827]/90
        p-6
        backdrop-blur-xl
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div>
        <h3 className="text-xl font-bold text-white">
          Ready to Publish?
        </h3>

        <p className="mt-1 text-slate-400">
          Add more questions or publish the examination.
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={addQuestion}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-indigo-500/40
            bg-indigo-500/10
            px-5
            py-3
            font-semibold
            text-indigo-300
            transition
            hover:bg-indigo-500/20
          "
        >
          <Plus size={18} />
          Add Question
        </button>

        <button
  type="submit"
  disabled={loading}
  className="
    flex
    items-center
    gap-2
    rounded-xl
    bg-gradient-to-r
    from-indigo-600
    to-violet-600
    px-6
    py-3
    font-semibold
    text-white
    transition
    hover:scale-105
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  <Save size={18} />

  {loading ? "Publishing..." : "Publish Exam"}
</button>

      </div>
    </div>
  );
}