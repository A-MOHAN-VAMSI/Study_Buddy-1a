import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Password
      </label>

      <div className="relative">
        {/* Lock Icon */}
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            py-3
            pl-11
            pr-12
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-500/40
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}