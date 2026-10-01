import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import MapPage from "./MapPage.jsx";

const page = location.pathname.endsWith("/map.html") ? <MapPage /> : <App />;
const root = createRoot(document.getElementById("root"));

flushSync(() => root.render(page));
