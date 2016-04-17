# Maximum Plaid Architecture

Maximum Plaid is a visualisation toolset, designed to be a consistent and easy to use high level grammar for specifying data visualisations. It is not designed to be a mapping directly to D3 or to SVG with nice Ember syntax sugar on top, instead it uses D3 as helpers for transforming and scaling data, and presenting the visualisation.

To understand how this works, we must first break down a visualisation in to smaller building blocks or layers, based on the [Grammar of Graphics](http://www.springer.com/us/book/9780387245447):

- Data `DATA`: A set of operations which create variables from datasets,
- Transformations `TRANS`: Variable transformations to something our chart can render,
- Scale `SCALE`: Scale transformations (linear, log, etc.),
- Coordinates `COORD`: A coordinate system e.g. Polar, Cartesian Plane,
- Elements `ELEMENT`: graphs (e.g., points) and their aesthetic attributes (e.g., color),
- Guides `GUIDE`: one or more guides (axes, legends, etc.).

We'll include two additional layers to make things more interesting:

- Interaction `INT`: interaction controls (e.g zoom, select, pan),
- Animation `ANIM`: animations as data transitions from one state to another to provide data constancy.

These layers will be tied together to build charts consisting of the following types of Elements:

- Lines
- Areas
- Pies / Donuts
- Bars
- Scatter plots
- Stacked/Stream based layouts for bars and areas.

D3 also provides methods for calculating Histograms from data to easily produce binned data for each bar, amongst other transformations.

## SVG or Canvas?
On a technical level, D3 supports outputting path data for lines and areas for SVG, as well as calling the drawing APIs of `Canvas` to produce the same shapes in a Canvas context.

Because of this, we’d like to make it a design goal of supporting both rendering contexts, and not produce a library which simply wraps Ember components around SVG elements. Of course if you’re exclusively doing an SVG chart you may prefer to rendering SVG elements for certain markings within your visualisation.

## Syntax
Ember provides an incredibly powerful templating language with composable helpers and components.

To best explain how this works with data visualisation, lets see an example:

Assume we have some time series data:

```js
let dataPoints = [{timestamp: 1460864483048, value: 1288}, …]
```

We could draw a simple line chart like so:

```hbs
{{#plaid-plot 
	  xScale=(linear-scale (extent (map-by 'timestamp' dataPoints)) (extent plotArea.width))
  yScale=(linear-scale (extent (map-by 'value' dataPoints)) (extent plotArea.height))
	as |plot|}}

	{{plot.line dataPoints}}
{{/plaid-plot}}
```

First we're initialising a `plot` component which will make it easy and straight forward to apply additional layers within this context. It requires an `xScale` and `yScale` to help position Elements and Guides. You can easily compute both scales using helpers for the respective scaling function you need.

This is already supported. However, we'll often need more complexity than this. Let’s say we need the line to slide left when new data is appended to the `dataPoints` array. We could add transition support to the `line` component, but this might not always be the behaviour you want and it would limit the usefulness of the `line` component. So we need to _decorate_ this component with some more abilities.

```hbs
{{#plaid-plot 
	  xScale=(linear-scale (extent (map-by 'timestamp' dataPoints)) (extent plotArea.width))
  yScale=(linear-scale (extent (map-by 'value' dataPoints)) (extent plotArea.height))
	as |plot|}}
	
	{{#plot.transition duration=250 easing=(ease-in-out) as |plot|}}
		{{plot.line dataPoints}}
	{{/plot.transition-group}}
{{/plaid-plot}}
```

Under the hood, if this line is rendering to SVG it will use D3 transition to interpolate its path data over `duration` from current value to future value, and apply that value for each tick of a timer.

> Potentially this could use `liquid-fire` directly or learn some tricks for how this works and apply it to D3 and Ember.

To draw an area chart similar to that seen in Skylight, we could use both an area and a line:

```hbs
{{#plaid-plot 
	  xScale=(linear-scale (extent (map-by 'timestamp' dataPoints)) (extent plotArea.width))
  yScale=(linear-scale (extent (map-by 'value' dataPoints)) (extent plotArea.height))
	as |plot|}}
	
	{{#plot.transition duration=250 easing=(ease-in-out) as |plot|}}
		{{plot.area dataPoints fill="#CE93D8"}}
		{{plot.line dataPoints stroke="#9C27B0"}}  
	{{/plot.transition-group}}
{{/plaid-plot}}
```

# Interaction
Static charts aren't very useful in ambitious applications, which is why we need some way to interact with them.