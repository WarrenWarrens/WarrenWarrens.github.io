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

// --- Font Slider Logic ---
const fontSlider = document.getElementById('font-slider');
const fontPreview = document.getElementById('font-preview');

// Set initial slider position based on saved settings (or default to 16)
let currentSize = localStorage.getItem('fontSize') || '16';
fontSlider.value = currentSize;
fontPreview.textContent = currentSize + 'px';

// Listen for the user dragging the slider
fontSlider.addEventListener('input', (e) => {
    const newSize = e.target.value;

    // Update the number text on the right
    fontPreview.textContent = newSize + 'px';

    // Instantly update the CSS variable across the whole site
    document.documentElement.style.setProperty('--base-font-size', newSize + 'px');

    // Save to LocalStorage
    localStorage.setItem('fontSize', newSize);
});

// --- Initialize Toggles ---
setupToggle('theme-btn', 'theme', 'data-theme', 'light');
// setupToggle('anim-btn', 'motion', 'data-motion', 'reduced');
setupToggle('text-btn', 'text', 'data-text', 'large');

// Assuming setupToggle() is still at the top of this file...


// New Accessibility Toggles (Default is enabled, so button disables them)
setupToggle('anim-btn', 'animations', 'data-animations', 'disabled');
setupToggle('hover-btn', 'hover', 'data-hover', 'disabled');
setupToggle('scroll-btn', 'scroll', 'data-scroll', 'disabled');
setupToggle('media-btn', 'autoplay', 'data-autoplay', 'disabled');
setupToggle('cursor-btn', 'cursor', 'data-cursor', 'disabled');