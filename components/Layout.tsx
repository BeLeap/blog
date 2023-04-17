import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-col min-h-screen items-center justify-center container mx-auto">
      <Header />
      <hr
        className="border-overlay0 min-w-xl my-5"
      />
      <main
        className="flex-1 flex-col flex flex-wrap items-start justify-start w-full max-w-xl"
      >
        {children}
      </main>
      <footer className="">Footer</footer>
    </div>
  )
}
