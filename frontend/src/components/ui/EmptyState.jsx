import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing Here",
  description = "There is no data to display.",
  action = null,
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-white/10
        bg-white/5
        px-8
        py-20
        text-center
      "
    >
      <div
        className="
          mb-6
          rounded-full
          bg-indigo-500/10
          p-5
        "
      >
        <Inbox
          size={42}
          className="text-indigo-400"
        />
      </div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}
    </div>
  );
}