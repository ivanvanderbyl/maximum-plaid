import Ember from 'ember';
import Dimensions from './dimensions';
import PlotArea from './plot-area';

const { Mixin } = Ember;

export default Mixin.create(Dimensions, PlotArea, {
});
