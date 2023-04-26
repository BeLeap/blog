import palette from "@catppuccin/palette"
import Link from "next/link"
import { FaRss } from "react-icons/fa"

export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
        gap: "0.5rem",
      }}
    >
      {`${(new Date()).getFullYear()} © BeLeap`}
      {" / "}
      <Link
        href="/atom.xml"
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
          textDecoration: "none",
          borderBottom: `1px solid ${palette.variants.mocha.blue.hex}`,
        }}
      >
        <FaRss fill={`${palette.variants.mocha.blue.hex}`} />
        RSS
      </Link>
    </footer>
  )
}
