import { useCallback, useEffect, useMemo, useState } from "react";
import type { Character } from "@/entities/character";
import type { CharacterRepository } from "@/entities/character/repository/character.port";

// распиливаем помаленьку
export function useCharacters(repository: CharacterRepository) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchByName = useCallback(
    async (name: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await repository.getCharactersByName(name);

        setItems(data.results);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e?.message ?? "Network error");
          setItems([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [repository],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      fetchByName(query);
    }, 300);
    return () => clearTimeout(t);
  }, [query, fetchByName]);

  return useMemo(
    () => ({
      query,
      setQuery,
      loading,
      items,
      error,
      searchNow: () => fetchByName(query),
    }),
    [query, setQuery, loading, items, error, fetchByName],
  );
}
