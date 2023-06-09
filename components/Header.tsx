import { css } from "@emotion/css";

const headerCss = {
  self: css`
          display: flex;
          margin-bottom: 2.5rem;
          padding: 0.5rem;
          align-items: center;
        `,
  left: css`
          display: grid;
          grid-template-rows: repeat(4, minmax(0, 1fr));
          grid-auto-flow: column;
          max-height: 12rem;
          padding: 1rem;
          gap: 1rem;

          @media (min-width: 640px) {
            grid-template-rows: repeat(3, minmax(0, 1fr));
          }
        `,
  profile: css`
            width: 2rem;
            height: 2rem;
            order: -9999;

            @media (min-width: 640px) {
              width: 9rem;
              height: 9rem;
              order: 9999;
            }
          `,
  right: css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 1rem;
          padding: 1rem;

          border-left: solid;
          border-left-width: 1px;
          border-left-color: gray;
        `,
  name: css`
            font-size: 2.25rem;
            line-height: 2.5rem;
            font-weight: 700;
          `,
  description: css`
                font-size: 1.25rem;
                line-height: 1.75rem;
                white-space: break-spaces;
              `,
};

const Header = () => {
  return (
    <header
      className={headerCss.self}
    >
      <address
        className={headerCss.left}
      >
        <a href="https://github.com/BeLeap">
          Github
        </a>
        <a rel="me" href="https://social.silicon.moe/@beleap">
          Mastodon
        </a>
        <a href="mailto:beleap@beleap.dev">
          Mail
        </a>
        <img
          src="/assets/profile.png"
          alt="profile picture"
          width={100}
          height={100}
          className={headerCss.profile}
        />
      </address>
      <section
        className={headerCss.right}
      >
        <h1
          className={headerCss.name}
        >
          BeLeap
        </h1>
        <p
          className={headerCss.description}
        >
          DevOps engineer by day,{"\n"}
          Rust enthusiast by night.{"\n"}
          Sticks to Neovim.
        </p>
      </section>
    </header>
  );
};
export default Header;
