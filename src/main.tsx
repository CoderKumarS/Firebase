import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";
import { FirebaseProvider } from "./module/firebase";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
