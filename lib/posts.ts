import type * as Post from "@/types/post";
import frontmatter from "front-matter";
import { readdir, readFile } from "fs/promises";

export const getPostFilenames = async () => {
  const posts = await readdir('posts');
  return posts.map((it) => it.slice(0, -3));
}

export const getPostRawContent = async (filename: string): Promise<string> => {
  const fullPath = `posts/${filename}.md`;
  const content = await readFile(fullPath, { encoding: 'utf8' });

  return content;
}

type FrontmatterAttribute = {
  title: string,
  published_at: string,
  updated_at: string,
  summary: string,
}
export const parseFrontMatter = async (content: string): Promise<{ attributes: Partial<FrontmatterAttribute>, body: string }> => {
  const parsedResult = frontmatter(content);

  return parsedResult as any;
}

export const interpolateFrontMatter = (frontmatterParsed: { attributes: Partial<FrontmatterAttribute>, body: string }): { attributes: FrontmatterAttribute, body: string } => {
  const todayISOString = (new Date()).toISOString();

  return {
    attributes: {
      title: frontmatterParsed.attributes.title ?? "",
      published_at: frontmatterParsed.attributes.updated_at ?? todayISOString,
      updated_at: frontmatterParsed.attributes.published_at ?? todayISOString,
      summary: frontmatterParsed.attributes.summary ?? `${frontmatterParsed.body.slice(0, 100)}...`,
    },
    body: frontmatterParsed.body,
  };
}

export const getPostMetas = async (): Promise<Post.Metadata[]> => {
  const unsortedPostMetaPromises = await getPostFilenames()
    .then((filenames) =>
      filenames
        .map((filename) => {
          const rawContentPromise = getPostRawContent(filename);

          const frontmatterParsedPromise = rawContentPromise.then(parseFrontMatter).then(interpolateFrontMatter);

          const postMetaPromise = frontmatterParsedPromise
            .then((frontmatterParsed) => ({
              ...frontmatterParsed.attributes,
              time: new Date(frontmatterParsed.attributes.updated_at),
              filename,
            }));

          return postMetaPromise;
        })
    )
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
}
