import showdown from "showdown";
import { lowlight } from "https://esm.sh/lowlight@2.9.0";
import { toHtml } from "https://esm.sh/hast-util-to-html@8.0.4";
import { htmlUnecode } from "@/lib/showdown/util.ts";

export const showdownLowlight = () => {
  return [
    {
      type: "output",
      filter: (text: string) => {
        const left = "<pre><code\\b[^>]*>";
        const right = "</code></pre>";
        const flags = "g";

        const replacement = (
          _wholeMatch: string,
          match: string,
          left: string,
          right: string,
        ) => {
          const unecodedMatch = htmlUnecode(match);
          return left + toHtml(lowlight.highlightAuto(unecodedMatch)) + right;
        };

        return showdown.helper.replaceRecursiveRegExp(
          text,
          replacement,
          left,
          right,
          flags,
        );
      },
    },
  ];
};
