# APP 打包指南 (未来规划)

当前项目已完成 Mobile First H5 改造，结构清晰，可轻松转换为原生 APP。

## 打包方案建议

### 1. 使用 HBuilder X (推荐，国内生态)
- **步骤**:
  1. 下载 [HBuilder X](https://www.dcloud.io/hbuilderx.html)。
  2. 创建“5+App”或“uni-app”项目。
  3. 将 `dist` 目录下的所有文件复制到项目的根目录。
  4. 修改 `manifest.json` 配置图标、名称及启动页。
  5. 点击“发行” -> “原生App云打包”。

### 2. 使用 Capacitor (跨平台标准)
- **步骤**:
  1. 在项目根目录运行 `npm install @capacitor/core @capacitor/cli`。
  2. 初始化: `npx cap init WuXing com.example.wuxing --web-dir dist`。
  3. 添加平台: `npx cap add ios` 或 `npx cap add android`。
  4. 同步代码: `npx cap copy`。
  5. 使用 Xcode 或 Android Studio 打开并打包。

## 注意事项
- **API 请求**: 打包后需注意跨域 (CORS) 问题，建议在 `manifest.json` 中配置白名单。
- **状态栏适配**: 建议在 `style.css` 中增加 `padding-top: env(safe-area-inset-top)` 以适配刘海屏。
- **离线能力**: PWA 提供的 `service-worker.js` 在原生 APP 环境中可能无法完全发挥作用，建议使用 Capacitor 的原生缓存插件。
