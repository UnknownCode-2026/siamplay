import type { GameDefinition } from "@/types/game";

export const games: GameDefinition[] = [
  {
    id: "perfect-10",
    slug: "perfect-10",
    name: "หยุดเวลา 10.000 วิ",
    shortName: "Perfect 10",
    description: "กดเริ่มแล้วพยายามหยุดเวลาให้ใกล้ 10.000 วินาทีที่สุด",
    category: "เล่นเร็ว",
    difficulty: "ง่าย",
    route: "/games/perfect-10",
    status: "active",
    featured: true,
    isNew: true,
    releaseDate: "2026-09-22",
    scoreType: "time-accuracy",
    accent: "blue",
    keywords: ["เวลา", "จับเวลา", "ความแม่นยำ", "10 วินาที"],
  },
];

export const activeGames = games.filter((game) => game.status === "active");
