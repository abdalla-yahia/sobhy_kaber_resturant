import { MetadataRoute } from "next";

const baseUrl = "https://sobhy-kaber.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admins", "/dashboard"], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
