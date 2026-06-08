import { Star } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { CharacterCard } from "@/entities/character";
import { CharacterList } from "@/entities/character/ui/CharacterList";
import { useCharactersCtx } from "@/entities/character/store/characters.context";

export function FavoritesPage() {
  const { favoritesCharacters, isFavorite, toggleFavorite, clearFavorites } =
    useCharactersCtx();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Favorites</h2>
        {favoritesCharacters.length > 0 && (
          <button
            className="text-sm underline text-muted-foreground"
            onClick={clearFavorites}
            title="Clear all favorites"
          >
            Clear all
          </button>
        )}
      </div>
      <CharacterList
        items={favoritesCharacters}
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
}
