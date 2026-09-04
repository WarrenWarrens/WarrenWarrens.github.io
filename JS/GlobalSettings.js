
function applyGlobalSettings() {
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

    const savedMotion = localStorage.getItem('motion');
    if (savedMotion === 'reduced') {
        document.documentElement.setAttribute('data-motion', 'reduced');
    } else {
        document.documentElement.removeAttribute('data-motion');
    }

    const savedTextSize = localStorage.getItem('fontSize');
    if (savedTextSize) {
        document.documentElement.style.setProperty('--base-font-size', savedTextSize + 'px');
    }

}

applyGlobalSettings();

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        applyGlobalSettings();
    }
});