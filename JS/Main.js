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
        const iconClass = isLight ? 'fa-regular fa-sun' : 'fa-solid fa-moon';

        const desktopIcon = document.querySelector('#desktop-theme-btn i');
        const mobileIcon = document.querySelector('#mobile-theme-btn i');

        if (desktopIcon) desktopIcon.className = iconClass;
        if (mobileIcon) mobileIcon.className = iconClass;
    }

    function toggleTheme() {
        const html = document.documentElement;
        if (html.getAttribute('data-theme') === 'light') {
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

class BigCircle {
    constructor() {
        this.root = document.body;
        this.cursor = document.querySelector(".curzr");
        this.circle = document.querySelector(".curzr .circle");
        this.dot = document.querySelector(".curzr .dot");

        this.pointerX = 0;
        this.pointerY = 0;
        this.cursorSize = 30;
        this.firstMove = true;

        this.hasFilter = CSS.supports("backdrop-filter", "invert(1) grayscale(1)");
        this.baseBackdrop = this.hasFilter ? 'invert(1) grayscale(1)' : 'none';
        this.baseColor = this.hasFilter ? '#fff0' : 'rgba(0,0,0,0.75)';

        this.baseTransition = 'width 0.2s, height 0.2s, top 0.2s, left 0.2s, border-radius 0.2s, background-color 0.2s, backdrop-filter 0.2s, transform 0.1s';

        this.circleStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: `${this.cursorSize / -2}px`,
            left: `${this.cursorSize / -2}px`,
            zIndex: '2147483647',
            width: `${this.cursorSize}px`,
            height: `${this.cursorSize}px`,
            backgroundColor: this.baseColor,
            backdropFilter: this.baseBackdrop,
            borderRadius: '50%',
            transition: this.baseTransition,
            userSelect: 'none',
            pointerEvents: 'none'
        };

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: '2147483647',
            width: '6px',
            height: '6px',
            backgroundColor: this.hasFilter ? '#fff0' : '#fff',
            backdropFilter: this.baseBackdrop,
            borderRadius: '50%',
            userSelect: 'none',
            pointerEvents: 'none',
            transition: 'opacity 0.2s, transform 0.075s'
        };

        this.init(this.circle, this.circleStyle);
        this.init(this.dot, this.dotStyle);

        this.cursorText = document.querySelector(".curzr .circle .cursor-text");
        this.isHoveringLink = false;
        this.currentState = 'default';
    }

    init(el, style) {
        Object.assign(el.style, style);
    }

    move(event) {
        this.pointerX = event.pageX;
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y;

        if (this.firstMove) {
            this.circle.style.transition = 'none';
            this.dot.style.transition = 'none';

            this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
            this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`;

            void this.circle.offsetWidth;

            this.circle.style.transition = this.baseTransition;
            this.dot.style.transition = 'opacity 0.2s, transform 0.075s';

            this.cursor.removeAttribute("hidden");
            this.firstMove = false;
        } else {
            this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
            this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`;
        }

        const pillTarget = event.target.closest ? event.target.closest('[data-cursor-text]') : null;
        const hoverTarget = event.target.closest ? event.target.closest('a, button, input, .TechBadge, .ToolTop') : null;

        if (pillTarget) {
            this.hoverPill(pillTarget);
        } else if (hoverTarget) {
            this.hoverExpand(hoverTarget);
        } else {
            this.resetHover();
        }
    }

    hoverExpand(target) {
        if (this.currentState !== 'expanded') {
            this.currentState = 'expanded';
            const expandedSize = this.cursorSize * 1.5;

            const badgeColor = target.getAttribute('data-cursor-color');

            Object.assign(this.circle.style, {
                width: `${expandedSize}px`,
                height: `${expandedSize}px`,
                top: `${expandedSize / -2}px`,
                left: `${expandedSize / -2}px`,
                borderRadius: '50%',
                backgroundColor: badgeColor ? badgeColor : this.baseColor,
                backdropFilter: badgeColor ? 'none' : this.baseBackdrop,
                display: 'block'
            });

            this.cursorText.style.display = 'none';
            this.dot.style.opacity = '0.75';
        }
    }

    hoverPill(target) {
        const targetText = target.getAttribute('data-cursor-text');
        const targetIcon = target.getAttribute('data-cursor-icon');

        if (!targetText) return;
        this.cursorText.innerHTML = targetIcon ? `<i class="fa-solid ${targetIcon}"></i> ${targetText}` : targetText;
        this.cursorText.style.display = 'block';
        this.cursorText.style.color = 'var(--bg-color)';
        this.dot.style.opacity = '0';

        if (this.currentState === 'pill') return;
        this.currentState = 'pill';

        Object.assign(this.circle.style, {
            width: '140px',
            height: '40px',
            top: '-20px',
            left: '-70px',
            borderRadius: '20px',
            backgroundColor: 'var(--text-main)',
            backdropFilter: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
        });
    }

    resetHover() {
        if (this.currentState !== 'default') {
            this.currentState = 'default';

            Object.assign(this.circle.style, {
                width: `${this.cursorSize}px`,
                height: `${this.cursorSize}px`,
                top: `${this.cursorSize / -2}px`,
                left: `${this.cursorSize / -2}px`,
                borderRadius: '50%',
                backgroundColor: this.baseColor,
                backdropFilter: this.baseBackdrop,
                display: 'block'
            });

            this.cursorText.style.display = 'none';
            this.dot.style.opacity = '0.75';
        }
    }

    click() {
        this.circle.style.transform += ` scale(0.75)`;
        setTimeout(() => {
            this.circle.style.transform = this.circle.style.transform.replace(` scale(0.75)`, '');
        }, 35);
    }

    remove() {
        this.circle.remove();
        this.dot.remove();
    }
}

(() => {
    const cursor = new BigCircle();
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.onmousemove = function (event) { cursor.move(event); };
        document.onclick = function () { cursor.click(); };
    } else {
        cursor.remove();
    }
})();