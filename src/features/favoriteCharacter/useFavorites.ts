import { useCallback, useEffect, useState } from "react";
import type { Character } from "@/entities/character";

const LS_KEY = "favorites_characters_v1";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Record<number, Character>>(() => {
    let favorites = [];

    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) favorites = JSON.parse(raw);
    } catch (e) {
      console.error("Failed to load favorites", e);
    }

    return favorites;
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id: number) => Boolean(favorites[id]),
    [favorites],
  );

  const toggleFavorite = useCallback((char: Character) => {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[char.id]) delete next[char.id];
      else next[char.id] = char;
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => setFavorites({}), []);

  const list = Object.values(favorites);

  return { favorites, list, isFavorite, toggleFavorite, clearFavorites };
}
