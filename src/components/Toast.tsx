"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Toast({ message }: { message: string }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-24 left-1/2 z-[60] w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 whitespace-normal rounded-md bg-[#eef6ef] px-5 py-2.5 text-center text-sm font-bold text-[#db2777] shadow-2xl ring-1 ring-brand-300/20 md:bottom-5 md:whitespace-nowrap"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
