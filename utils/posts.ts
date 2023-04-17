import fs from "fs/promises"
import path from "path"

const postRoot = path.join(process.cwd(), 'posts')

export const getPostFilenames = async (): Promise<string[]> => fs.readdir(postRoot)


export const filenameToSlug = (filename: string): string => filename.split('.')[0]

export const slugToFilename = (slug: string): string => `${slug}.md`

export const getPostContent = async (filename: string): Promise<string> => fs.readFile(path.join(postRoot, filename), { encoding: 'utf-8' })
