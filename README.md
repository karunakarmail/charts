# &lt;donut-chart&gt;

A small Web Component using [VanillaJS](http://vanilla-js.com/). <br/>
This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```html
npm i @frontend-trends/donut-chart -D
```

## Usage

```html
<script type="module">
    import '@frontend-trends/donut-chart/donut-chart.js';
</script>

<donut-chart></donut-chart>
```

For old browser add polyfill
```html
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
```

## Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width |  300 | defines the width of the web component |
| height | 300 | defines the height of the web component |
| legend-position | right | defines the legend position |
| highlight-color | #a8d1ff | defines the highlight color |
| radius | 40 | defines the donut radius |
| stroke-width | 30 | defines the stroke width of the donut |
| data |  | stringified Array of Objects |
    

## The data attribute

Provide a stringified Array of Objects.
```html
"[{"color":"red","percent":"50","name":"VW"},{"color":"#28dcc5","percent":"10","name":"Audi"}]"
```

## Demo
[Test it live!](http://frontend-trends.github.io/donut-chart)

## Testing using Karma

```html
npm run test
```