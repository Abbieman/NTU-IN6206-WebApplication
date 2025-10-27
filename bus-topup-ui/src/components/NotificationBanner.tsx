import { AnimatePresence, motion } from "framer-motion";

interface NotificationBannerProps {
  message: string | null;
}

export const NotificationBanner = ({ message }: NotificationBannerProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="notification"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-5 w-[90vw] z-[9999]
                     bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg
                     text-center font-semibold"
        >
          🔔 {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
