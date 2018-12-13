'use strict';

const tap = require('tap');

const Metrics = require('../');

/**
 * Constructor
 */

tap.test('Constructor() - object type - should be MetricsProcess', (t) => {
    const metrics = new Metrics();
    metrics.stop();
    t.equal(Object.prototype.toString.call(metrics), '[object MetricsProcess]');
    t.end();
});
