import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "ذخیره امن کد",
    description: "کدهای خود را به صورت امن و سازمان‌یافته ذخیره کنید",
    icon: "🔒",
  },
  {
    title: "اشتراک‌گذاری آسان",
    description: "کدها را به صورت عمومی یا خصوصی به اشتراک بگذارید",
    icon: "🔗",
  },
  {
    title: "کشف کدهای جدید",
    description: "کدهای عمومی دیگر توسعه‌دهندگان را کشف کنید",
    icon: "🔍",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold mb-4">به اسنیپت‌هاب خوش آمدید</h1>
        <p className="text-lg text-muted-foreground max-w-sm mb-8">
          کدهای خود را به سادگی سازماندهی کنید، به اشتراک بگذارید و کدهای جدید
          را کشف کنید
        </p>
        <div className="flex gap-4">
          <Button asChild variant="default" size="lg">
            <a href="/auth/signup">شروع کنید</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#features">بیشتر بدانید</a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            ویژگی‌های اسنیپت‌هاب
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">به جامعه ما بپیوندید</h2>
          <p className="text-muted-foreground mb-8">
            هم‌اکنون ثبت‌نام کنید و از امکانات اسنیپت‌هاب بهره‌مند شوید
          </p>
          <Button asChild variant="default" size="lg">
            <a href="/auth/signup">ثبت‌نام رایگان</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
