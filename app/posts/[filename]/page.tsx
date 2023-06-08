import showdown from "showdown";
import { showdownLowlight } from "@/lib/showdownLowlight";
import styles from "./page.module.css";
import Link from "next/link";
import { getPostFilenames, getPostRawContent, parseFrontMatter } from "@/lib/posts";

showdown.extension("lowlight", showdownLowlight);

export default async function Post({ params: { filename } }: { params: { filename: string } }) {
  const parsedResult = await getPostRawContent(filename).then(parseFrontMatter)
  const markdown = parsedResult.body;

  const showdownConverter = new showdown.Converter({
    extensions: [
      "lowlight",
    ],
  });
  const content = showdownConverter.makeHtml(markdown);

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />


      <Link
        className={styles.goBack}
        href="/"
      >
        {"< Go back"}
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const filenames = await getPostFilenames();

  return filenames.map((filename) => ({
    filename,
  }));
}
