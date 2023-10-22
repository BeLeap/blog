import PostCard from "../components/PostCard.tsx";

const Home = () => {
  return (
    <>
      {[
        {
          title: "Foo",
          summary: "Lorem Ipsum Dolor Sit",
          publishedAt: new Date(),
          slug: "foo",
        },
      ].map((it) => ({
        ...it,
        link: `/post/${it.slug}`,
      })).map((it) => <PostCard {...it} />)}
    </>
  );
};
export default Home;
