import { Metadata } from "next";

import { getLanguages, getSnippets } from "@/db/queries";
import { getSession } from "@/lib/session";
import { PageHeader } from "@/components/shared/page-header";
import { SnippetsList } from "@/components/snippets/snippets-list";
import { SearchForm } from "@/components/shared/search-form";

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
  const { isAuth } = await getSession();

  const { data: snippets, metadata } = await getSnippets({
    query,
    languageId: language === "all" ? undefined : language,
    page: Number(page) || 1,
    limit: 6,
  });

  let languages = await getLanguages();
  languages = [{ id: "all", name: "همه", slug: "all" }, ...languages];

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        title="قطعه کدها"
        description="در قطعه کدهای برنامه‌نویسی جستجو کنید و از آن‌ها استفاده کنید"
      />

      <SearchForm
        query={query || ""}
        hasLanguageFilter={true}
        language={language || "all"}
        languages={languages}
        action="/snippets"
        searchPlaceholder="جستجو در قطعه کدها..."
        searchButtonText="جستجو"
      />

      <SnippetsList
        snippets={snippets}
        totalPages={metadata.totalPages}
        isAuth={isAuth}
      />
    </div>
  );
}
