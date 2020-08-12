import { BarChart } from '../src/BarChart';
import { TestUtils } from './test-utils';
window.customElements.define('bar-chart', BarChart);

describe('<bar-chart>', () => {
    const chartData = [{
        "name": "",
        "barGroup": [
            {
                "color": "#555594",
                "amount": 75,
                "name": "Bicycle"
            },
            {
                "color": "#28dcc5",
                "amount": 60,
                "name": "Car"
            },
            {
                "color": "#b1196b",
                "amount": 80,
                "name": "Tram"
            },
            {
                "color": "#2079b1",
                "amount": 45,
                "name": "Skateboard"
            }
        ]
    }];

    it('should render', async () => {
        const {shadowRoot} = await TestUtils.render(BarChart.tag, {
            data: JSON.stringify(chartData)
        });
        const barGroups = shadowRoot.querySelectorAll('.bar-group');
        expect(barGroups.length).toEqual(1);

        const bars = shadowRoot.querySelectorAll('.bar-group .bar');
        expect(bars.length).toEqual(4);
        expect(bars[0].getAttribute('style')).toEqual('height: 93.75%; background: #555594;');
        expect(bars[1].getAttribute('style')).toEqual('height: 75%; background: #28dcc5;');
        expect(bars[2].getAttribute('style')).toEqual('height: 100%; background: #b1196b;');
        expect(bars[3].getAttribute('style')).toEqual('height: 56.25%; background: #2079b1;');

        // legend start
        const legendItems = shadowRoot.querySelectorAll('.legend .name-item');
        expect(legendItems.length).toEqual(4);
        expect(legendItems[0].textContent).toEqual('Bicycle');
        expect(legendItems[1].textContent).toEqual('Car');

        const yAxisItems = shadowRoot.querySelectorAll('.bar-chart-data .y-axis div');
        expect(yAxisItems.length).toEqual(3)
        expect(yAxisItems[0].textContent).toEqual('80');
        expect(yAxisItems[1].textContent).toEqual('40');
    });

    it('Should get max amount', () => {
        expect(BarChart.prototype.getMaxAmount(chartData)).toEqual(80);
    });

    it('Should get bar height', () => {
        expect(BarChart.prototype.getBarHeight(80, 60)).toEqual('75%');
    });
});