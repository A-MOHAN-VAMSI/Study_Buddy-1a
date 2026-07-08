import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={blob1}
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={blob2}
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={blob3}
      />
    </>
  );
}

const common = {
  position: "fixed",
  borderRadius: "50%",
  pointerEvents: "none",
  zIndex: -1,
};

const blob1 = {
  ...common,
  width: 350,
  height: 350,
  filter: "blur(120px)",
  background: "#6366f1",
  opacity: 0.12,
  top: -120,
  left: -120,
};

const blob2 = {
  ...common,
  width: 420,
  height: 420,
  filter: "blur(150px)",
  background: "#06b6d4",
  opacity: 0.10,
  bottom: -180,
  right: -120,
};

const blob3 = {
  ...common,
  width: 220,
  height: 220,
  filter: "blur(100px)",
  background: "#8b5cf6",
  opacity: 0.08,
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};