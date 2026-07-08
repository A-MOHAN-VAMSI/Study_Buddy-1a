import { useNavigate, Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import LoginForm from "../components/auth/LoginForm";
import AuthCard from "../components/auth/AuthCard";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (user) => {
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B14] px-6">

        {/* Animated Background */}
        <motion.div
          animate={{
            x: [0, 120, 0],
            y: [0, -60, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
          }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 70, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
          }}
          className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]"
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 w-full max-w-md">

          {/* Logo */}

          <motion.div
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-8 flex flex-col items-center"
          >

            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-2xl shadow-indigo-500/40">

              <GraduationCap size={42} color="white" />

            </div>

            <h1 className="text-5xl font-bold text-white">
              StudyBuddy
            </h1>

            <p className="mt-2 text-slate-400">
              AI Powered Examination Portal
            </p>

          </motion.div>

          <AuthCard
            title="Welcome Back"
            subtitle="Login to continue your learning journey"
          >
            <LoginForm onSuccess={handleLogin} />

            <div className="mt-8 text-center">

              <span className="text-slate-400">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="ml-2 font-semibold text-indigo-400 transition hover:text-indigo-300"
              >
                Create One
              </Link>

            </div>

          </AuthCard>

        </div>

      </div>
    </>
  );
}