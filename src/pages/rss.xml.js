import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import {
  getVisiblePosts,
  postExcerpt,
  postHref,
  sortPosts,
} from "../lib/posts";

export async function GET(context) {
  const posts = sortPosts(getVisiblePosts(await getCollection("posts")));

  return rss({
    title: "BeLeap",
    description: "Personal posts by Changseo Jang.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: postExcerpt(post),
      link: postHref(post.id),
    })),
    customData: "<language>ko</language>",
  });
}
