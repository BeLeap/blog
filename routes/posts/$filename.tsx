import { getPostRawContent, parseFrontMatter } from "@/lib/posts.ts";
import showdown from "showdown";
import { showdownHeadingAnchor } from "@/lib/showdown/headingAnchor.ts";
import { showdownLowlight } from "@/lib/showdown/lowlight.ts";
import { useData } from "aleph/framework/react/data.ts";
import { Link } from "aleph/framework/react/link.ts";
import { css } from "@emotion/css";

showdown.extension("lowlight", showdownLowlight);
showdown.extension("headingAnchor", showdownHeadingAnchor);

export const data = {
  defer: true,
  fetch: async (req: Request) => {
    const filename = req.url.split("/").reverse()[0].split("?")[0];
    const parsedResult = await getPostRawContent(filename).then(
      parseFrontMatter,
    );
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
      content,
    });
  },
};

const Post = () => {
  const { data: { content } } = useData<{ content: string }>();

  return (
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
  );
};
export default Post;
