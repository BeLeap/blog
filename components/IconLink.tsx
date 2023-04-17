import palette from "@catppuccin/palette"
import Link from "next/link"
import { ReactNode } from "react"

type IconLinkProps = {
  href: string,
  icon: ReactNode,
}

export default function IconLink({ href, icon }: IconLinkProps) {
  return (
    <Link
      style={{
        display: "flex",
        borderRadius: 9999,
        padding: "0.5rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        backgroundColor: palette.variants.mocha.surface2.hex,
      }}
      href={href}
    >
      {icon}
    </Link>
  )
}
