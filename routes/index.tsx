import PostCard from "../components/PostCard.tsx";

const Home = () => {
  return (
    <>
      {[{}].map((it) => <PostCard />)}
    </>
  );
};
export default Home;
