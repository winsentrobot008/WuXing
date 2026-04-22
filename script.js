/**
 * script.js - WuXing Oracle Core Logic
 * Optimized for Actionable Fortune Reports & Ad-based Retention.
 */

// 1. Config & Global State
let currentLang = localStorage.getItem('lang') || 'en';
let freeCount = parseInt(localStorage.getItem('freeCount')) || 0;
let translations = {};
let translationsReady = false;

const t = (key, fallback) => {
    const v = translations?.[key];
    if (typeof v === 'string' && v.trim().length > 0) return v;
    if (typeof fallback === 'string') return fallback;
    return key;
};

// 2. Internationalization (i18n)
async function loadTranslations(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status} when loading locales/${lang}.json`);
        translations = await response.json();
        translationsReady = true;
        translatePage();
        
        // Refresh result display if exists
        const saved = localStorage.getItem('savedResult');
        if (saved) displayResult(JSON.parse(saved));
    } catch (error) {
        translationsReady = false;
        console.error('Failed to load translations:', error);
        if (location.protocol === 'file:') {
            alert("你正在用 file:// 方式打开页面，浏览器会阻止 fetch 本地 JSON（语言包）。请用本地静态服务器启动（例如：npx serve 或 python http.server），否则语言切换与结果渲染会异常。");
        }
    }
}

function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[key];
            } else if (key === 'legal_notice') {
                el.innerHTML = translations[key];
            } else {
                el.textContent = translations[key];
            }
        }
    });
    document.getElementById('lang-btn').textContent = currentLang === 'en' ? 'EN' : '中文';
}

// 3. UI Helpers
function showModal(id) { document.getElementById(id).classList.add('active'); }
function hideModal(id) { document.getElementById(id).classList.remove('active'); }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
    try {
        checkSavedResult();
    } catch (e) {
        console.error('Failed to restore saved result:', e);
        localStorage.removeItem('savedResult');
    }
    initEvents();
    updateUserUI();

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('SW registered!', reg))
                .catch(err => console.log('SW registration failed:', err));
        });
    }
});

function checkSavedResult() {
    const saved = localStorage.getItem('savedResult');
    if (saved) {
        const result = JSON.parse(saved);
        displayResult(result);
        switchView('result-view');
    }
}

function initEvents() {
    const safeAddEvent = (id, event, callback) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(event, callback);
    };

    safeAddEvent('lang-btn', 'click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('lang', currentLang);
        loadTranslations(currentLang);
    });

    safeAddEvent('analyze-btn', 'click', () => {
        const saved = localStorage.getItem('savedResult');
        if (saved) {
            switchView('result-view');
            return;
        }
        if (freeCount >= 1) {
            showModal('ad-modal');
        } else {
            runAnalysis();
        }
    });

    safeAddEvent('watch-ad-btn', 'click', () => {
        const isPaywall = document.getElementById('result-view').classList.contains('active');
        showAd(isPaywall ? 'paywall' : 'reset');
    });
    
    safeAddEvent('ad-next-day-btn', 'click', () => showAd(false));
    safeAddEvent('close-modal', 'click', () => hideModal('ad-modal'));
    
    safeAddEvent('restart-btn', 'click', () => {
        localStorage.removeItem('freeCount');
        localStorage.removeItem('savedResult');
        location.reload();
    });

    safeAddEvent('back-home-btn', 'click', () => {
        switchView('home-view');
    });

    safeAddEvent('unlock-btn', 'click', () => {
        showModal('ad-modal');
    });

    safeAddEvent('coffee-btn', 'click', () => {
        alert(t('alert_coffee', currentLang === 'zh' ? '感谢您的灵性咖啡！ ☕' : 'Thank you for the spiritual coffee! ☕'));
    });

    safeAddEvent('premium-btn', 'click', () => {
        hideModal('ad-modal');
        const overlay = document.getElementById('paywall-overlay');
        if (overlay) overlay.style.display = 'none';
        localStorage.setItem('is_vip', 'true');
        updateUserUI();
    });

    // Login Events
    safeAddEvent('user-profile', 'click', () => showModal('login-modal'));
    safeAddEvent('close-login', 'click', () => hideModal('login-modal'));
    
    safeAddEvent('guest-login-btn', 'click', () => {
        hideModal('login-modal');
        localStorage.setItem('user_logged_in', 'true');
        updateUserUI();
    });

    safeAddEvent('email-login-btn', 'click', () => {
        const emailEl = document.getElementById('login-email');
        const email = emailEl ? emailEl.value : '';
        if (email) {
            alert(t('alert_login_success', currentLang === 'zh' ? '登录成功！' : 'Login successful!'));
            hideModal('login-modal');
            localStorage.setItem('user_logged_in', 'true');
            localStorage.setItem('user_email', email);
            updateUserUI();
        } else {
            alert(t('alert_enter_email', currentLang === 'zh' ? '请输入邮箱。' : 'Please enter an email.'));
        }
    });
}

function updateUserUI() {
    const userId = localStorage.getItem('user_id');
    const icon = document.getElementById('user-icon');
    if (userId) {
        icon.textContent = '👤✅';
        icon.title = userId;
    }
}

function updateLanguage() {
    const data = i18n[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            if (key === 'legal_notice') {
                el.innerHTML = data[key];
            } else {
                el.textContent = data[key];
            }
        }
    });
}

function runAnalysis() {
    const dateInput = document.getElementById('birth-date').value;
    const hourInput = parseInt(document.getElementById('birth-hour').value);

    if (!dateInput) {
        alert(t('alert_select_date', currentLang === 'zh' ? '请选择出生日期。' : 'Please select a birth date.'));
        return;
    }

    try {
        const [y, m, d] = dateInput.split('-').map(Number);
        const lunar = Lunar.fromDate(new Date(y, m - 1, d, hourInput, 0, 0));
        const eightChar = lunar.getEightChar();

        // Calculate Wuxing Strength
        const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        const mapping = {
            '甲':'wood','乙':'wood','寅':'wood','卯':'wood',
            '丙':'fire','丁':'fire','巳':'fire','午':'fire',
            '戊':'earth','己':'earth','辰':'earth','戌':'earth','丑':'earth','未':'earth',
            '庚':'metal','辛':'metal','申':'metal','酉':'metal',
            '壬':'water','癸':'water','亥':'water','子':'water'
        };
        [eightChar.getYearGan(), eightChar.getYearZhi(), eightChar.getMonthGan(), eightChar.getMonthZhi(),
         eightChar.getDayGan(), eightChar.getDayZhi(), eightChar.getTimeGan(), eightChar.getTimeZhi()].forEach(c => counts[mapping[c]]++);

        const result = {
            pillars: [eightChar.getYear(), eightChar.getMonth(), eightChar.getDay(), eightChar.getTime()],
            counts: counts,
            date: dateInput
        };

        localStorage.setItem('savedResult', JSON.stringify(result));
        
        // Show paywall for new results
        const overlay = document.getElementById('paywall-overlay');
        if (overlay) overlay.style.display = 'flex';
        
        displayResult(result);
        switchView('result-view');

        freeCount++;
        localStorage.setItem('freeCount', freeCount);

    } catch (e) {
        console.error(e);
        alert("Error. Please check the date.");
    }
}

function displayResult(result) {
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value ?? '';
    };

    // 1. Energy Bars
    const max = Math.max(...Object.values(result.counts), 1);
    for (const [el, count] of Object.entries(result.counts)) {
        const bar = document.getElementById(`bar-${el}`);
        if (bar) bar.style.width = `${(count / max) * 100}%`;
    }

    // 2. Scene Conclusion
    const dominant = Object.keys(result.counts).reduce((a, b) => result.counts[a] > result.counts[b] ? a : b);
    const dominantEl = document.getElementById('dominant-element-display');
    if (dominantEl) dominantEl.className = `dominant-element-art art-${dominant}`;
    setText('dominant-text', t(`el_${dominant}`, dominant.toUpperCase()));
    setText('scene-conclusion', t(`scene_${dominant}`, ''));
    
    // 3. Harmony Practice
    const tipsList = document.getElementById('balance-tips');
    if (tipsList) {
        tipsList.innerHTML = getHarmonyTips(dominant).map(t => `<li>${t}</li>`).join('');
    }

    // 4. Fortune Report Modules (aligned with current HTML)
    const fortune = getFortuneTips(dominant);
    setText('wealth-desc', fortune?.wealth);
    setText('harmony-desc', fortune?.zen);
    setText('time-desc', fortune?.time);
    setText('insight-text', t(`scene_${dominant}`, ''));

    // 5. Compass Rotation
    const compassDegrees = { 'N': 0, 'NE': 45, 'E': 90, 'SE': 135, 'S': 180, 'SW': 225, 'W': 270, 'NW': 315 };
    const targetDir = fortune.direction;
    const rotation = compassDegrees[targetDir] || 0;
    const pointer = document.getElementById('wealth-pointer');
    if (pointer) pointer.setAttribute('transform', `rotate(${rotation}, 50, 50)`);

    // 6. Colors
    const luckyBox = document.getElementById('lucky-color-box');
    if (luckyBox) luckyBox.style.backgroundColor = fortune?.colors?.lucky?.code ?? '';
    setText('lucky-color-text', fortune?.colors?.lucky?.name);

    const avoidBox = document.getElementById('avoid-color-box');
    if (avoidBox) avoidBox.style.backgroundColor = fortune?.colors?.avoid?.code ?? '';
    setText('avoid-color-text', fortune?.colors?.avoid?.name);

    // 8. De-emphasized Pillars Footer
    const footer = document.getElementById('bazi-footer-text');
    const footerTpl = t('pillars_footer', '');
    if (footer && footerTpl) {
        footer.textContent = footerTpl
            .replace('{0}', result.pillars[0])
            .replace('{1}', result.pillars[1])
            .replace('{2}', result.pillars[2])
            .replace('{3}', result.pillars[3]);
    }

    // 9. Quote
    displayDailyQuote(dominant);
}

function getFortuneTips(el) {
    const isZh = currentLang === 'zh';
    const pools = {
        wood: {
            wealth: isZh ? "财神方位：东南方。今日适合开启新项目或进行创意投资。" : "Wealth Direction: SE. Ideal for new projects or creative investments.",
            direction: 'SE',
            colors: { lucky: { name: isZh ? "翠绿色" : "Emerald", code: "#50C878" }, avoid: { name: isZh ? "纯白色" : "Pure White", code: "#FFFFFF" } },
            zen: isZh ? "清晨进行一次深呼吸冥想，感受生命的成长。" : "Morning deep breathing meditation; feel the growth of life.",
            time: "03:00 - 07:00"
        },
        fire: {
            wealth: isZh ? "财神方位：正南方。社交活动将带来意外的财务契机。" : "Wealth Direction: S. Social activities will bring unexpected financial opportunities.",
            direction: 'S',
            colors: { lucky: { name: isZh ? "朱红色" : "Vermilion", code: "#FF4500" }, avoid: { name: isZh ? "深蓝色" : "Deep Blue", code: "#00008B" } },
            zen: isZh ? "点燃一支香薰，让思绪随烟雾升腾，释放压力。" : "Light an incense; let thoughts rise with smoke to release stress.",
            time: "09:00 - 13:00"
        },
        earth: {
            wealth: isZh ? "财神方位：西南方。稳健的理财策略今日最为奏效。" : "Wealth Direction: SW. Steady financial strategies work best today.",
            direction: 'SW',
            colors: { lucky: { name: isZh ? "土黄色" : "Ochre", code: "#DAA520" }, avoid: { name: isZh ? "嫩绿色" : "Soft Green", code: "#90EE90" } },
            zen: isZh ? "赤脚走在草地上，重新建立与大地的链接。" : "Walk barefoot on grass; reconnect with the Earth.",
            time: "13:00 - 17:00"
        },
        metal: {
            wealth: isZh ? "财神方位：正西方。专注细节，合同签署或谈判将顺利。" : "Wealth Direction: W. Focus on details; contract signing or negotiations will go smoothly.",
            direction: 'W',
            colors: { lucky: { name: isZh ? "亮银色" : "Silver", code: "#C0C0C0" }, avoid: { name: isZh ? "火红色" : "Fiery Red", code: "#FF0000" } },
            zen: isZh ? "整理你的办公空间，清空物理与心理的杂物。" : "Organize your workspace; clear physical and mental clutter.",
            time: "15:00 - 19:00"
        },
        water: {
            wealth: isZh ? "财神方位：正北方。灵活应对变动，财富藏在信息差中。" : "Wealth Direction: N. Be flexible; wealth is hidden in information gaps.",
            direction: 'N',
            colors: { lucky: { name: isZh ? "黛黑色" : "Midnight", code: "#1A1A2E" }, avoid: { name: isZh ? "明黄色" : "Bright Yellow", code: "#FFFF00" } },
            zen: isZh ? "睡前聆听流水声，让智慧在潜意识中静静流淌。" : "Listen to water sounds before bed; let wisdom flow in your subconscious.",
            time: "21:00 - 01:00"
        }
    };
    return pools[el];
}

function getHarmonyTips(el) {
    const isZh = currentLang === 'zh';
    const pools = {
        wood: [isZh ? "🌱 减少咖啡因，多喝绿茶疏理肝气" : "🌱 Reduce caffeine, try green tea.", isZh ? "🌱 工作间隙远眺绿色" : "🌱 Look at greenery during breaks."],
        fire: [isZh ? "🔥 下午三点后静坐，平复心火" : "🔥 Meditate after 3 PM.", isZh ? "🔥 饮食清淡，避开辛辣" : "🔥 Keep meals light and mild."],
        earth: [isZh ? "⛰️ 饭后百步走，促进运化" : "⛰️ Walk 100 steps after meals.", isZh ? "⛰️ 减少思虑，专注当下" : "⛰️ Focus on the present moment."],
        metal: [isZh ? "⚔️ 减少辛辣刺激，保护肺金" : "⚔️ Reduce spicy food; protect your lungs.", isZh ? "⚔️ 精简待办清单" : "⚔️ Simplify your to-do list."],
        water: [isZh ? "💧 晚间热水泡脚，温养肾气" : "💧 Warm foot bath at night to nourish kidney Qi.", isZh ? "💧 睡前听流水声助眠" : "💧 Listen to water sounds for sleep."]
    };
    return pools[el];
}

function displayDailyQuote(el) {
    const isZh = currentLang === 'zh';
    const quotes = {
        wood: { q: isZh ? "“像森林一样生长。”" : "“Grow like a forest.”", s: isZh ? "《黄帝内经》：肝者，将军之官。" : "Neijing: The liver is the general." },
        fire: { q: isZh ? "“照亮未知的路。”" : "“Light the unknown path.”", s: isZh ? "《黄帝内经》：心者，君主之官。" : "Neijing: The heart is the monarch." },
        earth: { q: isZh ? "“厚德方能载物。”" : "“Great virtue bears much.”", s: isZh ? "《黄帝内经》：脾者，仓廪之官。" : "Neijing: The spleen is the granary official." },
        metal: { q: isZh ? "“在寂静中升华。”" : "“Sublime in silence.”", s: isZh ? "《黄帝内经》：肺者，相傅之官。" : "Neijing: The lungs are the mentor." },
        water: { q: isZh ? "“上善若水。”" : "“Highest good is like water.”", s: isZh ? "《黄帝内经》：肾者，作强之官。" : "Neijing: The kidney is the power." }
    };
    const qEl = document.getElementById('daily-quote');
    if (qEl) qEl.textContent = quotes[el].q;
    const sEl = document.getElementById('daily-science');
    if (sEl) sEl.textContent = quotes[el].s;
}

function showAd(mode) {
    hideModal('ad-modal');
    const overlay = document.getElementById('ad-overlay');
    const timerNum = document.getElementById('timer-num');
    if (!overlay || !timerNum) return;
    overlay.classList.add('active');
    let count = 5;
    timerNum.textContent = count;
    const interval = setInterval(() => {
        count--;
        timerNum.textContent = count;
        if (count <= 0) {
            clearInterval(interval);
            overlay.classList.remove('active');
            
            if (mode === 'paywall') {
                const paywall = document.getElementById('paywall-overlay');
                if (paywall) paywall.style.display = 'none';
                alert(t('alert_unlocked', currentLang === 'zh' ? '完整报告已解锁！ ✨' : 'Full Report Unlocked! ✨'));
            } else if (mode === 'reset') {
                freeCount = 0;
                localStorage.setItem('freeCount', 0);
                localStorage.removeItem('savedResult');
                alert(t('alert_reset', currentLang === 'zh' ? '访问已重置！您可以再次测算。' : 'Access Reset! You can measure again.'));
                location.reload();
            } else {
                alert(t('alert_tomorrow', currentLang === 'zh' ? '明日测算资格已解锁！明天见。' : "Tomorrow's access unlocked! See you then."));
            }
        }
    }, 1000);
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function showModal(id) { document.getElementById(id).classList.add('active'); }
function hideModal(id) { document.getElementById(id).classList.remove('active'); }
