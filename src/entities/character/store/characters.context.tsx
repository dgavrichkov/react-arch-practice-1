import type { ReactNode } from "react";
import { createStrictContext } from "@/shared/lib/helpers/createStrictContext";
import { usePropsGroup } from "@/shared/lib/hooks/usePropsGroup";
import { useStrictContext } from "@/shared/lib/hooks/useStrictContext";
import type { Character } from "@/entities/character/character.interface";
import type { CharacterService } from "@/entities/character/services/CharacterService";
import { useCharacters } from "@/entities/character/store/useCharacters";

export type CharactersContextValue = {
  characters: Character[] | undefined;
  favoritesCharacters: Character[];
  characterNameQuery: string;
  setCharacterNameQuery: (value: string) => void;
  isCharactersLoading: boolean;
  charactersError: Error | undefined;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (character: Character) => Promise<void>;
  clearFavorites: () => Promise<void>;
};

const CharactersCtx = createStrictContext<CharactersContextValue>();
export const useCharactersCtx = () => useStrictContext(CharactersCtx);

type CharacterContextDeps = {
  characterService: CharacterService;
};

export const createCharactersContextProvider = ({
  characterService,
}: CharacterContextDeps) => {
  const CharactersProvider = ({ children }: { children: ReactNode }) => {
    const charactersValue = useCharacters(characterService);

    const value = usePropsGroup(charactersValue);

    return (
      <CharactersCtx.Provider value={value}>{children}</CharactersCtx.Provider>
    );
  };

  return CharactersProvider;
};
