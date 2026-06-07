import type { ReactNode } from "react";
import { List } from "@/shared/ui/List";
import type { Character } from "@/entities/character";

interface Props {
  items: Character[];
  // renderProps pattern, инжектим ui вместо прямого вызова карточек
  renderCharacter: (character: Character) => ReactNode;
}

export const CharacterList = ({ items, renderCharacter }: Props) => {
  if (!items.length)
    return <div className="text-sm text-muted-foreground mt-4">No results</div>;

  return (
    <List
      data={items}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4"
      renderData={renderCharacter}
    />
  );
};
