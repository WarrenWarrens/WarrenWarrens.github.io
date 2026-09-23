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
        { key: 'cursor', attr: 'data-cursor' },
        { key: 'lefty', attr: 'data-lefty' }
    ];

    const savedSpacing = localStorage.getItem('textSpacing');
    if (savedSpacing) {
        document.documentElement.style.setProperty('--text-spacing', savedSpacing);
    }


    settingsToCheck.forEach(setting => {
        if (localStorage.getItem(setting.key) === 'disabled' || localStorage.getItem(setting.key) === 'true') {
            document.documentElement.setAttribute(setting.attr, localStorage.getItem(setting.key));
        } else {
            document.documentElement.removeAttribute(setting.attr);
        }
    });

    const savedTextSize = localStorage.getItem('fontSize');
    if (savedTextSize) {
        document.documentElement.style.setProperty('--base-font-size', savedTextSize + 'px');
    }

    const savedCB = localStorage.getItem('colorblind');
    if (savedCB && savedCB !== 'none') {
        document.documentElement.setAttribute('data-colorblind', savedCB);
    } else {
        document.documentElement.removeAttribute('data-colorblind');
    }

    const savedFont = localStorage.getItem('fontStyle');
    if (savedFont && savedFont !== 'oswald') {
        document.documentElement.setAttribute('data-font', savedFont);
    } else {
        document.documentElement.removeAttribute('data-font');
    }


}

applyGlobalSettings();

window.addEventListener('pageshow', (event) => {
    if (event.persisted) applyGlobalSettings();
});

