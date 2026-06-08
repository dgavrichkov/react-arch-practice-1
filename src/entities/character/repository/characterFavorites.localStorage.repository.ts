import type { Character } from "../character.interface";
import type { CharacterFavoritesRepository } from "./characterFavorites.port";

const LS_KEY = "favorites_characters_v1";

export class CharacterFavoritesLocalStorageRepository
  implements CharacterFavoritesRepository
{
  private favorites: Record<number, Character> | null = null;

  async getFavorites(): Promise<Record<number, Character>> {
    try {
      return this.cloneFavorites(this.loadFavorites());
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? `Failed to load favorites, ${e.message}`
          : "Failed to load favorites";

      throw new Error(message);
    }
  }

  async clearFavorites(): Promise<Record<number, Character>> {
    try {
      this.favorites = {};
      this.persistFavorites();

      return this.cloneFavorites(this.favorites);
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? `Failed to clear favorites, ${e.message}`
          : "Failed to clear favorites";

      throw new Error(message);
    }
  }

  async toggleFavorite(
    character: Character,
  ): Promise<Record<number, Character>> {
    try {
      const favorites = this.loadFavorites();

      if (favorites[character.id]) {
        delete favorites[character.id];
      } else {
        favorites[character.id] = character;
      }

      this.persistFavorites();

      return this.cloneFavorites(favorites);
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? `Failed to toggle favorite, ${e.message}`
          : "Failed to toggle favorite";

      throw new Error(message);
    }
  }

  private loadFavorites(): Record<number, Character> {
    if (this.favorites !== null) {
      return this.favorites;
    }

    const raw = localStorage.getItem(LS_KEY);

    if (!raw) {
      this.favorites = {};
      return this.favorites;
    }

    const parsed = JSON.parse(raw) as unknown;
    this.favorites = this.isFavoritesRecord(parsed) ? parsed : {};

    return this.favorites;
  }

  private persistFavorites(): void {
    localStorage.setItem(LS_KEY, JSON.stringify(this.favorites ?? {}));
  }

  private cloneFavorites(
    favorites: Record<number, Character>,
  ): Record<number, Character> {
    return { ...favorites };
  }

  private isFavoritesRecord(
    value: unknown,
  ): value is Record<number, Character> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}
