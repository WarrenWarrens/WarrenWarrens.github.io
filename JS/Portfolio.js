document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('portfolio-grid');
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));

    const dropdowns = document.querySelectorAll('.Dropdown');
    const filterOptions = document.querySelectorAll('.FilterOption');
    const sortOptions = document.querySelectorAll('.SortOption');
    const resetBtn = document.getElementById('reset-btn');

    // State object to track selected filters
    let activeFilters = {
        language: [],
        type: []
    };
    let currentSort = 'desc';

    // --- 1. Dropdown Toggle Logic ---
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.DropBtn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from bubbling up

            // Close all other dropdowns first
            dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('show'); });

            // Toggle this one
            dropdown.classList.toggle('show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('show'));
    });

    // --- 2. Filter Selection Logic ---
    filterOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Keep dropdown open while clicking options

            const category = option.getAttribute('data-category');
            const value = option.getAttribute('data-value');

            // Toggle selection state
            if (activeFilters[category].includes(value)) {
                // Remove if already selected
                activeFilters[category] = activeFilters[category].filter(v => v !== value);
                option.classList.remove('selected');
            } else {
                // Add if not selected
                activeFilters[category].push(value);
                option.classList.add('selected');
            }

            updateUI();
            applyFiltersAndSort();
        });
    });

    // --- 3. Sort Selection Logic ---
    sortOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            // Mutually exclusive: remove 'selected' from all sort options
            sortOptions.forEach(opt => opt.classList.remove('selected'));

            option.classList.add('selected');
            currentSort = option.getAttribute('data-sort');

            // Close dropdown
            option.closest('.Dropdown').classList.remove('show');

            // NEW: Added updateUI() here so the Date button highlights immediately!
            updateUI();
            applyFiltersAndSort();
        });
    });

    // --- 4. Reset Button Logic ---
    resetBtn.addEventListener('click', () => {
        // Clear state
        activeFilters = { language: [], type: [] };
        currentSort = 'desc'; // Reset sort to default (Newest First)

        // Reset Filter UI buttons
        filterOptions.forEach(opt => opt.classList.remove('selected'));

        // Reset Sort UI buttons
        sortOptions.forEach(opt => {
            if (opt.getAttribute('data-sort') === 'desc') {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });

        updateUI();
        applyFiltersAndSort();
    });

    // --- Helper: Update Buttons & Labels ---
    function updateUI() {
        let anyFiltersActive = false;

        // 1. Check Language and Type categories
        Object.keys(activeFilters).forEach(category => {
            const dropBtn = document.querySelector(`.FilterOption[data-category="${category}"]`).closest('.Dropdown').querySelector('.DropBtn');
            if (activeFilters[category].length > 0) {
                dropBtn.classList.add('has-selection');
                anyFiltersActive = true;
            } else {
                dropBtn.classList.remove('has-selection');
            }
        });

        // 2. Check Date category
        const dateDropBtn = document.querySelector('.DropBtn[data-label="Date"]');
        if (currentSort !== 'desc') {
            dateDropBtn.classList.add('has-selection');
            anyFiltersActive = true;
        } else {
            dateDropBtn.classList.remove('has-selection');
        }

        // 3. Toggle the Reset/All button state
        if (anyFiltersActive) {
            resetBtn.textContent = 'Clear';
            resetBtn.classList.add('is-clear');
            resetBtn.classList.remove('selected'); // Remove the active highlight
        } else {
            resetBtn.textContent = 'All';
            resetBtn.classList.remove('is-clear');
            resetBtn.classList.add('selected'); // Add the active highlight
        }
    }

    // NEW: Run updateUI once on page load so the "All" button is highlighted immediately
    updateUI();

    // --- Helper: Execute Filtering and Sorting ---
    function applyFiltersAndSort() {
        // 1. Filter
        portfolioItems.forEach(item => {
            const itemLang = item.getAttribute('data-language');
            const itemType = item.getAttribute('data-type');

            // If category array is empty, it means "allow all" for that category
            const matchLang = activeFilters.language.length === 0 || activeFilters.language.includes(itemLang);
            const matchType = activeFilters.type.length === 0 || activeFilters.type.includes(itemType);

            // Must match ALL active categories (AND logic between categories, OR logic within)
            if (matchLang && matchType) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // 2. Sort
        portfolioItems.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));

            return currentSort === 'desc' ? dateB - dateA : dateA - dateB;
        });

        // Re-append to grid
        portfolioItems.forEach(item => gridContainer.appendChild(item));
    }
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