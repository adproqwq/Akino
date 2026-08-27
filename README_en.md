# Akino

<p align="center">
  <a href="./README.md">中文</a> · <a href="./README_en.md">English</a>
</p>

Akino is a cross-platform Akinator desktop client built with Electron, Vue 3, and TypeScript. It provides a Material You interface through MDUI and supports multiple languages.

## Features

- Electron desktop application for Windows, macOS, and Linux.
- MDUI Material You components and theme system.
- Complete Akinator game flow.
- Multi-language UI, switchable from Settings.
- Light, dark, and follow-system application themes.
- Akinator game setup for multiple game languages, plus Character, Objects, and Animals themes; supported combinations are limited by `Akinator`.
- HTTP proxy support.
- Windows, macOS, and Linux packages built with `electron-builder`.

## Tech Stack

| Category | Technology |
| --- | --- |
| Desktop runtime | Electron |
| UI framework | Vue 3 |
| Language | TypeScript |
| Build tooling | Vite, electron-vite |
| Component library | MDUI 2 |
| Routing | vue-router 5 |
| Internationalization | vue-i18n 11 |
| Preferences | electron-conf |
| Game client | akinator-client |
| Packaging | electron-builder |
| Auto updates | electron-updater |

## Project Structure

```text
akino/
├── build/                         # Build assets, such as icons and macOS entitlements
├── resources/                     # Runtime resources; currently includes the app icon
├── src/
│   ├── main/
│   │   ├── index.ts               # Electron main process, window, and game IPC
│   │   └── settingsSchema.ts      # electron-conf schema
│   ├── preload/
│   │   └── index.ts               # Safely exposes Electron, preferences, and Akino APIs
│   └── renderer/
│       ├── index.html             # Renderer HTML entry point
│       ├── typed-router.d.ts      # Generated route types
│       └── src/
│           ├── App.vue            # App shell and navigation rail
│           ├── main.ts            # Vue app entry point
│           ├── i18n.ts            # i18n initialization
│           ├── locales/           # zh-CN and en-US message bundles
│           ├── components/        # Shared components (e.g. WonDialog)
│           └── views/             # File-routed pages
├── electron.vite.config.ts        # Electron Vite configuration
├── electron-builder.yml           # Packaging configuration
├── package.json                   # Scripts and dependencies
└── tsconfig*.json                 # TypeScript configuration
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home page and application introduction |
| `/game/` | Select a game language and theme, then start a game |
| `/game/game` | Display the current question and five answer options, and show the final guess |
| `/settings` | Switch application language, theme, and proxy, and view project information |

## Prerequisites

- Node.js 22 or later; an LTS release is recommended.
- pnpm.
- Building macOS packages requires macOS. Building Windows and Linux packages requires the corresponding build environment or a cross-build environment supported by Electron Builder.

## Development

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts Electron in development mode and enables hot module replacement for the renderer.

## Type Checking and Building

```bash
pnpm build           # Type-check and build Electron artifacts
pnpm start           # Preview already-built artifacts
```

## Packaging

```bash
pnpm build:unpack    # Build an unpacked application directory
pnpm build:win       # Windows NSIS installer
pnpm build:mac       # macOS DMG
pnpm build:linux     # Linux AppImage, snap, and deb packages
```

The application ID is `top.adproqwq.akino`. Before publishing auto-updates, configure an actual update endpoint in `electron-builder.yml` and `dev-app-update.yml`.

## Donate

If you like this project, you can support the author by donating via [Afdian](https://afdian.com/a/Adpro). Your support helps keep the project maintained and growing.

## License

This project is open-sourced under the [MIT License](./LICENSE).