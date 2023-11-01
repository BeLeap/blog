const Header = () => {
  return (
    <header class="p-4 grid grid-rows-2 grid-cols-4 rounded-b-lg mb-4 shadow-md w-full">
      <div class="flex gap-2 items-center col-start-1 col-span-4 row-start-1 row-span-1 sm:col-start-1 sm:col-span-3 sm:row-start-1 sm:row-span-2">
        <img
          src="/profile.png"
          class="w-10 rounded-full"
        />
        <h1 class="ml-2 font-black text-4xl">
          BeLeap
        </h1>
      </div>
      <nav class="flex gap-4 justify-end items-center col-start-1 col-span-4 row-start-2 row-span-1 sm:col-start-4 sm:col-span-1 sm:row-start-1 sm:row-span-2">
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
