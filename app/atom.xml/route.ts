import { getPostMetas } from '@/lib/posts';

export async function GET() {
  const siteRoot = "https://www.beleap.dev";
  const postMetas = await getPostMetas();

  const lastUpdate = postMetas.map((it) => it.time).reduce((prev, curr) => (prev > curr ? prev : curr))
  const sitemap = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">

<title>BeLeap Blog</title>
<link href="${siteRoot}"/>
<updated>${lastUpdate}</updated>
<author>
<name>BeLeap</name>
</author>
<id>${siteRoot}</id>

${postMetas
      .map(
        (postMeta) => (`<entry><title>${postMeta.title}</title><link href="${siteRoot}/posts/${postMeta.filename}"/><id>${siteRoot}/posts/${postMeta.filename}</id><updated>${postMeta.time.toISOString()}</updated><summary>${postMeta.summary}</summary></entry>`)
      )
      .join("\n")
    }
</feed>
`

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}
