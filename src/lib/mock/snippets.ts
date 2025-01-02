export type Snippet = {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
};

export type PaginatedResponse<T> = {
  data: T[];
  metadata: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const mockSnippets: Snippet[] = [
  {
    id: "1",
    title: "تابع فیلتر آرایه با استفاده از reduce",
    description: "پیاده‌سازی تابع filter با استفاده از متد reduce در جاوااسکریپت",
    code: `function filter(arr, predicate) {
  return arr.reduce((acc, item) => {
    if (predicate(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}`,
    language: "javascript",
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
    author: {
      id: "1",
      name: "علی محمدی",
      username: "alimohammadi",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    }
  },
  {
    id: "2",
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
    language: "typescript",
    createdAt: "2024-01-20T14:15:00Z",
    updatedAt: "2024-01-21T09:30:00Z",
    author: {
      id: "2",
      name: "سارا احمدی",
      username: "sara_ahmadi",
      image: "https://avatars.githubusercontent.com/u/2?v=4",
    }
  },
  {
    id: "3",
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
    language: "javascript",
    createdAt: "2024-01-25T11:45:00Z",
    updatedAt: "2024-01-25T11:45:00Z",
    author: {
      id: "3",
      name: "محمد حسینی",
      username: "mhosseini",
      image: "https://avatars.githubusercontent.com/u/3?v=4",
    }
  },
  {
    id: "4",
    title: "انیمیشن اسکرول با CSS",
    description: "یک انیمیشن ساده برای اسکرول نرم با CSS",
    code: `.smooth-scroll {
  scroll-behavior: smooth;
  overflow-y: auto;
  height: 100vh;
}`,
    language: "css",
    createdAt: "2024-01-30T09:20:00Z",
    updatedAt: "2024-01-30T09:20:00Z",
    author: {
      id: "4",
      name: "زهرا کریمی",
      username: "zkarimi",
      image: "https://avatars.githubusercontent.com/u/4?v=4",
    }
  },
  {
    id: "5",
    title: "کانفیگ Docker برای Node.js",
    description: "فایل Dockerfile برای اپلیکیشن Node.js",
    code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
    language: "dockerfile",
    createdAt: "2024-02-05T16:30:00Z",
    updatedAt: "2024-02-05T16:30:00Z",
    author: {
      id: "5",
      name: "رضا نجفی",
      username: "reza_najafi",
      image: "https://avatars.githubusercontent.com/u/5?v=4",
    }
  },
];

export async function getMockSnippets(params: {
  query?: string;
  language?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Snippet>> {
  const { query = "", language = "", page = 1, limit = 12 } = params;

  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredSnippets = mockSnippets;
  
  // Filter by search query
  if (query) {
    filteredSnippets = filteredSnippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(query.toLowerCase()) ||
        snippet.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Filter by language
  if (language) {
    filteredSnippets = filteredSnippets.filter(
      (snippet) => snippet.language.toLowerCase() === language.toLowerCase()
    );
  }

  // Rest of the pagination logic remains the same
  const totalItems = filteredSnippets.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedSnippets = filteredSnippets.slice(startIndex, endIndex);

  return {
    data: paginatedSnippets,
    metadata: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
} 