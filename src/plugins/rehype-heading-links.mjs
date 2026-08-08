const headingTags = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

export function rehypeHeadingLinks() {
  return (tree) => {
    const usedIds = new Set();
    visit(tree, usedIds);
  };
}

function visit(node, usedIds) {
  if (node.type === "element" && headingTags.has(node.tagName)) {
    const id = getHeadingId(node, usedIds);
    node.properties ??= {};
    node.properties.id = id;
    node.children = [
      {
        type: "element",
        tagName: "a",
        properties: {
          href: `#${id}`,
          className: ["heading-anchor"],
          "aria-label": "Link to this heading",
        },
        children: [{ type: "text", value: "#" }],
      },
      ...(node.children ?? []),
    ];
  }

  for (const child of node.children ?? []) {
    if (child && typeof child === "object") visit(child, usedIds);
  }
}

function getHeadingId(node, usedIds) {
  const existingId = node.properties?.id;
  if (typeof existingId === "string") {
    usedIds.add(existingId);
    return existingId;
  }

  const text = getText(node).trim().toLowerCase();
  const base = text
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-") || "heading";

  let id = base;
  let suffix = 1;
  while (usedIds.has(id)) id = `${base}-${suffix++}`;
  usedIds.add(id);
  return id;
}

function getText(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(getText).join("");
}
