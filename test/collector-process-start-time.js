'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-process-start-time');

tap.test('Constructor() - object type - should be CollectorProcessStartTime', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorProcessStartTime]');
    t.end();
});

tap.test('.collect() - call method - should return an object', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result, 'object');
    t.end();
});

tap.test('.collect() - call method - should return an object where "name" is "process_start_time_seconds"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result.name, 'process_start_time_seconds');
    t.end();
});

tap.test('.collect() - call method - should return an object where "value" is an Integer', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Number.isInteger(result.value));
    t.end();
});

tap.test('.collect() - call method twice - should return "null" on second call', (t) => {
    const collector = new Collector();
    const resultA = collector.collect();
    t.type(resultA, 'object');

    const resultB = collector.collect();
    t.true(resultB === null);
    t.end();
});
