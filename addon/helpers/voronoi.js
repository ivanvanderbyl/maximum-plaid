import Ember from 'ember';
import { voronoi as d3Voronoi } from 'd3-voronoi';

const { keys } = Object;

export function voronoi([data], hash = {}) {
  let v = d3Voronoi();

  keys(hash).forEach((key) => {
    if (typeof v[key] === 'function') {
      v[key](hash[key]);
    }
  });

  return v.polygons(data);
}

export default Ember.Helper.helper(voronoi);
