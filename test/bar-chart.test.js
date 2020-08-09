import { BarChart } from '../src/BarChart';
import { TestUtils } from './test-utils';
window.customElements.define('bar-chart', BarChart);

describe('<bar-chart>', () => {
    it('should render', async () => {
        const {shadowRoot} = await TestUtils.render(BarChart.tag, {
            data: JSON.stringify([
                {
                    color: "#555594",
                    percent: 95,
                    name: "Bicycle"
                },
                {
                    color: "#28dcc5",
                    percent: 60,
                    name: "Car"
                },
            ]),
            width: 200,
            height: 200,
            'bar-width': 20
        });
        const bars = shadowRoot.querySelectorAll('div.bar');
        expect(bars.length).toEqual(2);
        expect(bars[0].getAttribute('style')).toEqual('height: 95%; background: #555594;');
        expect(bars[1].getAttribute('style')).toEqual('height: 60%; background: #28dcc5;');

        // legend start
        const legendItems = shadowRoot.querySelectorAll('.legend .name-item');
        expect(legendItems.length).toEqual(2);
        expect(shadowRoot.querySelectorAll('.legend .name-item.highlight').length).toEqual(0);
        expect(legendItems[0].textContent).toEqual('Bicycle  95 %');
        expect(legendItems[1].textContent).toEqual('Car  60 %');

        legendItems[0].click();
        expect(legendItems[0].classList.contains('highlight')).toBeTrue;
        legendItems[0].click();
        expect(legendItems[0].classList.contains('highlight')).toBeFalse;

        legendItems[0].click();
        legendItems[1].click();
        expect(legendItems[0].classList.contains('highlight')).toBeFalse;
        expect(legendItems[1].classList.contains('highlight')).toBeTrue;
        // legend end
    });
});