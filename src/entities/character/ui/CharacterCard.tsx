import type { Character } from "@/entities/character";
import { Card, CardTitle, CardContent } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

interface Props {
  character: Character;
  action: ReactNode;
}

export const CharacterCard = ({ character, action }: Props) => {
  return (
    <Card
      className={cn(
        "overflow-hidden relative rounded-2xl shadow-md transition hover:shadow-lg p-0",
      )}
    >
      <div className="relative w-full h-48">
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
          className={cn("w-full h-full object-cover")}
        />
        {action}
      </div>

      <CardContent className={cn("p-4")}>
        <CardTitle className={cn("mb-1 text-lg")}>{character.name}</CardTitle>
        <div className={cn("text-sm text-muted-foreground")}>
          {character.species} • {character.status}
        </div>
      </CardContent>
    </Card>
  );
};
