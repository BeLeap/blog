import { css } from "@emotion/css";
import * as Post from "@/types/post.ts";
import { Link } from "aleph/react";
import { Suspense } from "react";
import Time from "@/components/Time.tsx";

const postCardCss = {
  self: css`
        `,
  top: css`
      `,
  heading: css`
          `,
  time: css`
        `,
};

const PostCard = ({ filename, title, time, summary }: Post.Metadata) => {
  return (
    <>
      <style>{`
        .PostCard__container {
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
        }

        .PostCard__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .PostCard__heading {
            font-size: 1.25rem;
            font-weight: 900;
        }

        .PostCard__time {
          white-space: nowrap;
        }
      `}</style>
      <div
        className="PostCard__container"
      >
        <header
          className="PostCard__top"
        >
          <h2
            className="PostCard__heading"
          >
            {title}
          </h2>
          <Time 
            className="PostCard__time"
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
    </>
  );
};
export default PostCard;
