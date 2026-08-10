const menuBtn = document.getElementById('green-btn');
const leftPanel = document.getElementById('red-panel');


menuBtn.addEventListener('click', () =>
{
    leftPanel.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
})

function updateTorontoTime() {
    const timeElement = document.getElementById('toronto-time');
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
    const tabItems = document.querySelectorAll('.DivServiceTab');

    tabItems.forEach(item => {
        const button = item.querySelector('.ButtonTab');

        button.addEventListener('click', () => {
            tabItems.forEach(i => i.classList.remove('active'));

            item.classList.add('active');
        });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        leftPanel.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});