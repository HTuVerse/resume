# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## GitHub Pages 部署

在仓库的 **Settings → Pages** 中，将 **Source** 设为 **GitHub Actions**。推送到 `main` 后，工作流会构建并发布 `dist`。也可在 **Actions → Deploy to GitHub Pages** 手动运行。

工作流会读取 Pages 的站点路径。使用自定义域名 `wihon.htverse.cn` 时发布到域名根目录，使用 GitHub 默认地址时发布到 `/resume/`。

在 `htverse.cn` 的 DNS 管理后台添加一条主机记录为 `wihon`、目标为 `htuverse.github.io` 的 CNAME 记录。回到 Pages 点击 **Check again**，待证书就绪后开启 **Enforce HTTPS**。

本地运行 `npm run dev`，或在构建后运行 `npm run preview`，打开终端显示的地址。
