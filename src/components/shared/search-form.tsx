import Form from "next/form";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/db/types";
import { cn } from "@/lib/utils";

type Props = {
  query: string;
  language?: string;
  languages?: Language[];
  className?: string;
  action: string;
  hasLanguageFilter?: boolean;
  searchPlaceholder?: string;
  searchButtonText?: string;
};

export function SearchForm({
  query,
  language,
  languages,
  className,
  action,
  hasLanguageFilter = false,
  searchPlaceholder = "جستجو در قطعه کدها...",
  searchButtonText = "جستجو",
}: Props) {
  return (
    <Form
      className={cn(
        "flex flex-col max-sm:items-start gap-4 sm:flex-row",
        className
      )}
      action={action}
    >
      <div className="relative max-w-md w-full">
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          name="query"
          defaultValue={query}
          placeholder={searchPlaceholder}
          className="w-full pr-9"
        />
      </div>

      {hasLanguageFilter && languages && (
        <Select name="language" defaultValue={language}>
          <SelectTrigger className="w-48">
            <SelectValue className="w-48" placeholder="انتخاب زبان" />
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

      <Button type="submit">{searchButtonText}</Button>
    </Form>
  );
}
