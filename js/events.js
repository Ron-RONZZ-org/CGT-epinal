// Events Management - Sample data and functions

// Sample events data
const sampleEvents = [
    {
        id: 1,
        date: '2024-01-15',
        title: 'Permanence juridique',
        time: '14:00',
        type: 'blue',
        description: 'Conseil juridique pour les adhérents'
    },
    {
        id: 2,
        date: '2024-01-20',
        title: 'Assemblée Générale',
        time: '18:00',
        type: 'green',
        description: 'Assemblée générale mensuelle'
    },
    {
        id: 3,
        date: '2024-01-25',
        title: 'Manifestation pour les salaires',
        time: '10:00',
        type: 'red',
        description: 'Action revendicative'
    },
    {
        id: 4,
        date: '2024-02-01',
        title: 'Pot de bienvenue',
        time: '19:00',
        type: 'purple',
        description: 'Moment convivial entre adhérents'
    },
    {
        id: 5,
        date: '2024-02-10',
        title: 'Permanence aide sociale',
        time: '10:00',
        type: 'blue',
        description: 'Aide et conseil social'
    }
];

// Load upcoming events on homepage
function loadUpcomingEvents() {
    const eventsContainer = document.getElementById('upcoming-events');
    if (!eventsContainer) return;

    const today = new Date();
    const upcomingEvents = sampleEvents
        .filter(event => new Date(event.date) >= today)
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

// Initialize events on page load
if (document.getElementById('upcoming-events')) {
    document.addEventListener('DOMContentLoaded', loadUpcomingEvents);
}
