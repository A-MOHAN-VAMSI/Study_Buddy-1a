import { motion } from "framer-motion";

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      style={{
        width: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}