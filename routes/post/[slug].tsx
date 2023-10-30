import { PageProps } from "$fresh/server.ts";

const PostPage = (props: PageProps) => {
  return (
    <>
      {props.params.slug}
    </>
  );
};
export default PostPage;
