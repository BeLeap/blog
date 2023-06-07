import { Handlers, PageProps } from "$fresh/server.ts";
import { css } from "@emotion/css";
import PostCard from "../components/PostCard.tsx";
import Layout from "../components/layout/Layout.tsx";
import type * as Post from "../types/post.ts";
import { parse } from "frontmatter";

interface Props {
  postMetas: Post.Metadata[];
}

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const postMetas: Post.Metadata[] = [];
    for await (const dirEntry of Deno.readDir("posts")) {
      // NOTE: Only support top-level articles.
      if (dirEntry.isFile) {
        const path = `posts/${dirEntry.name}`;
        const content = await Deno.readTextFile(path);
        const parsedResult = parse(content);
        const metadata = parsedResult.data as {
          title: string;
          published_at: string;
          updated_at: string;
          summary: string;
        };
        const postMeta: Post.Metadata = {
          path,
          title: metadata.title,
          summary: metadata.summary,
          time: new Date(metadata.updated_at),
        };

        postMetas.push(postMeta);
      }
    }

    postMetas.sort((a, b) => {
      if (a.time > b.time) {
        return -1;
      }

      if (a.time < b.time) {
        return 1;
      }

      return 0;
    });

    return ctx.render({ postMetas });
  },
};

export default function Home(
  { data: { postMetas } }: PageProps<Props>,
) {
  return (
    <Layout>
      <div
        class={css`
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
          /* background-color: gray; */
        `}
      >
        {postMetas.map(
          (metadata) => (
            <PostCard
              {...metadata}
            />
          ),
        )}
      </div>
    </Layout>
  );
}
