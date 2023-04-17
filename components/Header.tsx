import Image from "next/image"
import { FaGithub, FaTwitter } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import IconLink from "./IconLink"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex flex-col items-center m-5 mt-10">
      <Image
        className="rounded-full"
        alt="Profile Image"
        width="100" height="100"
        src="/profile.png"
      />
      <ul
        className="m-5 list-disc text-lg"
      >
        <li>
          DevOps Engineer at <Link href="https://riiid.com">Riiid</Link>
        </li>
        <li>
          Loves <Link href="https://neovim.io">Neovim</Link>, <Link href="https://www.rust-lang.org/">Rust</Link></li>
      </ul>
      <div className="flex">
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
