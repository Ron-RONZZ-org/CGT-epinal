// Calendar Page - Events display and filtering
// NOTE: This file depends on sampleEvents array from events.js
// Ensure events.js is loaded before calendar.js in the HTML

// Load all events on calendar page
async function loadCalendarEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    // Ensure events are fetched
    await fetchEvents();
    
    // Filter out past events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    function parseISODate(dateStr) {
        const parts = dateStr.split('-').map(Number);
        if (parts.length >= 3) {
            return new Date(parts[0], parts[1] - 1, parts[2]);
        }
        return new Date(dateStr);
    }
    
    const upcomingEvents = sampleEvents.filter(event => {
        const eventDate = parseISODate(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
    });

    displayEvents(upcomingEvents);
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

    eventsContainer.innerHTML = sortedEvents.map((event, index) => {
        const renderedDescription = typeof parseMarkdown !== 'undefined' && event.description ? 
            parseMarkdown(event.description) : event.description;
        
        const socialLink = event.link && event.link.trim() !== '' ? 
            `<p class="event-social-link"><a href="${event.link}" target="_blank" rel="noopener noreferrer">Voir sur les réseaux sociaux</a></p>` : '';
        
        return `
            <div class="event-item ${event.type}" data-type="${event.type}">
                <div class="event-header">
                    <div class="event-date">${formatEventDate(event.date)}</div>
                    <div class="event-title">
                        <strong>${event.title}</strong>
                    </div>
                    <div class="event-time">${event.time}</div>
                    ${event.description ? `<button class="event-expand-btn" data-event-id="cal-${index}" aria-label="Afficher la description"><i class="fas fa-plus"></i></button>` : ''}
                </div>
                ${event.description ? `
                <div class="event-description-container" id="cal-${index}" style="display: none;">
                    <div class="event-description">${renderedDescription}</div>
                    ${socialLink}
                </div>` : ''}
            </div>
        `;
    }).join('');
    
    // Add event listeners for expand buttons
    document.querySelectorAll('.event-expand-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const eventId = this.getAttribute('data-event-id');
            const descContainer = document.getElementById(eventId);
            const icon = this.querySelector('i');
            
            if (descContainer.style.display === 'none') {
                descContainer.style.display = 'block';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                this.setAttribute('aria-label', 'Masquer la description');
            } else {
                descContainer.style.display = 'none';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                this.setAttribute('aria-label', 'Afficher la description');
            }
        });
    });
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
    // Filter out past events first
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    function parseISODate(dateStr) {
        const parts = dateStr.split('-').map(Number);
        if (parts.length >= 3) {
            return new Date(parts[0], parts[1] - 1, parts[2]);
        }
        return new Date(dateStr);
    }
    
    const upcomingEvents = sampleEvents.filter(event => {
        const eventDate = parseISODate(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
    });
    
    if (filterType === 'all') {
        displayEvents(upcomingEvents);
    } else {
        const filteredEvents = upcomingEvents.filter(event => event.type === filterType);
        displayEvents(filteredEvents);
    }
}

// Initialize calendar on page load
if (document.getElementById('events-container')) {
    document.addEventListener('DOMContentLoaded', loadCalendarEvents);
}
