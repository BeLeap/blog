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
import crypto from "crypto"
import * as htmlUtil from "@/utils/html"
import { Post } from "@/types/post"

type PostProps = {
  post: Post & { html: string },
}

const PostPage = ({ post }: PostProps) => {
  const updatedAt = new Date(post.metadata.updated_at)

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
            dateTime={updatedAt.toISOString()}
          >
            {`${updatedAt.getFullYear()}-${updatedAt.getMonth()}-${updatedAt.getDate()}`}
          </time>
          <br />
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
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

export const getStaticProps = async (context: { params: { slug: string } }) => {
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
    .use(rehypeHighlight)
    .use(rehypeRewrite, {
      rewrite: (node) => {
        if (node.type === "element" && node.properties !== undefined) {
          if (htmlUtil.isHeading(node.tagName)) {
            node.children.forEach((child) => {
              if (child.type === "element" && child.tagName === "a" && child.properties !== undefined) {
                child.properties.style = `text-decoration: none; color: ${palette.variants.mocha.text.hex}`
              }
            })
          }

          if (htmlUtil.isCodeblock(node.tagName)) {
            const randomId = crypto.randomUUID().split("-").join("")
            node.properties = {
              ...node.properties,
              style: `
                display: flex;
                width: 100%; 
                justify-content: space-between; 
                align-items: flex-start;
              `,
              id: `${randomId}`,
            }

            node.children = [
              ...node.children,
              {
                type: "element",
                tagName: "button",
                properties: {
                  style: `
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    justify-content: center;
                    color: ${palette.variants.mocha.surface0.hex}; 
                    width: 2rem; 
                    height: 2rem;
                    background-color: ${palette.variants.mocha.overlay2.hex};
                    border-radius: 0.5rem;
                  `,
                  onclick: `
                    const code = document.getElementById("${randomId}")
                    navigator.clipboard.writeText(code.innerText)
                  `,
                },
                children: [
                  {
                    type: "element",
                    tagName: "svg",
                    properties: {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: palette.variants.mocha.surface0.hex,
                      stroke: palette.variants.mocha.surface0.hex,
                      width: "80%",
                      height: "80%",
                      viewBox: "0 0 16 16",
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "path",
                        properties: {
                          d: "M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                        },
                        children: [],
                      },
                      {
                        type: "element",
                        tagName: "path",
                        properties: {
                          d: "M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                        },
                        children: [],
                      },
                    ],
                  }
                ]
              }
            ]
          }
        }
      }
    })
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

export default PostPage;
