import type { CharacterRepository } from "./character.port";
import type { CharacterAPIResponse } from "../character.interface";
import { httpClient } from "@/shared/api/httpClient";

export class CharacterApiRepository implements CharacterRepository {
  async getCharactersByName(name: string): Promise<CharacterAPIResponse> {
    const response = await httpClient.get(
      `character/?name=${encodeURIComponent(name)}`,
    );

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
    }

    return response.data as CharacterAPIResponse;
  }
}
