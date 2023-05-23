import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import Header from "./Header.tsx";
import * as mocha from "../../consts/mocha.ts";

type Props = {
  children: ComponentChildren;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      className={`w-screen h-screen flex flex-col items-center bg-[${mocha.Surface0}] text-[${mocha.Overlay2}] gap-4 p-4`}
    >
      <Head>
        <title>Beleap Blog</title>
      </Head>
      <Header />
      {children}
    </div>
  );
};
export default Layout;
