"use client";

import { Tag } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  readonly tags: { name: string; slug: string }[];
  readonly selectedTags: string[];
  readonly onTagSelect: (tags: string[]) => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleTag = (tagSlug: string) => {
    const newTags = selectedTags.includes(tagSlug)
      ? selectedTags.filter((t) => t !== tagSlug)
      : [...selectedTags, tagSlug];
    onTagSelect(newTags);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            // variant="outline"
            variant={selectedTags.length ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-9 w-9",
              !selectedTags.length &&
                "bg-background/95 backdrop-blur hover:bg-accent/70 supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:hover:bg-accent/60",
            )}
            aria-label="Filter by tags"
          >
            <Tag className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.slug}
                    onSelect={() => toggleTag(tag.slug)}
                    className="flex items-center justify-between"
                  >
                    <span>{tag.name}</span>
                    {selectedTags.includes(tag.slug) && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
