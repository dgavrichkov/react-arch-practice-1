import { useCharacters } from "@/features/charactersCatalog";
import { CharacterList } from "@/features/charactersCatalog";
import { useFavorites } from "@/features/favoriteCharacter";
import { SearchBar } from "@/features/searchCharacter";

export function CharactersPage() {
  const { query, setQuery, loading, items, error } = useCharacters();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} loading={loading} />
      </div>

      {error && <div className="text-red-600">Error: {error}</div>}

      <CharacterList
        items={items}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
