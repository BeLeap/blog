import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import { rehypeHeadingLinks } from "./src/plugins/rehype-heading-links.mjs";

const repository = process.env.GITHUB_REPOSITORY ?? "beleap/blog";
const [owner = "beleap", name = "blog"] = repository.split("/");
const isUserSite = name.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  site: process.env.SITE ?? `https://${owner}.github.io`,
  base: isUserSite ? undefined : `/${name}`,
  trailingSlash: "never",
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeHeadingLinks],
    }),
  },
});
