import { css } from "@emotion/css";
import { Metadata } from "../types/post.ts";

const PostCard = ({ path, title, time, summary }: Metadata) => {
  return (
    <div
      class={css`
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
      `}
    >
      <div
        class={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        `}
      >
        <h2
          class={css`
            font-size: 1.25rem;
            font-weight: 900;
          `}
        >
          {title}
        </h2>
        <time
          class={css`white-space: nowrap;`}
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
        class={css`
          color: blue;
          text-decoration: underline;

          &:hover {
            color: gray;
          }
        `}
      >
        {"Read More"}
      </a>
    </div>
  );
};
export default PostCard;
