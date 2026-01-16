// Events Management - Parse markdown files from events directory

// Global variable to store events
let sampleEvents = [];

// Parse a single markdown event file
function parseEventMarkdown(filename, content) {
    const lines = content.split('\n').map(line => line.trim());
    
    // Extract event data
    const event = {
        id: null,
        date: null,
        title: '',
        time: '00:00',
        type: 'blue',
        description: '',
        location: '',
        link: ''
    };
    
    // Parse title and link from first line: # [Title](link)
    const titleLine = lines.find(line => line.startsWith('#'));
    if (titleLine) {
        const titleMatch = titleLine.match(/\[([^\]]+)\](?:\(([^\)]+)\))?/);
        if (titleMatch) {
            event.title = titleMatch[1];
            event.link = titleMatch[2] || '';
        } else {
            // Fallback: just extract text after #
            event.title = titleLine.replace(/^#+\s*/, '');
        }
    }
    
    // Find section indices
    const descIdx = lines.findIndex(line => line === '## Event description');
    const dateIdx = lines.findIndex(line => line === '## Date');
    const locationIdx = lines.findIndex(line => line === '## Location');
    const typeIdx = lines.findIndex(line => line === '## Type');
    
    // Extract description
    if (descIdx !== -1 && dateIdx !== -1) {
        const descLines = lines.slice(descIdx + 1, dateIdx).filter(line => line && !line.startsWith('#'));
        event.description = descLines.join(' ').trim();
    }
    
    // Extract date (DD-MM-YYYY format) and convert to ISO (YYYY-MM-DD)
    if (dateIdx !== -1 && locationIdx !== -1) {
        const dateLine = lines.slice(dateIdx + 1, locationIdx).find(line => line && !line.startsWith('#'));
        if (dateLine) {
            const dateMatch = dateLine.match(/(\d{2})-(\d{2})-(\d{4})/);
            if (dateMatch) {
                const [, day, month, year] = dateMatch;
                event.date = `${year}-${month}-${day}`; // Convert to ISO format
            }
        }
    }
    
    // Extract location
    if (locationIdx !== -1 && typeIdx !== -1) {
        const locationLines = lines.slice(locationIdx + 1, typeIdx).filter(line => line && !line.startsWith('#'));
        event.location = locationLines.join(' ').trim();
    }
    
    // Extract type based on checked checkbox
    if (typeIdx !== -1) {
        const typeLines = lines.slice(typeIdx + 1);
        if (typeLines.some(line => line.includes('[X] Permanence') || line.includes('[x] Permanence'))) {
            event.type = 'blue';
        } else if (typeLines.some(line => line.includes('[X] Administrative') || line.includes('[x] Administrative'))) {
            event.type = 'green';
        } else if (typeLines.some(line => line.includes('[X] Convialité') || line.includes('[x] Convialité'))) {
            event.type = 'purple';
        } else if (typeLines.some(line => line.includes('[X] Action syndicale') || line.includes('[x] Action syndicale'))) {
            event.type = 'red';
        }
    }
    
    // Generate ID from filename
    event.id = filename.replace('.md', '');
    
    // Extract time from filename if present, or set default based on type
    if (event.type === 'blue') {
        event.time = '14:00'; // Permanence typically afternoon
    } else if (event.type === 'green') {
        event.time = '18:00'; // Administrative typically evening
    } else if (event.type === 'red') {
        event.time = '10:00'; // Actions typically morning
    } else if (event.type === 'purple') {
        event.time = '19:00'; // Social events typically evening
    }
    
    return event;
}

// Validate event data
function isValidEvent(event) {
    // Check required fields
    if (!event.title || event.title.trim() === '') {
        console.warn('Event missing title:', event);
        return false;
    }
    
    if (!event.date) {
        console.warn('Event missing date:', event);
        return false;
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(event.date)) {
        console.warn('Event has invalid date format (expected YYYY-MM-DD):', event.date);
        return false;
    }
    
    // Validate type is one of the allowed values
    const validTypes = ['blue', 'purple', 'red', 'green'];
    if (!validTypes.includes(event.type)) {
        console.warn('Event has invalid type (expected blue, purple, red, or green):', event.type);
        return false;
    }
    
    return true;
}

// Fetch and parse all event markdown files
async function fetchEvents() {
    try {
        // First, try to fetch the events index file
        const indexResponse = await fetch('events-index.json');
        
        if (indexResponse.ok) {
            // Parse markdown files from the index
            const eventFiles = await indexResponse.json();
            sampleEvents = [];
            
            for (const filename of eventFiles) {
                try {
                    const fileResponse = await fetch(`events/${filename}`);
                    if (fileResponse.ok) {
                        const content = await fileResponse.text();
                        const event = parseEventMarkdown(filename, content);
                        if (isValidEvent(event)) {
                            sampleEvents.push(event);
                        }
                    }
                } catch (err) {
                    console.warn(`Could not fetch ${filename}:`, err);
                }
            }
            
            return sampleEvents;
        }
        
        // Fallback: try to fetch events.json for backward compatibility
        const response = await fetch('events.json');
        if (!response.ok) {
            throw new Error('Neither events-index.json nor events.json found');
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
