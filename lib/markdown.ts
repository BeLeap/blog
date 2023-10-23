export const listPosts = async () => {
  const postFilenames = [];
  for await (const postFile of Deno.readDir("posts")) {
    postFilenames.push(postFile.name);
  }

  return postFilenames.map((it) => it.split(".").slice(0, -1).join("."));
};
