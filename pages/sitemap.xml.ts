import { filenameToSlug, getPostFilenames } from "@/utils/posts"
import { GetServerSideProps } from "next"
import * as constants from "@/utils/constant"

const generateSiteMap = (slugs: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${constants.host}</loc>
     </url>
     ${slugs
      .map((slug) => {
        return `
       <url>
           <loc>${`${constants.host}/posts/${slug}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `
}

const SiteMap = () => { }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const filenames = await getPostFilenames()
  const sitemap = generateSiteMap(filenames.map((filename) => filenameToSlug(filename)))

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
