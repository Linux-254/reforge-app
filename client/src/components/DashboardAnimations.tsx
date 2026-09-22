import { motion, HTMLMotionProps, Variants } from "framer-motion";
import React from "react";

export const dashboardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const dashboardCardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.215, 0.61, 0.355, 1.0] as const,
    },
  },
};

export function DashboardStaggerContainer({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={dashboardContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function DashboardAnimatedCard({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={dashboardCardVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
