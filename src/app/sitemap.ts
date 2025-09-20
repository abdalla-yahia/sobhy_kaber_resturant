import { MetadataRoute } from "next";

const baseUrl = "https://sobhy-kaber.vercel.app";

const languages = ["en", "ar", "fr", "sp", "it", "zh"];

function generateAlternates(path: string) {
  const languagesMap: Record<string, string> = {};
  languages.forEach((lang) => {
    languagesMap[lang] = `${baseUrl}/${lang}${path}`;
  });
  return languagesMap;
}

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages = [""].flatMap((path) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: {
        languages: generateAlternates(path),
      },
    }))
  );

  const extraPages = ["menu", "contact", "about","meals"].flatMap((path) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: generateAlternates(`/${path}`),
      },
    }))
  );

  return [...staticPages, ...extraPages];
}
