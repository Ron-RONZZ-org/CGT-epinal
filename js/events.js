// Events Management - Fetch data from events.json

// Global variable to store events
let sampleEvents = [];

// Fetch events from events.json
async function fetchEvents() {
    try {
        const response = await fetch('events.json');
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        sampleEvents = await response.json();
        return sampleEvents;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

// Load upcoming events on homepage
async function loadUpcomingEvents() {
    const eventsContainer = document.getElementById('upcoming-events');
    if (!eventsContainer) return;

    // show loading state
    eventsContainer.innerHTML = '<p class="loading-message">Chargement des événements...</p>';

    // Fetch events from events.json
    try {
        await fetchEvents();
    } catch (err) {
        console.error('Failed to load events:', err);
        eventsContainer.innerHTML = '<p class="loading-message">Impossible de charger les événements pour le moment.</p>';
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day for accurate comparison
    
    // parse dates as local dates (avoid timezone shift with YYYY-MM-DD)
    function parseISODate(dateStr) {
        // dateStr expected as 'YYYY-MM-DD' or ISO-like
        const parts = dateStr.split('-').map(Number);
        if (parts.length >= 3) {
            return new Date(parts[0], parts[1] - 1, parts[2]);
        }
        return new Date(dateStr);
    }

    const upcomingEvents = sampleEvents
        .filter(event => {
            const eventDate = parseISODate(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    if (upcomingEvents.length === 0) {
        eventsContainer.innerHTML = '<p class="loading-message">Aucun événement à venir pour le moment.</p>';
        return;
    }

    eventsContainer.innerHTML = upcomingEvents.map(event => `
        <div class="event-item ${event.type}">
            <div class="event-date">${formatEventDate(event.date)}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-time">${event.time}</div>
        </div>
    `).join('');
}

// Format event date for display
function formatEventDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
}

// Initialize events on page load — always attach listener
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('upcoming-events')) {
        loadUpcomingEvents();
    }
});
