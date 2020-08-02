export const logic = {
    getAttributes(element) {
        const attributes = {};
        attributes.items = JSON.parse(element.getAttribute('items'));

        attributes.legendPositon = element.getAttribute('legend-position') || 'bottom';
        attributes.radius = parseInt(element.getAttribute('radius')) || 40;
        attributes.strokeWidth = parseInt(element.getAttribute('stroke-width')) || 20;
        attributes.highlightColor = element.getAttribute('highlight-color') || '#a8d1ff';
        attributes.size = {
            width: parseInt(element.getAttribute('width')) || 250,
            height: parseInt(element.getAttribute('height')) ||250
        };
        attributes.perimeter = 2 * 3.14 * attributes.radius;

        return attributes;
    }
}