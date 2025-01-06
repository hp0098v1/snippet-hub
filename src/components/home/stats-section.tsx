import { Stats } from "@/components/home/stats";
import { getStats } from "@/db/actions/stats";

export async function StatsSection() {
  const stats = await getStats();

  return (
    <div className="container space-y-12 py-24">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">آمار اسنیپت‌هاب</h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground">
          آمار کاربران، کدها، لایک‌ها و بازدیدها در اسنیپت‌هاب
        </p>
      </div>

      <Stats stats={stats} />
    </div>
  );
}
