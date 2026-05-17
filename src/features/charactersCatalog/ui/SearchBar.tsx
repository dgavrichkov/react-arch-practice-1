import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSearch?: () => void;
  loading?: boolean;
}

export const SearchBar = ({ value, onChange, onSearch, loading }: Props) => {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Find character by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSearch) onSearch();
        }}
      />
      {onSearch && (
        <Button onClick={onSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      )}
    </div>
  );
};
