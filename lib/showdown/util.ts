export const htmlUnecode = (text: string): string => {
  return (
    text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
  );
};
