import { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { SearchForm } from "@/components/shared/search-form";
import { SnippetsList } from "@/components/snippets/snippets-list";
import { getLanguages, getSnippets } from "@/db/queries";
import { SnippetsSortOption } from "@/db/types";
import { SNIPPETS_SORT_OPTIONS } from "@/lib/constants";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "قطعه کدها | SnippetHub",
  description: "جستجو و مشاهده قطعه کدهای برنامه‌نویسی",
};

type Props = {
  searchParams: Promise<{
    query?: string;
    language?: string;
    page?: string;
    sortBy?: string;
  }>;
};

export default async function SnippetsPage(props: Props) {
  const { query, language, page, sortBy } = await props.searchParams;
  const { isAuth } = await getSession();

  const { data: snippets, metadata } = await getSnippets({
    query,
    languageId: language === "all" ? undefined : language,
    page: Number(page) || 1,
    limit: 6,
    sortBy: sortBy as SnippetsSortOption,
  });

  let languages = await getLanguages();
  languages = [{ id: "all", name: "همه", slug: "all" }, ...languages];

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        description="در قطعه کدهای برنامه‌نویسی جستجو کنید و از آن‌ها استفاده کنید"
        title="قطعه کدها"
      />

      <SearchForm
        hasLanguageFilter
        hasSortFilter
        action="/snippets"
        language={language || "all"}
        languages={languages}
        query={query || ""}
        searchButtonText="جستجو"
        searchPlaceholder="جستجو در قطعه کدها..."
        sortBy={sortBy || "newest"}
        sortOptions={SNIPPETS_SORT_OPTIONS}
      />

      <SnippetsList
        isAuth={isAuth}
        snippets={snippets}
        totalPages={metadata.totalPages}
      />
    </div>
  );
}
