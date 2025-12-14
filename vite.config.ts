import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// IMPORTANT: This must match your GitHub repo name.
// Your repo is "K-B", so your Pages URL is https://Dios999.github.io/K-B/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/K-B/",
});
