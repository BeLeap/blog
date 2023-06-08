import showdown from "showdown";
import { showdownLowlight } from "@/lib/showdown/lowlight";
import styles from "./page.module.css";
import Link from "next/link";
import { getPostFilenames, getPostRawContent, parseFrontMatter } from "@/lib/posts";
import { showdownHeadingAnchor } from "@/lib/showdown/headingAnchor";

showdown.extension("lowlight", showdownLowlight);
showdown.extension("headingAnchor", showdownHeadingAnchor);

export default async function Post({ params: { filename } }: { params: { filename: string } }) {
  const parsedResult = await getPostRawContent(filename).then(parseFrontMatter)
  const markdown = parsedResult.body;

  const showdownConverter = new showdown.Converter({
    extensions: [
      "lowlight",
      "headingAnchor",
    ],
  });
  showdownConverter.setFlavor("github");
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
