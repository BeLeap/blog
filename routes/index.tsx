import { getPostMetas } from "@/lib/posts.ts";
import * as Post from "@/types/post.ts";
import PostCard from "@/components/PostCard.tsx";
import { Head, useData } from "aleph/react";

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
    <>
      <Head>
        <title>BeLeap Blog</title>
      </Head>
      <style>{`
        .index__container {
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
        }
      `}</style>
      <main className="index__container">
        {postMetas.map(
          (metadata, idx) => {
            return <PostCard key={`post-${idx}`} {...metadata} />;
          },
        )}
      </main>
    </>
  );
}
