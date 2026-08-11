// Check LocalStorage and apply settings to the root HTML element
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

const savedMotion = localStorage.getItem('motion');
if (savedMotion === 'reduced') {
    document.documentElement.setAttribute('data-motion', 'reduced');
}

const savedText = localStorage.getItem('text');
if (savedText === 'large') {
    document.documentElement.setAttribute('data-text', 'large');
}