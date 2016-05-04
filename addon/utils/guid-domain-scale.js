import Ember from 'ember';
const { guidFor } = Ember;
const { keys } = Object;

export default function guidDomainScale(originalScale) {
  let scaleDomain = [];

  function scale(d) {
    return originalScale(guidFor(d));
  }

  keys(originalScale).forEach((key) => {
    if (key === 'domain') {
      scale.domain = function(d) {
        if (arguments.length > 0) {
          scaleDomain = d;
          return originalScale.domain(d.map((itm) => guidFor(itm)));
        } else {
          return scaleDomain.slice(0);
        }
      };
    } else if (key === 'copy') {
      scale.copy = function() {
        return guidDomainScale(originalScale.copy());
      };
    } else {
      scale[key] = originalScale[key];
    }
  });

  return scale;
}
