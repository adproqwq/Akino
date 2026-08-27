# Akino

<p align="center">
  <a href="./README.md">中文</a> · <a href="./README_en.md">English</a>
</p>

Akino is a cross-platform Akinator desktop client built with Electron, Vue 3, and TypeScript. It provides a Material You interface through MDUI, supports Chinese and English UI languages, game-language selection, and light, dark, and follow-system themes.

> The project is under active development. The desktop shell, navigation, preference persistence, Akinator session initialization, and first-question retrieval are connected; the full answer loop and final guessing flow are still being completed.

## Features

- Electron desktop application for Windows, macOS, and Linux.
- Vue 3 single-page renderer with file-based routing.
- MDUI Material You components and theme system.
- Chinese and English UI, switchable and persisted from Settings.
- Light, dark, and follow-system application themes.
- Akinator game setup for Chinese, English, and Japanese plus Character, Objects, and Animals themes; supported combinations are determined by `akinator-client`.
- Electron IPC bridge for initializing a game and requesting its first question.
- Persistent user preferences through `electron-conf`.
- Includes the `electron-updater` dependency for a future auto-update integration.
- Windows, macOS, and Linux packaging through `electron-builder`.

## Tech Stack

| Category | Technology |
| --- | --- |
| Desktop runtime | Electron 43 |
| UI framework | Vue 3 |
| Language | TypeScript |
| Build tooling | Vite, electron-vite |
| Component library | MDUI 2 |
| Routing | vue-router 5, unplugin-vue-router |
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
│   │   ├── index.ts               # Safely exposes Electron, preferences, and Akino APIs
│   │   └── index.d.ts             # Preload API type declarations
│   └── renderer/
│       ├── index.html             # Renderer HTML entry point
│       ├── typed-router.d.ts      # Generated route types
│       └── src/
│           ├── App.vue            # App shell and navigation rail
│           ├── main.ts            # Vue app entry point
│           ├── i18n.ts            # i18n initialization
│           ├── locales/           # zh-CN and en-US message bundles
│           └── views/             # File-routed pages
├── electron.vite.config.ts        # Electron Vite configuration
├── electron-builder.yml           # Packaging configuration
├── package.json                   # Scripts and dependencies
└── tsconfig*.json                 # TypeScript configuration
```

## Architecture

Akino follows Electron's three-process-layer model:

- **Main process**: Creates the `BrowserWindow`, hides the application menu, opens external links in the system browser, creates `AkinatorClient`, and handles game IPC.
- **Preload script**: Exposes `window.akino` from a context-isolated environment. It currently provides `start(language, theme)` and `getFirstQuestion()`. Preferences are exposed via `electron-conf`.
- **Renderer process**: Runs the Vue 3 single-page app for navigation, settings, i18n, and the game interface.

The current game start flow is:

1. Select a game language and theme on the game setup page.
2. The page calls `akino.start(language, theme)`, notifying the main process over IPC to create an `AkinatorClient`.
3. The renderer navigates to the game page.
4. The game page calls `akino.getFirstQuestion()`, which starts the session in the main process and returns its first question.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home page and application introduction |
| `/game/` | Select a game language and theme, then start a game |
| `/game/game` | Display the current question and five answer options |
| `/settings` | Switch UI language and theme, and view project information |

## Current Limitations

- The game page currently requests and displays only the first question.
- Selecting an answer currently only logs the choice; it does not request the next question from Akinator.
- Going back, continuing, submitting a win, and displaying the final guess are not implemented.
- `window.akino` does not yet expose subsequent game methods such as `answer`.
- The Akinator proxy in the main process is hard-coded as `http://192.168.111.6:10808`. Make it configurable, or remove it, before deploying in other environments.
- The auto-update URL is still the placeholder `https://example.com/auto-updates`.
- No open-source license has been declared.

## Prerequisites

- Node.js 18 or later; an LTS release is recommended.
- pnpm.
- Building macOS packages requires macOS. Windows and Linux packages require the respective environment or an Electron Builder-supported cross-build setup.

## Development

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts Electron in development mode and enables hot module replacement for the renderer.

## Type Checking and Building

```bash
pnpm typecheck       # Type-check main, preload, and renderer code
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

## Configuration

User preferences are stored in the user data directory through `electron-conf`:

| Key | Default | Description |
| --- | --- | --- |
| `lang` | `zh-CN` | UI language: `zh-CN` or `en-US` |
| `theme` | `followSystem` | UI theme: `light`, `dark`, or `followSystem` |

## License

No open-source license has been declared for this project.
