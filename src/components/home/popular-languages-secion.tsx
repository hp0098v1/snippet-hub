import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { POPULAR_LANGUAGES } from "@/constants";

export function PopularLanguagesSection() {
  return (
    <div className="container space-y-12 py-24">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">
          زبان‌های برنامه‌نویسی پشتیبانی شده
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[600px]">
          پشتیبانی از syntax highlighting برای زبان‌های محبوب برنامه‌نویسی
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {POPULAR_LANGUAGES.map((lang) => (
          <Badge
            key={lang.name}
            variant="secondary"
            className="text-lg py-2 px-4 flex items-center gap-2"
          >
            <Image src={lang.image} alt={lang.name} width={25} height={25} />
            {lang.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
