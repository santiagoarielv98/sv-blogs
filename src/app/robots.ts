import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tags", "/tag/*"],
        disallow: [
          "/dashboard",
          "/login",
          "/register",
          "/api/*",
          "/*/edit",
          "/new",
          "/404/*",
          "/403/*",
          "/profile",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
