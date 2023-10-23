import { listPosts } from "./markdown.ts";

Deno.test("listPosts", async () => {
  console.log(await listPosts());
});

