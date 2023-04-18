import { Post } from "@/types/post"
import fs from "fs/promises"
import matter from "gray-matter"
import path from "path"

const postRoot = path.join(process.cwd(), 'posts')

export const getPostFilenames = async (): Promise<string[]> => fs.readdir(postRoot)

export const filenameToSlug = (filename: string): string => filename.split('.')[0]

export const slugToFilename = (slug: string): string => `${slug}.md`

export const getPostContent = async (filename: string): Promise<string> => fs.readFile(path.join(postRoot, filename), { encoding: 'utf-8' })

export const getPostsSorted = async (): Promise<Post[]> => {
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
      const aUpdatedAt = new Date(a.metadata.updated_at)
      const bUpdatedAt = new Date(b.metadata.updated_at)

      if (aUpdatedAt < bUpdatedAt) {
        return -1
      }

      if (aUpdatedAt > bUpdatedAt) {
        return 1
      }

      return 0
    })
    .reverse()

  return posts as Post[]
}
