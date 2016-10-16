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

    let brush = brushX()
      .extent([[0, 0], [width, height]])
      .on('end', () => {
        let { sourceEvent, selection } = event;

        if (!sourceEvent) {
          return; // Only transition after input.
        }

        if (!selection) {
          run(this, this.didClear);
          return; // Ignore empty selections.
        }

        run(this, this.didBrush, selection.map(xScale.invert));
      })
      .on('brush', () => {
        let {  selection } = event;
        if (!selection) {
          return; // Ignore empty selections.
        }
        run(this, this.isBrushing, selection.map(xScale.invert));
      });

    this.selection
      .attr('transform', `translate(${x},${y})`)
      .attr('class', 'brush')
      .call(brush);
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
