import Header from "@/components/Header.tsx";
import { css } from "@emotion/css";
import { Head } from "https://deno.land/x/aleph@1.0.0-beta.43/framework/react/head.ts";

const appCss = {
  self: css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
        `,
};

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="./assets/favicon.ico" />
        <style>
          {`
            @import url('https://unpkg.com/@highlightjs/cdn-assets@11.8.0/styles/default.min.css');
            @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap');

            ::-webkit-scrollbar {
              display: none;
            }

            * {
              font-family: 'IBM Plex Mono', 'Nanum Gothic Coding', monospace;
            }

            pre {
              border: solid 1px;
              border-radius: 1rem;
              padding: 1rem;
              overflow: scroll;
            }

            a {
              color: gray;
            }

            a:hover {
              color: #862633;
            }  
          `}
        </style>
      </Head>
      <section
        className={appCss.self}
      >
        <Header />
        {children}
      </section>
    </>
  );
}
