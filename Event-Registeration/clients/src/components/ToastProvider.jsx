import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
} from "@radix-ui/react-toast";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function CustomToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: "" });

  const showToast = (message) => setToast({ open: true, message });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastProvider>
        <Toast
          open={toast.open}
          onOpenChange={() => setToast({ ...toast, open: false })}
        >
          <ToastTitle>{toast.message}</ToastTitle>
        </Toast>
        <ToastViewport className="fixed bottom-4 right-4" />
      </ToastProvider>
      {children}
    </ToastContext.Provider>
  );
}
