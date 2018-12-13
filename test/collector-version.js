'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-version');

tap.test('Constructor() - object type - should be CollectorVersion', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorVersion]');
    t.end();
});

tap.test('.collect() - call method - should return an object', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result, 'object');
    t.end();
});

tap.test('.collect() - call method - should return an object where "name" is "nodejs_version_info"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result.name, 'nodejs_version_info');
    t.end();
});

tap.test('.collect() - call method - should return an object where "value" is an Array', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Array.isArray(result.value));
    t.end();
});

tap.test('.collect() - call method twice - should return "null" on second call', async (t) => {
    const collector = new Collector();
    const resultA = await collector.collect();
    t.type(resultA, 'object');

    const resultB = await collector.collect();
    t.true(resultB === null);
    t.end();
});
