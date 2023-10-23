import * as frontmatter from "$std/front_matter/any.ts";
import { Just, Maybe, Nothing } from "./types.ts";

const baseDir = "posts";
export type Metadata = {
  title: string;
  tags: string[];
  published_at: string;
  updated_at: string;
  summary: string;
};

export const listFilename = async () => {
  const postFilenameList = [];
  for await (const postFile of Deno.readDir(baseDir)) {
    postFilenameList.push(postFile.name);
  }

  return postFilenameList;
};

export const getContent = (filename: string) =>
  Deno.readTextFile(`${baseDir}/${filename}`);

export const parseFrontmatter = (
  content: string,
): Maybe<
  [
    Metadata,
    string,
  ]
> => {
  if (frontmatter.test(content)) {
    const result = frontmatter.extract(content);
    return new Just([result.attrs, result.body]);
  } else {
    return new Nothing();
  }
};

export const filenameToSlug = (filename: string) => {
  return filename.substring(0, filename.lastIndexOf("."));
};
