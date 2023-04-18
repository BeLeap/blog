import { Post } from "@/types/post"
import { getPostsSorted } from "@/utils/posts"
import { GetServerSideProps } from "next"
import * as constants from "@/utils/constant"

const generateAtom = (postsSorted: Post[]) => {
  const latestUpdate = new Date(postsSorted[0].metadata.updated_at)

  const postToAtomEmtry = (post: Post) => {
    const publishedAt = new Date(post.metadata.published_at)
    const updatedAt = new Date(post.metadata.updated_at)

    return `
      <entry>
        <id>${constants.host}/posts/${post.slug}</id>
        <title>${post.metadata.title}</title>
        <updated>${updatedAt.toISOString()}</updated>
        <published>${publishedAt.toISOString()}</published>
        <link rel="alternate" href="/posts/${post.slug}"/>
        <summary>${post.metadata.summary}</summary>
      </entry>
    `
  }

  return `
    <?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">

      <id>${constants.host}</id>
      <title>BeLeap Blog</title>
      <link href="${constants.host}"/>
      <updated>${latestUpdate.toISOString()}</updated>
      <author>
        <name>BeLeap</name>
        <email>beleap@beleap.dev</email>
      </author>

      <icon>/profile.png</icon>
      <logo>/profile.png</logo>

      ${postsSorted.map(postToAtomEmtry).join('')}
    </feed>
  `
}

const Atom = () => { }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const postsSorted = await getPostsSorted()
  const atom = generateAtom(postsSorted)

  res.setHeader("Content-Type", "application/atom+xml")
  res.write(atom)
  res.end()

  return {
    props: {},
  }
}

export default Atom
