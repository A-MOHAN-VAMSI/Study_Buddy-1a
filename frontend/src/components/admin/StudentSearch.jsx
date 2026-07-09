import { Search } from "lucide-react";

export default function StudentSearch({
  value,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Student Management
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor student performance and activity
        </p>

      </div>

      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or email..."
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            py-3
            pl-11
            pr-4
            text-white
            outline-none
            transition
            placeholder:text-slate-500
            focus:border-indigo-500
          "
        />

      </div>

    </div>
  );
}