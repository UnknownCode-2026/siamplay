import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SiamPlay - สยามเพลย์",
    short_name: "SiamPlay",
    description: "มินิเกมออนไลน์ เล่นฟรี 100% ไม่ต้องสมัครสมาชิก",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8fc",
    theme_color: "#0b1b3b",
    lang: "th",
  };
}