export type User = {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  snippetsCount: number;
  createdAt: string;
  followers: number;
  following: number;
  location?: string;
  website?: string;
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

const mockUsers: User[] = [
  {
    id: "1",
    name: "علی محمدی",
    username: "alimohammadi",
    bio: "توسعه‌دهنده فول‌استک و علاقه‌مند به اشتراک‌گذاری دانش | متخصص React و Node.js",
    image: "https://avatars.githubusercontent.com/u/1?v=4",
    snippetsCount: 42,
    createdAt: "2023-01-15T08:30:00Z",
    followers: 128,
    following: 89,
    location: "تهران، ایران",
    website: "https://alimohammadi.dev",
  },
  {
    id: "2",
    name: "سارا احمدی",
    username: "sara_ahmadi",
    bio: "برنامه‌نویس پایتون و متخصص هوش مصنوعی | مدرس یادگیری ماشین",
    image: "https://avatars.githubusercontent.com/u/2?v=4",
    snippetsCount: 35,
    createdAt: "2023-03-22T14:15:00Z",
    followers: 256,
    following: 112,
    location: "اصفهان، ایران",
  },
  {
    id: "3",
    name: "محمد حسینی",
    username: "mhosseini",
    bio: "توسعه‌دهنده وب و مدرس برنامه‌نویسی | عاشق جاوااسکریپت و تایپ‌اسکریپت",
    image: "https://avatars.githubusercontent.com/u/3?v=4",
    snippetsCount: 67,
    createdAt: "2023-02-10T11:45:00Z",
    followers: 342,
    following: 178,
    website: "https://mhosseini.ir",
  },
  {
    id: "4",
    name: "زهرا کریمی",
    username: "zkarimi",
    bio: "طراح رابط کاربری و توسعه‌دهنده فرانت‌اند | متخصص CSS و انیمیشن",
    image: "https://avatars.githubusercontent.com/u/4?v=4",
    snippetsCount: 29,
    createdAt: "2023-05-05T09:20:00Z",
    followers: 156,
    following: 143,
    location: "شیراز، ایران",
  },
  {
    id: "5",
    name: "رضا نجفی",
    username: "reza_najafi",
    bio: "DevOps engineer | متخصص Docker و Kubernetes",
    image: "https://avatars.githubusercontent.com/u/5?v=4",
    snippetsCount: 51,
    createdAt: "2023-04-18T16:30:00Z",
    followers: 198,
    following: 167,
    location: "مشهد، ایران",
  },
];

export async function getMockUsers(params: {
  query?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<User>> {
  const { query = "", page = 1, limit = 12 } = params;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Filter users based on search query
  let filteredUsers = mockUsers;
  if (query) {
    filteredUsers = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.bio.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Calculate pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return {
    data: paginatedUsers,
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