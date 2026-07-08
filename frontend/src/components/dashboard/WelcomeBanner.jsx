import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function WelcomeBanner() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
      className="sb-welcome"
    >
      <div>

        <div className="sb-badge">
          <Sparkles size={16} />
          AI Powered Learning
        </div>

        <h1 className="sb-welcome-title">
          {greeting},
          <span> {user.name || "Student"} 👋</span>
        </h1>

        <p className="sb-welcome-text">
          Ready to improve your knowledge today?
          Track your exams, monitor your performance and
          continue learning.
        </p>

        <div style={{ marginTop: 28 }}>

          <Button rightIcon={<ArrowRight size={18} />}>
            Continue Learning
          </Button>

        </div>

      </div>

      <img
        src="/hero.png"
        alt="hero"
        className="sb-hero-image"
      />

    </motion.section>
  );
}