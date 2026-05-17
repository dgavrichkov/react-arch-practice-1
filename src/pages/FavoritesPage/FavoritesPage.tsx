import { Star } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { CharacterFavoritesLocalStorageRepository } from "@/entities/character";
import { CharacterCard } from "@/entities/character";
import { useFavorites } from "@/features/favoriteCharacter/useFavorites";
import { CharacterList } from "@/widgets/CharacterList/CharacterList";

const FavoritesApi = new CharacterFavoritesLocalStorageRepository();

export function FavoritesPage() {
  const { list, isFavorite, toggleFavorite, clearFavorites } =
    useFavorites(FavoritesApi);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Favorites</h2>
        {list.length > 0 && (
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
        items={list}
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
