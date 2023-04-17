import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-col min-h-screen items-center justify-center container mx-auto">
      <Header />
      <main
        className="flex-1 flex-col flex flex-wrap items-top justify-content"
      >{children}</main>
      <footer className="">Footer</footer>
    </div>
  )
}
