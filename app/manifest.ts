import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "yinyan.news",
    short_name: "yinyan",
    description:
      "for every hard headline, an equal-weight one that's hopeful.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#f5ead0",
    theme_color: "#0a0908",
    icons: [
      { src: "/icon", sizes: "96x96", type: "image/png" },
    ],
  };
}
