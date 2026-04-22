/**
 * script.js - WuXing Oracle Core Logic
 * Optimized for Actionable Fortune Reports & Ad-based Retention.
 */

const i18n = {
    en: {
        hero_title: "Discover Your Cosmic Blueprint",
        hero_subtitle: "Enter your birth details for a deep healing insight.",
        label_birthdate: "Birth Date",
        label_birthhour: "Birth Hour (Shengchen)",
        hour_zi: "Zi (23:00 - 01:00)",
        hour_chou: "Chou (01:00 - 03:00)",
        hour_yin: "Yin (03:00 - 05:00)",
        hour_mao: "Mao (05:00 - 07:00)",
        hour_chen: "Chen (07:00 - 09:00)",
        hour_si: "Si (09:00 - 11:00)",
        hour_wu: "Wu (11:00 - 13:00)",
        hour_wei: "Wei (13:00 - 15:00)",
        hour_shen: "Shen (15:00 - 17:00)",
        hour_you: "You (17:00 - 19:00)",
        hour_xu: "Xu (19:00 - 21:00)",
        hour_hai: "Hai (21:00 - 23:00)",
        btn_start: "Start Analysis",
        result_title: "Your Healing Insight",
        el_wood: "Wood",
        el_fire: "Fire",
        el_earth: "Earth",
        el_metal: "Metal",
        el_water: "Water",
        title_tips: "Harmony Practice",
        report_title: "Today's Detailed Fortune Report",
        m_wealth: "Wealth Guide",
        m_love: "Love Guide",
        m_health: "Health Guide",
        m_avoid: "Avoidance Warning",
        m_color: "Color Energy",
        m_time: "Time Fortune",
        c_lucky: "Lucky",
        c_avoid: "Avoid",
        btn_ad_next: "Watch Ad for Tomorrow's Access",
        btn_back: "Back to Home",
        modal_title: "Access Limit",
        modal_desc: "You've used your free analysis for today. Watch an ad to unlock tomorrow's access now!",
        btn_ad: "Watch Ad to Unlock",
        btn_close: "Close",
        ad_loading: "Loading Ad...",
        insight_mock: "The universe is aligning in your favor. Your energy today suggests a moment of profound introspection. Trust the flow of time.",
        
        // Scenes
        scene_wood: "Wood energy is expanding🌿. Your creativity is sprouting like spring buds. Ideal for brainstorming.",
        scene_fire: "Fire energy is vibrant🔥. Your passion and visibility are at their peak. Shine bright today.",
        scene_earth: "Earth energy is grounding⛰️. Stability and reliability are your anchors. A great time to organize.",
        scene_metal: "Metal energy is refined⚔️. Clarity and decisiveness are your tools. Cut through the noise.",
        scene_water: "Water energy is flowing💧. Wisdom and intuition are running deep. Allow yourself to be fluid.",

        // Fortune Data Pools
        wealth_tips: ["Southeast is your wealth spot today. Great for negotiations or collecting payments.", "Keep a citrine crystal on your desk to enhance your financial magnetic field."],
        love_tips: ["Wear lavender to gatherings. Smile and make eye contact; your charm is +30% today!", "South is your romance direction. A bright spot for meaningful conversations."],
        health_tips: ["Northwest is your health spot. Stretch your neck and shoulders every hour. Avoid cold drinks.", "Take deep breaths and focus on your posture to keep your energy flowing smoothly."],
        avoid_tips: ["Avoid the North today for contracts or big purchases. Small obstacles may arise there.", "Drive carefully if passing through Northern routes. Better to take a detour."],
        colors: {
            lucky: { name: "Warm Orange", code: "#FF8C00", extra: "Pairs well with Cream White." },
            avoid: { name: "Dark Brown", code: "#5D4037", extra: "May dampen your aura today." }
        },
        times: {
            ausp: { range: "13:00 - 15:00", desc: "Settling time. Perfect for review and tidying up." },
            inau: { range: "19:00 - 21:00", desc: "Impulse time. Avoid major spending or arguments." }
        }
    },
    zh: {
        hero_title: "探索你的宇宙蓝图",
        hero_subtitle: "输入出生信息，开启深度疗愈洞察。",
        label_birthdate: "出生日期",
        label_birthhour: "出生时辰",
        hour_zi: "子时 (23:00 - 01:00)",
        hour_chou: "丑时 (01:00 - 03:00)",
        hour_yin: "寅时 (03:00 - 05:00)",
        hour_mao: "卯时 (05:00 - 07:00)",
        hour_chen: "辰时 (07:00 - 09:00)",
        hour_si: "巳时 (09:00 - 11:00)",
        hour_wu: "午时 (11:00 - 13:00)",
        hour_wei: "未时 (13:00 - 15:00)",
        hour_shen: "申时 (15:00 - 17:00)",
        hour_you: "酉时 (17:00 - 19:00)",
        hour_xu: "戌时 (19:00 - 21:00)",
        hour_hai: "亥时 (21:00 - 23:00)",
        btn_start: "开始测算",
        result_title: "你的疗愈洞察",
        el_wood: "木",
        el_fire: "火",
        el_earth: "土",
        el_metal: "金",
        el_water: "水",
        title_tips: "五行平衡建议",
        report_title: "今日详细运势报告",
        m_wealth: "财富指引",
        m_love: "情感指引",
        m_health: "健康指引",
        m_avoid: "规避提醒",
        m_color: "色彩能量",
        m_time: "时辰吉凶",
        c_lucky: "幸运色",
        c_avoid: "忌讳色",
        btn_ad_next: "看广告获得次日测算机会",
        btn_back: "返回首页",
        modal_title: "额度提示",
        modal_desc: "你今日的免费测算额度已用完。现在观看广告可提前解锁明日资格！",
        btn_ad: "看广告解锁明日",
        btn_close: "关闭",
        ad_loading: "广告加载中...",
        insight_mock: "宇宙正在向你展现它温柔的一面。请信任时间的流逝，让直觉指引你的下一步。",

        // Scenes
        scene_wood: "今日木气舒展🌿，你的创意灵感像春芽冒尖，适合 Brainstorming 或开启新计划～",
        scene_fire: "今日火气升腾🔥，你的魅力与表达力正值巅峰，适合展示自我或开启热烈的对话。",
        scene_earth: "今日土气沉稳⛰️，踏实与厚重是你的底色，适合整理内务或为未来夯实基础。",
        scene_metal: "今日金气肃杀⚔️，决断力与条理性是你的武器，适合断舍离或处理积压已久的难题。",
        scene_water: "今日水气盈满💧，智慧与灵感在深处涌动，适合静心冥想或倾听内在的声音。",

        // Fortune Data
        wealth_tips: ["财神方位：东南方。今日在此方位谈合作、收款更顺畅。", "可摆放黄水晶摆件增强财运磁场～"],
        love_tips: ["桃花方位：正南方。穿淡紫色系衣服参加聚会，脱单概率+30%！", "主动和眼神交汇的人微笑聊天，你的亲和力正值巅峰。"],
        health_tips: ["健康方位：西北方。每小时做一次肩颈拉伸，少食生冷护脾胃～", "双手背后交叉上抬+肩膀下沉，有效缓解工作疲劳。"],
        avoid_tips: ["不吉利方位：北方。今日北方易遇小阻碍，避免在此签合同或大额消费。", "开车路过北方路段请提前绕行，保持耐心。"],
        colors: {
            lucky: { name: "暖橘色", code: "#FF8C00", extra: "搭配奶油白，亲和力拉满！" },
            avoid: { name: "深棕色", code: "#5D4037", extra: "易压抑气场，重要场合避开。" }
        },
        times: {
            ausp: { range: "13:00 - 15:00", desc: "（沉淀时段）适合复盘总结、整理房间。" },
            inau: { range: "19:00 - 21:00", desc: "（冲动时段）避免冲动消费或口角争吵。" }
        }
    }
};

let currentLang = localStorage.getItem('lang') || 'en';
let freeCount = parseInt(localStorage.getItem('freeCount')) || 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkSavedResult();
    updateLanguage();
    initEvents();
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
    document.getElementById('lang-btn').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('lang', currentLang);
        updateLanguage();
        const saved = localStorage.getItem('savedResult');
        if (saved) displayResult(JSON.parse(saved));
    });

    document.getElementById('analyze-btn').addEventListener('click', () => {
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

    document.getElementById('watch-ad-btn').addEventListener('click', () => showAd(true));
    document.getElementById('ad-next-day-btn').addEventListener('click', () => showAd(false));
    document.getElementById('close-modal').addEventListener('click', () => hideModal('ad-modal'));
}

function updateLanguage() {
    const data = i18n[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) el.textContent = data[key];
    });
}

function runAnalysis() {
    const dateInput = document.getElementById('birth-date').value;
    const hourInput = parseInt(document.getElementById('birth-hour').value);

    if (!dateInput) {
        alert(currentLang === 'en' ? "Please select a birth date." : "请选择出生日期。");
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
    const data = i18n[currentLang];
    
    // 1. Energy Bars
    const max = Math.max(...Object.values(result.counts), 1);
    for (const [el, count] of Object.entries(result.counts)) {
        document.getElementById(`bar-${el}`).style.width = `${(count / max) * 100}%`;
    }

    // 2. Scene Conclusion
    const dominant = Object.keys(result.counts).reduce((a, b) => result.counts[a] > result.counts[b] ? a : b);
    document.getElementById('scene-conclusion').textContent = data[`scene_${dominant}`];
    document.getElementById('insight-text').textContent = data.insight_mock;

    // 3. Harmony Practice
    const tipsList = document.getElementById('balance-tips');
    tipsList.innerHTML = getHarmonyTips(dominant).map(t => `<li>${t}</li>`).join('');

    // 4. Fortune Report Modules
    document.getElementById('f-wealth-text').textContent = data.wealth_tips.join(' ');
    document.getElementById('f-love-text').textContent = data.love_tips.join(' ');
    document.getElementById('f-health-text').textContent = data.health_tips.join(' ');
    document.getElementById('f-avoid-text').textContent = data.avoid_tips.join(' ');

    // Colors
    document.getElementById('lucky-color-box').style.backgroundColor = data.colors.lucky.code;
    document.getElementById('lucky-color-text').textContent = data.colors.lucky.name;
    document.getElementById('avoid-color-box').style.backgroundColor = data.colors.avoid.code;
    document.getElementById('avoid-color-text').textContent = data.colors.avoid.name;

    // Time
    document.getElementById('f-time-ausp-range').textContent = data.times.ausp.range;
    document.getElementById('f-time-ausp-desc').textContent = data.times.ausp.desc;
    document.getElementById('f-time-inau-range').textContent = data.times.inau.range;
    document.getElementById('f-time-inau-desc').textContent = data.times.inau.desc;

    // 5. De-emphasized Pillars Footer
    const footerText = currentLang === 'en' 
        ? `(Ref: Year ${result.pillars[0]} | Month ${result.pillars[1]} | Day ${result.pillars[2]} | Hour ${result.pillars[3]})`
        : `(干支纪年参考：年柱 ${result.pillars[0]} 月柱 ${result.pillars[1]} 日柱 ${result.pillars[2]} 时柱 ${result.pillars[3]})`;
    document.getElementById('bazi-footer-text').textContent = footerText;

    // 6. Quote
    displayDailyQuote(dominant);
}

function getHarmonyTips(el) {
    const isZh = currentLang === 'zh';
    const pools = {
        wood: [isZh ? "🌱 减少咖啡因，多喝绿茶疏理肝气" : "🌱 Reduce caffeine, try green tea.", isZh ? "🌱 工作间隙远眺绿色" : "🌱 Look at greenery during breaks."],
        fire: [isZh ? "🔥 下午三点后静坐，平复心火" : "🔥 Meditate after 3 PM.", isZh ? "🔥 饮食清淡，避开辛辣" : "🔥 Keep meals light and mild."],
        earth: [isZh ? "⛰️ 饭后百步走，促进运化" : "⛰️ Walk 100 steps after meals.", isZh ? "⛰️ 减少思虑，专注当下" : "⛰️ Focus on the present moment."],
        metal: [isZh ? "⚔️ 晚间热水泡脚，温润肺金" : "⚔️ Warm foot bath in the evening.", isZh ? "⚔️ 精简待办清单" : "⚔️ Simplify your to-do list."],
        water: [isZh ? "💧 注意腰部保暖，护持肾气" : "💧 Keep lower back warm.", isZh ? "💧 睡前听流水声助眠" : "💧 Listen to water sounds for sleep."]
    };
    return pools[el];
}

function displayDailyQuote(el) {
    const isZh = currentLang === 'zh';
    const quotes = {
        wood: { q: isZh ? "“像森林一样生长。”" : "“Grow like a forest.”", s: isZh ? "《黄帝内经》：肝者，将军之官。" : "Neijing: The liver is the general." },
        fire: { q: isZh ? "“照亮未知的路。”" : "“Light the unknown path.”", s: isZh ? "《黄帝内经》：心者，君主之官。" : "Neijing: The heart is the monarch." },
        earth: { q: isZh ? "“厚德方能载物。”" : "“Great virtue bears much.”", s: isZh ? "《黄帝内经》：脾者，谏议之官。" : "Neijing: The spleen is the advisor." },
        metal: { q: isZh ? "“在寂静中升华。”" : "“Sublime in silence.”", s: isZh ? "《黄帝内经》：肺者，相傅之官。" : "Neijing: The lungs are the mentor." },
        water: { q: isZh ? "“上善若水。”" : "“Highest good is like water.”", s: isZh ? "《黄帝内经》：肾者，作强之官。" : "Neijing: The kidney is the power." }
    };
    document.getElementById('daily-quote').textContent = quotes[el].q;
    document.getElementById('daily-science').textContent = quotes[el].s;
}

function showAd(isReset) {
    hideModal('ad-modal');
    const overlay = document.getElementById('ad-overlay');
    const timerNum = document.getElementById('timer-num');
    overlay.classList.add('active');
    let count = 5;
    timerNum.textContent = count;
    const interval = setInterval(() => {
        count--;
        timerNum.textContent = count;
        if (count <= 0) {
            clearInterval(interval);
            overlay.classList.remove('active');
            if (isReset) {
                freeCount = 0;
                localStorage.setItem('freeCount', 0);
                localStorage.removeItem('savedResult');
                alert(currentLang === 'en' ? "Unlocked! You can measure again." : "已解锁！您可以再次测算。");
                location.reload();
            } else {
                alert(currentLang === 'en' ? "Tomorrow's access unlocked! See you then." : "明日测算资格已解锁！明天见。");
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
