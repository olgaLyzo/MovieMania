import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { CatalogProvider } from "./context/CatalogContext";
import "./styles/main.scss";

const container = document.getElementById("root");

// Если корневого элемента нет, приложение не запустится: лучше сказать об этом явно.
if (!container) {
  throw new Error("Не найден элемент #root в index.html");
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <App />
      </CatalogProvider>
    </BrowserRouter>
  </StrictMode>,
);
