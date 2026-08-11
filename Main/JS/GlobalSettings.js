
function applyGlobalSettings() {
    // 1. Check Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    // 2. Check Motion
    const savedMotion = localStorage.getItem('motion');
    if (savedMotion === 'reduced') {
        document.documentElement.setAttribute('data-motion', 'reduced');
    } else {
        document.documentElement.removeAttribute('data-motion');
    }

    // 3. Check Text Size
    const savedText = localStorage.getItem('text');
    if (savedText === 'large') {
        document.documentElement.setAttribute('data-text', 'large');
    } else {
        document.documentElement.removeAttribute('data-text');
    }
}

applyGlobalSettings();

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        applyGlobalSettings();
    }
});