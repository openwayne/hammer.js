import boolOrFn from '../utils/bool-or-fn';
import { addManagerListeners } from '../utils/add-event-listeners';

/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
export default class Input {
  constructor(manager, callback) {
    let self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */
  handler() {}

  /**
   * @private
   */
  init() {
    addManagerListeners(this.manager, this.events || '', this.domHandler);
  }

  /**
   * @private
   */
  destroy() {
    removeManagerListeners(this.manager, this.events || '', this.domHandler);
  }
}
