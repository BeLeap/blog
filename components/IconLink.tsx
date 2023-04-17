import Link from "next/link"
import { ReactNode } from "react"

type IconLinkProps = {
  href: string,
  icon: ReactNode,
}

export default function IconLink({ href, icon }: IconLinkProps) {
  return (
    <Link
      className="flex items-center justify-center mx-auto"
      href={href}
    >
      <div className="rounded-full mx-2 bg-surface2 p-2">
        {icon}
      </div>
    </Link>
  )
}
