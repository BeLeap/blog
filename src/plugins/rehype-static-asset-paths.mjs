const staticPath = "/static/";

export function rehypeStaticAssetPaths({ base = "/" } = {}) {
  const basePath = normalizeBase(base);

  return (tree) => {
    visit(tree, basePath);
  };
}

function visit(node, basePath) {
  if (node.type === "element") {
    for (const property of ["src", "href"]) {
      if (typeof node.properties?.[property] === "string") {
        node.properties[property] = withBase(node.properties[property], basePath);
      }
    }

    for (const property of ["srcSet", "srcset"]) {
      if (typeof node.properties?.[property] === "string") {
        node.properties[property] = node.properties[property]
          .split(",")
          .map((candidate) => {
            const [url, ...descriptor] = candidate.trim().split(/\s+/);
            return [withBase(url, basePath), ...descriptor].join(" ");
          })
          .join(", ");
      }
    }
  }

  for (const child of node.children ?? []) {
    if (child && typeof child === "object") visit(child, basePath);
  }
}

function withBase(value, basePath) {
  return value.startsWith(staticPath) ? `${basePath}${value.slice(1)}` : value;
}

function normalizeBase(base) {
  if (!base || base === "/") return "/";
  return `/${base.replace(/^\/+|\/+$/g, "")}/`;
}
