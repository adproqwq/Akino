# Contributing

Thank you for your interest in Akino! Whether you are fixing a bug, adding a feature, improving documentation, translating the UI, or simply reporting an issue — every contribution matters. Please take a few minutes to read this guide before submitting anything.

> This project is maintained according to the common open-source contribution standards below. Please read this document in full before contributing.

---

## Table of Contents

- [Contributing](#contributing)
  - [Table of Contents](#table-of-contents)
  - [Ways to Contribute](#ways-to-contribute)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Code Style](#code-style)
  - [Commit Message Guidelines](#commit-message-guidelines)
  - [AI-Assisted Contribution Policy](#ai-assisted-contribution-policy)
  - [Opening a Pull Request](#opening-a-pull-request)
  - [Code Review](#code-review)
  - [Reporting Issues](#reporting-issues)
  - [Code of Conduct](#code-of-conduct)
  - [License](#license)

---

## Ways to Contribute

You can contribute in any of the following ways:

- **Report a Bug**: When you find a crash, misbehavior, or build failure, first search the [Issues](https://github.com/adproqwq/akino/issues) to see whether it has already been reported. If not, open a new issue with reproduction steps, your environment (OS, Node.js version), and the expected vs. actual behavior.
- **Propose a Feature**: Describe the scenario and the desired effect in an issue, tagged `Feature`, for community discussion.
- **Submit Code**: Fix bugs, implement features, or refactor code, and submit it via a pull request.
- **Improve Documentation**: Fix mistakes in the README, comments, or typos, or add usage notes.
- **Translate**: Maintain the language packs under `src/renderer/src/locales/`, or translate this document and the README.
- **Join Discussions**: Answer questions in issues, take part in feature discussions, or review other people's pull requests.

## Prerequisites

- [Node.js](https://nodejs.org/) 22 or later (an LTS release is recommended).
- [pnpm](https://pnpm.io/) 11 or later (the project pins pnpm 11.24.0 via the `packageManager` field).
- A Git client.
- Packaging verification: building a macOS installer requires macOS; Windows and Linux installers require the corresponding platform or an environment supported by Electron Builder's cross-build.

## Local Development

```bash
# 1. Install dependencies
pnpm install          # or pnpm ci (strict install from the lockfile)

# 2. Start the dev mode (HMR enabled for the renderer)
pnpm dev

# 3. Build the artifacts
pnpm build            # runs the main / preload / renderer builds

# 4. Package installers (for local verification only; publishing is handled by CI / the Release workflow)
pnpm build:win        # Windows NSIS installer
pnpm build:mac        # macOS DMG
pnpm build:linux      # Linux AppImage / deb / snap
pnpm build:unpack     # Unpacked application directory
```

> Note: All packaging scripts run with `--publish never`, so they only produce artifacts locally and never trigger a publish.

## Code Style

- **Indentation & formatting**: follow the root `.editorconfig` (2-space indent, UTF-8, LF line endings, final newline).
- **Language**: TypeScript; prefer explicit type annotations and avoid `any`.
- **Main process** (`src/main/`): own the `AkinatorClient` lifecycle and the IPC surface. Do not call Node APIs directly from the frontend.
- **Preload script** (`src/preload/`): expose APIs securely through `contextBridge`, following the principle of least exposure.
- **Renderer** (`src/renderer/`): Vue 3 `<script setup lang="ts">` with the Composition API; after UI changes, self-test all three themes (light/dark/follow-system) and both Chinese and English.
- **Naming**: use meaningful English names for files, variables, and functions; PascalCase for components, camelCase elsewhere.
- **Self-check before submitting**:
  - Your code must build with `pnpm build`;
  - Avoid introducing new runtime dependencies; if truly necessary, explain why in the PR description.

## Commit Message Guidelines

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

Common types:

| Type | Purpose |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting that does not affect logic |
| `refactor` | Refactoring (no behavior change) |
| `perf` | Performance improvement |
| `test` | Adding or modifying tests |
| `chore` | Build, dependencies, tooling, misc |
| `i18n` | Language pack / translation changes |

Examples:

```
fix(game): prevent answering from triggering two requests
feat(settings): support configuring an HTTP proxy
docs: add development documentation
```

## AI-Assisted Contribution Policy

This project **allows the use of AI-assisted tools** (such as code generation, autocomplete, translation, documentation writing, test writing, etc.) to complete contributions — but **all AI-generated or AI-assisted changes must be reviewed by a human before submission**.

Specifically:

1. **Human ownership**: AI is a tool; the contributor is the final owner of the submitted content. Submitting a PR means you have reviewed and understand every line of the change and can explain any part of it.
2. **Human audit checklist** (every item must be satisfied):
   - **Correctness**: the change matches the issue / requirement, the logic is sound, and edge cases are covered;
   - **Security**: no credentials, tokens, internal paths, or sensitive data are introduced; pay extra attention to changes involving external input and IPC;
   - **Compliance**: new dependencies and code snippets meet open-source license requirements and do not introduce controversial licenses;
   - **Consistency**: follows the Code Style above and stays consistent with the existing codebase architecture;
   - **Maintainability**: clear naming, no dead code, comments explain "why" rather than "what".
3. **Required verification**: AI-generated changes must be verified by actually running them (at least `pnpm build` must pass; for behavior changes, self-test with `pnpm dev`). Do not submit unverified changes.
4. **Disclosure (recommended)**: mention in the PR description that "this change used an AI-assisted tool (e.g., ...)" so maintainers can review it accordingly; if undisclosed, the maintainers will review it through the normal process.
5. **Prohibited**:
   - Never feed secrets or tokens to AI tools;
   - Never submit un-reviewed, raw AI output (including code that merely "looks reasonable" but was never verified);
   - Never use AI to mass-generate low-quality, meaningless changes to inflate contribution counts;
   - Never try to bypass the human audit process by asking AI to "merge directly".

Maintainers reserve the right to ask you to explain the origin of any piece of code at any time. AI-generated content that cannot pass the audit will be requested for revision or rejected.

## Opening a Pull Request

1. **Fork and branch**: create a feature branch from `main`, e.g. `fix/xxx` or `feat/xxx`.
2. **Stay in sync**: sync with the upstream `main` before submitting to avoid conflicts.
3. **One PR, one problem**: keep changes small and focused for easier review and rollback.
4. **Write a clear description**: explain the motivation, the changes, how you verified them, and link the related issue (e.g. `Fixes #123`).
5. **Pass CI**: make sure the Build workflow (three platforms) in GitHub Actions passes before requesting a merge.
6. **Reviewability**: for large changes, include test steps in the description so maintainers can reproduce.

## Code Review

- Every PR requires a maintainer's approval before merging.
- Review focuses on: correctness, security, architectural consistency, naming and readability, and edge-case coverage.
- A `request changes` on your PR is a normal part of the process; discussions should aim to solve problems and stay friendly.

## Reporting Issues

When opening an issue, please provide:

- Steps to reproduce and the expected vs. actual behavior;
- OS and version, Node.js / pnpm versions;
- Screenshots or recordings, if it is a UI issue.

For security-sensitive problems (e.g., remote code execution, credential leakage), please use **GitHub Private Vulnerability Reporting** instead of a public issue, so users still on old versions are not put at risk.

## Code of Conduct

This project aims to foster an open and friendly community. Please:

- Use polite, professional language;
- Respect different experience levels and viewpoints;
- Be patient with newcomers and constructive in criticism;
- No personal attacks, harassment, or discriminatory language.

Violations may lead to removal from discussions and collaboration.

## License

By submitting contributions (code, documentation, translations, etc.), you agree that they are released under the project's [MIT License](./LICENSE). If in doubt, talk to the maintainers before submitting.

---

Thank you for contributing! If you have any questions, feel free to open an issue, or support the project via [Afdian](https://afdian.com/a/Adpro).