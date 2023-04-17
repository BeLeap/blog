import { filenameToSlug, getPostContent, getPostFilenames, slugToFilename } from "@/utils/posts"
import matter from "gray-matter"
import Link from "next/link"
import { remark } from "remark"
import remarkHtml from "remark-html"
import { MdArrowBack } from "react-icons/md"

type PostProps = {
  post: {
    metadata: { [key: string]: any },
    html: string,
  },
}

export default function Post({ post }: PostProps) {
  const publishedAt = new Date(post.metadata.published_at)

  return (
    <div
      className="flex flex-col items-start container mx-auto max-w-xl"
    >
      <div
        className="w-full"
      >
        <Link
          className="inline-flex items-center gap-1 text-subtext0"
          href="/"
        >
          <MdArrowBack className="fill-subtext0" />
          {"Home"}
        </Link>
      </div>

      <h1
        className="text-4xl mt-5 my-2 font-bold"
      >{post.metadata.title}</h1>
      <time
        dateTime={publishedAt.toISOString()}
        className="my-0 text-subtext0"
      >
        {`${publishedAt.getFullYear()}-${publishedAt.getMonth()}-${publishedAt.getDate()}`}
      </time>
      <br />
      <p
        className="my-10"
      >
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </p>
    </div>
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
        metadata,
        html,
      }
    },
  }
}
