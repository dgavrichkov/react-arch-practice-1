import type { Character } from "@/entities/character";
import { CharacterCard } from "./CharacterCard";

interface Props {
  items: Character[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (c: Character) => void;
}

export const CharacterList = ({
  items,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  if (!items.length)
    return <div className="text-sm text-muted-foreground mt-4">No results</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
      {items.map((c) => (
        <CharacterCard
          key={c.id}
          character={c}
          favorite={isFavorite(c.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
