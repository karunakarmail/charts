export class BarChart extends HTMLElement {
    static get tag() {
        return "bar-chart";
    }

    constructor() {
        super();
        this.highlightClass = 'highlight';

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
          
        #bar-chart {
            ${attributes.legendPositon === 'right' ? 'display: flex;' : 'display: inline;'}
        }

        @media screen and (max-width: 600px) {
            #bar-chart {
                display: block;
            }

            .legend {
                margin-left: 0 !important;
            }
        }

        .bars {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: ${attributes.height}px;
            width: ${attributes.width}px;
        }

        .bar {
            animation: animate-height;
            animation-timing-function: cubic-bezier(.35,.95,.67,.99);
            animation-duration: .4s;
            animation-fill-mode: forwards;
            cursor: pointer;
            height: 0;
            width: ${attributes.barWidth}%;
        }

        .bar.highlight {
            background: ${attributes.highlightColor} !important;
        }

        .legend {
            padding-top: 20px;
            ${attributes.legendPositon === 'right' ? 'margin-left: 30px;padding-top: 40px;' : ''}
            user-select: none;
            cursor: pointer;
        }

        .name-item {
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
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

        shadowRoot.innerHTML = styleNode + this.getHtml(attributes.items);

        const nameItems = shadowRoot.querySelectorAll('.name-item');
        const bars = shadowRoot.querySelectorAll('.bar');

        nameItems.forEach((nameItem, index) => {
            nameItem.addEventListener('click', (e) => {
                const toggleCondition = e.currentTarget.classList.contains(this.highlightClass);
                this.unHighlightAllChartItems(shadowRoot.querySelectorAll(`.${this.highlightClass}`));
                this.highlightChartItem(e.currentTarget, bars[index], toggleCondition);
            });
        });
    }

    unHighlightAllChartItems(highlightedElements) {
        highlightedElements.forEach((highlightedElement) => {
            highlightedElement.classList.remove(this.highlightClass);
        });
    }

    highlightChartItem(nameItem, bar, toggleCondition) {
        bar.classList.toggle(this.highlightClass, !toggleCondition);
        nameItem.classList.toggle(this.highlightClass, !toggleCondition);
    }

    getAttributes(element) {
        const attributes = {};
        attributes.items = JSON.parse(element.getAttribute('data'));

        attributes.legendPositon = element.getAttribute('legend-position') || 'bottom';
        attributes.barWidth = parseInt(element.getAttribute('bar-width')) || 20;
        attributes.height = parseInt(element.getAttribute('height')) || 200;
        attributes.width = parseInt(element.getAttribute('width')) || 200;
        attributes.highlightColor = element.getAttribute('highlight-color') || '#a8d1ff';
        return attributes;
    }

    getHtml(chartData) {
        let nameItems = '';
       
        return `
        <div id="bar-chart">
            <div class="bars">
            ${chartData.map((item) => {
                nameItems += `<div class="name-item"><div class="square" style="background:${item.color}; border-color: ${item.color}"></div>${item.name}&nbsp;&nbsp;${item.percent} %</div><br/>`;
                return `<div class="bar" style="height: ${item.percent}%; background: ${item.color};"></div>`;
            }).join('')}
            </div>
            <div class="legend">${nameItems}</div>
        </div> 
        `;
    }
}
