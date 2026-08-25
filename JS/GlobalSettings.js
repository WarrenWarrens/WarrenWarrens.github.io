
function applyGlobalSettings() {
    // 1. Check Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const settingsToCheck = [
        { key: 'animations', attr: 'data-animations' },
        { key: 'hover', attr: 'data-hover' },
        { key: 'scroll', attr: 'data-scroll' },
        { key: 'autoplay', attr: 'data-autoplay' },
        { key: 'cursor', attr: 'data-cursor' }
    ];

    settingsToCheck.forEach(setting => {
        if (localStorage.getItem(setting.key) === 'disabled') {
            document.documentElement.setAttribute(setting.attr, 'disabled');
        } else {
            document.documentElement.removeAttribute(setting.attr);
        }
    });

    // 2. Check Motion
    const savedMotion = localStorage.getItem('motion');
    if (savedMotion === 'reduced') {
        document.documentElement.setAttribute('data-motion', 'reduced');
    } else {
        document.documentElement.removeAttribute('data-motion');
    }

    // Check Text Size
    const savedTextSize = localStorage.getItem('fontSize');
    if (savedTextSize) {
        document.documentElement.style.setProperty('--base-font-size', savedTextSize + 'px');
    }

    // 3. Check Text Size
    // const savedText = localStorage.getItem('text');
    // if (savedText === 'large') {
    //     document.documentElement.setAttribute('data-text', 'large');
    // } else {
    //     document.documentElement.removeAttribute('data-text');
    // }
}

applyGlobalSettings();

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        applyGlobalSettings();
    }
});