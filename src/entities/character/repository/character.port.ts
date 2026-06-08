import type { CharacterAPIResponse } from "../character.interface";

/** abstract repository */
export interface CharacterRepository {
  getCharactersByName(name: string): Promise<CharacterAPIResponse>;
}
