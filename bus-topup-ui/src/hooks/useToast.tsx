// src/hooks/useToast.ts
import { useCallback, useState } from "react";
import { ToastContainer } from "../components/ToastContainer";

let idCounter = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<
    {
      id: number;
      type: "success" | "error" | "info" | "warning";
      message: string;
    }[]
  >([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: "success" | "error" | "info" | "warning", message: string) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, type, message }]);

      setTimeout(() => removeToast(id), 2000);
    },
    [removeToast]
  );

  const toast = {
    success: (msg: string) => showToast("success", msg),
    error: (msg: string) => showToast("error", msg),
    info: (msg: string) => showToast("info", msg),
    warning: (msg: string) => showToast("warning", msg),
  };

  const ToastWrapper = <ToastContainer toasts={toasts} />;

  return { toast, ToastWrapper };
};
