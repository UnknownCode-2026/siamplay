export type GameCategory = "เล่นเร็ว" | "ความเร็ว" | "ฝึกสมอง" | "เกมปริศนา" | "คลาสสิก";

export type GameDefinition = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: GameCategory;
  difficulty: "ง่าย" | "กลาง" | "ยาก";
  route: string;
  status: "active" | "coming-soon";
  featured?: boolean;
  keywords?: string[];
};
