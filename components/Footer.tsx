import IconBrandGitHub from "@icon/brand-github.tsx";
import IconBrandMastodon from "@icon/brand-mastodon.tsx";
import IconCopyright from "@icon/copyright.tsx";

const Footer = () => {
  return (
    <div class="fixed bottom-0 left-0 w-full flex items-center justify-center">
      <div class="max-w-4xl w-full flex items-center justify-between p-4 bg-white">
        <div class="flex gap-2">
          {[
            { url: "https://github.com/BeLeap", label: <IconBrandGitHub /> },
            {
              url: "https://social.silicon.moe/@beleap",
              label: <IconBrandMastodon />,
            },
          ].map((it) => (
            <a class="text-gray-400 hover:text-black" href={it.url}>
              {it.label}
            </a>
          ))}
        </div>
        <div class="flex gap-1 text-lg font-medium items-center">
          <IconCopyright />
          BeLeap
        </div>
      </div>
    </div>
  );
};
export default Footer;
