import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Header />
      <main
        className="flex-1 flex-col flex flex-wrap items-start justify-start w-full max-w-xl"
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignContent: "start",
          justifyContent: "start",
          maxWidth: "36rem",
        }}
      >
        {children}
      </main>
      <footer className="">Footer</footer>
    </div>
  )
}
