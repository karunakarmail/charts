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
    },

    processChartData(config) {
        let sumOfRest;
        const chartData = [];
        while (config[0]) {
            sumOfRest = 0;
            config.forEach((part) => {
                sumOfRest += parseFloat(part.percent);
            })
            chartData.push({
                color: config[0].color,
                name: config[0].name,
                percent: sumOfRest
            })
            config.shift();
        }
        return chartData;
    },

    getFillAmount(amount, perimeter) {
        return perimeter - perimeter * amount / 100;
    },

    getHtml(chartData, strokeWidth, radius, size) {
        let nameItems = '';
        const center = {
            x: 50,
            y: 50
        };
       
        return `
        <div id="donut-chart">
            <svg width="${size.height}" height="${size.width}" viewbox="0 0 100 100">
                <circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="#eee" id="radius"/>
                <circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="transparent" stroke-width="${strokeWidth}" stroke="grey"/>
                ${chartData.map((part) => {
                    nameItems += `<div class="name-item"><div class="square" style="background:${part.color}; border-color: ${part.color}"></div>${part.name}&nbsp;&nbsp;${part.percent} %</div><br/>`;
                    return `<circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="transparent" stroke-width="${strokeWidth}" stroke="${part.color}" data-fill="${part.percent}" class="circle"/>`;
                })}
            </svg>
            <div class="legend">${nameItems}</div>
        </div>
        `;
    }
}