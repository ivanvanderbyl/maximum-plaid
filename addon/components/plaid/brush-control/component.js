import Ember from 'ember';
import Component from 'ember-component';
import GroupElement from '../../../mixins/group-element';
import { brushX } from 'd3-brush';
import { event } from 'd3-selection';

const { run: { scheduleOnce }, run } = Ember;

function isEmptySelection(selection) {
  return !selection || selection[0] - selection[1] === 0;
}

function roundToSeconds(ms) {
  return Math.floor(ms / 1e3) * 1e3;
}

function roundToNearest(range = 1e3) {
  return function round(ms) {
    return Math.round(ms / range) * range;
  };
}

function extentFromSelection(selection, scale) {
  let isEmpty = isEmptySelection(selection);
  let extent;
  if (isEmpty) {
    extent = scale.domain().map((date) => date.getTime());
  } else {
    extent = selection.map(scale.invert).map(roundToSeconds);
  }

  return extent;
}

function isFullSelection(selection, scale) {
  let extent = scale.range();
  let sel = selection.map(scale);
  return !isSubSelection(sel, extent);
}

function isSubSelection(extent1, extent2) {
  if (extent1 === null || extent2 === null) {
    return true;
  }

  return extent1[0] > extent2[0] || extent1[1] < extent2[1];
}

export default Component.extend(GroupElement, {
  clearBrushSelectionAfterBrush: true,
  snappingRange: 15e3,

  x: 0,

  y: 0,

  width: 0,

  height: 0,

  xScale: null,

  didReceiveAttrs() {
    this.scheduleDraw();
  },

  scheduleDraw() {
    let extent = this.get('extent');
    let xScale = this.get('xScale');
    scheduleOnce('render', this, this.drawBrush, xScale, extent);
  },

  drawBrush(xScale, newSelection) {
    if (!this.element) {
      return;
    }

    let y = this.get('y');
    let x = this.get('x');
    let brushElement = this.selection
      .attr('transform', `translate(${x},${y})`);

    let height = this.get('height');
    let width = this.get('width');
    let clearBrushSelectionAfterBrush = this.get('clearBrushSelectionAfterBrush');
    let snappingRange = this.get('snappingRange');

    this.brush = brushX().extent([[0, 0], [width, height]]).handleSize(11);
    brushElement.call(this.brush);
    // configureBrush(brushElement, this.get('elementId'), { bottom: height, top });

    if (!clearBrushSelectionAfterBrush) {
      if (isSubSelection(newSelection.map(xScale), xScale.range())) {
        this.brush.move(brushElement, newSelection.map(xScale));
      } else if (isFullSelection(newSelection, xScale)) {
        this.brush.move(brushElement, null);
      }
    }

    this.brush.on('brush', ()=> {
      try {
        let { selection, sourceEvent } = event;

        if (!sourceEvent || !selection) {
          return;
        }

        if (sourceEvent.constructor.name === 'BrushEvent') {
          return;
        }

        let brushExtent = extentFromSelection(selection, xScale);
        run.next(this, this.isBrushing, brushExtent, !selection);
      } catch(err) {

        // eslint-inline-disable no-empty-block
      }
    });

    this.brush.on('end', () => {
      try {
        let { selection, sourceEvent } = event;

        if (!sourceEvent) {
          return;
        }

        if (sourceEvent.constructor.name === 'BrushEvent' && !selection) {
          return;
        }

        let brushExtent = extentFromSelection(selection, xScale);

        if (selection && clearBrushSelectionAfterBrush) {
          this.brush.move(brushElement, null);
        } else if (selection && snappingRange > 0) {
          let d0 = selection.map(xScale.invert);
          let d1 = d0.map(roundToNearest(snappingRange));
          brushElement.transition().call(event.target.move, d1.map(xScale));
        }
        if (selection) {
          run.next(this, this.didClear, brushExtent);
        } else {
          run.next(this, this.didBrush, brushExtent, !selection);
        }

      } catch(err) {
        // eslint-inline-disable no-empty-block
      }
    });
  },

  // draw() {
  //   let { x, y, width, height, xScale }
  //     = this.getProperties('width', 'height', 'x', 'y', 'xScale');

  //   let brush = this._createBrush(xScale)
  //       .extent([[0, 0], [width, height]]);

  //   this.selection
  //     .attr('transform', `translate(${x},${y})`)
  //     .attr('class', 'brush')
  //     .call(brush);

  //   if (this._lastSelection) {

  //     let [x1, x2] = this._lastSelection;
  //     console.log(x1, x2);
  //     // brush.move(this.selection, [x1, x2]);
  //   }
  // },

  // _createBrush(scale) {
  //   return brushX()
  //     .on('end', () => {
  //       let { sourceEvent, selection } = event;

  //       this._lastSelection = selection;

  //       if (!sourceEvent) {
  //         return; // Only transition after input.
  //       }

  //       if (!selection) {
  //         run(this, this.didClear);
  //         return; // Ignore empty selections.
  //       }

  //       // FIXME: These values should be passed to a generic helper for transformating
  //       // between scale.invert and scale.
  //       run(this, this.didBrush, selection.map(scale.invert));
  //     })
  //     .on('brush', () => {
  //       let {  selection } = event;

  //       if (!selection) {
  //         return; // Ignore empty selections.
  //       }

  //       run(this, this.isBrushing, selection.map(scale.invert));
  //     });
  // },

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
