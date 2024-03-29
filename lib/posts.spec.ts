import { assertEquals } from "$std/testing/asserts.ts";
import { listFilename, parseFrontmatter } from "./posts.ts";
import { Just } from "./types.ts";

Deno.test("list", async () => {
  console.log(await listFilename());
});

Deno.test("parseFrontmatter - it should parse frontmatter", () => {
  const content = `---
title: "Foo"
tags: ["Lorem", "Ipsum"]
published_at: "2021-12-29T00:00:00+09:00"
updated_at: "2021-12-29T00:00:00+09:00"
summary: "Bar"
---

Lorem Ipsum`;
  const resultMaybe = parseFrontmatter(content);
  assertEquals(resultMaybe.__kind, "Just");

  if (Just.isJust(resultMaybe)) {
    const result = resultMaybe.unwrap();
    assertEquals(result[0].title, "Foo");
    assertEquals(result[0].tags, ["Lorem", "Ipsum"]);
    assertEquals(result[0].published_at, "2021-12-29T00:00:00+09:00");
    assertEquals(result[0].updated_at, "2021-12-29T00:00:00+09:00");
    assertEquals(result[0].summary, "Bar");
    assertEquals(result[1], "Lorem Ipsum");
  }
});
