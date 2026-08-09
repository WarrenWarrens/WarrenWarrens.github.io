// Grab the elements from the DOM
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

    // Formatting options specifically locked to Toronto time
    const options = {
        timeZone: 'America/Toronto',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, /* This forces 24-hour (military) time and removes AM/PM */
        timeZoneName: 'short'
    };

    // Format the current date/time
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    timeElement.textContent = formatter.format(now);
}

// Update the clock every second
setInterval(updateTorontoTime, 60000);

// Call it immediately so there is no 1-second delay on page load
updateTorontoTime();