# Maximum Plaid

[![Build Status](https://travis-ci.org/ivanvanderbyl/plaid.svg?branch=master)](https://travis-ci.org/ivanvanderbyl/plaid)

Template driven data visualisation for ambitious applications.

**WIP**

# Design

Traditional charting libraries often times have poor separation of concerns from
data and presentation. This leads to poor maintainability and code reuse.

Another consideration when visualising a dataset is whether you desire _efficiency_
or _expressiveness_, when you typically can't have both.

`maximum-plaid` is designed to change this by utilising Ember's declaritive templating 
and component composition, with D3's leading primitives for producing easy to
compose data visualisations for both data exploration and explanatory presentation.

# Proposed API

On their own, components for even the simplest elements in a visualisation can
quickly require complicated APIs. To solve this, Ember contextual components can
provide lower level primitive components with the necessary inputs for scaling
and positioning. This reduces the API surface for the user to quickly produce
visualisations in very few lines of code.

```hbs
{{#plaid-plot xScale yScale width height as |plot|}}
  {{plot.right-axis}}
  {{plot.line responseTimes}}
{{/plaid-plot}}
```

# Mixins

## `PlotArea`

Provides simple calculations for specifying the position of the main graphic in
a visualisation.

### Example:

```js
import { PlotArea } from 'plaid/mixins/plot-area';

export default Component.extend(PlotArea, {
  margin: '16 24',

  didRender() {
    const { top, left } = this.get('plotArea');
    select(this.element).select('g.plot').attr('transform', `translate(${left},${top})`);
  }
});
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

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

### You spelt visualization wrong.

As the main author of this project is Australian — a country which speaks a 
variation of British English, words such as `visualisation` are spelt with an `s`
instead of a `z`. Another word you may find incorrectly spelt is `colour`. Please
don't issue Pull Requests to fix this.
