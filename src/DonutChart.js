import {logic} from './logic';

export class DonutChart extends HTMLElement {
    static get tag() {
        return "donut-chart";
    }

    constructor() {
        super();
        this.unHighlightAllChartItems = this.unHighlightAllChartItems.bind(this);
        this.highlightChartItem = this.highlightChartItem.bind(this);
        this.animate = this.animate.bind(this);

        this.highlightClass = 'highlight';

        const attributes = logic.getAttributes(this);

        const shadowRoot = this.attachShadow({mode: 'open'});

        const styleNode = `
        <style type="text/css">
            #donut-chart {
                ${attributes.legendPositon === 'right' && 'display: flex;'}
            }

            @media screen and (max-width:
                600px) {
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

        shadowRoot.innerHTML = styleNode + logic.getHtml(logic.processChartData(attributes.items), attributes.strokeWidth, attributes.radius, attributes.size);

        const circles = shadowRoot.querySelectorAll(".circle");
        const nameItems = shadowRoot.querySelectorAll(".name-item");

        setTimeout(() => {
            this.animate(circles, attributes.perimeter, logic);
        }, 100);

        nameItems.forEach((nameItem, index) => {
            nameItem.addEventListener('click', (e) => {
                const toggleCondition = e.currentTarget.classList.contains(this.highlightClass);
                this.unHighlightAllChartItems(shadowRoot.querySelectorAll(`.${this.highlightClass}`));
                this.highlightChartItem(e.currentTarget, circles[index], toggleCondition);
            });
        });
    }

    unHighlightAllChartItems(highlightedElements) {
        highlightedElements.forEach((highlightedElement) => {
            highlightedElement.classList.remove(this.highlightClass);
        });
    }

    highlightChartItem(nameItem, circle, toggleCondition) {
        circle.classList.toggle(this.highlightClass, !toggleCondition);
        nameItem.classList.toggle(this.highlightClass, !toggleCondition);
    }

    animate(circles, perimeter, logic) {
        circles.forEach((circle) => {
            circle.style.strokeDasharray = perimeter;
            circle.style.strokeDashoffset = logic.getFillAmount(parseFloat(circle.getAttribute("data-fill")), perimeter);
        });
    }
}
