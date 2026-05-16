import type { Character } from "../character.interface";
import type { CharacterFavoritesRepository } from "./characterFavorites.port";

const LS_KEY = "favorites_characters_v1";

export class CharacterFavoritesLocalStorageRepository implements CharacterFavoritesRepository {
  async getFavorites(): Promise<Record<number, Character>> {
    try {
      const raw = localStorage.getItem(LS_KEY);

      if (raw) {
        return Promise.resolve(JSON.parse(raw));
      }

      return Promise.resolve({});
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? `Failed to load favorites, ${e.message}`
          : "Failed to load favorites";
      throw new Error(message);
    }
  }
  async saveFavorites(
    favorites: Record<number, Character>,
  ): Promise<Record<number, Character>> {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(favorites));

      return Promise.resolve(favorites);
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? `Failed to save favorites, ${e.message}`
          : "Failed to save favorites";

      throw new Error(message);
    }
  }
}
