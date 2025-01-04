[English](README.md) | [فارسی](README.fa.md)

# SnippetHub

SnippetHub یک برنامه وب مدرن برای به اشتراک گذاری و مدیریت قطعه کد است. این برنامه که با Next.js 15، TypeScript و PostgreSQL ساخته شده است، بستری را برای توسعه دهندگان فراهم می کند تا قطعات کد را در زبان های برنامه نویسی مختلف به اشتراک بگذارند، کشف کنند و مدیریت کنند.

🌐 **[مشاهده نسخه آنلاین](https://snippet-hub-hp0098v1.vercel.app/)**

## Navigation

- [Features](#features)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Snippet Management](#snippet-management)
  - [Social Features](#social-features)
  - [Search & Discovery](#search--discovery)
  - [Responsive Design](#responsive-design)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## ویژگی ها

- 🔐 **احراز هویت**

- احراز هویت ایمیل / رمز عبور
- تایید ایمیل
- قابلیت بازنشانی رمز عبور
- مدیریت جلسات

- 👤 **مدیریت کاربر**

- پروفایل های کاربر
- سفارشی سازی پروفایل
- تغییر رمز عبور
- پشتیبانی بیو و آواتار

- 📝 **مدیریت قطعه**

- ایجاد، ویرایش و حذف قطعات
- برجسته کردن نحو
- پشتیبانی از چندین زبان برنامه نویسی
- شرح و عنوان برای هر قطعه
- مشاهده ردیابی تعداد

- ❤️ **ویژگی های اجتماعی**

- مثل تیکه ها
- قطعات را برای بعد ذخیره کنید
- نمایه سایر کاربران را مشاهده کنید
- مشاهده قطعات و فعالیت کاربر

- 🔍 **جستجو و کشف **

- جستجوی قطعات بر اساس عنوان/توضیحات
- فیلتر بر اساس زبان برنامه نویسی
- قطعات محبوب را مرور کنید
- کاربران را کشف کنید

- 📱 **طراحی واکنشگرا**
- رویکرد اول موبایل
- پشتیبانی از حالت تاریک/روشن
- پشتیبانی از RTL
- رابط کاربری تمیز و مدرن

## تکنولوژی‌ها

- **فریم‌ورک**: [Next.js 15](https://nextjs.org/)
- **زبان برنامه‌نویسی**: [TypeScript](https://www.typescriptlang.org/)
- **استایل‌دهی**: [Tailwind CSS](https://tailwindcss.com/)
- **کامپوننت‌های UI**: [shadcn/ui](https://ui.shadcn.com/)
- **پایگاه داده**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**:[ Drizzle ORM](https://orm.drizzle.team/)
- **احراز هویت**: ایمیل/رمز عبور با مدیریت session
- **ذخیره‌سازی**: [Vercel Blob Storage](https://vercel.com/storage/blobs)
- **ایمیل**: Nodemailer
- **محیط اجرا**: [Vercel](https://vercel.com/)

## ساختار پروژه

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (public)/          # Public routes
│   └── dashboard/         # Protected dashboard routes
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── shared/           # Shared components
│   ├── snippets/         # Snippet-related components
│   ├── ui/              # UI components (shadcn)
│   └── users/           # User-related components
├── db/                   # Database configuration
│   ├── actions/         # Server actions
│   ├── queries/         # Database queries
│   └── schema.ts        # Database schema
├── lib/                 # Utility functions
│   ├── email.ts        # Email functionality
│   ├── session.ts      # Session management
│   └── validations/    # Form validations
└── middleware.ts       # Next.js middleware
```

## نصب و راه‌اندازی

### نیازمندی ها

- Git
- Node.js 18+
- PostgreSQL
- pnpm (recommended)

1. کلون کردن پروژه:

   ```bash
   git clone https://github.com/yourusername/snippet-hub.git
   cd snippet-hub
   ```

2. نصب وابستگی‌ها:

   ```bash
   pnpm install
   ```

3. تنظیم متغیرهای محیطی:

   ```bash
   cp .env.example .env
   ```

4. پر کردن مقادیر متغیرهای محیطی در فایل .env:

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/your_database"
   BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"
   NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"
   SESSION_SECRET="your_session_secret"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your_email@gmail.com"
   SMTP_PASSWORD="your_app_specific_password"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

5. اجرای مایگریشن‌های دیتابیس:

   ```bash
   pnpm db:push
   ```

6. اجرای پروژه در محیط توسعه:
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see the app.

## مشارکت

مشارکت ها خوش آمدید! لطفا در صورت تمایل یک درخواست کشش ارسال کنید.

## مجوز

این پروژه تحت مجوز MIT مجوز دارد - برای جزئیات به فایل [LICENSE](LICENSE) مراجعه کنید.
