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
          { url: "/", label: "Home" },
          { url: "/about", label: "About" },
        ].map((it) => (
          <a
            href={it.url}
            class="text-gray-400 font-bold text-xl hover:text-black"
          >
            {it.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
export default Header;
