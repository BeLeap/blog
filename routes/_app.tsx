import { AppProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import { injectGlobal } from "@twind/core";

injectGlobal`
`

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/gh/naen-nae/fonts@purge-cache-for-subsets/build/css/IBMPlexSansKR.css" rel="stylesheet" />
        <link rel="stylesheet" href="/global.css" />
        <title>BeLeap Blog</title>
      </head>
      <body>
        <Header />
        <Component />
      </body>
    </html>
  );
}
