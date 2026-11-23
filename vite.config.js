import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" lets the build work from any folder or subpath (GitHub Pages, S3, etc.)
export default defineConfig({ plugins: [react()], base: "./" });
