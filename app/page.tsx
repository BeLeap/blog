import PostCard from "@/components/PostCard";
import styles from "./page.module.css";
import { getPostMetas } from "@/lib/posts";

export default async function Home() {
  const postMetas = await getPostMetas();

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
