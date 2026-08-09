// Grab the elements from the DOM
const greenBtn = document.getElementById('green-btn');
const redPanel = document.getElementById('red-panel');

// Add a click listener to the green button
greenBtn.addEventListener('click', () => {
    // Toggles the 'active' class on and off
    redPanel.classList.toggle('active');
});