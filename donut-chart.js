class DonutChart extends HTMLElement {
    constructor() {
        super();
        this.getChartHtml = this.getChartHtml.bind(this);
        this.getChartData = this.getChartData.bind(this);

        const config = JSON.parse(this.dataset.config);
        const radius = config.radius;
        const perimeter = 2 * 3.14 * radius;

        const shadowRoot = this.attachShadow({mode: 'open'});

        const styleNode = `<style type="text/css">.circle {
            stroke-dasharray: 0;
            stroke-dashoffset: ${perimeter};
            transition: stroke-dashoffset 1s ease;
        } .text {font-size: 7px;}</style>`;

        const chartHtml = this.getChartHtml(this.getChartData(config.items), config.strokeWidth, radius);

        shadowRoot.innerHTML = styleNode + chartHtml;

        setTimeout(() => {
            this.animateChart(shadowRoot.querySelectorAll(".circle"), perimeter);
        }, 300);
        
    }

    getChartData(config) {
        let sumOfRest;
        const chartData = [];
        while (config[0]) {
            sumOfRest = 0;
            config.forEach((part) => {
                sumOfRest += parseFloat(part.percentage);
            })
            chartData.push({
                color: config[0].color,
                legend: config[0].legend,
                percentage: sumOfRest
            })
            config.shift();
        }
        return chartData;
    }

    getChartHtml(chartData, strokeWidth, radius) {
        let circles = '';
        let legend = '';
        chartData.forEach((part) => {
            circles += `<circle cx="50" cy="50" r="${radius}" fill="transparent" stroke-width="${strokeWidth}" stroke="${part.color}" data-fill="${part.percentage}" class="circle"/>`;
        })
        return `
        <div>
            <svg width="300px" height="300px" viewbox="0 0 100 100">
                <circle cx="50" cy="50" r="${radius}" fill="#eee" id="radius"/>
                <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke-width="${strokeWidth}" stroke="grey"/>
                ${circles}
            </svg>
        </div>
        `;
    }

    animateChart(circles, perimeter) {
        circles.forEach((circle) => {
            var amount = parseFloat(circle.getAttribute("data-fill"));
            var fillAmount = perimeter - perimeter * amount / 100;
            circle.style.strokeDasharray = perimeter;
            circle.style.strokeDashoffset = fillAmount;
        });
    }
}

customElements.define('donut-chart', DonutChart);