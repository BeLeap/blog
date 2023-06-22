import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.container}>
      <address className={styles.left}>
        <a href="https://github.com/BeLeap">
          Github
        </a>
        <a href="https://twitter.com/beleap_">
          Twitter
        </a>
        <a href="mailto:beleap@beleap.dev">
          Mail
        </a>
        <Image
          src="/profile.png"
          alt="profile picture"
          width={100}
          height={100}
          className={styles.profile}
        />
      </address>
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
    </header>
  );
};
export default Header;
