'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-active-handles-total');

tap.test('Constructor() - object type - should be CollectorActiveHandlesTotal', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorActiveHandlesTotal]');
    t.end();
});

tap.test('.collect() - call method - should return an object', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result, 'object');
    t.end();
});

tap.test('.collect() - call method - should return an object where "name" is "nodejs_active_requests_total"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result.name, 'nodejs_active_handles_total');
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
