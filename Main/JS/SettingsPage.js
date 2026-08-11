// --- Helper Function for Toggles ---
function setupToggle(btnId, storageKey, htmlAttr, activeValue) {
    const btn = document.getElementById(btnId);

    // Check initial state from LocalStorage to set button text correctly on load
    let isActive = localStorage.getItem(storageKey) === activeValue;
    btn.textContent = isActive ? 'Disable' : 'Enable';

    btn.addEventListener('click', () => {
        isActive = !isActive; // Flip the state

        if (isActive) {
            localStorage.setItem(storageKey, activeValue);
            document.documentElement.setAttribute(htmlAttr, activeValue);
            btn.textContent = 'Disable';
        } else {
            localStorage.removeItem(storageKey);
            document.documentElement.removeAttribute(htmlAttr);
            btn.textContent = 'Enable';
        }
    });
}

// --- Initialize Toggles ---
setupToggle('theme-btn', 'theme', 'data-theme', 'light');
setupToggle('anim-btn', 'motion', 'data-motion', 'reduced');
setupToggle('text-btn', 'text', 'data-text', 'large');