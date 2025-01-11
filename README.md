[English](README.md) | [فارسی](README.fa.md)

# Snippet Hub

SnippetHub is a modern web application for sharing and managing code snippets. Built with Next.js 15, TypeScript, and PostgreSQL, it provides a platform for developers to share, discover, and manage code snippets across different programming languages.

🌐 **[Live Preview](https://snippet-hub-hp0098v1.vercel.app/)**

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

## Features

- 🔐 **Authentication**

  - Email/Password authentication
  - Email verification
  - Password reset functionality
  - Session management

- 👤 **User Management**

  - User profiles
  - Profile customization
  - Password change
  - Bio and avatar (profile image) support

- 📝 **Snippet Management**

  - Rich text editor with Tiptap
  - Code blocks with syntax highlighting
  - Support for 10+ programming languages
  - Real-time preview
  - Auto-save drafts
  - View count tracking

- ❤️ **Social Features**

  - Like snippets
  - Save snippets for later
  - View other users' profiles
  - See user's snippets and activity

- 🔍 **Search & Discovery**

  - Full-text search in titles and content
  - Advanced filtering options
  - Sort by popularity, date, or relevance
  - Language-based categorization
  - Trending snippets section
  - Discover users

- 📱 **Responsive Design**
  - Mobile-first approach
  - Dark mode support
  - RTL support
  - Clean and modern UI
  - Optimized performance

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: Custom email/password with session management
- **Storage**: [Vercel Blob Storage](https://vercel.com/storage/blobs)
- **Email**: [Resend](https://resend.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (public)/          # Public routes
│   └── dashboard/         # Protected dashboard routes
├── components/            # React components
│   ├── email/             # Email components
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
│   ├── session.ts      # Session management
│   └── validations/    # Form validations
└── middleware.ts       # Next.js middleware
```

## Database Schema

- **users**: User accounts and profiles
- **snippets**: Code snippets with metadata
- **languages**: Programming languages
- **likes**: Snippet likes
- **savedSnippets**: Saved snippets for users

## Getting Started

### Prerequisites

- Git
- Node.js 18+
- PostgreSQL
- pnpm (recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hp0098v1/snippet-hub.git
cd snippet-hub
```

2. Copy `.env.example` to `.env` and fill in your values:

```bash
DATABASE_URL=your_database_url
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

SESSION_SECRET=your_session_secret

RESEND_API_KEY=your_resend_api_key

APP_URL=your-app-url
```

3. Install dependencies:

```bash
pnpm install
```

4. Set up the database:

```bash
pnpm db:push
```

5. Start the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the app.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
