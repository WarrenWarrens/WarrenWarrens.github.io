
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

    // --- PREVENT TOC FROM BREAKING THE "GO BACK" BUTTON ---
    document.querySelectorAll('.TocLink').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stops the URL from changing and adding to browser history

            const targetId = link.getAttribute('href'); // Gets "#section-overview"
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
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
    // 1. Find and completely remove any injected "..." badges
    const moreBadges = stack.querySelectorAll('.is-more');
    moreBadges.forEach(b => b.remove());

    // 2. Unhide all original badges
    const badges = stack.querySelectorAll('.TechBadge');
    badges.forEach(badge => {
        badge.classList.remove('TechBadge-hidden');
    });
}

function collapseTechStack(stack) {
    // Get all badges currently in the container (ignoring any '...' buttons)
    const badges = Array.from(stack.children).filter(el => el.classList.contains('TechBadge') && !el.classList.contains('is-more'));
    if (badges.length < 2) return;

    // Establish the baseline Y coordinate for the very first row
    // (getBoundingClientRect is rock-solid for sub-pixel flexbox measuring)
    const baselineY = badges[0].getBoundingClientRect().top;

    // Find everything on row 1 (Tolerance of 10px accounts for minor flex alignments)
    let rowOneBadges = badges.filter(badge => Math.abs(badge.getBoundingClientRect().top - baselineY) < 10);

    // Everything fits on a single row natively - no overflow needed!
    if (rowOneBadges.length === badges.length) return;

    // Hide badges that natively fell to row 2 or below
    const hiddenBadges = badges.slice(rowOneBadges.length);
    hiddenBadges.forEach(badge => badge.classList.add('TechBadge-hidden'));

    // Create a brand NEW "..." badge from scratch.
    // Because we make it here, it strictly gets your default grey styling!
    const moreBadge = document.createElement('div');
    moreBadge.className = 'TechBadge is-more';
    moreBadge.innerHTML = '<span>...</span>';
    stack.appendChild(moreBadge);

    // SAFETY CHECK: Did injecting the "..." badge push IT to the second row?
    // If so, we hide the last visible badge on row 1 to make room for it.
    let visibleBadges = badges.filter(b => !b.classList.contains('TechBadge-hidden'));

    while (Math.abs(moreBadge.getBoundingClientRect().top - baselineY) > 10 && visibleBadges.length > 0) {
        const lastVisible = visibleBadges.pop();
        lastVisible.classList.add('TechBadge-hidden');
        hiddenBadges.unshift(lastVisible); // Add it to our hidden array so it can be revealed later
    }

    // When clicked, destroy the "..." badge and reveal all hidden items
    moreBadge.addEventListener('click', () => {
        moreBadge.remove();
        hiddenBadges.forEach(badge => badge.classList.remove('TechBadge-hidden'));
        stack.dataset.expanded = 'true'; // Lock it open
    });
}

function initTechStackOverflow() {
    document.querySelectorAll('.DivTechStack').forEach(stack => {
        // Leave stacks the user has already clicked to expand alone
        if (stack.dataset.expanded === 'true') return;

        restoreTechStack(stack);
        collapseTechStack(stack);
    });
}

if (document.fonts) {
    document.fonts.ready.then(initTechStackOverflow);
} else {
    window.addEventListener('load', initTechStackOverflow);
}

let techStackResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(techStackResizeTimeout);
    techStackResizeTimeout = setTimeout(initTechStackOverflow, 150);
});

document.addEventListener('DOMContentLoaded', initTechStackOverflow);

// --- AUTO-PAUSE VIDEOS WHEN OUT OF VIEW ---
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.PortfolioVideo');

    if (videos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play(); // Play when visible
                } else {
                    entry.target.pause(); // Pause when off-screen
                }
            });
        }, { threshold: 0.1 }); // Triggers when at least 10% of the video is visible

        videos.forEach(video => videoObserver.observe(video));
    }
});

// --- TOOLS ACCORDION LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const toolRows = document.querySelectorAll('.ToolRow');

    toolRows.forEach(row => {
        const topSection = row.querySelector('.ToolTop');

        if (topSection) {
            topSection.addEventListener('click', () => {
                const isCurrentlyExpanded = row.classList.contains('expanded');

                // 1. Find the parent container (Now supports both Portfolio and Settings pages!)
                const parentStack = row.closest('.StackItem, .SettingsGroup');

                if (parentStack) {
                    // 2. Remove 'expanded' from all rows in this group
                    const siblingRows = parentStack.querySelectorAll('.ToolRow');
                    siblingRows.forEach(sibling => sibling.classList.remove('expanded'));
                }

                // 3. If it wasn't open, open it now
                if (!isCurrentlyExpanded) {
                    row.classList.add('expanded');
                }
            });
        }
    });
});

// --- QUICK THEME TOGGLE ---
// document.addEventListener('DOMContentLoaded', () => {
//     const desktopBtn = document.getElementById('desktop-theme-btn');
//     const mobileBtn = document.getElementById('mobile-theme-btn');
//
//     // Function to update the icons based on current theme
//     function updateThemeIcons() {
//         const isLight = document.documentElement.getAttribute('data-theme') === 'light';
//         const iconClass = isLight ? 'fa-sun' : 'fa-moon';
//
//         if (desktopBtn) desktopBtn.querySelector('i').className = `fa-solid ${iconClass}`;
//         if (mobileBtn) mobileBtn.querySelector('i').className = `fa-solid ${iconClass}`;
//     }
//
//     // Function to handle the theme swap
//     function toggleTheme() {
//         const html = document.documentElement;
//         const isLight = html.getAttribute('data-theme') === 'light';
//
//         if (isLight) {
//             html.removeAttribute('data-theme');
//             localStorage.removeItem('theme');
//         } else {
//             html.setAttribute('data-theme', 'light');
//             localStorage.setItem('theme', 'light');
//         }
//
//         updateThemeIcons();
//     }
//
//     // Attach click listeners
//     if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
//     if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);
//
//     // Sync icons immediately on page load
//     updateThemeIcons();
// });


// --- DYNAMIC THEME TOGGLE & ICONS ---
document.addEventListener('DOMContentLoaded', () => {
    const desktopBtn = document.getElementById('desktop-theme-btn');
    const mobileBtn = document.getElementById('mobile-theme-btn');

    // Automatically swaps the icon based on the active theme
    function updateThemeIcons() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const iconClass = isLight ? 'fa-sun' : 'fa-moon';

        const desktopIcon = document.querySelector('#desktop-theme-btn i');
        const mobileIcon = document.querySelector('#mobile-theme-btn i');

        if (desktopIcon) desktopIcon.className = `fa-solid ${iconClass}`;
        if (mobileIcon) mobileIcon.className = `fa-solid ${iconClass}`;
    }

    // Handles the actual theme switching and saves to localStorage
    function toggleTheme() {
        const html = document.documentElement;
        const isLight = html.getAttribute('data-theme') === 'light';

        if (isLight) {
            html.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }

        updateThemeIcons();
    }

    // Attach the click events to both buttons
    if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
    if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);

    // Run once on page load to ensure the correct icon is displayed
    updateThemeIcons();
});