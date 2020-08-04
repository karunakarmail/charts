import { DonutChart } from "../src/DonutChart";
import { TestUtils } from './test-utils';

describe("test", () => {
    it("true is true", async () => {
        const {shadowRoot} = await TestUtils.render(DonutChart.tag);
        const value = shadowRoot.innerHTML.includes("Hello, World!"); 
        expect(value).toBeTruthy();
    });
});