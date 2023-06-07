import { Handlers, PageProps } from "$fresh/server.ts";
import PostCard from "../components/PostCard.tsx";
import Layout from "../components/layout/Layout.tsx";
import type * as Post from "../types/post.ts";
import { parse } from "https://deno.land/x/frontmatter@v0.1.5/mod.ts";

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
        className={"flex-1 gap-4 w-full items-start max-w-4xl border border-gray-400 rounded-3xl bg-gray-100"}
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