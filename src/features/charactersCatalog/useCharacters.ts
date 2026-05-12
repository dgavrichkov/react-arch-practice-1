import { useCallback, useEffect, useMemo, useState } from "react";
import type { Character, CharacterAPIResponse } from "@/entities/character";

const ENDPOINT = "https://rickandmortyapi.com/api/character";

export function useCharacters() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchByName = useCallback(async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${ENDPOINT}/?name=${encodeURIComponent(name)}`);
      if (!res.ok) {
        if (res.status === 404) {
          setItems([]);
          setError(null);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as CharacterAPIResponse;
      setItems(data.results ?? []);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e?.message ?? "Network error");
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

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
