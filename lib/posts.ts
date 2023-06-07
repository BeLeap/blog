import type * as Post from "@/types/post";
import frontmatter from "front-matter";
import { readdir, readFile } from "fs/promises";

export const getPostFilenames = async () => {
  const posts = await readdir('posts');

  return posts;
}

export const getPostRawContent = async (path: string): Promise<string> => {
  const fullPath = `posts/${path}`;
  const content = await readFile(fullPath, { encoding: 'utf8' });

  return content
}

export const parseFrontMatter = async (content: string): Promise<{ attribute: Omit<Post.Metadata, "filename"> }> => {
  const parsedResult = frontmatter(content);

  return parsedResult as any;
}

export const getPostMetas = async () => {
  const unsortedPostMetaPromises = await getPostFilenames()
    .then((filenames) =>
      filenames
        .map((filename) => {
          const rawContentPromise = getPostRawContent(filename);

          const frontmatterParsedPromise = rawContentPromise.then(parseFrontMatter);

          const postMetaPromise = frontmatterParsedPromise
            .then((frontmatterParsed) => ({
              ...frontmatterParsed.attribute,
              time: new Date(frontmatterParsed.attribute.time),
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
