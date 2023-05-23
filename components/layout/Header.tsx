const Header = () => {
  return (
    <div className="flex gap-4">
      <img
        src="/profile.png"
        alt="profile picture"
        className="rounded-lg w-36 h-36"
      />
      <div className="flex flex-col gap-4 justify-around">
        <div className="text-4xl font-bold text-white">BeLeap</div>
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
