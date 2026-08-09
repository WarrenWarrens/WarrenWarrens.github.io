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

document.addEventListener('DOMContentLoaded', () => {
    // FIX: Target the individual tab wrappers, not the main container
    const tabItems = document.querySelectorAll('.DivServiceTab');

    tabItems.forEach(item => {
        const button = item.querySelector('.ButtonTab');

        button.addEventListener('click', () => {
            // First, remove the 'active' class from all items
            tabItems.forEach(i => i.classList.remove('active'));

            // Add the 'active' class to the clicked item
            item.classList.add('active');
        });
    });
});

// Listen for browser window resizing
window.addEventListener('resize', () => {
    // Check if the window width has crossed back into desktop territory (greater than 800px)
    if (window.innerWidth > 800) {
        // Remove the mobile menu classes so they don't break the desktop layout
        leftPanel.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});