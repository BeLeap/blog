import showdown from "showdown";
import { lowlight } from "lowlight";
import { toHtml } from "hast-util-to-html";
import { htmlUnecode } from "./util";

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
