import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import Header from "./Header.tsx";
import { CSS } from "https://deno.land/x/gfm@0.2.3/mod.ts";

type Props = {
  children: ComponentChildren;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      className={`flex flex-col items-center gap-4 p-4`}
    >
      <Head>
        <title>Beleap Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="global.css" rel="stylesheet" />
        <style>
          ${CSS}
        </style>
      </Head>
      <Header />
      {children}
    </div>
  );
};
export default Layout;
