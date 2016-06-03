import Ember from 'ember';
const { isPresent, assert, String: { camelize } } = Ember;

import {
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveBundle,
  curveCardinalClosed,
  curveCardinalOpen,
  curveCardinal,
  curveCatmullRomClosed,
  curveCatmullRomOpen,
  curveCatmullRom,
  curveLinearClosed,
  curveLinear,
  curveNatural,
  curveStep,
  curveMonotoneX,
  curveMonotoneY
} from 'd3-shape';

export function curve([curveName], hash) {
  if (!hash) {
    hash = {};
  }

  let curves = {
    basisClosed: curveBasisClosed,
    basisOpen: curveBasisOpen,
    basis: curveBasis,
    bundle: curveBundle,
    cardinalClosed: curveCardinalClosed,
    cardinalOpen: curveCardinalOpen,
    cardinal: curveCardinal,
    catmullRomClosed: curveCatmullRomClosed,
    catmullRomOpen: curveCatmullRomOpen,
    catmullRom: curveCatmullRom,
    linearClosed: curveLinearClosed,
    linear: curveLinear,
    natural: curveNatural,
    step: curveStep,
    monotone: curveMonotoneX,
    monotoneX: curveMonotoneX,
    monotoneY: curveMonotoneY
  };

  let curveFn = curves[camelize(curveName)];

  assert(`No curve with name ${curveName} is available`, isPresent(curveFn));

  Object.keys(hash).forEach((key) => {
    if (typeof curveFn[key] === 'function') {
      curveFn[key](hash[key]);
    }
  });

  return curveFn;
}

export default Ember.Helper.helper(curve);
