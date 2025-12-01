if (document.getElementById('my-work-link')) {
    document.getElementById('my-work-link').addEventListener('click', () => {
        document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
    })
}

const EMAIL = "pamplona1999@gmail.com";
const SOCIAL_LINKS = {
    itch: "https://beastiebaiter.itch.io/",
    twitter: "https://x.com/Beastie_baiterlink",
    instagram: "https://instagram.com/yourhandle",
    linkedin: "www.linkedin.com/in/joão-pedro-pamplona-4a025a253"
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("footer-itch-link").href = SOCIAL_LINKS.itch;
    document.getElementById("footer-twitter-link").href = SOCIAL_LINKS.twitter;
    //document.getElementById("footer-instagram-link").href = SOCIAL_LINKS.instagram;
    document.getElementById("footer-linkedin-link").href = SOCIAL_LINKS.linkedin;
    document.getElementById("footer-email-link").href = `mailto:${EMAIL}`;
    document.getElementById("email-link").href = `mailto:${EMAIL}`;
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-page-card');
let activeFilters = new Set();

// Initialize filters from URL on page load
function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filtersParam = urlParams.get('filters');

    if (filtersParam) {
        const filters = filtersParam.split(',');
        filters.forEach(filter => {
            activeFilters.add(filter);
            const button = document.querySelector(`[data-filter="${filter}"]`);
            if (button) {
                button.classList.add('active');
            }
        });

        // Remove "All" active state if filters are present
        if (activeFilters.size > 0) {
            document.querySelector('.all-button').classList.remove('active');
            filterProjects();
        }
    }
}

// Update URL when filters change
function updateURL() {
    const url = new URL(window.location);

    if (activeFilters.size === 0) {
        url.searchParams.delete('filters');
    } else {
        url.searchParams.set('filters', Array.from(activeFilters).join(','));
    }

    window.history.pushState({}, '', url);
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Handle "All" button
        if (filter === 'all') {
            activeFilters.clear();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showAllProjects();
            updateURL();
            return;
        }

        // Remove "All" active state
        document.querySelector('.all-button').classList.remove('active');

        // Toggle filter
        if (activeFilters.has(filter)) {
            activeFilters.delete(filter);
            button.classList.remove('active');
        } else {
            activeFilters.add(filter);
            button.classList.add('active');
        }

        // If no filters selected, show all and activate "All" button
        if (activeFilters.size === 0) {
            document.querySelector('.all-button').classList.add('active');
            showAllProjects();
            updateURL();
            return;
        }

        // Filter projects and update URL
        filterProjects();
        updateURL();
    });
});

function showAllProjects() {
    projectCards.forEach(card => {
        card.classList.remove('hidden');
    });
}

function filterProjects() {
    projectCards.forEach(card => {
        const cardTags = card.dataset.tags.split(',');

        // Show card if it has ANY of the active filters
        const hasMatchingTag = cardTags.some(tag => activeFilters.has(tag));

        if (hasMatchingTag) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Initialize filters from URL on page load
initializeFromURL();