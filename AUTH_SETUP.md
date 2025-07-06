# NextAuth + Prisma Setup

This project now has NextAuth authentication integrated with Prisma for database storage, supporting both **OAuth providers** (GitHub, Google) and **email/password** authentication.

## Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-replace-in-production"

# OAuth providers (replace with your actual credentials)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

## OAuth Provider Setup

### GitHub

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env` file

### Google

1. Go to Google Cloud Console > APIs & Services > Credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy the Client ID and Client Secret to your `.env` file

## Database

The project uses SQLite for local development. The database schema includes:

- Users (with email, password, name, image fields)
- Accounts (OAuth connections)
- Sessions
- Verification tokens

## Authentication Methods

### 1. Email/Password Authentication

- Users can register with email and password
- Passwords are hashed using bcrypt
- Registration automatically signs the user in
- Sign in validates email/password combination

### 2. OAuth Authentication

- GitHub OAuth
- Google OAuth
- Links accounts to existing users if email matches

## Usage

### In Components

```tsx
import { useSession, signIn, signOut } from 'next-auth/react'

export function MyComponent() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>

  if (session) {
    return (
      <div>
        <p>Welcome {session.user?.name}!</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }

  return <button onClick={() => signIn()}>Sign In</button>
}
```

### Server-side

```tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Please sign in</div>
  }

  return <div>Welcome {session.user?.name}!</div>
}
```

## Routes

### Authentication Pages

- `/auth/signin` - Sign in page (email/password + OAuth)
- `/auth/register` - Registration page (email/password)

### API Routes

- `/api/auth/[...nextauth]` - NextAuth endpoints
- `/api/auth/register` - User registration endpoint
- `/api/auth/signin` - Sign in page
- `/api/auth/signout` - Sign out
- `/api/auth/callback/[provider]` - OAuth callbacks

## Features

### Registration Form (`/auth/register`)

- Full name, email, password fields
- Password confirmation
- Client-side validation
- Server-side validation
- Automatic sign-in after registration
- Links to sign-in page

### Sign-in Form (`/auth/signin`)

- Email/password fields
- OAuth provider buttons (GitHub, Google)
- Error handling
- Links to registration page

### AuthButton Component

- Shows user info when signed in
- Sign-in button when not authenticated
- Integrated in header navigation

## Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT session strategy
- CSRF protection via NextAuth
- Input validation on client and server
- Unique email constraint in database

## Files Created/Modified

### New Files

- `src/app/api/auth/register/route.ts` - Registration API endpoint
- `src/app/auth/register/page.tsx` - Registration page
- `src/components/auth/RegisterForm.tsx` - Registration form component

### Modified Files

- `prisma/schema.prisma` - Added password field to User model
- `src/lib/auth.ts` - Added Credentials provider
- `src/components/auth/SignInForm.tsx` - Added email/password form
- `src/components/site/header.section.tsx` - Added AuthButton

### Dependencies Added

- `bcryptjs` - Password hashing

## Testing the Setup

1. Start the development server: `npm run dev`
2. Go to `http://localhost:3000/auth/register` to create an account
3. Go to `http://localhost:3000/auth/signin` to sign in
4. Check the header for the AuthButton showing your logged-in status

The authentication system now supports both traditional email/password registration and OAuth providers!
