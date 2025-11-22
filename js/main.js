// CGT Union Locale Épinal - Main JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    updateCopyrightYear();
    initSearchBar();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Search bar functionality
function initSearchBar() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

// Perform search
function performSearch(query) {
    if (query.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
}

// Helper function to format time
function formatTime(timeString) {
    return timeString.substring(0, 5); // HH:MM format
}
