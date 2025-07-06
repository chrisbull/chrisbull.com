# Next.js Template with Authentication

A modern, production-ready Next.js template featuring authentication, database integration, and a beautiful UI built with Chakra UI and Tailwind CSS.

## 🚀 Features

- **⚡ Next.js 15** - Latest version with App Router
- **🔐 Authentication** - NextAuth.js with OAuth (GitHub, Google) and email/password
- **💾 Database** - PostgreSQL with Prisma ORM
- **🎨 UI Components** - Chakra UI v3 with Tailwind CSS v4
- **🌙 Theme Support** - Light/dark mode with next-themes
- **📱 Responsive Design** - Mobile-first approach
- **🎭 Animations** - Framer Motion for smooth transitions
- **🔧 Developer Experience** - TypeScript, ESLint, Prettier
- **🧪 Testing** - Vitest with React Testing Library and coverage reports
- **🚀 CI/CD** - GitHub Actions for automated testing on pull requests
- **🐳 Docker Support** - Container setup with docker-compose

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Chakra UI v3 + Tailwind CSS v4
- **Typography**: Outfit Google Font
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Testing**: Vitest + React Testing Library
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Git

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd base-nextjs-template
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Update your `.env` file with:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your-database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-replace-in-production"

# OAuth providers (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   └── auth/              # Authentication pages
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── providers/         # Context providers
│   ├── site/              # Site layout components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
└── types/                 # TypeScript type definitions
```

## 🔐 Authentication

This template includes a complete authentication system with:

- **OAuth Providers**: GitHub, Google (easily extensible)
- **Email/Password**: Traditional authentication with secure password hashing
- **Session Management**: Database-backed sessions with NextAuth.js
- **Protected Routes**: Server and client-side protection

### OAuth Setup

See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed OAuth configuration instructions.

### Usage Examples

```tsx
// Client-side authentication
import { useSession } from 'next-auth/react'

export function MyComponent() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <div>Please sign in</div>

  return <div>Welcome {session.user?.name}!</div>
}
```

```tsx
// Server-side authentication
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Access denied</div>
  }

  return <div>Protected content</div>
}
```

## 🎨 UI Components

Built with Chakra UI v3 and Tailwind CSS v4:

- **Design System**: Consistent spacing, colors, and typography with Outfit font
- **Responsive**: Mobile-first responsive design
- **Accessible**: ARIA compliant components
- **Themeable**: Easy customization and branding
- **Dark Mode**: Built-in light/dark theme support
- **Typography**: Clean, modern Outfit Google Font

## 🧪 Testing

This project uses Vitest for fast and reliable testing:

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **Coverage Reports**: Track test coverage with detailed reports
- **Watch Mode**: Automatic test re-runs during development
- **UI Mode**: Interactive test runner with web interface

### Writing Tests

Create test files with `.test.tsx` or `.test.ts` extensions:

```tsx
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

### Testing Features

- **React Testing Library**: Test components the way users interact with them
- **Vitest**: Fast test runner with Jest-compatible API
- **Coverage Reports**: Built-in coverage analysis
- **Mocking**: Pre-configured mocks for Next.js, NextAuth, and Framer Motion
- **Setup**: Global test setup with custom matchers and utilities
- **CI/CD Integration**: Automated testing on pull requests

## 🚀 CI/CD

This project includes multiple GitHub Actions workflows for continuous integration:

### Simple Test Workflow (Recommended)

- **File**: `.github/workflows/simple-test.yml`
- **Triggers**: Pull requests and pushes to `main` and `develop` branches
- **Actions**: Linting, formatting, tests, and coverage
- **Reliable**: No external dependencies or artifact uploads

### Test Workflow

- **File**: `.github/workflows/test.yml`
- **Triggers**: Pull requests to `main` and `develop` branches
- **Actions**: Runs Vitest tests with coverage reporting
- **Artifacts**: Attempts to upload coverage reports (with fallback)
- **Node.js**: Tests against Node.js 18 with npm caching

### Comprehensive CI Workflow

- **File**: `.github/workflows/ci.yml`
- **Linting**: ESLint code quality checks
- **Formatting**: Prettier code formatting verification
- **Testing**: Full test suite with coverage
- **Building**: Verifies successful production build
- **Artifacts**: Uploads build and coverage artifacts (with error handling)

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Database Commands

```bash
npx prisma studio          # Open Prisma Studio
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Run migrations
npx prisma db push         # Push schema changes
npx prisma db seed         # Seed database
```

### Docker Development

```bash
# Start with Docker Compose
docker-compose up -d

# Stop services
docker-compose down
```

## 🌐 Deployment

### Environment Variables

Ensure these are set in your production environment:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your deployed app URL
- `NEXTAUTH_SECRET` - Strong secret key
- OAuth credentials (if using OAuth)

### Recommended Platforms

- **Vercel** - Seamless Next.js deployment
- **Railway** - Full-stack deployment with database
- **Netlify** - Static site deployment
- **Docker** - Container deployment anywhere

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development workflow
- Code standards
- Testing requirements
- Pull request process

Quick start:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm run test:run`)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🔐 [NextAuth.js Documentation](https://next-auth.js.org)
- 🗄️ [Prisma Documentation](https://prisma.io/docs)
- 🎨 [Chakra UI Documentation](https://chakra-ui.com)

---

Built with ❤️ using Next.js
