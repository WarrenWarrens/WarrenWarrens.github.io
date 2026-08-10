document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('portfolio-grid');
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    const filterBtns = document.querySelectorAll('.FilterBtn');
    const sortBtns = document.querySelectorAll('.SortBtn');

    // --- FILTERING LOGIC ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button styling
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemLanguage = item.getAttribute('data-language');

                // Show item if it matches the filter, or if 'all' is selected
                if (filterValue === 'all' || itemLanguage === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- SORTING LOGIC ---
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sortOrder = btn.getAttribute('data-sort'); // 'asc' or 'desc'

            // Sort the array of HTML elements based on their data-date attribute
            portfolioItems.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));

                if (sortOrder === 'desc') {
                    return dateB - dateA; // Newest first
                } else {
                    return dateA - dateB; // Oldest first
                }
            });

            // Re-append the sorted items back into the grid container
            // (DOM automatically moves existing nodes rather than duplicating them)
            portfolioItems.forEach(item => gridContainer.appendChild(item));
        });
    });
});