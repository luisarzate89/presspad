import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as Sentry from "@sentry/browser";
import ErrorBoundary from "./components/Common/ErrorBoundary";

import "./index.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
