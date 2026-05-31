import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CharacterApiRepository, CharacterCard } from "@/entities/character";
import { CharacterFavoritesLocalStorageRepository } from "@/entities/character";
import { useCharacters } from "@/features/charactersCatalog";
import { SearchBar } from "@/features/charactersCatalog";
import { useFavorites } from "@/features/favoriteCharacter";
import { CharacterList } from "@/widgets/CharacterList";

const CharactersApi = new CharacterApiRepository();
const FavoritesApi = new CharacterFavoritesLocalStorageRepository();

export function CharactersPage() {
  const { query, setQuery, isLoading, items, error } =
    useCharacters(CharactersApi);
  const { isFavorite, toggleFavorite } = useFavorites(FavoritesApi);

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} loading={isLoading} />
      </div>

      {error && <div className="text-red-600">Error: {error.message}</div>}

      <CharacterList
        items={items}
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
