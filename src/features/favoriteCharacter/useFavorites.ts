import { useCallback, useEffect, useState } from "react";
import type { Character } from "@/entities/character";
import type { CharacterFavoritesRepository } from "@/entities/character/repository/characterFavorites.port";

export function useFavorites(repository: CharacterFavoritesRepository) {
  const [favorites, setFavorites] = useState<Record<number, Character> | null>(
    null,
  );

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await repository.getFavorites();

      setFavorites(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }, [repository]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    if (favorites === null) return;

    try {
      repository.saveFavorites(favorites);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }, [favorites, repository]);

  const isFavorite = useCallback(
    (id: number) => Boolean(favorites?.[id]),
    [favorites],
  );

  const toggleFavorite = useCallback((char: Character) => {
    setFavorites((currentState) => {
      const next = { ...(currentState ?? {}) };

      if (next[char.id]) {
        delete next[char.id];
      } else {
        next[char.id] = char;
      }

      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => setFavorites({}), []);

  const list = Object.values(favorites ?? {});

  return {
    favorites,
    list,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    fetchFavorites,
  };
}
