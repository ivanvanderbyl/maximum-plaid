import Ember from 'ember';
import layout from './template';
import GroupElement from '../../mixins/group-element';
const { computed } = Ember;

const ScatterComponent = Ember.Component.extend(GroupElement, {
  layout,

  xScale: null,

  yScale: null,

  values: [],

  positions: computed('values.[]', 'xScale', 'yScale', {
    get() {
      let { values, xScale, yScale }
        = this.getProperties('xScale', 'yScale', 'values');

      return values.map(([timestamp, value]) => {
        return {
          x: xScale(timestamp),
          y: yScale(value)
        };
      });
    }
  })
});

ScatterComponent.reopenClass({
  positionalParams: ['values']
});

export default ScatterComponent;
