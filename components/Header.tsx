import { SiGithub, SiProtonmail, SiTwitter } from "react-icons/si";
import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <a href="https://github.com/BeLeap">
            <SiGithub
              size={32}
              overflow={"visible"}
              className={styles.icon}
            />
          </a>
          <a href="https://twitter.com/beleap_">
            <SiTwitter
              size={32}
              overflow={"visible"}
              className={styles.icon}
            />
          </a>
          <a href="mailto:beleap@beleap.dev">
            <SiProtonmail
              size={32}
              overflow={"visible"}
              className={styles.icon}
            />
          </a>
          <Image
            src="/profile.png"
            alt="profile picture"
            width={100}
            height={100}
            className={styles.profile}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.name}>
            BeLeap
          </div>
          <p className={styles.description}>
            DevOps engineer by day,{"\n"}
            Rust enthusiast by night.{"\n"}
            Sticks to Neovim.
          </p>
        </div>
      </div>
    </>
  );
};
export default Header;
