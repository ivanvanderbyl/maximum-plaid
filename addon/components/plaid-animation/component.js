import Ember from 'ember';
import Component from 'ember-component';
import layout from './template';
import Timer from 'maximum-plaid/utils/timer';
import { easeBounceOut } from 'd3-ease';
import { victoryInterpolator } from 'maximum-plaid/utils/animation-utils';
const {
  get, set, computed,
  RSVP: { Promise },
  run
} = Ember;

export default Component.extend({
  tagName: '',
  layout,

  duration: 2e3,

  delay: 0,

  /**
   * The data which will be yielded for each frame
   * @public
   * @readonly
   */
  newData: {},

  /**
   * @public
   *
   * The data to transition to
   */
  data: {},

  /**
   * @public
   * @type Object
   *
   * Data from the previous transition, not set until the animation is complete.
   *
   * You can set this to the initial state if you want to transition from zero values to something.
   */
  previousData: null,

  ease: easeBounceOut,

  init() {
    // this.queue = Array.isArray(this.data) ? this.data.slice(1) : [];
    this.queue = [];

    this.animationInfo = {
      progress: 0,
      animating: false
    };

    this._super(...arguments);
  },

  timer: computed({
    get() {
      return new Timer();
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    // Length check prevents us from triggering `on-end` in `traverseQueue`.
    if (this.queue.length) {
      this.traverseQueue();
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let data = this.get('data');
    let previousData = this.get('previousData');

    if (!previousData) {
      Promise.resolve().then(() => {
        this.set('previousData', data);
        this.set('newData', data);
      });
      return;
    }

    // cancel existing loop if it exists
    let loopID = get(this, 'loopID');
    if (loopID) {
      get(this, 'timer').unsubscribe(loopID);
    }

    /* If an object was supplied */
    if (!Array.isArray(data)) {
      // Replace the tween queue. Could set `this.queue = [nextProps.data]`,
      // but let's reuse the same array.
      // this.queue.length = 0;
      // this.queue.push(newAttrs.data.value);

      this.queue = [Object.assign({}, data)];
    /* If an array was supplied */
    } else {
      /* Extend the tween queue */
      this.queue.push(...data);
    }

    run.next(this, ()=>{
      this.set('previousData', data);
    });

    /* Start traversing the tween queue */
    this.traverseQueue();
  },

  willDestroyElement() {
    this._super(...arguments);

    let loopID = get(this, 'loopID');
    if (loopID) {
      get(this, 'timer').unsubscribe(loopID);
    } else {
      get(this, 'timer').stop();
    }
  },

  /**
   * Traverse the tween queue
   * @private
   */
  traverseQueue() {
    let timer = this.get('timer');
    let delay = this.get('delay');

    if (this.queue.length) {
      this.startTime = window.performance.now();
      let prevData = get(this, 'previousData');

      /* Get the next index */
      let [data] = this.queue;
      /* compare cached version to next props */

      set(this, 'interpolator', victoryInterpolator(prevData, data));
      if (delay > 0) {
        run.later(this, function() {
          set(this, 'loopID', timer.subscribe(
            this.functionToBeRunEachFrame.bind(this),
            get(this, 'duration'))
          );
        }, delay);
      } else {
        set(this, 'loopID', timer.subscribe(
          this.functionToBeRunEachFrame.bind(this),
          get(this, 'duration'))
        );
      }
    } else {

      let performanceDuration = window.performance.now() - this.startTime;
      this.sendAction('on-end', performanceDuration);
    }
  },

  functionToBeRunEachFrame(elapsed, duration) {
    let timer = this.get('timer');
    duration = duration !== undefined ? duration : get(this, 'duration');
    let interpolator = get(this, 'interpolator');

    let step = duration ? elapsed / duration : 1;
    // console.log(duration, elapsed);
    if (step >= 1) {

      // this.setProperties({
      //   data: interpolator(1),
      //   animationInfo: {
      //     progress: 1,
      //     animating: false
      //   }
      // });

      this.set('newData', interpolator(1));

      let loopID = get(this, 'loopID');
      if (loopID) {
        timer.unsubscribe(loopID);
      }

      this.queue.shift();
      this.traverseQueue();

      return;
    }

    /*
      if we're not at the end of the timer, set the state by passing
      current step value that's transformed by the ease function to the
      interpolator, which is cached for performance whenever props are received
    */

    // console.log(interpolator(get(this, 'ease')(step)));

    let result = Object.assign({}, interpolator(get(this, 'ease')(step)));

    // console.log(result);

    Promise.resolve().then(() => this.set('newData', result));

    // this.setProperties({
    //   data: interpolator(get(this, 'ease')(step)),
    //   animationInfo: {
    //     progress: step,
    //     animating: step < 1
    //   }
    // });
  }

});
