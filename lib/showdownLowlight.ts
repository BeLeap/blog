import showdown from "showdown";
import { lowlight } from "lowlight";
import { toHtml } from "hast-util-to-html";

const htmlUnecode = (text: string): string => {
  return (
    text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
  );
};

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
