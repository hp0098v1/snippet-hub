import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Github,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Twitter,
} from "lucide-react";

export const metadata: Metadata = {
  title: "تماس با ما | SnippetHub",
  description: "ارتباط با تیم پشتیبانی SnippetHub",
};

export default function ContactPage() {
  return (
    <div className="container flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">تماس با ما</h1>
        <p className="text-lg text-muted-foreground">
          برای ارتباط با تیم پشتیبانی SnippetHub، لطفاً فرم زیر را تکمیل کنید یا
          از راه‌های ارتباطی دیگر استفاده نمایید.
        </p>
      </div>

      {/* Success Alert - Show after successful message submission */}
      <Alert className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
        <MessageSquare className="h-4 w-4" />
        <AlertTitle>پیام شما با موفقیت ارسال شد</AlertTitle>
        <AlertDescription>
          از پیام شما متشکریم. تیم پشتیبانی در اسرع وقت با شما تماس خواهد گرفت.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              فرم تماس
            </CardTitle>
            <CardDescription>
              برای ارسال پیام به تیم پشتیبانی، لطفاً فرم زیر را تکمیل کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input
                  id="name"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">پیام</Label>
                <Textarea
                  id="message"
                  placeholder="پیام خود را بنویسید"
                  className="min-h-[150px] resize-y"
                  required
                />
              </div>

              {/* Error Message - Show when there's an error */}
              <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <p>خطایی در ارسال پیام رخ داد. لطفاً مجدداً تلاش کنید.</p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                <Send className="ml-2 h-4 w-4" />
                ارسال پیام
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                راه‌های ارتباطی
              </CardTitle>
              <CardDescription>
                می‌توانید از طریق راه‌های زیر نیز با ما در ارتباط باشید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">ایمیل پشتیبانی</p>
                  <a
                    href="mailto:support@snippethub.ir"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    support@snippethub.ir
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Twitter className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">توییتر</p>
                  <a
                    href="https://twitter.com/snippethub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    @snippethub
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">گیت‌هاب</p>
                  <a
                    href="https://github.com/snippethub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    github.com/snippethub
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Card */}
          <Card>
            <CardHeader>
              <CardTitle>سؤالات متداول</CardTitle>
              <CardDescription>
                قبل از تماس با پشتیبانی، می‌توانید سؤالات متداول را مطالعه کنید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">
                    چگونه می‌توانم اشتراک تهیه کنم؟
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    برای تهیه اشتراک، به صفحه پلن‌ها مراجعه کنید و پلن مورد نظر
                    خود را انتخاب نمایید.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">
                    چگونه می‌توانم رمز عبور خود را بازیابی کنم؟
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    در صفحه ورود، روی لینک "فراموشی رمز عبور" کلیک کنید و مراحل
                    بازیابی را دنبال نمایید.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
