import fs from "node:fs/promises"
import path from "node:path"
import { Inter } from 'next/font/google'
import matter from "gray-matter"
import Link from "next/link"

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  posts: {
    slug: string,
  }[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <h1 className={`${inter.className}`}>Posts</h1>
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
  const files = await fs.readdir(path.join(process.cwd(), 'pages/posts'))

  const postsPromises = files
    .map(async (filename) => {
      const markdown = await fs.readFile(path.join(process.cwd(), 'pages/posts', filename), { encoding: 'utf8' })
      const { data: frontMatter } = matter(markdown)

      return {
        frontMatter,
        slug: filename.split('.')[0],
      }
    })

  const posts = await Promise.all(postsPromises)

  return {
    props: {
      posts
    }
  }
}
