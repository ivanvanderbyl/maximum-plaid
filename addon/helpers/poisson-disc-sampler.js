import Ember from 'ember';

/*
  Based on https://www.jasondavies.com/poisson-disc/
 */

export function poissonDiscSampler([width, height, radius] = []/*, hash*/) {
  let k = 30; // maximum number of samples before rejection
  let radius2 = radius * radius;
  let R = 3 * radius2;
  let cellSize = radius * Math.SQRT1_2;
  let gridWidth = Math.ceil(width / cellSize);
  let gridHeight = Math.ceil(height / cellSize);
  let grid = new Array(gridWidth * gridHeight);
  let queue = [];
  let queueSize = 0;
  let sampleSize = 0;

  return function() {
    if (!sampleSize) {
      return sample(Math.random() * width, Math.random() * height);
    }

    // Pick a random existing sample and remove it from the queue.
    while (queueSize) {
      let i = Math.random() * queueSize | 0;
      let s = queue[i];

      // Make a new candidate between [radius, 2 * radius] from the existing sample.
      for (let j = 0; j < k; ++j) {
        let a = 2 * Math.PI * Math.random();
        let r = Math.sqrt(Math.random() * R + radius2);
        let x = s[0] + r * Math.cos(a);
        let y = s[1] + r * Math.sin(a);

        // Reject candidates that are outside the allowed extent,
        // or closer than 2 * radius to any existing sample.
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
          return sample(x, y);
        }
      }

      queue[i] = queue[--queueSize];
      queue.length = queueSize;
    }
  };

  function far(x, y) {
    let i = x / cellSize | 0;
    let j = y / cellSize | 0;
    let i0 = Math.max(i - 2, 0);
    let j0 = Math.max(j - 2, 0);
    let i1 = Math.min(i + 3, gridWidth);
    let j1 = Math.min(j + 3, gridHeight);

    for (j = j0; j < j1; ++j) {
      let o = j * gridWidth;
      for (i = i0; i < i1; ++i) {
        let s;
        if (s = grid[o + i]) {
          let dx = s[0] - x;
          let dy = s[1] - y;
          if (dx * dx + dy * dy < radius2) {
            return false;
          }
        }
      }
    }

    return true;
  }

  function sample(x, y) {
    let s = [x, y];
    queue.push(s);
    grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;
    ++sampleSize;
    ++queueSize;
    return s;
  }

}

export default Ember.Helper.helper(poissonDiscSampler);
