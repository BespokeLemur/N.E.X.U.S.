# Contributing to N.E.X.U.S.

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/N.E.X.U.S..git`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

## Development Guidelines

### Adding a New Module

1. Create `src/components/YourModule.js`
2. Export a `renderYourModule(container)` function
3. Add translations for all 5 languages in `src/i18n.js`
4. Register the component in `src/main.js`
5. Add a sidebar entry in `src/components/Sidebar.js`

### Code Style

- Use ES Modules (`import`/`export`)
- Keep components self-contained
- All user-facing text must go through the `t()` i18n function
- Follow the existing HTML-in-JS template literal pattern

### Translations

All 5 languages must be updated when adding new UI text:
- `tr` — Turkish
- `en` — English
- `de` — German
- `es` — Spanish
- `fr` — French

## Submitting a Pull Request

1. Create a branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request on GitHub

## Bug Reports

Please use the [GitHub Issues](https://github.com/BespokeLemur/N.E.X.U.S./issues) page.
Include:
- Browser & OS version
- Steps to reproduce
- Expected vs. actual behavior

## License

By contributing, you agree your contributions will be licensed under the MIT License.
