import { Handlers, PageProps } from "$fresh/server.ts";
import ArticleCard from "../components/ArticleCard.tsx";
import Layout from "../components/layout/Layout.tsx";
import type * as Article from "../types/articles.ts";
import { parse } from "https://deno.land/x/frontmatter@v0.1.5/mod.ts";

interface Props {
  articleMetas: Article.Metadata[];
}

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const articleMetas: Article.Metadata[] = [];
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
        const articleMetadata: Article.Metadata = {
          path,
          title: metadata.title,
          summary: metadata.summary,
          time: new Date(metadata.updated_at),
        };

        articleMetas.push(articleMetadata);
      }
    }

    articleMetas.sort((a, b) => {
      if (a.time > b.time) {
        return -1;
      }

      if (a.time < b.time) {
        return 1;
      }

      return 0;
    });

    return ctx.render({ articleMetas });
  },
};

export default function Home(
  { data: { articleMetas } }: PageProps<Props>,
) {
  return (
    <Layout>
      <div className={"flex flex-col gap-4 w-full items-center"}>
        {articleMetas.map(
          (metadata) => (
            <ArticleCard
              {...metadata}
            />
          ),
        )}
      </div>
    </Layout>
  );
}
