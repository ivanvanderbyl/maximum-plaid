// import Ember from 'ember';
import layout from './template';
import Component from 'ember-component';
import Dimensions from 'maximum-plaid/mixins/dimensions';
// import box from '../utils/box-expression';

export default Component.extend(Dimensions, {
  layout,

  margin: '0',

  width: 100,
  height: 100,

  minHeight: 120,
  minWidth: 120
});
