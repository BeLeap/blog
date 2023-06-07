import { Handlers, PageProps } from "$fresh/server.ts";
import { urlParse } from "https://deno.land/x/url_parse@1.1.0/mod.ts";
import { parse } from "frontmatter";
import { render } from "gfm";
import Layout from "../../components/layout/Layout.tsx";

interface Props {
  content: string;
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const url = urlParse(req.url);
    const rawContent = await Deno.readTextFile(url.pathname.slice(1));
    const paredResult = parse(rawContent);
    const markdown = paredResult.content;
    const content = render(markdown);
    return ctx.render({ content });
  },
};

export default function Post({ data: { content } }: PageProps<Props>) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  );
}
