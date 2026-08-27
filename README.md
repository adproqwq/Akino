# Akino

<p align="center">
  <a href="./README.md">中文</a> · <a href="./README_en.md">English</a>
</p>

Akino 是一个基于 Electron、Vue 3 和 TypeScript 的跨平台 Akinator 桌面客户端。它使用 MDUI 提供 Material You 风格界面，支持多语言。

## 功能

- 基于 Electron 的 Windows、macOS 和 Linux 桌面应用。
- MDUI Material You 组件和主题系统。
- 完整的 Akinator 游戏流程。
- 多语言界面，可在设置页切换。
- 亮色、暗色、跟随系统三种界面主题。
- Akinator 游戏设置：多国语言游戏语言，以及人物、物品、动物主题（具体可用组合由 `Akinator` 限制）。
- HTTP 代理支持。
- 使用 `electron-builder` 构建 Windows、macOS 和 Linux 安装包。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 桌面运行时 | Electron |
| UI 框架 | Vue 3 |
| 开发语言 | TypeScript |
| 构建工具 | Vite、electron-vite |
| 组件库 | MDUI 2 |
| 路由 | vue-router 5 |
| 国际化 | vue-i18n 11 |
| 配置存储 | electron-conf |
| 游戏接口 | akinator-client |
| 安装包 | electron-builder |

## 项目结构

```text
akino/
├── build/                         # 构建资源，例如图标和 macOS 权限文件
├── resources/                     # 运行时资源，当前包含应用图标
├── src/
│   ├── main/
│   │   ├── index.ts               # Electron 主进程、窗口和游戏 IPC
│   │   └── settingsSchema.ts      # electron-conf 配置 schema
│   ├── preload/
│   │   └── index.ts               # 安全暴露 Electron、配置和 Akino API
│   └── renderer/
│       ├── index.html             # 渲染进程 HTML 入口
│       ├── typed-router.d.ts      # 自动生成的路由类型
│       └── src/
│           ├── App.vue            # 应用壳和侧边导航
│           ├── main.ts            # Vue 应用入口
│           ├── i18n.ts            # 国际化初始化
│           ├── locales/           # zh-CN 与 en-US 语言包
│           ├── components/        # 公用组件
│           └── views/             # 文件路由页面
├── electron.vite.config.ts        # Electron Vite 构建配置
├── electron-builder.yml           # 安装包配置
├── package.json                   # 脚本和依赖
└── tsconfig*.json                 # TypeScript 配置
```

## 页面

| 路径 | 用途 |
| --- | --- |
| `/` | 首页和应用简介 |
| `/game/` | 选择游戏语言、游戏主题并开始游戏 |
| `/game/game` | 显示当前问题和五种回答选项，以及展示猜测结果 |
| `/settings` | 切换应用语言、界面主题、代理配置和查看项目信息 |

## 环境要求

- Node.js 22 或更高版本，建议使用 LTS。
- pnpm。
- 构建 macOS 安装包需要 macOS；构建 Windows、Linux 安装包需要对应的构建环境或 Electron Builder 支持的交叉构建环境。

## 开始开发

```bash
pnpm install
pnpm dev
```

`pnpm dev` 会启动 Electron 开发模式，并启用渲染进程热更新。

## 类型检查与构建

```bash
pnpm build           # 类型检查并构建 Electron 产物
pnpm start           # 预览已经构建的产物
```

## 打包

```bash
pnpm build:unpack    # 构建并生成未打包目录
pnpm build:win       # Windows NSIS 安装包
pnpm build:mac       # macOS DMG
pnpm build:linux     # Linux AppImage、snap 和 deb
```

安装包的应用 ID 为 `top.adproqwq.akino`。发布自动更新前，请在 `electron-builder.yml` 和 `dev-app-update.yml` 中配置实际的更新服务地址。

## 贡献

欢迎参与贡献！请阅读 [贡献指南](./CONTRIBUTION.md) 了解贡献方式、代码规范与 AI 辅助贡献政策。

## 捐赠

如果你喜欢这个项目，可以通过 [爱发电](https://afdian.com/a/Adpro) 捐赠支持作者。你的支持将帮助项目持续维护和发展。

## 许可证

本项目使用 [MIT 许可证](./LICENSE) 开源。
