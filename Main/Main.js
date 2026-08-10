// const menuBtn = document.getElementById('green-btn');
// const leftPanel = document.getElementById('red-panel');
//
//
// menuBtn.addEventListener('click', () =>
// {
//     leftPanel.classList.toggle('active');
//     document.body.classList.toggle('no-scroll');
// })
//
// function updateTorontoTime() {
//     const timeElement = document.getElementById('toronto-time');
//     const now = new Date();
//
//     const options = {
//         timeZone: 'America/Toronto',
//         weekday: 'short',
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: false,
//         timeZoneName: 'short'
//     };
//
//     const formatter = new Intl.DateTimeFormat('en-CA', options);
//     timeElement.textContent = formatter.format(now);
// }
//
// setInterval(updateTorontoTime, 60000);
//
// updateTorontoTime();
//
// document.addEventListener('DOMContentLoaded', () => {
//     const tabItems = document.querySelectorAll('.DivServiceTab');
//
//     tabItems.forEach(item => {
//         const button = item.querySelector('.ButtonTab');
//
//         button.addEventListener('click', () => {
//             tabItems.forEach(i => i.classList.remove('active'));
//
//             item.classList.add('active');
//         });
//     });
// });
//
// window.addEventListener('resize', () => {
//     if (window.innerWidth > 800) {
//         leftPanel.classList.remove('active');
//         document.body.classList.remove('no-scroll');
//     }
// });

// Grab the elements from the DOM
const menuBtn = document.getElementById('green-btn');
const leftPanel = document.getElementById('red-panel');

// NULL CHECK: Only run the menu logic if the menu button actually exists on this page
if (menuBtn && leftPanel) {
    menuBtn.addEventListener('click', () => {
        leftPanel.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

function updateTorontoTime() {
    const timeElement = document.getElementById('toronto-time');

    // NULL CHECK: If the clock element isn't on this specific HTML page, stop the function here!
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