// src/components/Toast.tsx
import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const typeStyles = {
  success: "bg-green-100 border-green-500 text-green-800",
  error: "bg-red-100 border-red-500 text-red-800",
  info: "bg-blue-100 border-blue-500 text-blue-800",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
};

export const Toast = ({ id, type, message }: ToastProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl shadow-lg px-5 py-3 min-w-[250px] text-center font-medium break-words whitespace-pre-wrap ${typeStyles[type]}`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};
