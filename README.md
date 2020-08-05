# &lt;donut-chart&gt;

A small Web Component using [VanillaJS](http://vanilla-js.com/). <br/>
This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

[Test it live!](http://donut-chart.surge.sh)

## Installation

```html
npm i @frontend-trends/donut-chart -D
```

## Usage

```html
<script type="module">
    import '@frontend-trends/donut-chart/donut-chart.js';
</script>

<donut-chart width="250" height="250" radius="40" stroke-width="20" legend-position="right" data='[
{
    "color": "green",
    "percent": 50,
    "name": "VW"
},
{
    "color": "pink",
    "percent": 20,
    "name": "Opel"
}
]'></donut-chart>
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

## Testing using Karma

```html
npm run test
```
