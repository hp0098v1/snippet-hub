# SnippetHub

SnippetHub is a modern web application for sharing and managing code snippets. Built with Next.js 15, TypeScript, and PostgreSQL, it provides a platform for developers to share, discover, and manage code snippets across different programming languages.

🌐 **[Live Preview](https://snippet-hub-hp0098v1.vercel.app/)**

## Features

### Authentication & Security

- Email & Password authentication
- Email verification with OTP
- Login with session
- Password reset via email
- Password change
- Protected dashboard routes
- Auto cleanup of unverified users

### User Profile

- Profile information management
- Profile image upload
- View user's snippets
- Snippet count display
- Bio and username customization

### Snippets

- Create new snippets
- Edit snippets
- Delete snippets
- Like snippets
- View count tracking
- Like count display
- Related snippets suggestions
- Syntax highlighting for multiple languages

### UI/UX

- Responsive design
- RTL support
- Light/Dark theme
- Modern UI components
- Smooth animations
- User-friendly notifications
- Clean and intuitive interface

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Storage**: Vercel Blob Storage
- **Email**: Nodemailer

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

4. Fill in the environment variables in .env:

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

5. Run database migrations:

   ```bash
   pnpm db:push
   ```

6. Start the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

```
src/
├── app/ # Next.js app router pages
│ ├── (auth)/ # Authentication routes
│ ├── (public)/ # Public routes
│ └── dashboard/ # Protected dashboard routes
├── components/ # React components
│ ├── forms/ # Form components
│ ├── shared/ # Shared/common components
│ ├── snippets/ # Snippet-related components
│ └── ui/ # UI components
├── db/ # Database configuration
│ ├── actions.ts # Server actions
│ ├── queries.ts # Database queries
│ └── schema.ts # Database schema
└── lib/ # Utility functions
├── session.ts # Session management
├── email.ts # Email functionality
└── validations/ # Zod schemas
```

## Features in Detail

### Authentication Flow

- User signs up with email/password
- Verification code is sent to email
- 2-minute cooldown for resending verification code
- Unverified accounts are automatically deleted after 24 hours
- Session-based authentication
- Password reset via email link

### Snippet Management

- Create snippets with title, description, and code
- Support for multiple programming languages
- Syntax highlighting in preview
- Edit and delete own snippets
- Public sharing with unique URLs
- Like and view count tracking

### User Dashboard

- Overview of personal snippets
- Profile management
- Account settings
- Password change
- Profile image upload

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
