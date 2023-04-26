import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "calc(100vh - 1rem)",
        marginLeft: "0",
        marginRight: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
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
