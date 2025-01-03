# SnippetHub

SnippetHub is a modern web application for sharing and managing code snippets. Built with Next.js 15, TypeScript, and PostgreSQL, it provides a platform for developers to share, discover, and manage code snippets across different programming languages.

## Features

- 🔐 **Authentication System**

  - Email & Password authentication
  - Email verification with OTP
  - Session-based authentication
  - Protected routes with middleware
  - Auto cleanup of unverified users

- 👥 **User Management**

  - User profiles
  - Profile customization
  - Public user pages
  - Dashboard for personal snippets

- 📝 **Snippet Management**

  - Create, edit, and delete snippets
  - Syntax highlighting for multiple languages
  - Code editor with language support
  - Public sharing of snippets
  - Related snippets suggestions

- 🎨 **Modern UI/UX**
  - Responsive design
  - RTL support
  - Dark/Light mode
  - Clean and intuitive interface
  - Loading states and animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Email**: Nodemailer
- **Authentication**: Custom JWT-based auth
- **Code Editor**: CodeMirror
- **Form Validation**: Zod

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (public)/          # Public routes
│   └── dashboard/         # Protected dashboard routes
├── components/            # React components
│   ├── forms/            # Form components
│   ├── shared/           # Shared/common components
│   ├── snippets/         # Snippet-related components
│   └── ui/               # UI components
├── db/                    # Database configuration
│   ├── actions.ts        # Server actions
│   ├── queries.ts        # Database queries
│   └── schema.ts         # Database schema
└── lib/                  # Utility functions
    ├── session.ts        # Session management
    ├── email.ts          # Email functionality
    └── validations/      # Zod schemas
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/snippet-hub.git
cd snippet-hub
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Required environment variables:

```env
DATABASE_URL=
SESSION_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

4. Run database migrations:

```bash
pnpm db:push
```

5. Start the development server:

```bash
pnpm dev
```

## Features in Detail

### Authentication Flow

- User signs up with email/password
- Verification code is sent to email
- 2-minute cooldown for resending verification code
- Unverified accounts are automatically deleted after 24 hours
- Session-based authentication with JWT

### Snippet Management

- Create snippets with title, description, and code
- Support for multiple programming languages
- Syntax highlighting in preview
- Edit and delete own snippets
- Public sharing with unique URLs

### User Dashboard

- Overview of personal snippets
- Profile management
- Account settings
- Activity tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
