import { getPostRawContent, parseFrontMatter } from "@/lib/posts.ts";
import showdown from "showdown";
import { showdownHeadingAnchor } from "@/lib/showdown/headingAnchor.ts";
import { showdownLowlight } from "@/lib/showdown/lowlight.ts";
import { useData } from "aleph/framework/react/data.ts";
import { css } from "@emotion/css";
import { Head, Link } from "aleph/react";

showdown.extension("lowlight", showdownLowlight);
showdown.extension("headingAnchor", showdownHeadingAnchor);

export const data = {
  defer: true,
  fetch: async (req: Request) => {
    const filename = req.url.split("/").reverse()[0].split("?")[0];
    const parsedResult = await getPostRawContent(filename).then(
      parseFrontMatter,
    );

    const postTitle = parsedResult.data.title;
    const postTitlePostFix = postTitle ? ` - ${postTitle}` : postTitle;
    const title = `BeLeap Blog ${postTitlePostFix}`;

    const markdown = parsedResult.content;

    const showdownConverter = new showdown.Converter({
      extensions: [
        "lowlight",
        "headingAnchor",
      ],
    });
    showdownConverter.setFlavor("github");
    const content = showdownConverter.makeHtml(markdown);

    return Response.json({
      title,
      content,
    });
  },
};

const Post = () => {
  const { data: { title, content } } = useData<
    { title: string; content: string }
  >();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main
        className={css`
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        width: 100%;
        max-width: 56rem;
      `}
      >
        <article
          className={css`
          width: 100%;
          overflow: scroll;
        `}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <Link
          className={css`
          align-self: end;
          margin-top: 1rem;
          white-space: nowrap;
        `}
          to="/"
        >
          {"< Go back"}
        </Link>
      </main>
    </>
  );
};
export default Post;
