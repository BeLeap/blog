import { SiGithub, SiProtonmail, SiTwitter } from "react-icons/si";
import * as mocha from "../../consts/mocha.ts";

const Header = () => {
  return (
    <div className="flex gap-4 mb-20 p-2">
      <div className="flex flex-col justify-around">
        <a href="https://github.com/BeLeap">
          <SiGithub
            size={35}
            overflow={"visible"}
            className={`hover:text-[${mocha.Overlay0}]`}
          />
        </a>
        <a href="https://twitter.com/beleap_">
          <SiTwitter
            size={35}
            overflow={"visible"}
            className={`hover:text-[${mocha.Overlay0}]`}
          />
        </a>
        <a href="mailto:beleap@beleap.dev">
          <SiProtonmail
            size={35}
            overflow={"visible"}
            className={`hover:text-[${mocha.Overlay0}]`}
          />
        </a>
      </div>
      <div className="flex flex-col gap-4 justify-around pr-4">
        <div className="text-4xl font-bold text-white">BeLeap</div>
        <p className="text-xl whitespace-break-spaces">
          DevOps engineer by day,{"\n"}
          Rust enthusiast by night.{"\n"}
          Sticks to Neovim.
        </p>
      </div>
      <img
        src="/profile.png"
        alt="profile picture"
        className="rounded-lg w-36 h-36"
      />
    </div>
  );
};
export default Header;
