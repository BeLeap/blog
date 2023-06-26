import { getPostMetas } from "@/lib/posts.ts";
import * as Post from "@/types/post.ts";
import PostCard from "@/components/PostCard.tsx";
import { css } from "@emotion/css";
import { Head, useData } from "aleph/react";

export const data = {
  defer: true,
  fetch: async () => {
    const postMetas = await getPostMetas();
    return Response.json({ postMetas });
  },
};

const indexCss = {
  self: css`
          display: flex;
          flex-direction: column;
          flex: 1 1 0%;
          width: 100%;
          align-items: stretch;
          max-width: 56rem;
          border: solid;
          border-width: 1px;
          border-color: gray;
          border-radius: 1.5rem;
        `,
};

export default function Index() {
  const { data: { postMetas } } = useData<{ postMetas: Post.Metadata[] }>();

  return (
    <>
      <Head>
        <title>BeLeap Blog</title>
      </Head>
      <main
        className={indexCss.self}
      >
        {postMetas.map((metadata, idx) => (
          <PostCard key={`post-${idx}`} {...metadata} />
        ))}
      </main>
    </>
  );
}
