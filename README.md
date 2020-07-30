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
| Name   |      Value      |  Description |
|----------|-------------|------|
| width |  300 | defines the width of donut chart |
| height |    300   | defines the height of donut chart |
| radius | 40 | defines the radius of donut chart |
| stroke-width | 30 | defines the width of the stroke |
| items | [{"color": "red","percent": "50","name": "VW"},<br/>{"color": "blue","percent": "20","name": "BMW"}] | data to be represented in donut chart |
    