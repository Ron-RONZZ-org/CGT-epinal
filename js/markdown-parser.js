// Simple Markdown Parser for CGT Epinal
// Supports: bold, italic, lists, links, images, headings

function parseMarkdown(markdown) {
    if (!markdown) return '';
    
    let html = markdown;
    
    // Escape HTML first to prevent XSS
    // html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Headers (h3-h6 only, as h1-h2 are reserved for titles)
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
    
    // Bold (**text** or __text__)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Italic (*text* or _text_)
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');
    
    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Images ![alt](url)
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
    
    // Process lists
    html = processLists(html);
    
    // Line breaks - convert double newlines to paragraphs
    const paragraphs = html.split('\n\n');
    html = paragraphs.map(para => {
        // Don't wrap if it's already a tag
        if (para.trim().startsWith('<')) {
            return para;
        }
        // Replace single newlines with <br> within paragraphs
        para = para.replace(/\n/g, '<br>');
        return para.trim() ? `<p>${para.trim()}</p>` : '';
    }).join('\n');
    
    return html;
}

function processLists(text) {
    // Process ordered lists
    text = text.replace(/(?:^|\n)(\d+\.\s+.+(?:\n\d+\.\s+.+)*)/g, function(match) {
        const items = match.trim().split('\n').map(line => {
            const content = line.replace(/^\d+\.\s+/, '');
            return `<li>${content}</li>`;
        }).join('');
        return `\n<ol>${items}</ol>\n`;
    });
    
    // Process unordered lists (- or *)
    text = text.replace(/(?:^|\n)([-*]\s+.+(?:\n[-*]\s+.+)*)/g, function(match) {
        const items = match.trim().split('\n').map(line => {
            const content = line.replace(/^[-*]\s+/, '');
            return `<li>${content}</li>`;
        }).join('');
        return `\n<ul>${items}</ul>\n`;
    });
    
    return text;
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.parseMarkdown = parseMarkdown;
}
