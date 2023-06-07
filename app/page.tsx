import PostCard from "@/components/PostCard";
import type * as Post from "@/types/post";
import frontmatter from "front-matter";
import { readdir, readFile } from "fs/promises";
import styles from "./page.module.css";

export default async function Home() {
  const posts = await readdir('posts')
  const unsortedPostMetaPromises = posts.map(async (it) => {
    const path = `posts/${it}`;
    const content = await readFile(path, { encoding: 'utf8' });
    const parsedResult = frontmatter(content);
    const metadata = parsedResult.attributes as {
      title: string;
      published_at: string;
      updated_at: string;
      summary: string;
    };
    const postMeta: Post.Metadata = {
      path,
      title: metadata.title,
      summary: metadata.summary,
      time: new Date(metadata.updated_at),
    };

    return postMeta;
  })
  const unsortedPostMetas = await Promise.all(unsortedPostMetaPromises);
  const postMetas = unsortedPostMetas.sort((a, b) => {
    if (a.time > b.time) {
      return -1;
    }

    if (a.time < b.time) {
      return 1;
    }

    return 0;
  })

  return (
    <div className={styles.container}>
      {postMetas.map(
        (metadata, index) => (
          <PostCard
            key={index}
            {...metadata}
          />
        ),
      )}
    </div>
  );
}
