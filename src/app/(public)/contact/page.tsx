import { Github, Mail, MessageSquare, Phone, Send } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "تماس با ما | SnippetHub",
  description: "ارتباط با تیم پشتیبانی SnippetHub",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-7xl flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">تماس با ما</h1>
        <p className="text-lg text-muted-foreground">
          برای ارتباط با تیم پشتیبانی SnippetHub، لطفاً فرم زیر را تکمیل کنید یا
          از راه‌های ارتباطی دیگر استفاده نمایید.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <Card className="shadow-sm">
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
              <div className="space-y-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input
                  required
                  id="name"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  required
                  id="email"
                  placeholder="ایمیل خود را وارد کنید"
                  type="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">پیام</Label>
                <Textarea
                  required
                  className="min-h-[150px] resize-y"
                  id="message"
                  placeholder="پیام خود را بنویسید"
                />
              </div>

              <Button className="w-full" type="submit">
                <Send className="ml-2 h-4 w-4" />
                ارسال پیام
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="shadow-sm">
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
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">ایمیل پشتیبانی</p>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href={`mailto:${config.author.email}`}
                  >
                    {config.author.email}
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">گیت‌هاب</p>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary"
                    href={config.project.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {config.project.github}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
