import type { Character } from "@/entities/character";
import { createStrictContext } from "@/shared/lib/helpers/createStrictContext";
import { useStrictContext } from "@/shared/lib/hooks/useStrictContext";

export type CharactersCatalogDeps = {
  characters: Character[] | undefined;
  // favoritesCharacters: Character[];
  characterNameQuery: string;
  setCharacterNameQuery: (value: string) => void;
  isCharactersLoading: boolean;
  charactersError: Error | undefined;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (character: Character) => Promise<void>;
  // clearFavorites: () => Promise<void>;
};

export const charactersCatalogInjector =
  createStrictContext<CharactersCatalogDeps>();

export const useCharactersCatalogDI = () =>
  useStrictContext(charactersCatalogInjector);
