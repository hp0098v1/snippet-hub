import { Search } from "lucide-react";
import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Language } from "@/types";

type Props = {
  query: string;
  language?: string;
  sortBy?: string;
  languages?: Language[];
  className?: string;
  action: string;
  hasLanguageFilter?: boolean;
  hasSortFilter?: boolean;
  sortOptions?: { label: string; value: string }[];
  searchPlaceholder?: string;
  searchButtonText?: string;
};

export function SearchForm({
  query,
  language,
  sortBy,
  className,
  action,
  hasLanguageFilter = false,
  hasSortFilter = false,
  languages = [],
  sortOptions = [],
  searchPlaceholder = "جستجو در قطعه کدها...",
  searchButtonText = "جستجو",
}: Props) {
  return (
    <Form
      action={action}
      className={cn(
        "flex flex-wrap gap-4 max-sm:items-start sm:flex-row",
        className
      )}
    >
      <div className="relative w-full max-w-md">
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="w-full pr-9"
          defaultValue={query}
          name="query"
          placeholder={searchPlaceholder}
        />
      </div>

      {hasLanguageFilter && languages.length > 0 && (
        <Select defaultValue={language} name="language">
          <SelectTrigger className="w-32">
            <SelectValue className="w-32" placeholder="انتخاب زبان" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {hasSortFilter && sortOptions.length > 0 && (
        <Select defaultValue={sortBy} name="sortBy">
          <SelectTrigger className="w-32">
            <SelectValue className="w-32" placeholder="مرتب‌سازی بر اساس" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button type="submit">{searchButtonText}</Button>
    </Form>
  );
}
