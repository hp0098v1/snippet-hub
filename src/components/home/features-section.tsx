import { FEATURES } from "@/constants";

export function FeaturesSection() {
  return (
    <div className="container max-w-5xl space-y-12 py-24">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">ویژگی‌های اسنیپت‌هاب</h2>
        <p className="text-muted-foreground mx-auto max-w-[600px]">
          ابزارها و امکانات پیشرفته برای مدیریت بهتر کدهای شما
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={`feature-${feature.title}`}
            className="flex flex-col items-center space-y-4 rounded-lg border bg-card text-card-foreground p-6 text-center"
          >
            <div className="rounded-full bg-primary/10 p-3">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
