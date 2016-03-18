import Ember from 'ember';
const {
  get,
  assert,
  String: { camelize, capitalize }
} = Ember;
let CACHE = {};

const V3EXCEPTIONS = {
  'scale.time'() {
    return get(window, 'd3.time.scale');
  },
  'scale.band'() {
    return get(window, 'd3.scale.ordinal');
  },
  'scale.point'() {
    return get(window, 'd3.scale.ordinal');
  }
};

export function emptyCache() {
  CACHE = {};
}

export function d3NameV3(namespace, key) {
  return `d3.${namespace}.${key}`;
}

export function d3NameV4(namespace, key) {
  namespace = namespace.toLowerCase();
  let fullKey = camelize(`${namespace}${capitalize(key)}`);
  return `d3_${namespace}.${fullKey}`;
}

export default function d3V3Proxy(namespace, key) {
  let prop = `${namespace}.${key}`;
  if (prop in CACHE) {
    return CACHE[prop];
  }

  let result;
  if (!!window.d3_scale) {
    result = get(window, d3NameV4(namespace, key));
  } else {
    assert('If you do not use the d3v4 modules, you must make sure to have D3 loaded', !!window.d3);
    result = prop in V3EXCEPTIONS ? V3EXCEPTIONS[prop]() : get(window, d3NameV3(namespace, key));
  }

  return CACHE[prop] = result;
}
