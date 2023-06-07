import frontmatter from "front-matter";
import showdown from "showdown";
import { showdownLowlight } from "@/lib/showdownLowlight";
import { readFile } from "fs/promises";
import styles from "./page.module.css";
import Link from "next/link";

showdown.extension("lowlight", showdownLowlight);

export default async function Post({ params: { filename } }: { params: { filename: string } }) {
  const rawContent = await readFile(`posts/${filename}`, { encoding: 'utf8' });
  const paredResult = frontmatter(rawContent);
  const markdown = paredResult.body;

  const showdownConverter = new showdown.Converter({
    extensions: [
      "lowlight",
    ],
  });
  const content = showdownConverter.makeHtml(markdown);

  return (
    <>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <Link
        className={styles.goBack}
        href="/"
      >
        {"< Go back"}
      </Link>
    </>
  );
}
