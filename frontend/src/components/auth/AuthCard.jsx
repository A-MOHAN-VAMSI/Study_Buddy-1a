import { motion } from "framer-motion";

export default function AuthCard({
  title,
  subtitle,
  icon,
  children,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="sb-auth-card"
    >
      <div className="sb-auth-glow"></div>

      {icon && (
        <div className="sb-auth-icon">
          {icon}
        </div>
      )}

      <h1 className="sb-auth-title">
        {title}
      </h1>

      {subtitle && (
        <p className="sb-auth-subtitle">
          {subtitle}
        </p>
      )}

      <div className="sb-auth-body">
        {children}
      </div>
    </motion.div>
  );
}