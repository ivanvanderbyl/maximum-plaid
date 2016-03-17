# Ember-d3-scale

This library provides a suite of Ember helpers around the d3 scale library. Support for more features is ongoing.

## Configuration

Currently, there are no configuration options for this addon in `config/environment.js`. At the moment, this addon will add all the required `d3` dependencies.

## Live Examples

You can view a demo of a few ways to use these helpers [here](http://spencer516.github.io/ember-d3-scale)

## Available Helpers

* [Linear Scales](#linear-scales)
	- [`linear-scale`](#linear-scale)
	- [`time-scale`](#time-scale)
  - [`seq-color-scale`](#seq-color-scale)
* [Ordinal Scales](#ordinal-scales)
	- [`band-scale`](#band-scale)
	- [`point-scale`](#point-scale)
  - [`cat-color-scale`](#cat-color-scale)
* [Scale Derivatives](#scale-derivatives)
	- [`scale-tics`](#scale-ticks)
	- [`scale-value`](#scale-value)
* [Misc Helpers](#misc-helpers)
	- [`immut-array`](#immut-array)
	- [`time-interval`](#time-interval)

## Usage

### Linear scales

#### `linear-scale`
[D3 Linear Scale](https://github.com/d3/d3-scale#linear-scales)

```js
export default Ember.Component.extend({
  domain: [0, 10],
  range: [0, 100]
});
```

```hbs
{{#with (linear-scale domain range nice=true) as |scale|}}
  <span>I am {{scale-value scale 5}} 50 years old.</span>
{{/with}}
```

#### `time-scale`
[D3 Time Scale](https://github.com/d3/d3-scale#time-scales)

```js
export default Ember.Component.extend({
  domain: [
    new Date(2016, 2, 1),
    new Date(2016, 2, 31)
  ]
});
```

```hbs
{{#with (time-scale domain) as |scale|}}
  {{#each (scale-ticks scale (time-interval 'day')) as |date|}}
    <a>{{date}}</a>
  {{/each}}
{{/with}}
```
### `seq-color-scale`
Sequential color scale description.

### Ordinal scales

#### `band-scale`
Band scale description

#### `point-scale`
Point Scale description

#### `cat-color-scale`
Categorical color scale.

### Scale Derivatives

#### `scale-ticks`
Scale ticks

#### `scale-value`
Get the calculated value from a scale

### Misc Helpers

#### `immut-array`
Immutable array helper description

#### `time-interval`
A time interval helper.

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
