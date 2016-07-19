![Maximum Plaid](/logo/maximum-plaid-logo.png)

[![Build Status](https://travis-ci.org/ivanvanderbyl/maximum-plaid.svg?branch=master)](https://travis-ci.org/ivanvanderbyl/maximum-plaid)
[![Ember Observer Score](http://emberobserver.com/badges/maximum-plaid.svg)](http://emberobserver.com/addons/maximum-plaid)

Template driven data visualisation for ambitious applications.

# Design

Maximum Plaid is designed to be a high level visualisation library built exclusively for Ember. It uses Ember's templating language to efficiently and declaratively produce easily maintained and tested visualisations.

We're building this because traditional charting libraries often times have poor separation of concerns from data and presentation, which leads to poor maintainability and code reuse, as well as exhibiting poor performance with medium to large datasets (10K to 100K data points).

We desire something which exposes abstractions for efficiently expressing a wide variety of visualisations, while balancing expressiveness such that you're not locked in to one particular style of visualisation which doesn't quite express the discoveries you've made in your data.

# Proposed API

Visualisations are composed in layers, starting with data transformation down to visualisation and interaction.

## Data Transformation

In order to provide a consistent API for each visualisation layer, we do the data setup ahead of time. After you've loaded your data source, you should transform it to the necessary shape for the type of visualisation you're rendering. 

We provide a few helpers to make this easy (more soon).

### Series Transforms

<a name="pairBy" href="#pairBy">#</a> pair-by(<i>attr</i>, [<i>attr2</i>,] <i>series</i>)

> Basically a multi-property `map-by`.

Takes an array of objects containing discrete properties for each axis of your visualisations, and returns an array of tuples containing only the values for each attribute.

Given the series:

```js
let timeSeriesData = [
	{ timestamp: 1450345920000, value: 1, projectId: 200 },
	{ timestamp: 1450345930000, value: 2, projectId: 200 },
	{ timestamp: 1450345940000, value: 3, projectId: 200 },
	{ timestamp: 1450345950000, value: 4, projectId: 200 },
	{ timestamp: 1450345960000, value: 5, projectId: 200 }
];
```

Using `pair-by` in your template:

```hbs
{{pair-by "timestamp" "value" timeSeriesData}}
```

Would produce:

```js
[
	[1450345920000, 1],
	[1450345930000, 2],
	[1450345940000, 3],
	[1450345950000, 4],
	[1450345960000, 5]
]
```

Which is ideal for using as the `values` argument to `plaid.line` and `plaid.area`.

## Coordinates

SVG doesn't use the same coordinate space as CSS, so we have to calculate margins manually. To help out with this we've included an `area` helper, which returns an object containing the positioning data for your chart.

<a name="helper_area" href="#helper_area">#</a> `area`(<i>width</i> <i>height</i> [<i>margin="TOP RIGHT BOTTOM LEFT"</i>])

The margin string follows the typical box model margin convention of TOP, RIGHT, BOTTOM, LEFT. All values are unitless and inherit their units from the coordinate space with the SVG context. 

## Presentation

On their own, components for even the simplest elements in a visualisation can quickly require complicated APIs. To solve this, Ember contextual components can provide lower level primitive components with the necessary inputs for scaling and positioning. This reduces the API surface for the user to quickly produce visualisations in very few lines of code.

```hbs
{{#plaid-plot xScale yScale plotArea as |plot|}}
  {{plot.right-axis}}
  {{plot.line values}}
{{/plaid-plot}}
```

A more complete example, using scales from [ember-d3-scale](https://github.com/spencer516/ember-d3-scale#linear-scale) and helpers from [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers)

```hbs
{{#with (area 720 220 margin="0 50 72 50") as |plotArea|}}
  {{#plaid-plot
    (time-scale (extent (map-by "timestamp" responseTimeMean)) (array 0 plotArea.width))
    (linear-scale (extent (map-by "value" responseTimeMean) toZero=true) (array plotArea.height 0))
    plotArea as |plot|}}

    {{#with (pair-by "timestamp" "value" responseTimeMean) as |values|}}

      {{plot.line values stroke="#673AB7" strokeWidth="2"  curve=(curve "basis")}}
      {{plot.area values fill="#D1C4E9" curve=(curve "basis")}}
      {{plot.bottom-axis values ticks=10}}
      {{plot.left-axis values tickFormat=(format-fn "0.1s" suffix="ms") ticks=2}}
    {{/with}}
  {{/plaid-plot}}
{{/with}}
```

This will produce a pretty simple line + area chart:

[![Maximum Plaid Line Chart](/logo/line-chart-screenshot.png)](http://maximum-plaid.com)

# Components

### `plaid-symbol`

Provides an easy to use and straight forward interface to `d3-shape`'s symbol 
generators. `primitive-symbol` can be used in the same way as any Ember component
and will  render as a `<path>` tag containing the path data for the specified
symbol type.

#### Options

- `type`: Symbol to render, can be any of `circle`, `diamond`, `cross`, 
`square`, `star`, `triangle`, `wye`.
- `size`: Specifies the symbol render size. This is the area of the
symbol, which typicall equates to 1/4th of the actual width or height, depending
on the shape.
- `fill`: SVG path `fill`  property.
- `stroke`: SVG path `stroke` property.
- `strokeWidth`: SVG path `stroke-width` property.
- `top`: Top offset (applied using transform).
- `left`: Left offset (applied using transform).


# Mixins

## `PlotArea`

Provides simple calculations for specifying the position of the main graphic in
a visualisation.

### Example:

```js
import { PlotArea } from 'maximum-plaid/mixins/plot-area';

export default Component.extend(PlotArea, {
  margin: '16 24',

  didRender() {
    const { top, left } = this.get('plotArea');
    select(this.element).select('g.plot').attr('transform', `translate(${left},${top})`);
  }
});
```

# Utils

## `computedExtent`

Creates a computed property which calculates the extent of all inputs provided
using `extent` from d3-array.

## Installation

**NOTE: `maximum-plaid` requires Ember v2.3+**

    ember install maximum-plaid

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

# FAQ

### Why `maximum-plaid`?

**Ivan**: Initially I was searching name which represented both a
type of fabric for the visualisation metaphore, but also I've been told that friends
have lost me in crowds walking around Williamsburg because I wear so much plaid. Also, the goal
of this project is to make data visualisation easy and efficient, so in keeping with
the promised performance mode of the next [Tesla Roadster](http://mashable.com/2015/07/17/new-tesla-roadster/#3NCT_4NpL8qU), I found "maximum plaid" to be
fitting.

### You spelt visualization wrong

That's not a question.

As the main author of this project is Australian — a country which speaks a 
variation of British English, words such as `visualisation` are spelt with an `s`
instead of a `z`. Another word you may find incorrectly spelt is `colour`. Please
don't issue Pull Requests to fix this.
