function setupToggle(btnId, storageKey, htmlAttr, activeValue) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    let isSet = localStorage.getItem(storageKey) === activeValue;
    btn.textContent = isSet ? 'Enable' : 'Disable';

    btn.addEventListener('click', () => {
        isSet = !isSet;

        if (isSet) {
            localStorage.setItem(storageKey, activeValue);
            document.documentElement.setAttribute(htmlAttr, activeValue);
            btn.textContent = 'Enable';
        } else {
            localStorage.removeItem(storageKey);
            document.documentElement.removeAttribute(htmlAttr);
            btn.textContent = 'Disable';
        }
    });
}

const fontSlider = document.getElementById('font-slider');
const fontPreview = document.getElementById('font-preview');

if (fontSlider && fontPreview) {
    let currentSize = localStorage.getItem('fontSize') || '16';
    fontSlider.value = currentSize;
    fontPreview.textContent = currentSize + 'px';

    fontSlider.addEventListener('input', (e) => {
        const newSize = e.target.value;
        fontPreview.textContent = newSize + 'px';
        document.documentElement.style.setProperty('--base-font-size', newSize + 'px');
        localStorage.setItem('fontSize', newSize);
    });
}

setupToggle('theme-btn', 'theme', 'data-theme', 'light');
setupToggle('anim-btn', 'animations', 'data-animations', 'disabled');
setupToggle('hover-btn', 'hover', 'data-hover', 'disabled');
setupToggle('scroll-btn', 'scroll', 'data-scroll', 'disabled');
setupToggle('media-btn', 'autoplay', 'data-autoplay', 'disabled');
setupToggle('cursor-btn', 'cursor', 'data-cursor', 'disabled');
setupToggle('lefty-btn', 'lefty', 'data-lefty', 'true');

const cbSelect = document.getElementById('color-blind-select');
if (cbSelect) {
    cbSelect.value = localStorage.getItem('colorblind') || 'none';

    cbSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        localStorage.setItem('colorblind', val);

        if (val === 'none') {
            document.documentElement.removeAttribute('data-colorblind');
        } else {
            document.documentElement.setAttribute('data-colorblind', val);
        }
    });
}

const restoreBtn = document.getElementById('restore-btn');
if (restoreBtn) {
    restoreBtn.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}