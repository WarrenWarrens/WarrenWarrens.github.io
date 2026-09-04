document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('portfolio-grid');
    const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));

    const dropdowns = document.querySelectorAll('.Dropdown');
    const filterOptions = document.querySelectorAll('.FilterOption');
    const sortOptions = document.querySelectorAll('.SortOption');
    const resetBtn = document.getElementById('reset-btn');

    let activeFilters = {
        language: [],
        type: []
    };
    let currentSort = 'desc';

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.DropBtn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('show'); });

            dropdown.classList.toggle('show');
        });
    });

    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('show'));
    });

    filterOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            const category = option.getAttribute('data-category');
            const value = option.getAttribute('data-value');

            if (activeFilters[category].includes(value)) {
                activeFilters[category] = activeFilters[category].filter(v => v !== value);
                option.classList.remove('selected');
            } else {
                activeFilters[category].push(value);
                option.classList.add('selected');
            }

            updateUI();
            applyFiltersAndSort();
        });
    });

    sortOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            sortOptions.forEach(opt => opt.classList.remove('selected'));

            option.classList.add('selected');
            currentSort = option.getAttribute('data-sort');

            option.closest('.Dropdown').classList.remove('show');

            updateUI();
            applyFiltersAndSort();
        });
    });

    resetBtn.addEventListener('click', () => {
        activeFilters = { language: [], type: [] };
        currentSort = 'desc';

        filterOptions.forEach(opt => opt.classList.remove('selected'));

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

    function updateUI() {
        let anyFiltersActive = false;

        Object.keys(activeFilters).forEach(category => {
            const dropBtn = document.querySelector(`.FilterOption[data-category="${category}"]`).closest('.Dropdown').querySelector('.DropBtn');
            if (activeFilters[category].length > 0) {
                dropBtn.classList.add('has-selection');
                anyFiltersActive = true;
            } else {
                dropBtn.classList.remove('has-selection');
            }
        });

        const dateDropBtn = document.querySelector('.DropBtn[data-label="Date"]');
        if (currentSort !== 'desc') {
            dateDropBtn.classList.add('has-selection');
            anyFiltersActive = true;
        } else {
            dateDropBtn.classList.remove('has-selection');
        }

        if (anyFiltersActive) {
            resetBtn.textContent = 'Clear';
            resetBtn.classList.add('is-clear');
            resetBtn.classList.remove('selected');
        } else {
            resetBtn.textContent = 'All';
            resetBtn.classList.remove('is-clear');
            resetBtn.classList.add('selected');
        }
    }

    updateUI();

    function applyFiltersAndSort() {
        portfolioItems.forEach(item => {
            const itemLang = item.getAttribute('data-language');
            const itemType = item.getAttribute('data-type');

            const matchLang = activeFilters.language.length === 0 || activeFilters.language.includes(itemLang);
            const matchType = activeFilters.type.length === 0 || activeFilters.type.includes(itemType);

            if (matchLang && matchType) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        portfolioItems.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));

            return currentSort === 'desc' ? dateB - dateA : dateA - dateB;
        });

        portfolioItems.forEach(item => gridContainer.appendChild(item));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.TocLink');
    const sections = document.querySelectorAll('.StackItem[id]');
    const scrollContainer = document.querySelector('.SectionRight');

    const observerOptions = {
        root: scrollContainer,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`.TocLink[href="#${entry.target.id}"]`);

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});