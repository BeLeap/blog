import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, KATEX_CSS, render } from "https://deno.land/x/gfm@0.2.5/mod.ts";
import * as posts from "../../lib/posts.ts";
import { Head } from "$fresh/runtime.ts";
import { Just } from "../../lib/types.ts";
import "https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-bash?no-check";
import "https://esm.sh/prismjs@1.29.0/components/prism-rust?no-check";

interface PostPageData {
  content: string;
}
export const handler: Handlers<PostPageData> = {
  async GET(req, ctx) {
    const postContent = await posts.getContent(`${ctx.params.slug}.md`);
    const maybePostParsed = posts.parseFrontmatter(postContent);

    if (Just.isJust(maybePostParsed)) {
      const postParsed = maybePostParsed.unwrap();
      const postContent = postParsed[1];
      const content = render(postContent, {
        baseUrl: req.url,
        allowMath: true,
      });
      return ctx.render({ content });
    }
    return ctx.render(undefined);
  },
};

const PostPage = (props: PageProps<PostPageData>) => {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <style dangerouslySetInnerHTML={{ __html: KATEX_CSS }} />
      </Head>
      <div class="h-full shadow-md rounded-lg m-4 p-4">
        <div
          class="markdown-body"
          dangerouslySetInnerHTML={{ __html: props.data.content }}
        />
      </div>
    </>
  );
};
export default PostPage;
