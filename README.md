# Plaid

Template driven data visualisation for ambitious applications.

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
