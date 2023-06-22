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
      <section className={styles.right}>
        <h1 className={styles.name}>
          BeLeap
        </h1>
        <p className={styles.description}>
          DevOps engineer by day,{"\n"}
          Rust enthusiast by night.{"\n"}
          Sticks to Neovim.
        </p>
      </section>
    </header>
  );
};
export default Header;
