class DonutChart extends HTMLElement {
    constructor() {
        super();
        this.getChartHtml = this.getChartHtml.bind(this);
        this.getChartData = this.getChartData.bind(this);

        const items = JSON.parse(this.getAttribute('items'));
        const radius = this.getAttribute('radius');
        const strokeWidth = this.getAttribute('stroke-width');
        const size = {
            width: this.getAttribute('width'),
            height: this.getAttribute('height')
        };

        const perimeter = 2 * 3.14 * radius;

        const shadowRoot = this.attachShadow({mode: 'open'});

        const styleNode = `
        <style type="text/css">
            #donut-chart {
                display: flex;
            }

            .circle {
                stroke-dasharray: 0;
                stroke-dashoffset: ${perimeter};
                transition: stroke-dashoffset 1s ease;
            }

            .legend {
                margin-left: 15px;
                padding-top: 20px;
            }

            .name-item {
                display: flex;
                align-items: center;
                margin-bottom: 5px;
            }

            .square {
                border: 1px solid;
                width: 10px;
                height: 10px;
                margin-right: 10px;
            }
        </style>`;

        const chartHtml = this.getChartHtml(this.getChartData(items), strokeWidth, radius, size);

        shadowRoot.innerHTML = styleNode + chartHtml;

        setTimeout(() => {
            this.animateChart(shadowRoot.querySelectorAll(".circle"), perimeter);
        }, 200);
        
    }

    getChartData(config) {
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
    }

    getChartHtml(chartData, strokeWidth, radius, size) {
        let circles = '';
        let nameItems = '';
        const center = {
            x: 50,
            y: 50
        };
       
        chartData.forEach((part) => {
            circles += `<circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="transparent" stroke-width="${strokeWidth}" stroke="${part.color}" data-fill="${part.percent}" class="circle"/>`;
            nameItems += `<div class="name-item"><div class="square" style="background:${part.color}; border-color: ${part.color}"></div>${part.name}&nbsp;&nbsp;${part.percent} %</div>`;
        })
        return `
        <div id="donut-chart">
            <svg width="${size.height}" height="${size.width}" viewbox="0 0 100 100">
                <circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="#eee" id="radius"/>
                <circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="transparent" stroke-width="${strokeWidth}" stroke="grey"/>
                ${circles}
            </svg>
            <div class="legend">${nameItems}</div>
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