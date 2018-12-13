'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-eventloop-lag');

tap.test('Constructor() - object type - should be CollectorEventloopLag', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorEventloopLag]');
    t.end();
});

tap.test('.collect() - call method - should return an object', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.type(result, 'object');
    t.end();
});

tap.test('.collect() - call method - should return an object where "name" is "eventloop_lag_seconds"', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.equal(result.name, 'eventloop_lag_seconds');
    t.end();
});

tap.test('.collect() - call method - should return an object where "value" is an Array', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.true(Array.isArray(result.value));
    t.true(Number.isFinite(result.value[0]));
    t.true(Number.isFinite(result.value[1]));
    t.end();
});
