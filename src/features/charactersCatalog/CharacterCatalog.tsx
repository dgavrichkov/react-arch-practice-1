import { CharacterCard } from "@/entities/character";
import { CharacterList } from "@/entities/character/ui/CharacterList";
import { SearchBar } from "@/features/charactersCatalog";
import { useCharactersCatalogDI } from "@/features/charactersCatalog/DIContext";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Star } from "lucide-react";

export const CharacterCatalog = () => {
  const {
    characterNameQuery,
    setCharacterNameQuery,
    isCharactersLoading,
    characters,
    charactersError,
    isFavorite,
    toggleFavorite,
  } = useCharactersCatalogDI();

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchBar
          value={characterNameQuery}
          onChange={setCharacterNameQuery}
          loading={isCharactersLoading}
        />
      </div>

      {charactersError && (
        <div className="text-red-600">Error: {charactersError.message}</div>
      )}

      <CharacterList
        items={characters || []}
        renderCharacter={(character) => (
          <CharacterCard
            key={character.id}
            character={character}
            action={
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  "absolute top-2 right-2 rounded-full shadow bg-white/80 hover:bg-white",
                )}
                onClick={() => toggleFavorite(character)}
                title={
                  isFavorite(character.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    isFavorite(character.id) && "fill-red-500 text-red-500",
                  )}
                />
              </Button>
            }
          />
        )}
      />
    </div>
  );
};
