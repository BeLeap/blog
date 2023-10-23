import PostCard from "../components/PostCard.tsx";
import * as posts from "../lib/posts.ts";
import * as util from "../lib/util.ts";
import { Just } from "../lib/types.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface HomeData {
  postList: [string, posts.Metadata][];
}
export const handler: Handlers<HomeData> = {
  async GET(_req, ctx) {
    const postFilenameList = await posts.listFilename();
    const postContentList = await Promise.all(
      postFilenameList.map(posts.getContent),
    );
    const postParsedList = postContentList
      .map(posts.parseFrontmatter);
    const postFilenameZipWithParsedList = util.zipList(
      postFilenameList,
      postParsedList,
    ).unwrap();

    const validPostParsedList: [string, posts.Metadata][] =
      postFilenameZipWithParsedList.reduce<
        [string, posts.Metadata][]
      >(
        (prev, curr) => {
          if (Just.isJust(curr[1])) {
            return prev.concat([[curr[0], curr[1].unwrap()[0]]]);
          } else {
            return prev;
          }
        },
        [],
      );
    const homeData: HomeData = { postList: validPostParsedList };

    return ctx.render(homeData);
  },
};

const HomePage = (props: PageProps<HomeData>) => {
  return (
    <>
      {props.data.postList
        .map((it) => ({
          title: it[1].title,
          summary: it[1].summary,
          publishedAt: new Date(it[1].published_at),
          link: `/post/${posts.filenameToSlug(it[0])}`,
        })).map((it) => <PostCard {...it} />)}
    </>
  );
};
export default HomePage;
