import { motion } from "framer-motion";
import clsx from "clsx";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "lg",
  ...props
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.25 },
            }
          : {}
      }
      className={clsx(
        "sb-card",
        `sb-card-${padding}`,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}