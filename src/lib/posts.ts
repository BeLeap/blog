import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export function getVisiblePosts(posts: Post[]): Post[] {
  const showDrafts = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_DRAFTS === "true";
  return showDrafts ? posts : posts.filter((post) => !post.data.draft);
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function postHref(id: string): string {
  return `${import.meta.env.BASE_URL}posts/${id}`;
}

export function postExcerpt(post: Post): string {
  const excerpt = post.data.description || post.data.tldr || "A note from the archive.";
  const limit = 160;

  return excerpt.length > limit
    ? `${excerpt.slice(0, limit - 1).trimEnd()}…`
    : excerpt;
}
