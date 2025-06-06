// Tooltip functions for bubble chart
function showTooltip(event, content) {
    const tooltip = d3.select("#tooltip-bubble")
        .style("opacity", 1)
        .html(content);

    // Get tooltip dimensions
    const tooltipNode = tooltip.node();
    const tooltipRect = tooltipNode.getBoundingClientRect();
    
    // Calculate position relative to mouse
    let left = event.pageX + 15;
    let top = event.pageY - 10;

    // Adjust if tooltip would go off screen
    if (left + tooltipRect.width > window.innerWidth) {
        left = event.pageX - tooltipRect.width - 15;
    }
    if (top + tooltipRect.height > window.innerHeight) {
        top = event.pageY - tooltipRect.height - 10;
    }

    // Position the tooltip
    tooltip
        .style("left", left + "px")
        .style("top", top + "px");
}

function hideTooltip() {
    d3.select("#tooltip-bubble")
        .style("opacity", 0);
}

// Updated mouseover event handler for circles
function handleMouseOver(event, d) {
    let content = `
        <div style="text-align: center; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;">
            <strong style="font-size: 16px; color: #222;">${d.data.name}</strong>
        </div>
        <div style="font-size: 14px; color: #666;">`;
    
    if (d.depth === 1) {
        content += `Region<br>Total ingredients: ${d.value.toLocaleString()}`;
    } else if (d.depth === 2) {
        content += `Category: ${d.data.name}<br>
                   Region: ${d.parent.data.name}<br>
                   Total usage: ${d.value.toLocaleString()}`;
    } else if (d.depth === 3) {
        content += `Ingredient<br>
                   Category: ${d.parent.data.name}<br>
                   Region: ${d.parent.parent.data.name}<br>
                   Usage count: ${d.data.value.toLocaleString()}`;
    }
    
    content += `</div>`;
    
    showTooltip(event, content);
    d3.select(this)
        .style("opacity", 1)
        .style("stroke-width", (d.depth === 0) ? 3.5 : 
                             (d.depth === 1) ? 2.5 : 
                             (d.depth === 2) ? 3.5 : 2.5);
}

// Tooltip styles
const tooltipStyles = `
#tooltip-bubble {
    position: absolute;
    background: rgba(255, 255, 255, 0.98);
    color: #333;
    padding: 12px 15px;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    pointer-events: none;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    max-width: 280px;
    line-height: 1.5em;
    opacity: 0;
    border: none;
    z-index: 9999;
    transition: opacity 0.2s ease-in-out;
}
`; 