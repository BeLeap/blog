import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import { rehypeHeadingLinks } from "./src/plugins/rehype-heading-links.mjs";
import { rehypeStaticAssetPaths } from "./src/plugins/rehype-static-asset-paths.mjs";

const repository = process.env.GITHUB_REPOSITORY ?? "beleap/blog";
const [owner = "beleap", name = "blog"] = repository.split("/");
const isUserSite = name.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const base = isUserSite ? "/" : `/${name}/`;

export default defineConfig({
  site: process.env.SITE ?? `https://${owner}.github.io`,
  base: isUserSite ? undefined : base,
  trailingSlash: "never",
  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeHeadingLinks,
        [rehypeStaticAssetPaths, { base }],
      ],
    }),
  },
});
