"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        success: { duration: 7000 },
        error: { duration: 7000 },
        blank: { duration: 10000 },
      }}
    />
  );
};

export default ToasterContext;
