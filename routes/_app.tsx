import Header from "@/components/Header.tsx";
import { Head } from "https://deno.land/x/aleph@1.0.0-beta.43/framework/react/head.ts";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://unpkg.com/@highlightjs/cdn-assets@11.8.0/styles/default.min.css');

        pre {
          border: solid 1px;
          border-radius: 1rem;
          padding: 1rem;
          overflow: scroll;
        }


        ._app__container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
        }
      `}</style>
      <section className="_app__container">
        <Header />
        {children}
      </section>
    </>
  );
}
