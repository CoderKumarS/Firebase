import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirebaseProvider } from "./module/firebase";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);
