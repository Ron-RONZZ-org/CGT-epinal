#!/bin/bash
# Script to generate events-index.json from markdown files in ./events directory
# Usage: ./generate-events-index.sh

cd "$(dirname "$0")"

echo "Generating events-index.json..."

# Find all event-*.md files, excluding templates and examples
cd events
event_files=$(ls -1 event-*.md 2>/dev/null | grep -vE "template|example")

if [ -z "$event_files" ]; then
    echo "No event files found. Creating empty index."
    echo "[]" > ../events-index.json
    event_count=0
else
    # Count actual files
    event_count=$(echo "$event_files" | wc -l)
    
    # Format as JSON array
    formatted_files=$(echo "$event_files" | sed 's/^/  "/;s/$/",/' | sed '$ s/,$//')
    
    # Create JSON array
    {
        echo "["
        echo "$formatted_files"
        echo "]"
    } > ../events-index.json
    
    echo "Generated events-index.json with $event_count event(s)"
fi

cat ../events-index.json
