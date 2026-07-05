import type { DriverProfile } from "../features/appFlow/appFlowTypes";

const fallbackSlug = "yourname";

export function createDriverSlug(profile: DriverProfile | null | undefined) {
  const source = profile?.preferredDomain || profile?.fullName || fallbackSlug;
  const withoutDomain = source.split(".")[0] || source;
  const slug = withoutDomain
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallbackSlug;
}

export function getDriverSitePath(profile: DriverProfile | null | undefined) {
  return `/site/${createDriverSlug(profile)}`;
}

export function getDriverDisplayDomain(profile: DriverProfile | null | undefined) {
  return `${createDriverSlug(profile)}.ourdomain.com`;
}
