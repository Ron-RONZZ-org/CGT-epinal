# Copilot Instructions for CGT Union Locale Épinal Website

## Project Overview

This is the official website for **CGT Union Locale Épinal** (Confédération Générale du Travail - Épinal Local Union), a French labor union website that provides information about the union, events calendar, news, and membership options.

**Purpose:** Provide an accessible, informative website for union members and potential members to learn about CGT Épinal, stay updated on events and news, and facilitate union membership.

**Target Audience:** French-speaking workers and union members in the Épinal region.

## Technology Stack

- **HTML5** - Semantic markup for all pages
- **CSS3** - Custom styling with CSS variables
- **Vanilla JavaScript** - No frameworks, pure JavaScript for interactivity
- **Font Awesome 6.4.0** - Icon library (CDN)
- **No build process** - Static files served directly

## Language Requirements

**CRITICAL:** All user-facing content MUST be in French:
- All text content, labels, buttons, and messages
- Comments in HTML/CSS/JS should be in French when describing user-facing features
- Error messages and user feedback
- Meta descriptions and SEO content

**Examples:**
- ✅ "Se syndiquer" (Join the union)
- ✅ "Rechercher..." (Search...)
- ✅ "Événements à venir" (Upcoming events)
- ❌ "Join now" (English - not acceptable)
- ❌ "Search..." (English - not acceptable)

## Design Guidelines

### Brand Colors (CGT Official)
Use these exact color values defined in CSS variables:

```css
--primary-red: #f03e3e     /* Main CGT red - for primary actions and headers */
--secondary-yellow: #fab005 /* CGT yellow - for accents and highlights */
--light-gray: #dcdad7      /* Background and subtle elements */
--dark-gray: #333          /* Text and dark elements */
--white: #ffffff           /* Backgrounds and contrast */
--text-dark: #2c2c2c      /* Body text */
```

### Event Type Colors
Events are categorized with specific colors:

```css
--event-blue: #4a90e2    /* Permanence (office hours, legal help, social aid) */
--event-purple: #9b59b6  /* Convialité (social/community events) */
--event-red: #f03e3e     /* Action syndicale (strikes, demonstrations) */
--event-green: #27ae60   /* Administrative (meetings, assemblies) */
```

### Visual Identity
- **Logo:** Use official CGT logo from `https://www.cgt.fr/themes/bluedrop/svg/logo.svg`
- **Favicon:** Use CGT logo from Wikipedia
- **Typography:** 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Responsive Design:** Mobile-first approach with hamburger menu on small screens

## File Structure

```
/
├── index.html          # Homepage with video, news feed, upcoming events
├── intro.html          # About CGT Union Locale Épinal
├── calendar.html       # Full events calendar with filtering
├── contact.html        # Contact information and membership form
├── search.html         # Site-wide search functionality
├── css/
│   └── style.css       # Main stylesheet (all styles in one file)
├── js/
│   ├── main.js         # Navigation, search, copyright year
│   ├── events.js       # Event data and event loading functions
│   ├── calendar.js     # Calendar page functionality
│   └── search.js       # Search functionality
├── resources/          # Additional resources/assets
└── events.json         # Event data (if used instead of events.js)
```

## Code Conventions

### HTML
- Use semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<footer>`)
- Include proper meta tags for SEO and Open Graph
- Always set `lang="fr"` on `<html>` element
- Use descriptive `aria-label` attributes for accessibility
- Maintain consistent navigation structure across all pages

### CSS
- Use CSS custom properties (variables) defined in `:root` for colors
- Follow BEM-like naming for complex components (e.g., `.nav-container`, `.nav-menu`, `.nav-item`)
- Keep all styles in `css/style.css` (single stylesheet)
- Mobile-first responsive design with media queries
- Use flexbox for layouts

### JavaScript
- Use modern ES6+ syntax (const, let, arrow functions, template literals)
- Always wrap code in `DOMContentLoaded` event listener
- Use descriptive function names in French or English
- Add comments for complex logic
- No external libraries/frameworks - keep it vanilla

**Function naming examples:**
```javascript
// Good
function loadUpcomingEvents() { }
function initNavigation() { }
function updateCopyrightYear() { }

// Acceptable
function chargerEvenementsAVenir() { }
```

## Navigation Structure

All pages must include the same navigation bar with:
1. **Logo** - Links to home (index.html)
2. **Home** - index.html
3. **La CGT ?** - intro.html (About page)
4. **Agenda** - calendar.html (Events calendar)
5. **Search bar** - With icon button
6. **Social media icons** - Instagram and Facebook (target="_blank")
7. **Se syndiquer button** - contact.html (Primary CTA)
8. **Hamburger menu** - For mobile responsive design

## Events Data Structure

Events should follow this structure:

```javascript
{
    id: 1,                              // Unique identifier
    date: '2024-01-15',                 // ISO date format (YYYY-MM-DD)
    title: 'Permanence juridique',      // French title
    time: '14:00',                      // 24-hour format
    type: 'blue',                       // Color category: blue, purple, red, or green
    description: 'Brief description'    // French description
}
```

**Event Types:**
- `blue` - Permanence (legal, general, social assistance)
- `purple` - Convialité (social gatherings)
- `red` - Action syndicale (strikes, demonstrations)
- `green` - Administrative (meetings, assemblies)

## Contact Information

**Always use these official contact details:**
- Email: ulcgtepinal@gmail.com
- Phone: 06 41 27 48 65
- Address: 4 RUE ARISTIDE BRIAND BP, Épinal
- Instagram: @cgtepinal (https://www.instagram.com/cgtepinal/)
- Facebook: cgtepinal (https://www.facebook.com/cgtepinal/)

## Development Guidelines

### When Adding New Features
1. Maintain consistency with existing pages
2. Use the same navigation and footer structure
3. Follow the established color scheme
4. Ensure mobile responsiveness
5. Keep all content in French
6. Test across common browsers

### When Modifying Events
- Edit `js/events.js` file
- Maintain the event data structure
- Use correct event type colors
- Keep dates in ISO format (YYYY-MM-DD)

### When Styling
- Use existing CSS variables for colors
- Don't add new color values without updating `:root`
- Test responsive behavior on mobile devices
- Maintain accessibility (contrast ratios, aria labels)

### When Adding Content
- All text must be in French
- Use proper French typography (accents: é, è, ê, à, etc.)
- Follow CGT brand guidelines
- Include proper meta descriptions

## Testing

### Local Development
Recommended ways to test locally:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Testing Checklist
- [ ] Navigation works on all pages
- [ ] Search functionality works
- [ ] Events display correctly
- [ ] Mobile menu (hamburger) works
- [ ] All links are functional
- [ ] Social media links open in new tabs
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All content is in French

## Common Tasks

### Adding a New Page
1. Copy the structure from an existing page (e.g., intro.html)
2. Update the `<title>` and meta tags
3. Ensure the navigation is included and "active" class is on correct link
4. Add content in French
5. Update footer sitemap if needed

### Adding a New Event
1. Open `js/events.js`
2. Add new event object to `sampleEvents` array
3. Use correct date format (YYYY-MM-DD)
4. Choose appropriate type: blue, purple, red, or green
5. Write title and description in French

### Modifying Styles
1. Open `css/style.css`
2. Use CSS variables for colors
3. Test responsive behavior with browser dev tools
4. Maintain consistent spacing and typography

## Accessibility

- Use semantic HTML elements
- Include `alt` text for images
- Use `aria-label` for icon-only buttons
- Ensure sufficient color contrast
- Make interactive elements keyboard accessible
- Test with screen readers when possible

## SEO Considerations

- Include descriptive `<title>` tags on every page
- Add meta descriptions in French
- Use proper heading hierarchy (h1, h2, h3)
- Include Open Graph tags for social sharing
- Use semantic HTML for better search engine understanding

## Notes

- This is a static website with no backend
- No build process or package manager is used
- Keep dependencies minimal (only Font Awesome CDN)
- The site can be opened directly in a browser or served with a simple HTTP server
