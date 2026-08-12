const BUSINESS_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const RESERVED_BUSINESS_SUBDOMAINS = new Set([
  "www",
  "api",
  "admin",
  "app",
  "dashboard",
]);

export type BusinessHostResolution =
  | { kind: "main" }
  | { kind: "tenant"; slug: string }
  | { kind: "invalid" };

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
}

export function resolveBusinessHost(
  hostname: string,
  publicBusinessDomain: string,
): BusinessHostResolution {
  const normalizedHostname = normalizeDomain(hostname);
  const normalizedDomain = normalizeDomain(publicBusinessDomain);

  if (
    !normalizedHostname ||
    !normalizedDomain ||
    normalizedHostname === normalizedDomain ||
    normalizedHostname === "localhost" ||
    normalizedHostname === "127.0.0.1" ||
    normalizedHostname === "[::1]" ||
    normalizedHostname.endsWith(".localhost")
  ) {
    return { kind: "main" };
  }

  const suffix = `.${normalizedDomain}`;
  if (!normalizedHostname.endsWith(suffix)) {
    return { kind: "main" };
  }

  const slug = normalizedHostname.slice(0, -suffix.length);

  if (RESERVED_BUSINESS_SUBDOMAINS.has(slug)) {
    return { kind: "main" };
  }

  if (slug.includes(".") || !BUSINESS_SLUG_PATTERN.test(slug)) {
    return { kind: "invalid" };
  }

  return { kind: "tenant", slug };
}
