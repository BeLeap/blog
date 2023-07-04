import { css } from "@emotion/css";
import * as Post from "@/types/post.ts";
import { Link } from "aleph/react";
import { Suspense } from "react";
import Time from "@/components/Time.tsx";

const postCardCss = {
  self: css`
          display: flex;
          flex-direction: column;
          margin: 0.5rem;
          padding: 1rem;
          gap: 0.5rem;
          border: solid;
          border-radius: 1rem;
          border-width: 1px;
          border-color: gray;
          background-color: white;
        `,
  top: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      `,
  heading: css`
            font-size: 1.25rem;
            font-weight: 900;
          `,
  time: css`
          white-space: nowrap;
        `,
};

const PostCard = ({ filename, title, time, summary }: Post.Metadata) => {
  return (
    <div
      className={postCardCss.self}
    >
      <header
        className={postCardCss.top}
      >
        <h2
          className={postCardCss.heading}
        >
          {title}
        </h2>
        <Time 
          className={postCardCss.time}
          time={new Date(time)}
        />
      </header>
      <summary>
        {summary}
      </summary>
      <Link to={`posts/${filename}`}>
        {"Read More"}
      </Link>
    </div>
  );
};
export default PostCard;
