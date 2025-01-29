"use client";

import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const debouncedSearch = useDebouncedCallback((term) => {
    onSearch(term);
  }, 300);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      debouncedSearch(newValue);
    },
    [debouncedSearch],
  );

  return (
    <div className="max-w-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search posts..."
        value={value}
        onChange={handleChange}
        className="pl-8"
      />
    </div>
  );
}
