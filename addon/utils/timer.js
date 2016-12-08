import { timer, now } from 'd3-timer';
// Borrowed from https://github.com/FormidableLabs/victory-core/blob/master/src/victory-util/timer.js
export default class Timer {
  constructor() {
    this.shouldAnimate = true;
    this.subscribers = [];
    this.loop = this.loop.bind(this);
    this.timer = timer(this.loop);
  }

  bypassAnimation() {
    this.shouldAnimate = false;
  }

  resumeAnimation() {
    this.shouldAnimate = true;
  }

  loop() {
    this.subscribers.forEach((s) => {
      s.callback(now() - s.startTime, s.duration);
    });
  }

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }

  subscribe(callback, duration) {
    duration = this.shouldAnimate ? duration : 0;
    return this.subscribers.push({
      startTime: now(),
      callback,
      duration
    });
  }

  unsubscribe(id) {
    if (id) {
      delete this.subscribers[id - 1];
    }
  }
}
