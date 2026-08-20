# GitHub Pages 部署包

这个文件夹已经包含网站源码、静态资源和 GitHub Pages 自动部署工作流。仓库名可以任意设置，构建时会自动适配 `https://用户名.github.io/仓库名/` 形式的地址。

## 部署

1. 在 GitHub 新建一个仓库。
2. 将本文件夹内的全部内容推送到仓库根目录。仓库中应直接看到 `src`、`public`、`package.json` 和 `.github`，不要再在外面套一层文件夹。
3. 打开仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
5. 打开 `Actions`，等待 `Deploy website to GitHub Pages` 完成。以后每次向默认分支推送，网站都会自动重新部署。

部署完成后，网站地址会显示在工作流的 `deploy` 任务以及仓库的 `Settings` -> `Pages` 页面中。

## Git 命令

在本文件夹中执行以下命令，并将最后一行的仓库地址替换为你自己的地址：

```bash
git init
git add .
git commit -m "Deploy website"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 已包含的部署适配

- 自动适配任意 GitHub Pages 仓库路径。
- `/about`、`/gallery`、`/studio`、`/contact` 支持直接打开和刷新。
- Sanity 图片直接使用官方 CDN，不依赖 GitHub Pages 无法运行的 Cloudflare Function。
- 联系表单会自动允许当前 GitHub Pages 域名。
- 自动生成 `404.html` 和 `.nojekyll`。
- 未包含 `node_modules`、旧构建产物、Cloudflare 配置、未引用的备份贴图、临时文件和本地修改脚本。

本地开发仍可使用 `npm install` 和 `npm run dev`；本地构建使用 `npm run build`。部署不需要提交 `node_modules` 或 `dist`。

## 可选功能配置

网站本身无需密钥即可打开。若要让联系表单真正发送邮件，请在仓库的 `Settings` -> `Secrets and variables` -> `Actions` 中添加名为 `VITE_WEB3FORMS_KEY` 的 Repository secret。若需要 PostHog 统计，可另外添加 `VITE_POSTHOG_KEY` 和 `VITE_POSTHOG_HOST`；不添加时统计功能会自动跳过。
