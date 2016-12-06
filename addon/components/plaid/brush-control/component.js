import Ember from 'ember';
import Component from 'ember-component';
import GroupElement from '../../../mixins/group-element';
import { brushX } from 'd3-brush';
import { event } from 'd3-selection';

const { run: { scheduleOnce }, run } = Ember;

export default Component.extend(GroupElement, {
  x: 0,

  y: 0,

  width: 0,

  height: 0,

  xScale: null,

  // Not used.
  // TODO: Implement yBrush and xy brush
  yScale: null,

  didReceiveAttrs() {
    this.scheduleDraw();
  },

  scheduleDraw() {
    scheduleOnce('render', this, this.draw);
  },

  draw() {
    let { x, y, width, height, xScale }
      = this.getProperties('width', 'height', 'x', 'y', 'xScale');

    let brush = this._createBrush(xScale)
        .extent([[0, 0], [width, height]]);

    this.selection
      .attr('transform', `translate(${x},${y})`)
      .attr('class', 'brush')
      .call(brush);

    if (this._lastSelection) {

      let [x1, x2] = this._lastSelection;
      console.log(x1, x2);
      // brush.move(this.selection, [x1, x2]);
    }
  },

  _createBrush(scale) {
    return brushX()
      .on('end', () => {
        let { sourceEvent, selection } = event;

        this._lastSelection = selection;

        if (!sourceEvent) {
          return; // Only transition after input.
        }

        if (!selection) {
          run(this, this.didClear);
          return; // Ignore empty selections.
        }

        // FIXME: These values should be passed to a generic helper for transformating
        // between scale.invert and scale.
        run(this, this.didBrush, selection.map(scale.invert));
      })
      .on('brush', () => {
        let {  selection } = event;

        if (!selection) {
          return; // Ignore empty selections.
        }

        run(this, this.isBrushing, selection.map(scale.invert));
      });
  },

  didClear() {
    this.sendAction('clear');
  },

  isBrushing(selection) {
    this.sendAction('brush', selection);
  },

  didBrush(selection) {
    this.sendAction('brushed', selection);
  }
});
