import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import Header from "./Header.tsx";

type Props = {
  children: ComponentChildren;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Beleap Blog</title>
      </Head>
      <Header />
      {children}
    </>
  );
};
export default Layout;
