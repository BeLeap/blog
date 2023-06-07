import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import Header from "./Header.tsx";
import { css } from "@emotion/css";

type Props = {
  children: ComponentChildren;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <Head>
        <title>Beleap Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/global.css" rel="stylesheet" />
      </Head>
      <Header />
      {children}
    </div>
  );
};
export default Layout;
