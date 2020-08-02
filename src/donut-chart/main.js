import {logic} from './logic';

class DonutChart extends HTMLElement {
    constructor() {
        super();
        this.getHtml = this.getHtml.bind(this);
        this.getChartData = this.getChartData.bind(this);
        this.unHighlightAllChartItems = this.unHighlightAllChartItems.bind(this);
        this.highlightChartItem = this.highlightChartItem.bind(this);
        this.unHighlightChartItem = this.unHighlightChartItem.bind(this);

        this.highlightClass = 'highlight';

        const attributes = logic.getAttributes(this);

        const shadowRoot = this.attachShadow({mode: 'closed'});

        const styleNode = `
        <style type="text/css">
            #donut-chart {
                ${attributes.legendPositon === 'right' && 'display: flex;'}
            }

            @media screen and (max-width:600px) {
                #donut-chart {
                    display: block;
                }
            }

            .circle {
                stroke-dasharray: 0;
                stroke-dashoffset: ${attributes.perimeter};
                transition: stroke-dashoffset .3s ease;
            }

            .circle.highlight {
                stroke: ${attributes.highlightColor};
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
                padding: 0 3px;
            }

            .name-item.highlight {
                background: ${attributes.highlightColor};
            }

            .square {
                border: 1px solid;
                width: 10px;
                height: 10px;
                margin-right: 10px;
            }
        </style>`;

        shadowRoot.innerHTML = styleNode + this.getHtml(this.getChartData(attributes.items), attributes.strokeWidth, attributes.radius, attributes.size);

        const circles = shadowRoot.querySelectorAll(".circle");

        setTimeout(() => {
            this.animate(circles, attributes.perimeter);
        }, 100);

        const nameItems = shadowRoot.querySelectorAll(".name-item");
        nameItems.forEach((nameItem, index) => {
            nameItem.addEventListener('click', (e) => {
                if (e.currentTarget.classList.contains(this.highlightClass)) {
                    this.unHighlightChartItem(e.currentTarget, circles[index]);
                } else {
                    this.unHighlightAllChartItems(shadowRoot.querySelectorAll(`.${this.highlightClass}`));
                    this.highlightChartItem(e.currentTarget, circles[index]);
                }
            });
        });
    }

    unHighlightAllChartItems(highlightedElements) {
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