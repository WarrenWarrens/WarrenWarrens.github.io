function setupToggle(btnId, storageKey, htmlAttr, activeValue) {
    const btn = document.getElementById(btnId);

    let isActive = localStorage.getItem(storageKey) === activeValue;
    btn.textContent = isActive ? 'Disable' : 'Enable';

    btn.addEventListener('click', () => {
        isActive = !isActive;

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

const fontSlider = document.getElementById('font-slider');
const fontPreview = document.getElementById('font-preview');

let currentSize = localStorage.getItem('fontSize') || '16';
fontSlider.value = currentSize;
fontPreview.textContent = currentSize + 'px';

fontSlider.addEventListener('input', (e) => {
    const newSize = e.target.value;

    fontPreview.textContent = newSize + 'px';

    document.documentElement.style.setProperty('--base-font-size', newSize + 'px');

    localStorage.setItem('fontSize', newSize);
});

setupToggle('theme-btn', 'theme', 'data-theme', 'light');
setupToggle('text-btn', 'text', 'data-text', 'large');



setupToggle('anim-btn', 'animations', 'data-animations', 'disabled');
setupToggle('hover-btn', 'hover', 'data-hover', 'disabled');
setupToggle('scroll-btn', 'scroll', 'data-scroll', 'disabled');
setupToggle('media-btn', 'autoplay', 'data-autoplay', 'disabled');
setupToggle('cursor-btn', 'cursor', 'data-cursor', 'disabled');