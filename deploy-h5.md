# H5 部署指南

本项目已针对移动端 H5 进行优化，支持 PWA 离线访问。

## 快速部署方法

您可以将 `dist` 文件夹中的内容直接上传到以下免费静态托管平台：

1. **Vercel**: 
   - 访问 [vercel.com](https://vercel.com)
   - 登录后，直接将 `dist` 文件夹拖入网页上传区域即可。
2. **Netlify**:
   - 访问 [app.netlify.com/drop](https://app.netlify.com/drop)
   - 将 `dist` 文件夹拖入虚线框内。
3. **GitHub Pages**:
   - 将 `dist` 文件夹的内容推送到仓库的 `gh-pages` 分支。

## 本地预览

如果您想在手机上预览：
1. 确保手机和电脑在同一个 WiFi 下。
2. 在电脑终端运行 `python -m http.server 8080` 或 `npx serve dist`。
3. 在手机浏览器输入 `http://<电脑IP>:8080` 即可预览。

## 包含内容
- `index.html`: 主入口
- `style.css`: 压缩后的样式表（iPhone 14 Pro Max 适配）
- `script.js`: 压缩后的业务逻辑
- `manifest.json`: PWA 配置文件
- `service-worker.js`: 离线缓存支持
- `locales/`: 多语言资源文件 (中/英)
