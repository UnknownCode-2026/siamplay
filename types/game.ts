export type GameCategory = "เล่นเร็ว" | "ความเร็ว" | "ฝึกสมอง" | "เกมปริศนา" | "คลาสสิก";

export type GameDefinition = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: GameCategory;
  difficulty: "ง่าย" | "กลาง" | "ยาก";
  route: string;
  status: "active" | "coming-soon";
  featured?: boolean;
  isNew?: boolean;
  releaseDate?: string;
  scoreType?: "time-accuracy" | "score" | "time" | "wins";
  accent?: "blue" | "gold" | "cyan" | "violet";
  keywords?: string[];
};
