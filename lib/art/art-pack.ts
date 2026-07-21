import type { CharacterExpression, CharacterId } from "@/components/illustrations/CharacterPortrait";
import type { WorldSceneId } from "@/components/illustrations/WorldScene";

export type WorldArt = {
  id: WorldSceneId;
  image?: string;
  focalPoint?: string;
  embeddedGuardian?: boolean;
  tone: "warm" | "cool" | "mystic";
};

export const WORLD_ART: Record<WorldSceneId, WorldArt> = {
  forest: { id: "forest", focalPoint: "50% 50%", tone: "warm" },
  city: { id: "city", image: "/art/worlds/city-horizons.webp", focalPoint: "50% 48%", embeddedGuardian: true, tone: "mystic" },
  valley: { id: "valley", focalPoint: "50% 50%", tone: "warm" },
  mountain: { id: "mountain", focalPoint: "50% 46%", tone: "cool" },
  ocean: { id: "ocean", focalPoint: "50% 50%", tone: "cool" },
  desert: { id: "desert", focalPoint: "50% 50%", tone: "warm" },
  stars: { id: "stars", focalPoint: "50% 50%", tone: "mystic" },
};

export type CharacterArt = {
  id: CharacterId;
  defaultExpression: CharacterExpression;
  name: string;
};

export const CHARACTER_ART: Record<CharacterId, CharacterArt> = {
  nova: { id: "nova", name: "Nova", defaultExpression: "happy" },
  oscar: { id: "oscar", name: "Oscar", defaultExpression: "curious" },
  luna: { id: "luna", name: "Luna", defaultExpression: "proud" },
  leo: { id: "leo", name: "Léo", defaultExpression: "happy" },
  milo: { id: "milo", name: "Milo", defaultExpression: "curious" },
  sia: { id: "sia", name: "Sia", defaultExpression: "proud" },
  nox: { id: "nox", name: "Nox", defaultExpression: "focused" },
  tiko: { id: "tiko", name: "Tiko", defaultExpression: "curious" },
  maya: { id: "maya", name: "Maya", defaultExpression: "proud" },
  nila: { id: "nila", name: "Nila", defaultExpression: "happy" },
  siro: { id: "siro", name: "Siro", defaultExpression: "focused" },
};
