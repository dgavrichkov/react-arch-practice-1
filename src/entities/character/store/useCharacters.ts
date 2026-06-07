import { useState } from "react";
import type { CharacterAPIResponse, Character } from "@/entities/character";
import { useAsync, useDebounceValue } from "@siberiacancode/reactuse";
import type { CharacterService } from '@/entities/character/services/CharacterService';
import type { CharactersContextValue } from '@/entities/character/store/characters.context';

export function useCharacters(characterService: CharacterService): CharactersContextValue {
  // че-то типа инвалидации...
  const [refreshKey, setRefreshKey] = useState(0);
  const [characterNameQuery, setCharacterNameQuery] = useState("");
  const debouncedQueryString = useDebounceValue(characterNameQuery, 300);

  const { data: charactersData, isLoading: isCharactersLoading, error: charactersError } = useAsync<CharacterAPIResponse>(
    () => characterService.getCharactersByName(debouncedQueryString),
    [debouncedQueryString],
  );

  const { data: favoritesData } = useAsync<Record<number, Character>>(
    () => characterService.getFavorites(),
    [characterService, refreshKey],
  );

  const isFavorite = (id: number) => Boolean(favoritesData?.[id]);

  const toggleFavorite = async (character: Character) => {
    await characterService.toggleFavorite(character);
    setRefreshKey((key) => key + 1);
  };

  const clearFavorites = async () => {
    await characterService.clearFavorites();
    setRefreshKey((key) => key + 1);
  };

  const favoritesCharacters = Object.values(favoritesData || {});

  return {
    characters: charactersData?.results ?? [],
    favoritesCharacters,
    characterNameQuery,
    setCharacterNameQuery,
    isCharactersLoading,
    charactersError,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  }
}
