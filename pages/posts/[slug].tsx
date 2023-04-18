import { filenameToSlug, getPostContent, getPostFilenames, slugToFilename } from "@/utils/posts"
import matter from "gray-matter"
import Link from "next/link"
import remarkHtml from "remark-html"
import { MdArrowBack } from "react-icons/md"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype/lib"
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight/lib"
import palette from "@catppuccin/palette"
import Head from "next/head"
import remarkToc from "remark-toc"
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib"
import rehypeSlug from "rehype-slug"
import rehypeRewrite from "rehype-rewrite"

type PostProps = {
  post: {
    metadata: { [key: string]: any },
    html: string,
  },
}

export default function Post({ post }: PostProps) {
  const publishedAt = new Date(post.metadata.published_at)

  return (
    <>
      <Head>
        <title>{post.metadata.title}</title>
        <meta property="og:title" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.summary} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image" content="/profile.png" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "start",
            alignItems: "space-between",
            maxWidth: "64rem",
            minWidth: "80%",
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: palette.variants.mocha.subtext0.hex,
              }}
              href="/"
            >
              <MdArrowBack
                style={{
                  fill: palette.variants.mocha.subtext0.hex,
                  stroke: palette.variants.mocha.subtext0.hex,
                }}
              />
              {"Home"}
            </Link>
          </div>

          <h1>
            {post.metadata.title}
          </h1>
          <time
            dateTime={publishedAt.toISOString()}
            className="my-0 text-subtext0"
          >
            {`${publishedAt.getFullYear()}-${publishedAt.getMonth()}-${publishedAt.getDate()}`}
          </time>
          <br />
          <p>
            <div
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </p>
        </div>
      </div>
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
  const htmlVFile = await unified()
    .use(remarkToc)
    .use(remarkParse)
    .use(remarkHtml)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    })
    .use(rehypeRewrite, {
      rewrite: (node) => {
        if (node.type === "element" && node.properties !== undefined && node.tagName.startsWith("h")) {
          node.children.forEach((child) => {
            if (child.type === "element" && child.tagName === "a" && child.properties !== undefined) {
              child.properties.style = `text-decoration: none; color: ${palette.variants.mocha.text.hex}`
            }
          })
        }
      }
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)
  const html = htmlVFile.toString()

  return {
    props: {
      post: {
        metadata,
        html,
      }
    },
  }
}
