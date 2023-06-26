import Header from "@/components/Header.tsx";
import { injectGlobal } from "@emotion/css";

injectGlobal`
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
`;

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
