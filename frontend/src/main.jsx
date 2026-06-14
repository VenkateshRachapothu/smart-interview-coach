

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider
}
from "./context/ThemeContext";

import "./index.css";
import App from "./App";

import {
  InterviewProvider
} from "./context/InterviewContext";

import {
  AuthProvider
} from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <ThemeProvider>

  <AuthProvider>

    <InterviewProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </InterviewProvider>

  </AuthProvider>

  </ThemeProvider>

);