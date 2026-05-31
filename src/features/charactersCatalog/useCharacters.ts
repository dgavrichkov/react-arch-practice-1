import { useMemo, useState } from "react";
import type { CharacterAPIResponse } from "@/entities/character";
import type { CharacterRepository } from "@/entities/character/repository/character.port";
import { useAsync, useDebounceValue } from "@siberiacancode/reactuse";

export function useCharacters(repository: CharacterRepository) {
  const [query, setQuery] = useState("");
  const debouncedQueryString = useDebounceValue(query, 300);

  const { data, isLoading, error } = useAsync<CharacterAPIResponse>(
    () => repository.getCharactersByName(debouncedQueryString),
    [debouncedQueryString],
  );

  return useMemo(
    () => ({
      query,
      setQuery,
      isLoading,
      items: data?.results ?? [],
      error,
    }),
    [query, setQuery, isLoading, data, error],
  );
}
