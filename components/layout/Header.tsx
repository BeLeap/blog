import { SiGithub, SiProtonmail, SiTwitter } from "react-icons/si";

const Header = () => {
  return (
    <div className="flex gap-4 mb-10 p-2">
      <div className="flex flex-col justify-between p-2">
        <a href="https://github.com/BeLeap">
          <SiGithub
            size={20}
            overflow={"visible"}
            className={`hover:text-gray-500`}
          />
        </a>
        <a href="https://twitter.com/beleap_">
          <SiTwitter
            size={20}
            overflow={"visible"}
            className={`hover:text-gray-500`}
          />
        </a>
        <a href="mailto:beleap@beleap.dev">
          <SiProtonmail
            size={20}
            overflow={"visible"}
            className={`hover:text-gray-500`}
          />
        </a>
      </div>
      <div className="flex flex-col gap-4 justify-around pr-4">
        <div className="text-4xl font-bold">BeLeap</div>
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
