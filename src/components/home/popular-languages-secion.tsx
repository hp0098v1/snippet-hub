import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { POPULAR_LANGUAGES } from "@/constants";

export function PopularLanguagesSection() {
  return (
    <div className="container space-y-12 py-24">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">
          زبان‌های برنامه‌نویسی پشتیبانی شده
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground">
          پشتیبانی از syntax highlighting برای زبان‌های محبوب برنامه‌نویسی
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
        {POPULAR_LANGUAGES.map((lang) => (
          <Badge
            className="flex items-center gap-2 px-4 py-2 text-lg"
            key={lang.name}
            variant="secondary"
          >
            <Image alt={lang.name} height={25} src={lang.image} width={25} />
            {lang.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
