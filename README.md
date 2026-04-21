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
*This project is standardized for commercial deployment (v1.1.0).*
