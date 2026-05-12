import type { CharacterRepository } from "./character.port";
import type { CharacterAPIResponse } from "../character.interface";

const ENDPOINT = "https://rickandmortyapi.com/api/character";

export class CharacterApiRepository implements CharacterRepository {
  async getCharactersByName(name: string): Promise<CharacterAPIResponse> {
    const response = await fetch(
      `${ENDPOINT}/?name=${encodeURIComponent(name)}`,
    );

    if (!response.ok) {
      // репозиторий решает, что для этого эндпоинта значит 404. Здесь это "персонаж не найден", значит можно нормализовать ответ, а не бросать ошибку
      if (response.status === 404) {
        return {
          results: [],
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
        };
      } else {
        throw new Error(`Request failed: ${response.status}`);
      }
    }

    return response.json();
  }
}
