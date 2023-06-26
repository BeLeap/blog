import { getPostMetas } from "@/lib/posts.ts";
import { useData } from "aleph/framework/react/data.ts";
import * as Post from "@/types/post.ts";
import PostCard from "@/components/PostCard.tsx";
import { css } from "@emotion/css";

export const data = {
  defer: true,
  fetch: async () => {
    const postMetas = await getPostMetas();
    return Response.json({ postMetas });
  },
};

export default function Index() {
  const { data: { postMetas } } = useData<{ postMetas: Post.Metadata[] }>();

  return (
    <main
      className={css`
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
      `}
    >
      {postMetas.map((metadata, idx) => (
        <PostCard key={`post-${idx}`} {...metadata} />
      ))}
    </main>
  );
}
