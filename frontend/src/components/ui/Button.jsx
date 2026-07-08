import { motion } from "framer-motion";
import clsx from "clsx";

export default function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    className = "",
    ...props
}) {
    return (
        <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
                "sb-btn",
                `sb-btn-${variant}`,
                `sb-btn-${size}`,
                loading && "sb-loading",
                className
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {leftIcon}

            <span>
                {loading ? "Loading..." : children}
            </span>

            {rightIcon}
        </motion.button>
    );
}