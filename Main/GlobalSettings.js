// GlobalSettings.js - Linked in the <head> of index.html, Settings.html, Work.html, etc.

// 1. Check if the user has a saved theme
const savedTheme = localStorage.getItem('theme');

// 2. If they do, apply it to the root HTML element
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// You can repeat this logic for font sizes, reduced motion, etc.
const savedFontSize = localStorage.getItem('font-size');
if (savedFontSize) {
    document.documentElement.style.setProperty('--font-size-base', savedFontSize);
}