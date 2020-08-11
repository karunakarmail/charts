# &lt;charts&gt;

A small Web Component library using [VanillaJS](http://vanilla-js.com/). <br/>
This webcomponents follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

### Demo

[Test it live!](https://frontend-trends-charts.surge.sh)

## Installation

```html
npm i @frontend-trends/charts --save
```

## Donut Chart

### Usage

```html
<script type="module">
    import './node_modules/@frontend-trends/charts/donut-chart.js';
</script>

<donut-chart width="250" height="250" radius="40" stroke-width="20" legend-position="right" data='[
{ "color": "green", "percent": 50, "name": "VW" },
{ "color": "pink", "percent": 20, "name": "Opel" }
]'></donut-chart>
```

For old browser add polyfill
```html
<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
```

### Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width / height |  250 | defines the width / height of the chart |
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

<bar-chart width="400" height="300" bar-width="30" data='[
{
    "name": "spring",
    "barGroup": [
        { "color": "#555594", "amount": 50, "name": "Bicycle" }, { "color": "#28dcc5", "amount": 60, "name": "Car" }
    ]
},
{
    "name": "summer",
    "barGroup": [
        { "color": "#555594", "amount": 90, "name": "Bicycle" },
        { "color": "#28dcc5",  "amount": 30, "name": "Car" }
    ]
}]'></bar-chart>
```

### Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width / height |  300 | defines the width / height of the chart |
| bar-width | 30 | defines the width of each bar |
| data |  | stringified Array of Objects |

## Testing using Karma

```html
npm run test
```
