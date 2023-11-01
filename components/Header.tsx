const Header = () => {
  return (
    <header class="p-4 flex items-center justify-between flex-wrap flex-row rounded-b-lg mb-4 shadow-md w-full">
      <div class="flex gap-2 items-center mr-8">
        <img
          src="/profile.png"
          class="w-10 rounded-full"
        />
        <h1 class="ml-2 font-black text-4xl">
          BeLeap
        </h1>
      </div>
      <nav class="flex gap-4 justify-end">
        {[
          { url: "/", label: "Articles" },
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
