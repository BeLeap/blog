import * as frontmatter from "$std/front_matter/any.ts";
import { Just, Maybe, Nothing } from "./types.ts";

const postBaseDir = "posts";

export const listPostFilenames = async () => {
  const postFilenames = [];
  for await (const postFile of Deno.readDir(postBaseDir)) {
    postFilenames.push(postFile.name);
  }

  return postFilenames;
};

const getText = (filename: string) =>
  Deno.readTextFile(`${postBaseDir}/${filename}`);

export const parseFrontmatter = async (
  content: string,
): Promise<
  Maybe<
    [
      {
        title: string;
        tags: string[];
        published_at: string;
        updated_at: string;
        summary: string;
      },
      string,
    ]
  >
> => {
  if (frontmatter.test(content)) {
    const result = frontmatter.extract(content);
    return new Just([result.attrs, result.body]);
  } else {
    return new Nothing();
  }
};
