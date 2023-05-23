import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Beleap Blog</title>
      </Head>
      {children}
    </>
  );
};
export default Layout;
