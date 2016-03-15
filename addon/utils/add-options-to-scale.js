export default function addOptionsToScale(scale, domain, range, hash) {
  scale.domain(domain || []);

  // Add the range
  if ('round' in hash && hash.round) {
    scale.rangeRound(range || []);
  } else {
    scale.range(range || []);
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
