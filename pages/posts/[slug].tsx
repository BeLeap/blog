import { filenameToSlug, getPostContent, getPostFilenames, slugToFilename } from "@/utils/posts"
import matter from "gray-matter"

type PostProps = {
  post: {
    frontMatter: { [key: string]: any },
    title: string,
    content: string,
  },
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <h1>{post.frontMatter.title}</h1>
      <p>{post.content}</p>
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

export async function getStaticProps(context) {
  const content = await getPostContent(slugToFilename(context.params.slug))
  const { data: frontMatter } = matter(content)

  return {
    props: {
      post: {
        frontMatter,
        content,
      }
    },
  }
}
