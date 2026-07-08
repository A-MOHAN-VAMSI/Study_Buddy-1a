import { motion } from "framer-motion";

export default function StatsCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y:-5,
        scale:1.02
      }}
      className="sb-stat-card"
    >
      <div
        className="sb-stat-icon"
        style={{
          background:color
        }}
      >
        {icon}
      </div>

      <p>{title}</p>

      <h2>{value}</h2>

    </motion.div>
  );
}