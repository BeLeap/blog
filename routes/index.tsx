import ArticleCard from "../components/ArticleCard.tsx";
import Layout from "../components/layout/Layout.tsx";

export default function Home() {
  return (
    <Layout>
      <div className={"flex flex-col gap-4 w-full items-center"}>
        <ArticleCard title="Lorem Ipsum" time={new Date()} />
        <ArticleCard title="Dolor Sit" time={new Date()} />
      </div>
    </Layout>
  );
}
