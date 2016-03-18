import Ember from 'ember';
const { assert } = Ember;

export default function addOptionsToOrdinalScale(scale, domain, range, hash, type) {
  scale.domain(domain || []);

  // Check if this is a V4 type scale.
  if (scale.padding) {
    // Add the range
    if ('round' in hash && hash.round) {
      scale.rangeRound(range || []);
    } else {
      scale.range(range || []);
    }

    if ('padding' in hash) {
      scale.padding(hash.padding);
    }

    if ('padding-inner' in hash) {
      assert('This scale does not support the `padding-inner` option', typeof scale.paddingInner === 'function');
      scale.paddingInner(hash['padding-inner']);
    }

    if ('padding-outer' in hash) {
      assert('This scale does not support the `padding-outer` option', typeof scale.paddingOuter === 'function');
      scale.paddingOuter(hash['padding-outer']);
    }
  } else if (type === 'band') {
    rangeAndPaddingForBand(scale, range, hash);
  } else if (type === 'point') {
    rangeAndPaddingForPoint(scale, range, hash);
  }

  if ('align' in hash && scale.align) {
    scale.align(hash.align);
  }

  // Add Clamping
  if ('clamp' in hash) {
    scale.clamp(!!hash.clamp);
  }

  // Add niceness
  if ('nice' in hash) {
    scale.nice(hash.nice);
  }

  return scale;
}

function rangeAndPaddingForBand(scale, range, hash) {
  let rangeArgs = [range];

  // Build up the padding arguments
  if ('padding-outer' in hash) {
    rangeArgs.push(hash['padding-outer']);
  } else if('padding' in hash) {
    rangeArgs.push(hash['padding']);
  }

  if ('padding-inner' in hash) {
    rangeArgs.push(hash['padding-inner']);
  }

  if ('round' in hash && hash.round) {
    scale.rangeRoundBands(...rangeArgs);
  } else {
    scale.rangeBands(...rangeArgs);
  }
}

function rangeAndPaddingForPoint(scale, range, hash) {
  let rangeArgs = [range];

  assert('This scale does not support the `padding-inner` option', !hash['padding-inner']);
  assert('This scale does not support the `padding-outer` option', !hash['padding-outer']);

  // Build up the padding arguments
  if('padding' in hash) {
    rangeArgs.push(hash['padding']);
  }

  if ('round' in hash && hash.round) {
    scale.rangeRoundPoints(...rangeArgs);
  } else {
    scale.rangePoints(...rangeArgs);
  }
}
