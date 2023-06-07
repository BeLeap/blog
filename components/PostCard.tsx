import { Metadata } from "@/types/post";
import styles from "./PostCard.module.css";

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
      <a
        href={`/${path}`}
        className={styles.readMore}
      >
        {"Read More"}
      </a>
    </div>
  );
};
export default PostCard;
