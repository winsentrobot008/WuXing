# WuXing Oracle (五行神谕)

**Eastern Mysticism & Spiritual Wellness App**

WuXing Oracle is a premium digital experience designed for the USA/Europe market, focusing on ancient Eastern wisdom and modern energetic healing. It provides personalized cosmic readings, wealth compasses, and daily spiritual guidance based on the Five Elements (WuXing) philosophy.

## 🌟 Core Features
- **Cosmic Reading**: Personalized daily analysis of your energetic essence.
- **Wealth & Romance Compass**: Dynamic SVG compass indicating auspicious directions.
- **Actionable Advice**: Daily color therapy and style recommendations with color dot visualization.
- **Freemium Paywall**: Access basic insights for free, with detailed reports unlockable via ads or premium subscription.
- **Spiritual Coffee**: Integrated "Buy me a coffee" feature for community support.
- **i18n Support**: Full support for English (default) and Chinese (Simplified).

## 🛠️ Technology Stack
- **Frontend**: Vanilla HTML5 + CSS3 + JavaScript (ES6+).
- **Computation**: [Lunar-JS](https://github.com/6tail/lunar-javascript) (loaded via CDN).
- **Design**: High-quality serif fonts (Playfair Display) with "Deep Purple & Gold" aesthetic.
- **i18n**: Dynamic locale loading via external JSON files.

## 🚀 Deployment & Packaging

### H5 Version
- **Mobile First**: Optimized for iPhone/Android browsers (max-width: 428px).
- **PWA Support**: Offline caching and "Add to Home Screen" support.
- **Deploy**: See [deploy-h5.md](deploy-h5.md) for Vercel/Netlify deployment instructions.
- **Current Version**: v1.1.0 (Mobile Optimized).

### Native APP
- **Packaging**: This project is modular and ready for native app wrapping.
- **Guide**: See [app-packaging.md](app-packaging.md) for HBuilder X/Capacitor instructions.

## 📖 Development & Maintenance
### Updating Algorithms
To modify the core Five Elements calculation, update the `runAnalysis` function in `script.js`. The UI is decoupled from the logic.

### Updating Libraries
If Lunar-JS releases a new version, update the CDN link version number in the `<head>` section of `index.html`.

### Future Expansion
- **New Modules**: Add new cards to the `fortune-report` container in `index.html` and populate them in `displayResult` in `script.js`.
- **Monetization**: Replace the mock paywall logic in `script.js` with real Google AdSense or Stripe integration.
- **Data Persistence**: Follow `docs/database_schema.md` to implement a real backend API, replacing the current `localStorage` mock.

---
7步可执行方法】
1. 找趋势：在App Store分类找爆发词，用Sensor Tower验证竞品数据
2. 定人群：聚焦特定活跃圈层（如女性护肤）
3. 做单机：专注单人使用场景，避免社交功能
4. 高分享：设计病毒传播点（如AI特效），让用户自发分享到TikTok
5. 减技术：复用现有API，用Cursor快速开发
6. 强分发：建立TikTok矩阵，在APP内设置引流入口
7. 卖时机：月收入达1-2万美金时，在Flippa平台套现

关键点：不创造新需求，只用AI翻新"老古董"APP；1个月内上线，不必完美。警惕两大陷阱：做市场不存在的产品；仅有代码缺乏流量矩阵。
AI算命爆火背后，是一场精准收割年轻人焦虑的赛博生意。59元解锁“命运真相”，实则是模板拼接的心理安慰剂。从八字到塔罗，披着科技外衣的玄学，靠巴纳姆效应与沉没成本陷阱，让百万用户心甘情愿买单。但别忘了：真正的命运，从不在算法里。
