import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import { App } from "./app";
import { mock } from "./mock";

mockData().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});

async function mockData() {
  if (localStorage.getItem("mocked") === "true") return;
  await mock();
  localStorage.setItem("mocked", "true");
}
