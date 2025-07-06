# Contributing to Next.js Template

Thank you for your interest in contributing to this project! This guide will help you get started.

## Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies**: `npm install`
3. **Set up environment variables** (see `.env.example`)
4. **Set up the database** (see `README.md` for instructions)
5. **Run the development server**: `npm run dev`

## Development Workflow

### Making Changes

1. **Create a new branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the project's coding standards

3. **Run tests** to ensure everything works:

   ```bash
   npm run test:run
   npm run lint
   npm run format:check
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "feat: add new feature description"
   ```

### Pull Request Process

1. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** from your fork to the main repository
3. **Fill out the PR template** with all required information
4. **Wait for CI checks** to pass (tests, linting, build)
5. **Respond to feedback** from maintainers

## Code Standards

### Code Style

- **ESLint**: Code must pass ESLint checks
- **Prettier**: Code must be formatted with Prettier
- **TypeScript**: All code should be properly typed

### Testing

- **Write tests** for new features and bug fixes
- **Run tests locally** before submitting PRs
- **Maintain test coverage** - aim for >80% coverage

### Commit Messages

Follow conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
├── lib/                 # Utility libraries
└── types/               # TypeScript types
```

## Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## CI/CD

All pull requests trigger GitHub Actions workflows that:

- Run ESLint and Prettier checks
- Execute the full test suite
- Generate coverage reports
- Verify the build process

## Getting Help

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Code Review**: Maintainers will review PRs and provide feedback

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing! 🚀
