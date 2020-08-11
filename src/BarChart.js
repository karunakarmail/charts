export class BarChart extends HTMLElement {
    static get tag() {
        return "bar-chart";
    }

    constructor() {
        super();

        const attributes = this.getAttributes(this);
        const shadowRoot = this.attachShadow({mode: 'open'});

        const styleNode = `
        <style type="text/css">
        @keyframes animate-height {
            0% {
              height: 0;
            }
            100% {
              visibility: visible;
            }
        }

        .bar-chart-data {
            display: flex;
            width: ${attributes.width}px;
            height: ${attributes.height}px;
        }

        @media screen and (max-width: 600px) {
            #bar-chart {
                display: block;
            }

            .legend {
                margin-left: 0 !important;
            }
        }

        .chart-data {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 100%;
            height: 100%;
        }

        .bar-group {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 100%;
        }

        .bar-group:only-child {
            width: 100%;
        }

        .bar-group-name {
            position: absolute;
            top: calc(100% + 10px);
            line-height: 10px;
            left: 50%;
            transform: translateX(-50%);
        }

        .bar {
            animation: animate-height;
            animation-timing-function: cubic-bezier(.35,.95,.67,.99);
            animation-duration: .4s;
            animation-fill-mode: forwards;
            height: 0;
            width: ${attributes.barWidth}px;
        }

        .legend {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            padding-top: 30px;
            user-select: none;
            max-width: ${attributes.width}px;
        }

        .name-item {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
            margin-left: 8px;
            padding: 0 3px;
        }

        .square {
            border: 1px solid;
            width: 10px;
            height: 10px;
            margin-right: 10px;
        }

        .y-axis {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            margin-right: 15px;
            line-height: 0;
        }
        </style>`;

        shadowRoot.innerHTML = styleNode + this.getHtml(attributes.data, attributes.width, attributes.height);
    }

    getAttributes(element) {
        const attributes = {};
        attributes.data = JSON.parse(element.getAttribute('data'));

        attributes.barWidth = parseInt(element.getAttribute('bar-width')) || 20;
        attributes.height = parseInt(element.getAttribute('height')) || 200;
        attributes.width = parseInt(element.getAttribute('width')) || 200;
        return attributes;
    }

    getMaxAmount(chartData) {
        let maximum = 0;
        chartData.forEach((item) => {
            item.barGroup.forEach((bar) => {
                if (bar.amount > maximum) {
                    maximum = bar.amount;
                }
            })
        });
        return maximum;
    }

    getBarHeight(maxAmount, amount) {
        return `${100 / maxAmount * amount}%`;
    }

    getHtml(chartData) {
        let nameItems = '';
        const maxAmount = this.getMaxAmount(chartData);
        return `
        <div id="bar-chart">
            <div class="bar-chart-data">
                <div class="y-axis">
                    <div>${maxAmount}</div>
                    <div>${parseInt(maxAmount / 2)}</div>
                    <div>0</div>
                </div>
                <div class="chart-data">
                    ${chartData.map((item, index) => {
                        return `<div class="bar-group">
                        ${item.barGroup.map((item) => {
                            if (index === 0) {
                                nameItems += `<div class="name-item"><div class="square" style="background:${item.color}; border-color: ${item.color}"></div>${item.name}</div><br/>`;
                            }
                            return `<div class="bar" style="height: ${this.getBarHeight(maxAmount, item.amount)}; background: ${item.color};"></div>`;
                        }).join('')}
                        <div class="bar-group-name">${item.name}</div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
            <div class="legend">${nameItems}</div>
        </div> 
        `;
    }
}
