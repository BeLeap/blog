import PostCard from "../components/PostCard.tsx";

const Home = () => {
  return (
    <>
      {[
        {
          title: "Foo",
          summary: "Lorem Ipsum",
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
