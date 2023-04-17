import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { filenameToSlug, getPostFilenames } from "@/utils/posts"
import Layout from "@/components/Layout"
import Head from "next/head"
import palette from "@catppuccin/palette"

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
      <Head>
        <title>BeLeap Blog</title>
        <link rel="shortcut icon" href="/profile.png" />
        <meta property="og:title" content="BeLeap Blog" key="title" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image" content="/profile.png" />
      </Head>
      {
        posts.map((post, index) => {
          const publishedAt = new Date(post.metadata.published_at)

          return (
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                paddingLeft: 5,
                paddingRight: 5,
                marginTop: 5,
                marginBottom: 5,
              }}
              key={index}
            >
              <h2
                style={{
                  marginBottom: 2,
                }}
              >
                {post.metadata.title}
              </h2>

              <time
                dateTime={publishedAt.toISOString()}
                className="my-0 text-subtext0"
                style={{
                  marginTop: 2,
                  color: palette.variants.mocha.subtext0.hex,
                }}
              >
                {`${publishedAt.getFullYear()}-${publishedAt.getMonth()}-${publishedAt.getDate()}`}
              </time>

              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "1.125rem",
                  lineHeight: "1.75rem",
                  marginBottom: 2,
                }}
              >
                {post.metadata.summary}
              </p>

              <Link
                href={`posts/${post.slug}`}
              >
                Read more
              </Link>
            </nav>
          )
        })
      }
    </Layout >
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
  const posts = postsUnsorted
    .sort((a, b) => {
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
    .reverse()

  return {
    props: {
      posts
    }
  }
}
