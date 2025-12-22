import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Ensure scroll restoration is manual before React renders
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Simple, robust scroll to top
function forceScrollToTop() {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Execute immediately
forceScrollToTop();

window.addEventListener('DOMContentLoaded', forceScrollToTop);
window.addEventListener('load', forceScrollToTop);
window.addEventListener('pageshow', (event) => {
  if (event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
    forceScrollToTop();
  }
});

// Reset scroll before leaving the page
window.addEventListener('beforeunload', forceScrollToTop);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
