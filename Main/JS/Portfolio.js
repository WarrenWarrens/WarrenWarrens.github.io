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

document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab all the links and the sections they point to
    const tocLinks = document.querySelectorAll('.TocLink');
    const sections = document.querySelectorAll('.StackItem[id]');
    const scrollContainer = document.querySelector('.SectionRight');

    // 2. Set up the observer configuration
    const observerOptions = {
        root: scrollContainer, // The container that does the scrolling
        rootMargin: '-20% 0px -70% 0px', // Triggers when a section is near the top third of the screen
        threshold: 0
    };

    // 3. Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                tocLinks.forEach(link => link.classList.remove('active'));

                // Find the link that matches the currently viewed section's ID
                const activeLink = document.querySelector(`.TocLink[href="#${entry.target.id}"]`);

                // Add 'active' class to highlight it white
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // 4. Tell the observer to watch every StackItem
    sections.forEach(section => {
        observer.observe(section);
    });
});