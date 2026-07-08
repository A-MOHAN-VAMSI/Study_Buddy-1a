import { motion } from "framer-motion";

export default function Loader({
  size = 48,
  text = "Loading...",
  fullScreen = false,
}) {
  const loader = (
    <div className="sb-loader-container">
      <motion.div
        className="sb-loader"
        style={{
          width: size,
          height: size,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />

      {text && (
        <p className="sb-loader-text">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="sb-loader-fullscreen">
        {loader}
      </div>
    );
  }

  return loader;
}