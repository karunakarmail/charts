# &lt;charts&gt;

A Chart Library with [VanillaJS](http://vanilla-js.com/) Web Components that follow the [open-wc](https://github.com/open-wc/open-wc) recommendation.
<br/><br/><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">

[Test it live!](https://frontend-trends-charts.surge.sh)

## Installation

```html
$ npm i @frontend-trends/charts --save
```

Browser polyfill
```html
<script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
```

## Donut Chart

```html
<script type="module">
    import './node_modules/@frontend-trends/charts/donut-chart.js';
</script>

<donut-chart width="250" radius="40" stroke-width="20" legend="right" data='[
{ "color": "green", "percent": 50, "name": "VW" },
{ "color": "pink", "percent": 20, "name": "Opel" }
]'></donut-chart>
```

### Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width / height |  250 | dimension |
| legend | right | legend position |
| highlight | #a8d1ff | highlight color |
| radius | 40 | donut radius |
| stroke-width | 30 | donut stroke width |
| data |  | stringified Array |

## Bar Chart

```html
<script type="module">
    import './node_modules/@frontend-trends/charts/bar-chart.js';
</script>

<bar-chart height="300" bar-width="30" data='[
{
    "name": "spring",
    "group": [
        { "color": "#555594", "amount": 50, "name": "Bicycle" },
        { "color": "#28dcc5", "amount": 60, "name": "Car" }
    ]
},
...
]'></bar-chart>
```

### Attributes
| Attribute   |      Default      |  Description |
|----------|-------------|------|
| width / height |  300 | dimension |
| bar-width | 30 | width of each bar |
| unit |  | unit |
| data |  | stringified Array |


