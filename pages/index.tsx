import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { filenameToSlug, getPostFilenames } from "@/utils/posts"
import Layout from "@/components/Layout"

type HomeProps = {
  posts: {
    slug: string,
    metadata: {
      title: string,
    }
  }[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      {
        posts.map((post, index) => (
          <Link
            className="flex w-full"
            key={index}
            href={`posts/${post.slug}`}
          >
            <h2
              className="m-5 text-2xl font-bold"
            >
              {post.metadata.title}
            </h2>
          </Link>
        ))
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const filenames = await getPostFilenames()

  const postmetaPromises = filenames
    .map(async (filename) => {
      const markdown = await fs.readFile(path.join(process.cwd(), 'posts', filename), { encoding: 'utf8' })
      const { data: metadata } = matter(markdown)

      return {
        metadata,
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
