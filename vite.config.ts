import inject from "@rollup/plugin-inject";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    inject({
      p5: "p5",
    }),
  ],
});
