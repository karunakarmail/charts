class DonutChart extends HTMLElement {
    constructor() {
        super();
        this.getHtml = this.getHtml.bind(this);
        this.getChartData = this.getChartData.bind(this);
        this.highlightClass = 'highlighted';

        const items = JSON.parse(this.getAttribute('items'));

        const legendPositon = this.getAttribute('legend-position') || 'bottom';
        const radius = parseInt(this.getAttribute('radius')) || 40;
        const strokeWidth = this.getAttribute('stroke-width') || 20;
        const size = {
            width: this.getAttribute('width') || 250,
            height: this.getAttribute('height') ||250
        };

        const perimeter = 2 * 3.14 * radius;

        const shadowRoot = this.attachShadow({mode: 'open'});

        const styleNode = `
        <style type="text/css">
            #donut-chart {
                ${legendPositon === 'right' && 'display: flex;'}
            }

            @media screen and (max-width:600px) {
                #donut-chart {
                    display: block;
                }
            }

            .circle {
                stroke-dasharray: 0;
                stroke-dashoffset: ${perimeter};
                transition: stroke-dashoffset .3s ease;
            }

            .circle.highlighted {
                stroke: #a8d1ff;
            }

            .legend {
                margin-left: 15px;
                padding-top: 20px;
                user-select: none;
                cursor: pointer;
            }

            .name-item {
                display: inline-flex;
                align-items: center;
                margin-bottom: 5px;
            }

            .name-item.highlighted {
                background: #a8d1ff;
            }

            .square {
                border: 1px solid;
                width: 10px;
                height: 10px;
                margin-right: 10px;
            }
        </style>`;

        const chartHtml = this.getHtml(this.getChartData(items), strokeWidth, radius, size);

        shadowRoot.innerHTML = styleNode + chartHtml;

        const circles = shadowRoot.querySelectorAll(".circle");

        setTimeout(() => {
            this.animate(circles, perimeter);
        }, 100);

        const nameItems = shadowRoot.querySelectorAll(".name-item");
        nameItems.forEach((nameItem, index) => {
            nameItem.addEventListener('click', (e) => {
                if (e.currentTarget.classList.contains(this.highlightClass)) {
                    this.unHighlightChartItem(e.currentTarget, circles[index]);
                } else {
                    this.removeHighlights(shadowRoot.querySelectorAll(`.${this.highlightClass}`));
                    this.highlightChartItem(e.currentTarget, circles[index]);
                }
            });
        });
    }

    removeHighlights(highlightedElements) {
        highlightedElements.forEach((highlightedElement) => {
            highlightedElement.classList.remove(this.highlightClass);
        });
    }

    highlightChartItem(nameItem ,circle) {
        circle.classList.add(this.highlightClass);
        nameItem.classList.add(this.highlightClass);
    }

    unHighlightChartItem(nameItem, circle) {
        circle.classList.remove(this.highlightClass);
        nameItem.classList.remove(this.highlightClass);
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

    animate(circles, perimeter) {
        circles.forEach((circle) => {
            var amount = parseFloat(circle.getAttribute("data-fill"));
            var fillAmount = perimeter - perimeter * amount / 100;
            circle.style.strokeDasharray = perimeter;
            circle.style.strokeDashoffset = fillAmount;
        });
    }
}

customElements.define('donut-chart', DonutChart);