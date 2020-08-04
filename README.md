# &lt;donut-chart&gt;

A small Web Component using [VanillaJS](http://vanilla-js.com/).

## Demo

[Test it live!](http://frontend-trends.github.io/donut-chart)

## Usage

1. Import polyfill:

    ```html
    <script src="<path-to>/webcomponents.min.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="<path-to>/donut-chart.js">
    ```

3. Start using it!

    ```html
    <donut-chart width="300" height="300" radius="40" stroke-width="30" items='...'></donut-chart>
    ```

## Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width |  300 | defines the width of the web component |
| height | 300 | defines the height of the web component |
| legend-position | right | defines the legend position |
| highlight-color | #a8d1ff | defines the highlight color |
| radius | 40 | defines the donut radius |
| stroke-width | 30 | defines the width of donut pieces |
| data | | stringified JSON |
    
### data attribute format
Provide a stringified Array of Objects.

```html
    "[{"color":"red","percent":"50","name":"VW"},{"color":"#28dcc5","percent":"10","name":"Audi"}]"
```