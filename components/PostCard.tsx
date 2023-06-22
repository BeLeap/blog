import { Metadata } from "@/types/post";
import styles from "./PostCard.module.css";
import Link from "next/link";

const PostCard = ({ filename, title, time, summary }: Metadata) => {
  return (
    <div className={styles.container}>
      <header
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
      </header>
      <p>
        {summary}
      </p>
      <Link href={`posts/${filename}`}>
        {"Read More"}
      </Link>
    </div>
  );
};
export default PostCard;
