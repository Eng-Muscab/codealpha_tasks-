import { createContext, useState } from "react";

export const CustomToastContext = createContext();

export function CustomToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <CustomToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed top-4 right-4 p-3 rounded shadow ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </CustomToastContext.Provider>
  );
}
