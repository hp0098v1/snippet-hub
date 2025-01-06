import { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "قوانین و حریم خصوصی | SnippetHub",
  description: "قوانین استفاده و سیاست حریم خصوصی پلتفرم SnippetHub",
};

export default function LegalPage() {
  return (
    <div className="container flex-1 space-y-8 p-8">
      {/* Introduction */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          قوانین و حریم خصوصی
        </h1>
        <p className="text-lg text-muted-foreground">
          این صفحه شامل قوانین استفاده از پلتفرم SnippetHub و نحوه حفاظت از
          اطلاعات شخصی شما است. لطفاً این قوانین را با دقت مطالعه کنید.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Terms of Service */}
        <Card id="terms">
          <CardHeader>
            <CardTitle className="text-2xl">قوانین استفاده</CardTitle>
          </CardHeader>
          <CardContent className="rtl prose prose-stone max-w-none dark:prose-invert">
            <h3>۱. پذیرش قوانین</h3>
            <p>
              با استفاده از SnippetHub، شما موافقت خود را با این قوانین اعلام
              می‌کنید. در صورت عدم موافقت با هر یک از این قوانین، لطفاً از سرویس
              استفاده نکنید.
            </p>

            <h3>۲. حساب کاربری</h3>
            <p>
              شما مسئول حفظ امنیت حساب کاربری خود و تمام فعالیت‌هایی که تحت حساب
              شما انجام می‌شود، هستید.
            </p>

            <h3>۳. محتوای کاربر</h3>
            <p>
              شما مالک محتوایی هستید که در پلتفرم به اشتراک می‌گذارید. با این
              حال، با انتشار محتوا، شما به ما اجازه می‌دهید آن را نمایش دهیم و
              در دسترس سایر کاربران قرار دهیم.
            </p>

            <h3>۴. رفتار قابل قبول</h3>
            <p>
              کاربران باید از انتشار محتوای نامناسب، غیرقانونی یا مضر خودداری
              کنند. ما حق حذف هر محتوایی که این قوانین را نقض کند، محفوظ
              می‌داریم.
            </p>

            <h3>۵. مالکیت معنوی</h3>
            <p>
              تمامی حقوق مالکیت معنوی پلتفرم متعلق به SnippetHub است. کاربران
              باید به حقوق مالکیت معنوی دیگران احترام بگذارند.
            </p>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card id="privacy">
          <CardHeader>
            <CardTitle className="text-2xl">حریم خصوصی</CardTitle>
          </CardHeader>
          <CardContent className="rtl prose prose-stone max-w-none dark:prose-invert">
            <h3>۱. جمع‌آوری اطلاعات</h3>
            <p>
              ما اطلاعات شخصی شما را تنها با رضایت شما و برای بهبود خدمات‌رسانی
              جمع‌آوری می‌کنیم. این اطلاعات شامل نام، ایمیل و اطلاعات پروفایل
              شما است.
            </p>

            <h3>۲. استفاده از اطلاعات</h3>
            <p>ما از اطلاعات شما برای موارد زیر استفاده می‌کنیم:</p>
            <ul>
              <li>ارائه و بهبود خدمات</li>
              <li>ارتباط با شما در مورد حساب کاربری‌تان</li>
              <li>ارسال اطلاعیه‌های مهم و تغییرات در خدمات</li>
            </ul>

            <h3>۳. امنیت اطلاعات</h3>
            <p>
              ما از روش‌های امنیتی پیشرفته برای محافظت از اطلاعات شما استفاده
              می‌کنیم. با این حال، هیچ روش انتقال اطلاعات از طریق اینترنت یا
              ذخیره‌سازی الکترونیکی کاملاً امن نیست.
            </p>

            <h3>۴. کوکی‌ها</h3>
            <p>
              ما از کوکی‌ها برای بهبود تجربه کاربری شما استفاده می‌کنیم. شما
              می‌توانید کوکی‌ها را در مرورگر خود غیرفعال کنید، اما این کار ممکن
              است بر عملکرد برخی ویژگی‌ها تأثیر بگذارد.
            </p>

            <h3>۵. تغییرات در سیاست حریم خصوصی</h3>
            <p>
              ما ممکن است این سیاست حریم خصوصی را به‌روزرسانی کنیم. تغییرات مهم
              از طریق ایمیل یا اعلان در سایت به اطلاع شما خواهد رسید.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">تماس با ما</CardTitle>
          </CardHeader>
          <CardContent className="rtl prose prose-stone max-w-none dark:prose-invert">
            <p>
              اگر سؤالی درباره قوانین یا حریم خصوصی دارید، لطفاً با ما تماس
              بگیرید:
            </p>
            <ul>
              <li>ایمیل: support@snippethub.ir</li>
              <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
