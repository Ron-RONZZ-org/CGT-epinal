// CGT Union Locale Épinal - Main JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadHeaderAndFooter();
    handleVideoAutoplay();
});

// Handle video autoplay with respect to user preferences
function handleVideoAutoplay() {
    const video = document.querySelector('.hero-section video');
    if (video) {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Disable autoplay for users who prefer reduced motion
            video.removeAttribute('autoplay');
            video.pause();
        }
    }
}

// Load header and footer dynamically
async function loadHeaderAndFooter() {
    try {
        // Load header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            const headerResponse = await fetch('header.html');
            if (headerResponse.ok) {
                const headerHTML = await headerResponse.text();
                headerPlaceholder.innerHTML = headerHTML;
            } else {
                console.error('Failed to load header.html:', headerResponse.status);
            }
        }

        // Load footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerResponse = await fetch('footer.html');
            if (footerResponse.ok) {
                const footerHTML = await footerResponse.text();
                footerPlaceholder.innerHTML = footerHTML;
            } else {
                console.error('Failed to load footer.html:', footerResponse.status);
            }
        }

        // Update active nav link based on current page
        updateActiveNavLink();
        
        // Re-initialize after header/footer are loaded
        initNavigation();
        initSearchBar();
        updateCopyrightYear();
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}

// Update active navigation link based on current page
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaLink = document.querySelector('.btn-syndicate');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Special handling for contact page CTA button
    if (ctaLink && currentPage === 'contact.html') {
        ctaLink.classList.add('active');
    }
}

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
