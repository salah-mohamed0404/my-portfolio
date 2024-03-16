import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react(), mdx(), astroI18next()],
});