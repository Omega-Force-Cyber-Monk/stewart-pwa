const DEFAULT_PUBLIC_DOMAIN =
  import.meta.env.VITE_PUBLIC_BUSINESS_DOMAIN || "quittheapp.com";

function isLocalDevHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".localhost")
  );
}

/**
 * Personalized rider website URL for both environments:
 * - Local/dev: http(s)://current-origin/site/{slug}
 * - Production: https://{slug}.{publicDomain}
 */
export function getPersonalizedSiteUrl(
  slug: string,
  options?: {
    hostname?: string;
    origin?: string;
    publicBusinessDomain?: string;
  },
) {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return "";

  const hostname =
    options?.hostname ??
    (typeof window !== "undefined" ? window.location.hostname : "");
  const origin =
    options?.origin ??
    (typeof window !== "undefined" ? window.location.origin : "");
  const publicDomain = (
    options?.publicBusinessDomain ?? DEFAULT_PUBLIC_DOMAIN
  )
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

  if (isLocalDevHost(hostname) && origin) {
    return `${origin.replace(/\/$/, "")}/site/${normalizedSlug}`;
  }

  return `https://${normalizedSlug}.${publicDomain}`;
}
