# Akino

<p align="center">
  <a href="./README.md">中文</a> · <a href="./README_en.md">English</a>
</p>

Akino 是一个基于 Electron、Vue 3 和 TypeScript 的跨平台 Akinator 桌面客户端。它使用 MDUI 提供 Material You 风格界面，支持中英文界面、游戏语言选择以及浅色、深色和跟随系统主题。

> 项目目前处于开发阶段。桌面窗口、导航、设置持久化、Akinator 会话启动和首题获取已经接入；完整的连续答题流程和最终猜测流程仍在完善中。

## 功能

- 基于 Electron 的 Windows、macOS 和 Linux 桌面应用。
- Vue 3 单页渲染界面与文件路由。
- MDUI Material You 组件和主题系统。
- 中文、英文界面，可在设置页切换并持久化。
- 亮色、暗色、跟随系统三种界面主题。
- Akinator 游戏设置：中文、英文、日文游戏语言，以及人物、物品、动物主题（具体可用组合由 `akinator-client` 决定）。
- 通过 Electron IPC 在渲染进程和主进程之间传递游戏启动与首题请求。
- 使用 `electron-conf` 保存用户偏好。
- 已包含 `electron-updater` 依赖，可用于后续接入自动更新。
- 使用 `electron-builder` 构建 Windows、macOS 和 Linux 安装包。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 桌面运行时 | Electron 43 |
| UI 框架 | Vue 3 |
| 开发语言 | TypeScript |
| 构建工具 | Vite、electron-vite |
| 组件库 | MDUI 2 |
| 路由 | vue-router 5、unplugin-vue-router |
| 国际化 | vue-i18n 11 |
| 配置存储 | electron-conf |
| 游戏接口 | akinator-client |
| 安装包 | electron-builder |
| 自动更新 | electron-updater |

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
│   │   ├── index.ts               # 安全暴露 Electron、配置和 Akino API
│   │   └── index.d.ts             # 预加载 API 类型声明
│   └── renderer/
│       ├── index.html             # 渲染进程 HTML 入口
│       ├── typed-router.d.ts      # 自动生成的路由类型
│       └── src/
│           ├── App.vue            # 应用壳和侧边导航
│           ├── main.ts            # Vue 应用入口
│           ├── i18n.ts            # 国际化初始化
│           ├── locales/           # zh-CN 与 en-US 语言包
│           └── views/             # 文件路由页面
├── electron.vite.config.ts        # Electron Vite 构建配置
├── electron-builder.yml           # 安装包配置
├── package.json                   # 脚本和依赖
└── tsconfig*.json                 # TypeScript 配置
```

## 应用架构

Akino 遵循 Electron 的主进程、预加载脚本、渲染进程三层结构：

- **主进程**：创建 `BrowserWindow`，隐藏应用菜单，拦截窗口打开请求并使用系统浏览器打开外部链接；同时创建 `AkinatorClient` 并处理游戏 IPC。
- **预加载脚本**：在 context isolation 环境下暴露 `window.akino`，目前包括 `start(language, theme)` 和 `getFirstQuestion()`；配置通过 `electron-conf` 暴露给渲染进程。
- **渲染进程**：运行 Vue 3 单页应用，负责导航、设置、国际化和游戏页面。

游戏启动流程如下：

1. 用户在游戏设置页选择游戏语言和主题。
2. 页面调用 `akino.start(language, theme)`，通过 IPC 通知主进程创建 `AkinatorClient`。
3. 页面跳转到游戏页。
4. 游戏页调用 `akino.getFirstQuestion()`，由主进程启动会话并返回首题。

## 页面

| 路径 | 用途 |
| --- | --- |
| `/` | 首页和应用简介 |
| `/game/` | 选择游戏语言、游戏主题并开始游戏 |
| `/game/game` | 显示当前问题和五种回答选项 |
| `/settings` | 切换应用语言、界面主题和查看项目信息 |

## 当前限制

- 游戏页目前只请求并显示首题。
- 点击回答选项目前只记录选择，不会调用 Akinator 接口获取下一题。
- 尚未实现返回上一题、继续游戏、提交胜利结果和最终猜测展示。
- `window.akino` 尚未暴露 `answer` 等后续游戏方法。
- 主进程中的 Akinator 代理地址目前是硬编码的 `http://192.168.111.6:10808`，部署或在其他网络环境运行前应改为配置项或可选代理。
- 自动更新发布地址仍是占位地址 `https://example.com/auto-updates`。
- 项目尚未声明开源许可证。

## 环境要求

- Node.js 18 或更高版本，建议使用 LTS。
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
pnpm typecheck       # 检查主进程、预加载和渲染进程类型
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

## 配置

用户偏好由 `electron-conf` 保存到用户数据目录：

| 键 | 默认值 | 说明 |
| --- | --- | --- |
| `lang` | `zh-CN` | 应用界面语言，可选 `zh-CN` 或 `en-US` |
| `theme` | `followSystem` | 界面主题，可选 `light`、`dark` 或 `followSystem` |

## 许可证

当前项目尚未声明开源许可证。
