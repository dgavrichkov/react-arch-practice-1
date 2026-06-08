import { useCharactersCtx } from "@/entities/character/store/characters.context";
import { CharacterCatalog } from "@/features/charactersCatalog/CharacterCatalog";
import { charactersCatalogInjector } from "@/features/charactersCatalog/DIContext";

export function CharactersPage() {
  const {
    characterNameQuery,
    setCharacterNameQuery,
    isCharactersLoading,
    characters,
    charactersError,
    isFavorite,
    toggleFavorite,
  } = useCharactersCtx();

  const valueDeps = {
    characterNameQuery,
    setCharacterNameQuery,
    isCharactersLoading,
    characters,
    charactersError,
    isFavorite,
    toggleFavorite,
  };

  return (
    <charactersCatalogInjector.Provider value={valueDeps}>
      <CharacterCatalog />
    </charactersCatalogInjector.Provider>
  );
}
