import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 1rem)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Header />
      <main
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
      <Footer />
    </div>
  )
}
