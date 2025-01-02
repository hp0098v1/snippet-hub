import { Metadata } from "next";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PaginationControl } from "@/components/shared/pagination-control";
import { SnippetCard } from "@/components/snippets/snippet-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getLanguages, getSnippets } from "@/db/queries";

export const metadata: Metadata = {
  title: "قطعه کدها | SnippetHub",
  description: "جستجو و مشاهده قطعه کدهای برنامه‌نویسی",
};

type Props = {
  searchParams: Promise<{
    query?: string;
    language?: string;
    page?: string;
  }>;
};

export default async function SnippetsPage(props: Props) {
  const { query, language, page } = await props.searchParams;

  const { data: snippets, metadata } = await getSnippets({
    query,
    languageId: language === "all" ? undefined : language,
    page: Number(page) || 1,
    limit: 2,
  });

  let languages = await getLanguages();
  languages = [{ id: "all", name: "همه", slug: "all" }, ...languages];

  return (
    <div className="container space-y-8 py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">قطعه کدها</h1>
        <p className="text-muted-foreground">
          در قطعه کدهای برنامه‌نویسی جستجو کنید و از آن‌ها استفاده کنید
        </p>
      </div>

      <Form
        className="flex flex-col max-sm:items-start gap-4 sm:flex-row"
        action="/snippets"
      >
        <div className="relative max-w-md w-full">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            name="query"
            defaultValue={query}
            placeholder="جستجو در قطعه کدها..."
            className="w-full pr-9"
          />
        </div>

        <Select name="language" defaultValue={language || "all"}>
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

        <Button type="submit">جستجو</Button>
      </Form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>

      {snippets.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">هیچ قطعه کدی یافت نشد</p>
        </div>
      )}

      <PaginationControl totalPages={metadata.totalPages} />
    </div>
  );
}
