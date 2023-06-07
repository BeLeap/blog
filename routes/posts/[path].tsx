import { Handlers, PageProps } from "$fresh/server.ts";
import { urlParse } from "https://deno.land/x/url_parse@1.1.0/mod.ts";
import { render } from "https://deno.land/x/gfm@0.2.3/mod.ts";
import Layout from "../../components/layout/Layout.tsx";

interface Props {
  content: string;
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const url = urlParse(req.url);
    const markdown = await Deno.readTextFile(url.pathname.slice(1));
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
