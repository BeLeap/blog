import Image from "next/image"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import IconLink from "./IconLink"
import Link from "next/link"
import palette from "@catppuccin/palette"

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        paddingLeft: "10rem",
        paddingRight: "10rem",
        marginTop: "3rem",
        borderBottomStyle: "solid",
        borderBottomWidth: "2px",
        borderBottomColor: palette.variants.mocha.overlay2.hex,
        marginBottom: "1.5rem",
      }}
    >
      <Image
        style={{
          borderRadius: "100%",
        }}
        alt="Profile Image"
        width="100" height="100"
        src="/profile.png"
      />
      <ul
        style={{
          margin: "1rem",
          listStyle: "inside",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
        }}
      >
        <li>
          DevOps Engineer at <Link href="https://riiid.com">Riiid</Link>
        </li>
        <li>
          Loves <Link href="https://neovim.io">Neovim</Link>, <Link href="https://www.rust-lang.org/">Rust</Link></li>
      </ul>
      <div
        style={{
          display: "flex",
          width: "80%",
          alignContent: "center",
          justifyContent: "space-evenly",
          marginBottom: "1rem",
        }}
      >
        <IconLink
          href="mailto:beleap@beleap.dev"
          icon={<MdAlternateEmail />}
        />
        <IconLink
          href="https://github.com/BeLeap"
          icon={<FaGithub />}
        />
        <IconLink
          href="https://twitter.com/beleap_"
          icon={<FaTwitter />}
        />
      </div>
    </header>
  )
}
