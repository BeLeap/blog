import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { filenameToSlug, getPostFilenames } from "@/utils/posts"

type HomeProps = {
  posts: {
    title: string,
    slug: string,
  }[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <h1>Posts</h1>
      {
        posts.map((post, index) => (
          <Link
            key={index}
            href={`posts/${post.slug}`}
          >
            {post.slug}
          </Link>
        ))
      }
    </>
  )
}

export async function getStaticProps() {
  const filenames = await getPostFilenames()

  const postmetaPromises = filenames
    .map(async (filename) => {
      const markdown = await fs.readFile(path.join(process.cwd(), 'posts', filename), { encoding: 'utf8' })
      const { data: frontMatter } = matter(markdown)

      return {
        frontMatter,
        slug: filenameToSlug(filename),
      }
    })

  const posts = await Promise.all(postmetaPromises)

  return {
    props: {
      posts
    }
  }
}
