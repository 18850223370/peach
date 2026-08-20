# GitHub Pages 静态部署包

这是已经编译完成的网站，可直接部署到 GitHub Pages。根目录的 `index.html` 已经引用 GitHub 仓库子路径 `/peach/` 下的资源，不会再请求 React 源码 `/src/main.jsx`。核心房间内容已随静态包提供，运行时不会请求未授权的 Sanity CMS 域名。

## 发布到当前仓库

1. 打开 [18850223370/peach](https://github.com/18850223370/peach)。
2. 用本文件夹内的**全部内容**覆盖仓库根目录内容；上传时不要把 `github-pages-static` 这一层目录一并套进去。
3. 提交到 `main` 分支。本包中的 `.github/workflows/static.yml` 会覆盖仓库原有的同名工作流。
4. 等待 `Deploy static website to GitHub Pages` 工作流完成。

网站会发布到 `https://18850223370.github.io/peach/`。本包包含 `.nojekyll` 和 `404.html`，因此可直接刷新网站内部地址。

不需要上传 `node_modules`，也不需要在 GitHub 上运行 `npm install` 或 `npm run build`。
