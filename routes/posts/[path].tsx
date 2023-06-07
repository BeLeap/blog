import { Handlers, PageProps } from "$fresh/server.ts";
import { urlParse } from "https://deno.land/x/url_parse@1.1.0/mod.ts";
import { parse } from "frontmatter";
import Layout from "../../components/layout/Layout.tsx";
import { css } from "@emotion/css";
import showdown from "https://esm.sh/showdown@2.1.0";
import { showdownLowlight } from "../../lib/showdownHighlight.ts";

showdown.extension("lowlight", showdownLowlight);

interface Props {
  rawContent: string;
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const url = urlParse(req.url);
    const rawContent = await Deno.readTextFile(url.pathname.slice(1));
    return ctx.render({ rawContent });
  },
};

export default function Post({ data: { rawContent } }: PageProps<Props>) {
  const paredResult = parse(rawContent);
  const markdown = paredResult.content;

  const showdownConverter = new showdown.Converter({
    extensions: [
      "lowlight",
    ],
  });
  const content = showdownConverter.makeHtml(markdown);

  return (
    <Layout>
      <div
        class={css`
          width: 100%;
          overflow: scroll;
        `}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <a
        class={css`
          color: blue;

          &:visited {
            color: blue;
          }
        `}
        href="/"
      >
        {"< Go back"}
      </a>
    </Layout>
  );
}
