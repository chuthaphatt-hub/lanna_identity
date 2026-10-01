import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                home: resolve(import.meta.dirname, "index.html"),
                map: resolve(import.meta.dirname, "map.html"),
                maps: resolve(import.meta.dirname, "maps.html"),
            },
        },
    },
});
