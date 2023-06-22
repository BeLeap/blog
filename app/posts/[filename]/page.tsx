import showdown from "showdown";
import { showdownLowlight } from "@/lib/showdown/lowlight";
import styles from "./page.module.css";
import Link from "next/link";
import { getPostFilenames, getPostRawContent, parseFrontMatter } from "@/lib/posts";
import { showdownHeadingAnchor } from "@/lib/showdown/headingAnchor";
import { Metadata } from "next";

showdown.extension("lowlight", showdownLowlight);
showdown.extension("headingAnchor", showdownHeadingAnchor);

type Props = { params: { filename: string } }

export async function generateMetadata({ params: { filename } }: Props): Promise<Metadata> {
  const parsedResult = await getPostRawContent(filename).then(parseFrontMatter);
  const postTitle = parsedResult.attributes.title
  const postTitlePostFix = postTitle ? ` - ${postTitle}` : postTitle;

  return {
    title: `BeLeap Blog ${postTitlePostFix}`
  };
}

export default async function Post({ params: { filename } }: Props) {
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
    <main className={styles.container}>
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
    </main>
  );
}

export async function generateStaticParams() {
  const filenames = await getPostFilenames();

  return filenames.map((filename) => ({
    filename,
  }));
}
