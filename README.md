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

If the repository is already cloned, initialize the posts submodule with:

```sh
git submodule update --init --recursive
```

The flake provides Node.js 24 and the reproducible production package. Build the static site without a host Node.js installation with:

```sh
nix build .#default
```

The generated GitHub Pages-ready site is available through the `result` symlink.

## Posts

Markdown files live in `blog-content/`, which is the `BeLeap/blog-content` git submodule. Frontmatter currently supports:

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

Drafts are shown during local development and excluded from production builds. Set `PUBLIC_SHOW_DRAFTS=true` when a preview build needs to include them.

## Deployment

`.github/workflows/deploy.yml` checks out the post submodule, installs Nix, builds `.#default` from the flake, and deploys the result with GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The Astro base path is derived from `GITHUB_REPOSITORY`, so the same configuration works for `beleap.github.io` and a project site such as `beleap.github.io/blog`.
