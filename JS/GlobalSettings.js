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
}

applyGlobalSettings();

window.addEventListener('pageshow', (event) => {
    if (event.persisted) applyGlobalSettings();
});

document.addEventListener('DOMContentLoaded', () => {
    const svgFilters = `
    <svg style="display:none;">
        <defs>
            <filter id="protanopia"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/></filter>
            <filter id="protanomaly"><feColorMatrix type="matrix" values="0.817 0.183 0 0 0  0.333 0.667 0 0 0  0 0.125 0.875 0 0  0 0 0 1 0"/></filter>
            <filter id="deuteranopia"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/></filter>
            <filter id="deuteranomaly"><feColorMatrix type="matrix" values="0.8 0.2 0 0 0  0.258 0.742 0 0 0  0 0.142 0.858 0 0  0 0 0 1 0"/></filter>
        </defs>
    </svg>`;
    document.body.insertAdjacentHTML('beforeend', svgFilters);
});