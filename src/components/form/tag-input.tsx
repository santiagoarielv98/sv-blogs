"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTagSearch } from "@/hooks/use-tag-search";
import { cn } from "@/lib/utils";
import { LoaderCircle, Plus, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TagBadgeProps {
  tag: string;
  onRemove: (tag: string) => void;
}

const TagBadge = ({ tag, onRemove }: TagBadgeProps) => (
  <Badge
    variant="secondary"
    className={cn("group gap-2 pr-1 transition-colors hover:bg-secondary/80")}
  >
    {tag}
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 opacity-50 group-hover:opacity-100"
      onClick={() => onRemove(tag)}
    >
      <X className="h-3 w-3" aria-hidden="true" />
      <span className="sr-only">Remove {tag} tag</span>
    </Button>
  </Badge>
);

export function TagInput() {
  const form = useFormContext();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {
    suggestions,
    loading,
    error: searchError,
    searchTags,
  } = useTagSearch();

  const tags = form.watch("tags") as string[];

  const handleUnselect = useCallback(
    (tag: string) => {
      const currentTags = form.getValues("tags") as string[];
      form.setValue(
        "tags",
        currentTags.filter((t) => t !== tag),
      );
    },
    [form],
  );

  const handleSelect = useCallback(
    (tagName: string) => {
      const normalizedTag = tagName.toLowerCase().trim();
      if (!normalizedTag) return;

      const currentTags = form.getValues("tags") as string[];
      if (!currentTags.includes(normalizedTag)) {
        form.setValue("tags", [...currentTags, normalizedTag]);
      }

      setInputValue("");
      setOpen(false);
    },
    [form],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !loading && inputValue.trim()) {
        e.preventDefault();
        handleSelect(inputValue);
      }
    },
    [handleSelect, inputValue, loading],
  );

  const filteredSuggestions = suggestions.filter(
    (tag) => !tags?.includes(tag.name.toLowerCase()),
  );

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>Tags</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-autocomplete="list"
                  className="justify-betweentext-left w-full font-normal"
                >
                  Add tags
                  <Plus
                    className={cn("h-4 w-4 opacity-50", open && "rotate-45")}
                  />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search or add tag..."
                  value={inputValue}
                  onValueChange={(value) => {
                    setInputValue(value);
                    searchTags(value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <CommandList>
                  {loading && (
                    <div className="flex items-center justify-center p-2">
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      <span>Searching tags...</span>
                    </div>
                  )}
                  {searchError && (
                    <div className="p-2 text-sm text-destructive">
                      {searchError}
                    </div>
                  )}
                  <CommandEmpty>
                    {inputValue.trim() ? (
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleSelect(inputValue)}
                      >
                        Add &quot;{inputValue}&quot;
                      </Button>
                    ) : (
                      "Start typing to search tags..."
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    {filteredSuggestions.map((tag) => (
                      <CommandItem
                        key={tag.slug}
                        value={tag.name}
                        onSelect={handleSelect}
                      >
                        {tag.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {tags?.length > 0 && (
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Selected tags"
            >
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} onRemove={handleUnselect} />
              ))}
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
