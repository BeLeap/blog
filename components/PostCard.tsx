import { Metadata } from "@/types/post";
import styles from "./PostCard.module.css";
import Link from "next/link";

const PostCard = ({ path, title, time, summary }: Metadata) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.top}
      >
        <h2
          className={styles.heading}
        >
          {title}
        </h2>
        <time
          className={styles.time}
          dateTime={time.toISOString()}
        >
          {`${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`}
        </time>
      </div>
      <p>
        {summary}
      </p>
      <Link
        href={`/${path}`}
        className={styles.readMore}
      >
        {"Read More"}
      </Link>
    </div>
  );
};
export default PostCard;
