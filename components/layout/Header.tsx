import { SiGithub, SiProtonmail, SiTwitter } from "react-icons/si";

const Header = () => {
  return (
    <div className="flex mb-10 p-2">
      <div className="grid grid-rows-4 sm:grid-rows-3 grid-flow-col max-h-48 p-4 gap-4 border-r">
        <a href="https://github.com/BeLeap">
          <SiGithub
            size={32}
            overflow={"visible"}
            className={`hover:text-gray-500`}
          />
        </a>
        <a href="https://twitter.com/beleap_">
          <SiTwitter
            size={32}
            overflow={"visible"}
            className={`hover:text-gray-500`}
          />
        </a>
        <a href="mailto:beleap@beleap.dev">
          <SiProtonmail
            size={32}
            overflow={"visible"}
            className={`hover:text-gray-500`}
          />
        </a>
        <img
          src="/profile.png"
          alt="profile picture"
          className="w-8 h-8 order-first sm:h-36 sm:w-36 sm:order-last"
        />
      </div>
      <div className="flex flex-col gap-4 justify-start p-4">
        <div className="text-4xl font-bold">BeLeap</div>
        <p className="text-xl whitespace-break-spaces">
          DevOps engineer by day,{"\n"}
          Rust enthusiast by night.{"\n"}
          Sticks to Neovim.
        </p>
      </div>
    </div>
  );
};
export default Header;
