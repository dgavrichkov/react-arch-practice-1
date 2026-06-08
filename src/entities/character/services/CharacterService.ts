import type { Character, CharacterAPIResponse } from '@/entities/character';
import type { CharacterRepository } from '@/entities/character/repository/character.port';
import type { CharacterFavoritesRepository } from '@/entities/character/repository/characterFavorites.port';

export class CharacterService {
  private readonly characterRepo: CharacterRepository
  private readonly favoritesRepo: CharacterFavoritesRepository

  constructor(characterRepo: CharacterRepository, favoritesRepo: CharacterFavoritesRepository) {
    this.characterRepo = characterRepo;
    this.favoritesRepo = favoritesRepo;
  }

  async getCharactersByName(name: string): Promise<CharacterAPIResponse> {
    return this.characterRepo.getCharactersByName(name);
  }

  async getFavorites() {
    return this.favoritesRepo.getFavorites();
  }

  async clearFavorites() {
    return this.favoritesRepo.clearFavorites();
  }

  async toggleFavorite(character: Character) {
    return this.favoritesRepo.toggleFavorite(character);
  }
}
