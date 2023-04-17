import { filenameToSlug, getPostContent, getPostFilenames, slugToFilename } from "@/utils/posts"
import matter from "gray-matter"
import { remark } from "remark"
import remarkHtml from "remark-html"

type PostProps = {
  post: {
    frontMatter: { [key: string]: any },
    html: string,
  },
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <h1>{post.frontMatter.title}</h1>
      <br />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  )
}

export async function getStaticPaths() {
  const filenames = await getPostFilenames()

  const slugs = filenames.map((filename) => filenameToSlug(filename))

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      }
    })),
    fallback: false,
  }
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const { slug } = context.params
  const contentRaw = await getPostContent(slugToFilename(slug))
  const { data: metadata, content } = matter(contentRaw)
  const html = (await remark().use(remarkHtml).process(content)).toString();

  return {
    props: {
      post: {
        frontMatter: metadata,
        html,
      }
    },
  }
}
