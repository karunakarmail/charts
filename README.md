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

## Parameters
| Name   |      Value      | Mandatory |  Description |
|----------|-------------|------|------|
| width |  300 | no | defines the width of donut chart |
| height |    300   | no | defines the height of donut chart |
| legend-position | right or bottom | no | defines the position of the legend |
| highlight-color | #a8d1ff | no | defines the highlight color |
| radius | 40 | no | defines the radius of donut chart |
| stroke-width | 30 | no | defines the width of the stroke |
| items | [```{"color": "red","percent": "50","name": "VW"}, ...```] | yes | data to be represented in donut chart |
    