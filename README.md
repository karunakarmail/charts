# &lt;charts&gt;

A small Web Component library using [VanillaJS](http://vanilla-js.com/). <br/>
This webcomponents follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

### Demo

[Test it live!](https://frontend-trends-charts.surge.sh)

## Installation

```html
npm i @frontend-trends/charts -D
```

## Donut Chart

### Usage

```html
<script type="module">
    import './node_modules/@frontend-trends/charts/donut-chart.js';
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
<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
```

### Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width |  300 | defines the width of the web component |
| height | 300 | defines the height of the web component |
| legend-position | right | defines the legend position |
| highlight-color | #a8d1ff | defines the highlight color |
| radius | 40 | defines the donut radius |
| stroke-width | 30 | defines the stroke width of the donut |
| data |  | stringified Array of Objects |

## Bar Chart

### Usage

```html
<script type="module">
    import './node_modules/@frontend-trends/charts/bar-chart.js';
</script>

<bar-chart width="200" height="200" bar-width="20" legend-position="bottom" data='[
{
    "color": "#555594",
    "percent": 75,
    "name": "Bicycle"
},
{
    "color": "#28dcc5",
    "percent": 60,
    "name": "Car"
},
{
    "color": "#b1196b",
    "percent": 95,
    "name": "Tram"
},
{
    "color": "#2079b1",
    "percent": 45,
    "name": "Skateboard"
}]'></bar-chart>
```

### Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width |  300 | defines the width of the web component |
| height | 300 | defines the height of the web component |
| legend-position | right | defines the legend position |
| highlight-color | #a8d1ff | defines the highlight color |
| bar-width | 30 | defines the stroke width of the donut |
| data |  | stringified Array of Objects |

## Testing using Karma

```html
npm run test
```
