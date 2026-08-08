# BeLeap

A concise, serif-first blog by [Changseo Jang](https://github.com/beleap), a DevOps Engineer. Built with [Astro](https://astro.build/) and deployed to GitHub Pages.

The visual system follows a 60:30:10 palette:

- **60% paper** — warm ivory for the reading canvas.
- **30% ink** — the deep green-black navigation rail and code blocks.
- **10% red** — red accents for links, markers, and interaction.

The main typeface is **Noto Serif KR**, so Korean and Latin copy share the same editorial voice. The author portrait powers the favicon and logo, loaded from `https://beleap.github.io/profile/profile-64.png`.

Resume: [latest PDF release](https://github.com/BeLeap/resume/releases/latest/download/ChangseoJang_Resume.pdf) · [GitHub profile](https://github.com/beleap)

## Local development

Clone the repository with its `blog-content` submodule, enter the Nix development shell, and install the locked JavaScript dependencies:

```sh
git clone --recurse-submodules https://github.com/BeLeap/blog.git
cd blog
nix develop
npm ci
npm run dev
```

If the repository is already cloned, initialize the `blog-content` submodule with:

```sh
git submodule update --init --recursive
```

The flake provides Node.js 24 and the reproducible production package. Build the static site without a host Node.js installation with:

```sh
nix build .#default
```

The generated GitHub Pages-ready site is available through the `result` symlink.

## Posts

Markdown files live in `blog-content/post/`, which is the `BeLeap/blog-content` git submodule. Frontmatter currently supports:

```yaml
---
title: "A post title"
description: "A short description"
date: 2026-08-08
tldr: "An optional one-line summary."
draft: false
tags: [Systems]
---
```

Static files live in `blog-content/static/` and can be referenced from Markdown with `/static/...` paths. The build exposes them through the project-site base path when deployed to GitHub Pages.

Markdown supports inline `$...$` and display `$$...$$` LaTeX, rendered at build time with KaTeX.

Drafts are shown during local development and excluded from production builds. Set `PUBLIC_SHOW_DRAFTS=true` when a preview build needs to include them.

Published posts are also available through the RSS feed at `/rss.xml` (or `${BASE_PATH}/rss.xml` for a project-site deployment).

## Deployment

`.github/workflows/deploy.yml` checks out the post submodule, installs Nix, builds `.#default` from the flake, and deploys the result with GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The production build sets `SITE=https://beleap.dev` and `BASE_PATH=/` because the custom domain serves this project at the domain root. For another GitHub Pages project site, set `BASE_PATH` to the repository path, such as `/blog`.
