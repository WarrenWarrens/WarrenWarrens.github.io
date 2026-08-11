// // Check LocalStorage and apply settings to the root HTML element
// const savedTheme = localStorage.getItem('theme');
// if (savedTheme === 'light') {
//     document.documentElement.setAttribute('data-theme', 'light');
// }
//
// const savedMotion = localStorage.getItem('motion');
// if (savedMotion === 'reduced') {
//     document.documentElement.setAttribute('data-motion', 'reduced');
// }
//
// const savedText = localStorage.getItem('text');
// if (savedText === 'large') {
//     document.documentElement.setAttribute('data-text', 'large');
// }
// Wrap the logic in a reusable function
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

// Run immediately on normal page loads
applyGlobalSettings();

// Run again silently if the user navigates using a "Go Back" button or browser arrows
window.addEventListener('pageshow', (event) => {
    // event.persisted means the page was pulled from the browser's cache
    if (event.persisted) {
        applyGlobalSettings();
    }
});