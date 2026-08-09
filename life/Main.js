// Grab the elements from the DOM
const menuBtn = document.getElementById('green-btn');
const leftPanel = document.getElementById('red-panel');


menuBtn.addEventListener('click', () =>
{
    leftPanel.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
})
