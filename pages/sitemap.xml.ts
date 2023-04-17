import { filenameToSlug, getPostFilenames } from "@/utils/posts"
import { GetServerSideProps } from "next"

const host = "https://www.beleap.dev"

function generateSiteMap(slugs: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${host}</loc>
     </url>
     ${slugs
      .map((slug) => {
        return `
       <url>
           <loc>${`${host}/${slug}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const filenames = await getPostFilenames()
  const sitemap = generateSiteMap(filenames.map((filename) => filenameToSlug(filename)));

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
