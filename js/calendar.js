// Calendar Page - Events display and filtering
// NOTE: This file depends on sampleEvents array from events.js
// Ensure events.js is loaded before calendar.js in the HTML

// Load all events on calendar page
function loadCalendarEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    displayEvents(sampleEvents);
    initializeFilters();
}

// Display events in the calendar
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    
    if (events.length === 0) {
        eventsContainer.innerHTML = '<p class="loading-message">Aucun événement trouvé.</p>';
        return;
    }

    const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

    eventsContainer.innerHTML = sortedEvents.map(event => `
        <div class="event-item ${event.type}" data-type="${event.type}">
            <div class="event-date">${formatEventDate(event.date)}</div>
            <div class="event-title">
                <strong>${event.title}</strong>
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.25rem;">${event.description}</p>
            </div>
            <div class="event-time">${event.time}</div>
        </div>
    `).join('');
}

// Format event date for calendar display
function formatEventDate(dateString) {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
}

// Initialize filter buttons
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.getAttribute('data-filter');
            
            // Filter events
            filterEvents(filterType);
        });
    });
}

// Filter events by type
function filterEvents(filterType) {
    if (filterType === 'all') {
        displayEvents(sampleEvents);
    } else {
        const filteredEvents = sampleEvents.filter(event => event.type === filterType);
        displayEvents(filteredEvents);
    }
}

// Initialize calendar on page load
if (document.getElementById('events-container')) {
    document.addEventListener('DOMContentLoaded', loadCalendarEvents);
}
