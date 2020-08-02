let expect = require('chai').expect;
import {logic} from '../src/logic';

describe('Test <donut-chart> logic', () => {

    it('Should calculate the fill amount', () => {
        expect(logic.getFillAmount(100, 251.2)).to.be.equal('0.00');
        expect(logic.getFillAmount(90, 251.2)).to.be.equal('25.12');
        expect(logic.getFillAmount(50, 251.2)).to.be.equal('125.60');
        expect(logic.getFillAmount(0, 251.2)).to.be.equal('251.20');
    });

    it('Should create chart HTML', () => {
        const chartData = [
            {
                "color": "#555594",
                "percent": "60",
                "name": "Strongly agree"
            },
            {
                "color": "blue",
                "percent": "30",
                "name": "Somewhat agree"
            }
        ]
        const expectedOutout = `<div id="donut-chart">
            <svg width="300" height="300" viewbox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#eee" id="radius"/>
                <circle cx="50" cy="50" r="40" fill="transparent" stroke-width="20" stroke="grey"/>
                <circle cx="50" cy="50" r="40" fill="transparent" stroke-width="20" stroke="#555594" data-fill="60" class="circle"/>,<circle cx="50" cy="50" r="40" fill="transparent" stroke-width="20" stroke="blue" data-fill="30" class="circle"/>
            </svg>
            <div class="legend"><div class="name-item"><div class="square" style="background:#555594; border-color: #555594"></div>Strongly agree&nbsp;&nbsp;60 %</div><br/><div class="name-item"><div class="square" style="background:blue; border-color: blue"></div>Somewhat agree&nbsp;&nbsp;30 %</div><br/></div>
        </div>`;
        expect(logic.getHtml(chartData, 20, 40, {width: 300, height: 300}).trim()).to.be.equal(expectedOutout);
    });

    it('Should process chart data', () => {
        let chartConfig = [
            {
                "color": "#555594",
                "percent": "80",
                "name": "Strongly agree"
            }
        ];
        expect(logic.processChartData(chartConfig)).to.deep.equal([
            {
                "color": "#555594",
                "name": "Strongly agree",
                "percent": 80
            }
        ]);

        chartConfig = [
            {
                "color": "#555594",
                "percent": "60",
                "name": "Strongly agree"
            },
            {
                "color": "blue",
                "percent": "30",
                "name": "Somewhat agree"
            }
        ];
        expect(logic.processChartData(chartConfig)).to.deep.equal([
            {
                "color": "#555594",
                "name": "Strongly agree",
                "percent": 90
            },
            {
                "color": "blue",
                "name": "Somewhat agree",
                "percent": 30
            }
        ]);

        chartConfig = [
            {
                "color": "#555594",
                "percent": "0.5",
                "name": "Strongly agree"
            },
            {
                "color": "blue",
                "percent": "0.2",
                "name": "Somewhat agree"
            }
        ];
        expect(logic.processChartData(chartConfig)).to.deep.equal([
            {
                "color": "#555594",
                "name": "Strongly agree",
                "percent": 0.7
            },
            {
                "color": "blue",
                "name": "Somewhat agree",
                "percent": 0.2
            }
        ]);
    });
});