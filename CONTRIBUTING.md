# Contributing to Caddy UI

Thank you for considering contributing to Caddy UI! This document outlines the process for contributing to the project and how to get started.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork to your local machine
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Run tests and linting
6. Commit your changes
7. Push to your fork
8. Submit a pull request

## Development Setup

Follow the instructions in the [README.md](README.md) to set up your development environment. Additionally:

1. Make sure your code follows the existing style
2. Write tests for your changes when applicable
3. Document new code with comments
4. Update the README.md if needed

## Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable.
2. Update the documentation with details of changes to behavior.
3. The PR should work with the existing codebase and pass all tests.
4. Ensure your code adheres to the existing style.
5. Include screenshots for UI changes when applicable.

## Git Workflow

### Branch Naming

Use descriptive branch names that start with a category:

- `feature/` - for new features
- `fix/` - for bug fixes
- `docs/` - for documentation updates
- `refactor/` - for code refactoring
- `test/` - for adding tests

Example: `feature/add-dark-mode` or `fix/resolve-auth-issue`

### Commit Messages

Write clear, concise commit messages that explain the changes made. Follow these guidelines:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Example:
```
Add dark mode toggle to navbar

- Create ThemeContext for managing theme state
- Add toggle button component
- Implement localStorage persistence
- Update styles for dark mode compatibility

Fixes #123
```

## Reporting Bugs

When reporting bugs, please include:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Your environment (OS, browser, etc.)
7. Any additional context

## Feature Requests

Feature requests are welcome! Please provide:

1. A clear, descriptive title
2. A detailed description of the proposed feature
3. An explanation of why this feature would be useful
4. Examples of how the feature would work
5. Any relevant mockups or diagrams

## Security Issues

If you discover a security vulnerability, please do NOT open an issue. Email security@example.com instead. Security issues will be addressed promptly.

## Licensing

By contributing to Caddy UI, you agree that your contributions will be licensed under the project's [MIT License](LICENSE). 