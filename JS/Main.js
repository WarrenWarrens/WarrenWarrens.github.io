
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



class BigCircle {
    constructor() {
        this.root = document.body
        this.cursor = document.querySelector(".curzr")
        this.circle = document.querySelector(".curzr .circle")
        this.dot = document.querySelector(".curzr .dot")

        this.pointerX = 0
        this.pointerY = 0
        this.cursorSize = 30

        this.circleStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            top: `${ this.cursorSize / -2 }px`,
            left: `${ this.cursorSize / -2 }px`,
            zIndex: '2147483647',
            width: `${ this.cursorSize }px`,
            height: `${ this.cursorSize }px`,
            backgroundColor: '#fff0',
            borderRadius: '50%',
            transition: '500ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none'
        }

        this.dotStyle = {
            boxSizing: 'border-box',
            position: 'fixed',
            zIndex: '2147483647',
            width: '6px',
            height: '6px',
            backgroundColor: '#fffd',
            borderRadius: '50%',
            userSelect: 'none',
            pointerEvents: 'none',
            transition: '250ms, transform 75ms'
        }

        if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
            this.circleStyle.backdropFilter = 'invert(1) grayscale(1)'
            this.circleStyle.backgroundColor = '#fff0'
            this.dotStyle.backdropFilter = 'invert(1) grayscale(1)'
            this.dotStyle.backgroundColor = '#fff0'
        } else {
            this.circleStyle.backgroundColor = '#000'
            this.circleStyle.opacity = '0.75'
            this.dotStyle.backgroundColor = '#fff'
            this.dotStyle.opacity = '0.75'
        }

        this.init(this.circle, this.circleStyle)
        this.init(this.dot, this.dotStyle)
    }

    init(el, style) {
        Object.assign(el.style, style)
        this.cursor.removeAttribute("hidden")

    }

    move(event) {
        this.pointerX = event.pageX
        this.pointerY = event.pageY + this.root.getBoundingClientRect().y

        this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
        this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`

        if (event.target.localName === 'button' ||
            event.target.localName === 'a' ||
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
            this.hover()
        }
    }

    hover() {
        this.circle.style.transform += ` scale(1.5)`
    }

    click() {
        this.circle.style.transform += ` scale(0.75)`
        setTimeout(() => {
            this.circle.style.transform = this.circle.style.transform.replace(` scale(0.75)`, '')
        }, 35)
    }

    remove() {
        this.circle.remove()
        this.dot.remove()
    }
}

(() => {
    const cursor = new BigCircle()
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.onmousemove = function (event) {
            cursor.move(event)
        }
        document.onclick = function () {
            cursor.click()
        }
    } else {
        cursor.remove()
    }

})()