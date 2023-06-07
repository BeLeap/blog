import { getPostMetas } from '@/lib/posts';

export async function GET() {
  const siteRoot = "https://www.beleap.dev";
  const postMetas = await getPostMetas();
  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${siteRoot}</loc>
<lastmod>${(new Date()).toISOString()}</lastmod>
</url>
${postMetas
      .map(
        (postMeta) => ({
          url: `https://www.beleap.dev/posts/${postMeta.filename}`,
          lastModified: postMeta.time,
        })
      )
      .map(
        (it) =>
          `<url><loc>${it.url}</loc><lastmod>${it.lastModified.toISOString()}</lastmod></url>`
      )
      .join('\n')
    }
</urlset>
  `

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}
