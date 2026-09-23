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

const fontSelect = document.getElementById('font-select');
if (fontSelect) {
    fontSelect.value = localStorage.getItem('fontStyle') || 'oswald';
    fontSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        localStorage.setItem('fontStyle', val);
        if (val === 'oswald') document.documentElement.removeAttribute('data-font');
        else document.documentElement.setAttribute('data-font', val);
    });
}

setupToggle('spacing-btn', 'textSpacing', 'data-spacing', 'true');


function setupCustomDropdown(dropdownId, storageKey, htmlAttr, defaultLabel) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    const btn = dropdown.querySelector('.DropBtn');
    const options = dropdown.querySelectorAll('.FilterOption');

    const savedVal = localStorage.getItem(storageKey) || 'default';
    const activeOpt = Array.from(options).find(opt => opt.getAttribute('data-value') === savedVal);
    if (activeOpt) btn.textContent = activeOpt.textContent;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = opt.getAttribute('data-value');

            localStorage.setItem(storageKey, val);
            btn.textContent = opt.textContent;
            dropdown.classList.remove('show');

            if (val === 'none' || val === 'oswald' || val === 'default') {
                document.documentElement.removeAttribute(htmlAttr);
            } else {
                document.documentElement.setAttribute(htmlAttr, val);
            }
        });
    });

    document.addEventListener('click', () => dropdown.classList.remove('show'));
}

setupCustomDropdown('color-blind-dropdown', 'colorblind', 'data-colorblind', 'None');
setupCustomDropdown('font-dropdown', 'fontStyle', 'data-font', 'Oswald (Default)');

const spacingSlider = document.getElementById('spacing-slider');
const spacingPreview = document.getElementById('spacing-preview');

if (spacingSlider && spacingPreview) {
    let currentSpacing = localStorage.getItem('textSpacing') || '1';
    spacingSlider.value = currentSpacing;
    spacingPreview.textContent = currentSpacing === '1' ? 'Normal' : currentSpacing + 'x';

    spacingSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        spacingPreview.textContent = val === '1' ? 'Normal' : val + 'x';
        document.documentElement.style.setProperty('--text-spacing', val);
        localStorage.setItem('textSpacing', val);
    });
}