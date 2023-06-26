import type * as Post from "@/types/post.ts";
import { parse as frontmatter } from "https://deno.land/x/frontmatter@v0.1.5/mod.ts";

export const getPostFilenames = async () => {
  const postDirEntry = Deno.readDir("posts");

  const posts = [];
  for await (const dirEntry of postDirEntry) {
    posts.push(dirEntry.name);
  }

  return posts.map((it) => it.slice(0, -3));
};

export const getPostRawContent = (filename: string): Promise<string> => {
  const fullPath = `posts/${filename}.md`;
  return Deno.readTextFile(fullPath);
};

type FrontmatterAttribute = {
  title: string;
  published_at: string;
  updated_at: string;
  summary: string;
};
type IncompleteFromtmatterParsedResult = {
  data: Partial<FrontmatterAttribute>;
  content: string;
};
export const parseFrontMatter = (
  content: string,
) => {
  const parsedResult = frontmatter(content);

  return parsedResult as IncompleteFromtmatterParsedResult;
};

export const interpolateFrontMatter = (
  frontmatterParsed: IncompleteFromtmatterParsedResult,
): { attributes: FrontmatterAttribute; body: string } => {
  const todayISOString = (new Date()).toISOString();

  return {
    attributes: {
      title: frontmatterParsed.data.title ?? "",
      published_at: frontmatterParsed.data.updated_at ?? todayISOString,
      updated_at: frontmatterParsed.data.published_at ?? todayISOString,
      summary: frontmatterParsed.data.summary ??
        `${frontmatterParsed.content.slice(0, 100)}...`,
    },
    body: frontmatterParsed.content,
  };
};

export const getPostMetas = async (): Promise<Post.Metadata[]> => {
  const unsortedPostMetaPromises = await getPostFilenames()
    .then((filenames) =>
      filenames
        .map((filename) => {
          const rawContentPromise = getPostRawContent(filename);

          const frontmatterParsedPromise = rawContentPromise.then(
            parseFrontMatter,
          ).then(interpolateFrontMatter);

          const postMetaPromise = frontmatterParsedPromise
            .then((frontmatterParsed) => ({
              ...frontmatterParsed.attributes,
              time: frontmatterParsed.attributes.updated_at,
              filename,
            }));

          return postMetaPromise;
        })
    );
  const unsortedPostMetas = await Promise.all(unsortedPostMetaPromises);
  const postMetas = unsortedPostMetas.sort((a, b) => {
    if (a.time > b.time) {
      return -1;
    }

    if (a.time < b.time) {
      return 1;
    }

    return 0;
  });

  return postMetas;
};
