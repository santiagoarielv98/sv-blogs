import { searchTags } from "@/lib/db";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

interface TagSuggestion {
  name: string;
  slug: string;
}

export function useTagSearch() {
  const [suggestions, setSuggestions] = useState<TagSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const tags = await searchTags(query);
        setSuggestions(tags);
      } catch {
        setError("Failed to fetch tags");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  return {
    suggestions,
    loading,
    error,
    searchTags: debouncedSearch,
  };
}
