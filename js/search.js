// Search functionality

// Site content for search
const siteContent = [
    {
        title: 'Accueil',
        url: 'index.html',
        content: 'CGT Union Locale Épinal se syndiquer pour ne pas être seul actualités événements'
    },
    {
        title: 'La CGT ? - Qui sommes-nous',
        url: 'intro.html',
        content: 'union locale CGT Épinal syndicat défense droits travailleurs solidarité justice sociale mission valeurs adhérer permanence conseil'
    },
    {
        title: 'Agenda',
        url: 'calendar.html',
        content: 'événements agenda permanence juridique aide sociale action syndicale grève convialité assemblée réunion',
        baseContent: 'événements agenda permanence juridique aide sociale action syndicale grève convialité assemblée réunion'
    },
    {
        title: 'Contact - Se syndiquer',
        url: 'contact.html',
        content: 'contact Michel Tomasini ulcgtepinal gmail téléphone adresse inscription en ligne syndiquer adhésion'
    }
];

// Fetch and update agenda content from events.json
async function updateAgendaContent() {
    try {
        const response = await fetch('events.json');
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const events = await response.json();
        
        // Update the agenda content in siteContent array
        const agendaIndex = siteContent.findIndex(item => item.url === 'calendar.html');
        if (agendaIndex !== -1) {
            const eventTitles = events.map(event => event.title).join(' ');
            const eventDescriptions = events.map(event => event.description).join(' ');
            // Reset to base content before appending to avoid accumulation
            siteContent[agendaIndex].content = `${siteContent[agendaIndex].baseContent} ${eventTitles} ${eventDescriptions}`;
        }
    } catch (error) {
        console.error('Error fetching events for search:', error);
    }
}

// Initialize search page
async function initializeSearch() {
    // Update agenda content with latest events
    await updateAgendaContent();
    
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    const mainSearchInput = document.getElementById('main-search-input');
    const mainSearchBtn = document.getElementById('main-search-btn');
    
    if (query && mainSearchInput) {
        mainSearchInput.value = query;
        performMainSearch(query);
    }
    
    if (mainSearchBtn && mainSearchInput) {
        mainSearchBtn.addEventListener('click', function() {
            performMainSearch(mainSearchInput.value);
        });
        
        mainSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performMainSearch(mainSearchInput.value);
            }
        });
    }
}

// Perform main search
function performMainSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (!query || query.trim() === '') {
        searchResults.innerHTML = '<p class="search-info">Veuillez entrer un terme de recherche.</p>';
        return;
    }
    
    const results = searchSiteContent(query);
    displaySearchResults(results, query);
}

// Search site content
function searchSiteContent(query) {
    const searchTerm = query.toLowerCase().trim();
    const results = [];
    
    siteContent.forEach(page => {
        const titleMatch = page.title.toLowerCase().includes(searchTerm);
        const contentMatch = page.content.toLowerCase().includes(searchTerm);
        
        if (titleMatch || contentMatch) {
            results.push({
                ...page,
                relevance: titleMatch ? 2 : 1
            });
        }
    });
    
    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
}

// Display search results
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <p class="search-info">Aucun résultat trouvé pour "${query}".</p>
            <p class="search-info">Essayez avec d'autres mots-clés.</p>
        `;
        return;
    }
    
    const resultsHTML = `
        <p class="search-info">${results.length} résultat(s) trouvé(s) pour "${query}"</p>
        ${results.map(result => `
            <div class="search-result-item">
                <h3><a href="${result.url}">${result.title}</a></h3>
                <p>${getExcerpt(result.content, query)}</p>
                <a href="${result.url}">Voir la page →</a>
            </div>
        `).join('')}
    `;
    
    searchResults.innerHTML = resultsHTML;
}

// Get excerpt with search term highlighted
function getExcerpt(content, query) {
    const searchTerm = query.toLowerCase().trim();
    const lowerContent = content.toLowerCase();
    const index = lowerContent.indexOf(searchTerm);
    
    if (index === -1) {
        return content.substring(0, 150) + '...';
    }
    
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + searchTerm.length + 100);
    let excerpt = content.substring(start, end);
    
    if (start > 0) excerpt = '...' + excerpt;
    if (end < content.length) excerpt = excerpt + '...';
    
    // Highlight search term
    const regex = new RegExp(query, 'gi');
    excerpt = excerpt.replace(regex, match => `<strong style="background-color: #fab005;">${match}</strong>`);
    
    return excerpt;
}

// Initialize search on page load
if (document.getElementById('search-results')) {
    document.addEventListener('DOMContentLoaded', initializeSearch);
}
