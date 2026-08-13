
const menuBtn = document.getElementById('green-btn');
const leftPanel = document.getElementById('red-panel');

if (menuBtn && leftPanel) {
    menuBtn.addEventListener('click', () => {
        leftPanel.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

function updateTorontoTime() {
    const timeElement = document.getElementById('toronto-time');

    if (!timeElement) return;

    const now = new Date();

    const options = {
        timeZone: 'America/Toronto',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZoneName: 'short'
    };

    const formatter = new Intl.DateTimeFormat('en-CA', options);
    timeElement.textContent = formatter.format(now);
}

setInterval(updateTorontoTime, 60000);
updateTorontoTime();


// --- UPDATED TAB LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Find all DivService containers on the current page
    const serviceContainers = document.querySelectorAll('.DivService');

    // 2. Loop through each container independently
    serviceContainers.forEach(container => {
        // 3. Find the tabs ONLY inside this specific container
        const tabItems = container.querySelectorAll('.DivServiceTab');

        tabItems.forEach(item => {
            const button = item.querySelector('.ButtonTab');

            if (button) {
                button.addEventListener('click', () => {
                    // 4. Remove 'active' ONLY from the tabs sharing this specific container
                    tabItems.forEach(i => i.classList.remove('active'));

                    // 5. Add 'active' to the clicked tab
                    item.classList.add('active');
                });
            }
        });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        // NULL CHECK: Ensure leftPanel exists before trying to remove classes from it
        if (leftPanel) {
            leftPanel.classList.remove('active');
        }
        document.body.classList.remove('no-scroll');
    }
});

// Grab the scrolling container and the progress bar
const scrollArea = document.querySelector('.SectionRight');
const progressBar = document.getElementById('scroll-progress');

// --- PREVENT OVERSCROLL / RUBBER-BAND BOUNCE ---
// overscroll-behavior isn't fully honored on every mobile browser (older iOS
// Safari in particular), so this backs it up by blocking the native bounce
// right at the scroll boundaries only, leaving normal scrolling untouched.
if (scrollArea) {
    let touchStartY = 0;

    scrollArea.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    scrollArea.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY; // positive = finger moving down (pulling toward top)

        const atTop = scrollArea.scrollTop <= 0;
        const atBottom = scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 1;

        if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
            e.preventDefault();
        }
    }, { passive: false });
}

// NULL CHECK: Only run if both elements exist on the page
if (scrollArea && progressBar) {
    scrollArea.addEventListener('scroll', () => {
        // Calculate how far down the user has scrolled
        const scrollTop = scrollArea.scrollTop;

        // Calculate the maximum possible scroll distance
        const maxScroll = scrollArea.scrollHeight - scrollArea.clientHeight;

        // Calculate the percentage
        const scrollPercentage = (scrollTop / maxScroll) * 100;

        // Apply the percentage to the width of the bar
        progressBar.style.width = scrollPercentage + '%';
    });
}

// --- TECH STACK OVERFLOW ("...") LOGIC ---
// If a .DivTechStack's badges would wrap to a new row, the last badge that
// still fits on the first row is collapsed into a "..." toggle. Clicking it
// restores that badge and reveals the rest of the wrapped row(s).

function restoreTechStack(stack) {
    const badges = Array.from(stack.children).filter(el => el.classList.contains('TechBadge'));

    badges.forEach(badge => {
        if (badge.dataset.originalContent) {
            badge.innerHTML = badge.dataset.originalContent;
            delete badge.dataset.originalContent;
        }
        badge.classList.remove('is-more', 'TechBadge-hidden');
    });
}

function collapseTechStack(stack) {
    const badges = Array.from(stack.children).filter(el => el.classList.contains('TechBadge'));
    if (badges.length < 2) return;

    const firstRowTop = badges[0].offsetTop;
    const rowOneBadges = badges.filter(badge => badge.offsetTop === firstRowTop);

    // Everything already fits on a single row - nothing to collapse
    if (rowOneBadges.length === badges.length) return;

    const lastVisible = rowOneBadges[rowOneBadges.length - 1];
    const hiddenBadges = badges.slice(rowOneBadges.length);

    lastVisible.dataset.originalContent = lastVisible.innerHTML;
    lastVisible.innerHTML = '<span>...</span>';
    lastVisible.classList.add('is-more');

    hiddenBadges.forEach(badge => badge.classList.add('TechBadge-hidden'));

    lastVisible.addEventListener('click', function expandHandler() {
        lastVisible.innerHTML = lastVisible.dataset.originalContent;
        delete lastVisible.dataset.originalContent;
        lastVisible.classList.remove('is-more');
        hiddenBadges.forEach(badge => badge.classList.remove('TechBadge-hidden'));
        stack.dataset.expanded = 'true';
        lastVisible.removeEventListener('click', expandHandler);
    });
}

function initTechStackOverflow() {
    document.querySelectorAll('.DivTechStack').forEach(stack => {
        // Leave stacks the user has already expanded alone
        if (stack.dataset.expanded === 'true') return;

        restoreTechStack(stack);
        collapseTechStack(stack);
    });
}

document.addEventListener('DOMContentLoaded', initTechStackOverflow);

let techStackResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(techStackResizeTimeout);
    techStackResizeTimeout = setTimeout(initTechStackOverflow, 150);
});