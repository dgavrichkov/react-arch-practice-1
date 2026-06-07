import type { Character } from "@/entities/character";

// пока что порт сделан под текущую реализацию с localStorage, ради упрощения рефакторинга;
export interface CharacterFavoritesRepository {
  getFavorites(): Promise<Record<number, Character>>;

  clearFavorites(): Promise<Record<number, Character>>;

  toggleFavorite(character: Character): Promise<Record<number, Character>>;
}
