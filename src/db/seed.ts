import { nanoid } from "nanoid";

import { db } from "@/db";
import { languages, snippets, users } from "@/db/schema";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(snippets);
  await db.delete(languages);
  await db.delete(users);

  console.log("🧹 Cleared existing data");

  // Create users
  const usersData = [
    {
      id: nanoid(),
      name: "علی محمدی",
      username: "alimohammadi",
      email: "ali@example.com",
      password: "$2a$10$FPqjXBWOYFXRxNB7U9QvWuLs1yZE/BmY0kBXdAJZj0uq.8.1", // "password123"
      bio: "توسعه‌دهنده فول‌استک و علاقه‌مند به اشتراک‌گذاری دانش | متخصص React و Node.js",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
    {
      id: nanoid(),
      name: "سارا احمدی",
      username: "sara_ahmadi",
      email: "sara@example.com",
      password: "$2a$10$FPqjXBWOYFXRxNB7U9QvWuLs1yZE/BmY0kBXdAJZj0uq.8.1",
      bio: "برنامه‌نویس پایتون و متخصص هوش مصنوعی | مدرس یادگیری ماشین",
      image: "https://avatars.githubusercontent.com/u/2?v=4",
    },
  ];

  await db.insert(users).values(usersData);
  console.log("👥 Created users");

  // Create languages
  const languagesData = [
    { id: nanoid(), name: "JavaScript", slug: "javascript" },
    { id: nanoid(), name: "TypeScript", slug: "typescript" },
    { id: nanoid(), name: "Python", slug: "python" },
    { id: nanoid(), name: "Java", slug: "java" },
    { id: nanoid(), name: "C++", slug: "cpp" },
    { id: nanoid(), name: "Ruby", slug: "ruby" },
    { id: nanoid(), name: "PHP", slug: "php" },
    { id: nanoid(), name: "Swift", slug: "swift" },
    { id: nanoid(), name: "Kotlin", slug: "kotlin" },
    { id: nanoid(), name: "Rust", slug: "rust" },
  ];

  await db.insert(languages).values(languagesData);
  console.log("🔤 Created languages");

  // Create snippets
  const snippetsData = [
    {
      id: nanoid(),
      title: "تابع فیلتر آرایه با استفاده از reduce",
      description:
        "پیاده‌سازی تابع filter با استفاده از متد reduce در جاوااسکریپت",
      code: `function filter(arr, predicate) {
  return arr.reduce((acc, item) => {
    if (predicate(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}`,
      userId: usersData[0].id,
      languageId: languagesData[0].id, // JavaScript
    },
    {
      id: nanoid(),
      title: "کامپوننت Modal در React",
      description: "یک کامپوننت مودال ساده و قابل استفاده مجدد در React",
      code: `export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}`,
      userId: usersData[0].id,
      languageId: languagesData[1].id, // TypeScript
    },
    {
      id: nanoid(),
      title: "تابع دیباونس (Debounce)",
      description: "پیاده‌سازی تابع debounce برای بهینه‌سازی عملکرد",
      code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
      userId: usersData[1].id,
      languageId: languagesData[0].id, // JavaScript
    },
  ];

  await db.insert(snippets).values(snippetsData);
  console.log("📝 Created snippets");

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
