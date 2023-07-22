import { css } from "@emotion/css";

const Header = () => {
  return (
    <>
      <style>{`
        .Header__container {
          display: flex;
          margin-bottom: 2.5rem;
          padding: 0.5rem;
          align-items: center;
        }

        .Header__left {
          display: grid;
          grid-template-rows: repeat(4, minmax(0, 1fr));
          grid-auto-flow: column;
          max-height: 12rem;
          padding: 1rem;
          gap: 1rem;
        }

        .Header__profile {
          width: 2rem;
          height: 2rem;
          order: -9999;
        }

        .Header__right {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 1rem;
          padding: 1rem;

          border-left: solid;
          border-left-width: 1px;
          border-left-color: gray;
        }

        .Header__name {
          font-size: 2.25rem;
          line-height: 2.5rem;
          font-weight: 700;
        }

        .Header__description {
          font-size: 1.25rem;
          line-height: 1.75rem;
          white-space: break-spaces;
        }

        @media screen and (min-width: 640px) {
          .Header__left {
            grid-template-rows: repeat(3, minmax(0, 1fr));
          }

          .Header__profile {
            width: 9rem;
            height: 9rem;
            order: 9999;
          }
        }
      `}</style>
      <header className="Header__container">
        <address className="Header__left">
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
            className="Header__profile"
          />
        </address>
        <section className="Header__right">
          <h1 className="Header__name">
            BeLeap
          </h1>
          <p className="Header__description">
            DevOps engineer by day,{"\n"}
            Rust enthusiast by night.{"\n"}
            Sticks to Neovim.
          </p>
        </section>
      </header>
    </>
  );
};
export default Header;
