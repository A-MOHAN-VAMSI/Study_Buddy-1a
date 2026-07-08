import { useState } from "react";
import { Mail, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import PasswordInput from "./PasswordInput";
import api from "../../services/api";

export default function LoginForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", form);



// Save Authentication
localStorage.setItem("token", data.token);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

toast.success(`Welcome back ${data.user.name}!`);

if (onSuccess) {
  onSuccess(data.user);
}

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Email */}

      <div className="mb-5">

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <div className="relative">

          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
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
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/40
            "
          />

        </div>

      </div>

      <PasswordInput
        value={form.password}
        onChange={handleChange}
      />

      <div className="mb-6 flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm text-slate-400">

          <input type="checkbox" />

          Remember Me

        </label>

        <button
          type="button"
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          Forgot Password?
        </button>

      </div>

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: .98,
        }}
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          py-3
          font-semibold
          text-white
          transition
          hover:shadow-lg
          hover:shadow-indigo-600/30
          disabled:opacity-60
        "
      >
        {loading ? (
          "Signing In..."
        ) : (
          <>
            <LogIn size={18} />
            Login
          </>
        )}
      </motion.button>

    </form>
  );
}