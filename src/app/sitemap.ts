const staticRouteArray = [
  "",
  "/series",
  "/movies",
  "/search",
  "/terms-and-conditions",
];

export default async function sitemap() {
  const staticRoutes = staticRouteArray.map((item) => ({
    url: `#${process.env.SITE_BASE_URL as string}${item}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes];
}
