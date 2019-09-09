import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as Sentry from "@sentry/browser";

import "./index.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

ReactDOM.render(<App />, document.getElementById("root"));
