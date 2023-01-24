import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./styles/index.css";
import { App } from "./components";
import { AuthProvider } from "./providers/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster position="top-left" toastOptions={{ duration: 3000 }} />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
