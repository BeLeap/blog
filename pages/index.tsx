import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { filenameToSlug, generateSummary, getPostFilenames } from "@/utils/posts"
import Layout from "@/components/Layout"

type HomeProps = {
  posts: {
    slug: string,
    metadata: {
      title: string,
      published_at: string,
      summary: string,
    }
  }[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      {
        posts.map((post, index) => {
          const publishedAt = new Date(post.metadata.published_at)

          return (
            <div
              className="flex flex-col w-full px-5"
              key={index}
            >
              <h2
                className="my-2 text-2xl font-bold"
              >
                {post.metadata.title}
              </h2>

              <time
                dateTime={publishedAt.toISOString()}
                className="my-0 text-subtext0"
              >
                {`${publishedAt.getFullYear()}-${publishedAt.getMonth()}-${publishedAt.getDate()}`}
              </time>

              <p
                className="my-3 text-lg text-text"
              >
                {post.metadata.summary}
              </p>

              <Link
                href={`posts/${post.slug}`}
                className="underline"
              >
                Read more
              </Link>
            </div>
          )
        })
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

  const postsUnsorted = await Promise.all(postmetaPromises)
  const posts = postsUnsorted.sort((a, b) => {
    const aPublishedAt = new Date(a.metadata.published_at)
    const bPublishedAt = new Date(b.metadata.published_at)

    if (aPublishedAt < bPublishedAt) {
      return -1
    }

    if (aPublishedAt > bPublishedAt) {
      return 1
    }

    return 0
  })

  return {
    props: {
      posts
    }
  }
}
