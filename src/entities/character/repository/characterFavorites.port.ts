import type { Character } from "@/entities/character";

// пока что порт сделан под текущую реализацию с localStorage, ради упрощения рефакторинга;
export interface CharacterFavoritesRepository {
  getFavorites(): Promise<Record<number, Character>>;
  saveFavorites(
    favorites: Record<number, Character>,
  ): Promise<Record<number, Character>>;
}
