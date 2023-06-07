import { css } from "@emotion/css";
import { SiGithub, SiProtonmail, SiTwitter } from "react-icons/si";

const Header = () => {
  return (
    <div
      class={css`
        display: flex;
        margin-bottom: 2.5rem;
        padding: 0.5rem;
      `}
    >
      <div
        style={{
          display: "grid",
        }}
        class={css`
          display: grid;
          grid-template-rows: repeat(4, minmax(0, 1fr));
          grid-auto-flow: column;
          max-height: 12rem;
          padding: 1rem;
          gap: 1rem;

          @media (min-width: 640px) {
            grid-template-rows: repeat(3, minmax(0, 1fr));
          }
        `}
      >
        <a href="https://github.com/BeLeap">
          <SiGithub
            size={32}
            overflow={"visible"}
            class={css`
              color: black;

              &:hover {
                color: gray;
              }
            `}
          />
        </a>
        <a href="https://twitter.com/beleap_">
          <SiTwitter
            size={32}
            overflow={"visible"}
            class={css`
              color: black;

              &:hover {
                color: gray;
              }
            `}
          />
        </a>
        <a href="mailto:beleap@beleap.dev">
          <SiProtonmail
            size={32}
            overflow={"visible"}
            class={css`
              color: black;

              &:hover {
                color: gray;
              }
            `}
          />
        </a>
        <img
          src="/profile.png"
          alt="profile picture"
          class={css`
            width: 2rem;
            height: 2rem;
            order: -9999;

            @media (min-width: 640px) {
              width: 9rem;
              height: 9rem;
              order: 9999;
            }
          `}
        />
      </div>
      <div
        class={css`
          display: flex;
          flex-direction: column;
          justify-content: start;
          gap: 1rem;
          padding: 1rem;

          border-left: solid;
          border-left-width: 1px;
          border-left-color: gray;
        `}
      >
        <div
          class={css`
            font-size: 2.25rem;
            line-height: 2.5rem;
            font-weight: 700;
          `}
        >
          BeLeap
        </div>
        <p
          class={css`
            font-size: 1.25rem;
            line-height: 1.75rem;
            white-space: break-spaces;
          `}
        >
          DevOps engineer by day,{"\n"}
          Rust enthusiast by night.{"\n"}
          Sticks to Neovim.
        </p>
      </div>
    </div>
  );
};
export default Header;
