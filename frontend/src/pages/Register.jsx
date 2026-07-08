import { Link } from "react-router-dom";
import { GraduationCap, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import AuthCard from "../components/auth/AuthCard";
import RegistrationForm from "../components/auth/RegistrationForm";
import BackgroundEffects from "../components/common/BackgroundEffects";

export default function Register() {
  return (
    <>
      <Toaster position="top-right" />

      <BackgroundEffects />

      <div className="relative flex min-h-screen items-center justify-center px-6">

        <div className="relative z-10 w-full max-w-md">

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
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
            icon={<UserPlus size={36} />}
            title="Create Account"
            subtitle="Join StudyBuddy and start your learning journey"
          >

            <RegistrationForm />

            <div className="mt-8 text-center">

              <span className="text-slate-400">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="ml-2 font-semibold text-indigo-400 hover:text-indigo-300 transition"
              >
                Login
              </Link>

            </div>

          </AuthCard>

        </div>

      </div>
    </>
  );
}