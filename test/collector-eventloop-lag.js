'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-eventloop-lag');

tap.test('Constructor() - object type - should be CollectorEventloopLag', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorEventloopLag]');
    t.end();
});

tap.test('.collect() - call method - should return an Array with the length of 1', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 1);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "name" is "eventloop_lag_seconds"', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.type(result[0], 'object');
    t.equal(result[0].name, 'eventloop_lag_seconds');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "value" is an Integer', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.type(result[0], 'object');
    t.true(Number.isFinite(result[0].value));
    t.end();
});
