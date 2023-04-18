import Link from "next/link"
import { getPostsSorted } from "@/utils/posts"
import Layout from "@/components/Layout"
import Head from "next/head"
import palette from "@catppuccin/palette"
import { Post } from "@/types/post"

type HomeProps = {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>BeLeap Blog</title>
        <meta property="og:title" content="BeLeap Blog" key="title" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image" content="/profile.png" />
      </Head>
      {
        posts.map((post, index) => {
          const updatedAt = new Date(post.metadata.updated_at)

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
                dateTime={updatedAt.toISOString()}
                className="my-0 text-subtext0"
                style={{
                  marginTop: 2,
                  color: palette.variants.mocha.subtext0.hex,
                }}
              >
                {`${updatedAt.getFullYear()}-${updatedAt.getMonth()}-${updatedAt.getDate()}`}
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
  const posts = await getPostsSorted()

  return {
    props: {
      posts
    }
  }
}
