import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "THRIVE Initiative",
    short_name: "THRIVE",
    description:
      "Transforming Hope, Rights, Inclusion, Vision and Empowerment, a Nigerian NGO based in Abuja.",
    start_url: "/",
    display: "standalone",
    background_color: "#2E1650",
    theme_color: "#2E1650",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logo/thrive-emblem.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
