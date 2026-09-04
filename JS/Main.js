
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


document.addEventListener('DOMContentLoaded', () => {
    const serviceContainers = document.querySelectorAll('.DivService');

    serviceContainers.forEach(container => {
        const tabItems = container.querySelectorAll('.DivServiceTab');

        tabItems.forEach(item => {
            const button = item.querySelector('.ButtonTab');

            if (button) {
                button.addEventListener('click', () => {
                    tabItems.forEach(i => i.classList.remove('active'));

                    item.classList.add('active');
                });
            }
        });
    });

    document.querySelectorAll('.TocLink').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        if (leftPanel) {
            leftPanel.classList.remove('active');
        }
        document.body.classList.remove('no-scroll');
    }
});

const scrollArea = document.querySelector('.SectionRight');
const progressBar = document.getElementById('scroll-progress');


if (scrollArea) {
    let touchStartY = 0;

    scrollArea.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    scrollArea.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;

        const atTop = scrollArea.scrollTop <= 0;
        const atBottom = scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 1;

        if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
            e.preventDefault();
        }
    }, { passive: false });
}

if (scrollArea && progressBar) {
    scrollArea.addEventListener('scroll', () => {
        const scrollTop = scrollArea.scrollTop;

        const maxScroll = scrollArea.scrollHeight - scrollArea.clientHeight;

        const scrollPercentage = (scrollTop / maxScroll) * 100;

        progressBar.style.width = scrollPercentage + '%';
    });
}


function restoreTechStack(stack) {
    const moreBadges = stack.querySelectorAll('.is-more');
    moreBadges.forEach(b => b.remove());

    const badges = stack.querySelectorAll('.TechBadge');
    badges.forEach(badge => {
        badge.classList.remove('TechBadge-hidden');
    });
}

function collapseTechStack(stack) {
    const badges = Array.from(stack.children).filter(el => el.classList.contains('TechBadge') && !el.classList.contains('is-more'));
    if (badges.length < 2) return;


    const baselineY = badges[0].getBoundingClientRect().top;

    let rowOneBadges = badges.filter(badge => Math.abs(badge.getBoundingClientRect().top - baselineY) < 10);

    if (rowOneBadges.length === badges.length) return;

    const hiddenBadges = badges.slice(rowOneBadges.length);
    hiddenBadges.forEach(badge => badge.classList.add('TechBadge-hidden'));


    const moreBadge = document.createElement('div');
    moreBadge.className = 'TechBadge is-more';
    moreBadge.innerHTML = '<span>...</span>';
    stack.appendChild(moreBadge);


    let visibleBadges = badges.filter(b => !b.classList.contains('TechBadge-hidden'));

    while (Math.abs(moreBadge.getBoundingClientRect().top - baselineY) > 10 && visibleBadges.length > 0) {
        const lastVisible = visibleBadges.pop();
        lastVisible.classList.add('TechBadge-hidden');
        hiddenBadges.unshift(lastVisible);
    }

    moreBadge.addEventListener('click', () => {
        moreBadge.remove();
        hiddenBadges.forEach(badge => badge.classList.remove('TechBadge-hidden'));
        stack.dataset.expanded = 'true';
    });
}

function initTechStackOverflow() {
    document.querySelectorAll('.DivTechStack').forEach(stack => {
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

document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.PortfolioVideo');

    if (videos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.1 });

        videos.forEach(video => videoObserver.observe(video));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toolRows = document.querySelectorAll('.ToolRow');

    toolRows.forEach(row => {
        const topSection = row.querySelector('.ToolTop');

        if (topSection) {
            topSection.addEventListener('click', () => {
                const isCurrentlyExpanded = row.classList.contains('expanded');

                const parentStack = row.closest('.StackItem, .SettingsGroup');

                if (parentStack) {
                    const siblingRows = parentStack.querySelectorAll('.ToolRow');
                    siblingRows.forEach(sibling => sibling.classList.remove('expanded'));
                }

                if (!isCurrentlyExpanded) {
                    row.classList.add('expanded');
                }
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const desktopBtn = document.getElementById('desktop-theme-btn');
    const mobileBtn = document.getElementById('mobile-theme-btn');

    function updateThemeIcons() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const iconClass = isLight ? 'fa-sun' : 'fa-moon';

        const desktopIcon = document.querySelector('#desktop-theme-btn i');
        const mobileIcon = document.querySelector('#mobile-theme-btn i');

        if (desktopIcon) desktopIcon.className = `fa-solid ${iconClass}`;
        if (mobileIcon) mobileIcon.className = `fa-solid ${iconClass}`;
    }

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

    if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
    if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);

    updateThemeIcons();
});