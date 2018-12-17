'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-active-handles-total');

tap.test('Constructor() - object type - should be CollectorActiveHandlesTotal', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorActiveHandlesTotal]');
    t.end();
});

tap.test('.collect() - call method - should return an Array with the length of 1', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 1);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "name" is "nodejs_active_requests_total"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result[0].name, 'nodejs_active_handles_total');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "value" is an Array', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.true(Array.isArray(result[0].value));
    t.true(Number.isFinite(result[0].value[0]));
    t.true(Number.isFinite(result[0].value[1]));
    t.end();
});
