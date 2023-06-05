import { Handlers, PageProps } from "$fresh/server.ts";
import ArticleCard from "../components/ArticleCard.tsx";
import Layout from "../components/layout/Layout.tsx";
import type * as Article from "../types/articles.ts";

interface Props {
  articleMetas: Article.Metadata[];
}

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const articleMetas: Article.Metadata[] = [
      {
        path: "lorem",
        title: "Lorem",
        summary: "lorem",
        time: new Date(),
      },
      {
        path: "ipsum",
        title: "Ipsum",
        summary: "ipsum",
        time: new Date(),
      },
    ];

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
