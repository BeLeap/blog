import { Handlers, PageProps } from "$fresh/server.ts";
import { urlParse } from "https://deno.land/x/url_parse@1.1.0/mod.ts";
import { parse } from "frontmatter";
import Layout from "../../components/layout/Layout.tsx";
import { css } from "@emotion/css";
import showdown from "https://esm.sh/showdown@2.1.0";
import showdownHighlight from "npm:showdown-highlight@3.1.0";

interface Props {
  content: string;
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const url = urlParse(req.url);
    const rawContent = await Deno.readTextFile(url.pathname.slice(1));
    const paredResult = parse(rawContent);
    const markdown = paredResult.content;

    const showdownConverter = new showdown.Converter({
      extensions: [
        showdownHighlight({ pre: true, auto_detection: true }),
      ],
    });
    const content = showdownConverter.makeHtml(markdown);
    return ctx.render({ content });
  },
};

export default function Post({ data: { content } }: PageProps<Props>) {
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
