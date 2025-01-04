import { Stats } from "@/components/home/stats";
import { getStats } from "@/db/actions/stats";

export async function StatsSection() {
  const stats = await getStats();

  return (
    <div className="container space-y-12 py-24">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">آمار اسنیپت‌هاب</h2>
        <p className="text-muted-foreground mx-auto max-w-[600px]">
          آمار کاربران، کدها، لایک‌ها و بازدیدها در اسنیپت‌هاب
        </p>
      </div>

      <Stats stats={stats} />
    </div>
  );
}
