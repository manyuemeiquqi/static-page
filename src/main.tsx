import { createRoot } from "react-dom/client";
import "./assets/index.scss";
import App from "./App.tsx";
import "./assets/tailwind.css";

createRoot(document.getElementById("root")!).render(<App />);
