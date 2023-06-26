import showdown from "showdown";

export const showdownHeadingAnchor = () => {
  return [
    {
      type: "output",
      filter: (text: string) => {
        const left = "<h\\d\\b[^>]*>";
        const right = "</h\\d.*>";
        const flags = "g";

        const replacement = (
          _wholeMatch: string,
          match: string,
          left: string,
          right: string,
        ) => {
          const ids = left.match(/id="(.*)"/);

          let newHeadingTag = left;
          if (ids != null) {
            // NOTE: only single id supported
            const id = ids[1];
            newHeadingTag +=
              `<a href="#${id}" style="margin-right: 0.5rem; color: #862633; text-decoration: none;">&gt;</a>`;
          }

          return newHeadingTag + match + right;
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
