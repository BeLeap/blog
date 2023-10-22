const Header = () => {
  return (
    <header class="p-4 flex items-center justify-between">
      <div class="flex gap-2 items-center">
        <img
          src="/profile.png"
          class="w-16"
        />
        <h1 class="font-black text-4xl">
          BeLeap Blog
        </h1>
      </div>
      <nav class="flex gap-4">
        {[
          ["Home", "/"],
          ["About", "/about"],
        ].map((it) => (
          <a
            href={it[1]}
            class="text-gray-400 font-bold text-xl hover:text-black"
          >
            {it[0]}
          </a>
        ))}
      </nav>
    </header>
  );
};
export default Header;
