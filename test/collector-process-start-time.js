'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-process-start-time');

tap.test('Constructor() - object type - should be CollectorProcessStartTime', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorProcessStartTime]');
    t.end();
});

tap.test('.collect() - call method - should return an Array with the length of 1', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 1);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "name" is "process_start_time_seconds"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.equal(result[0].name, 'process_start_time_seconds');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[0].name, 'foo_process_start_time_seconds');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "value" is an Integer', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.true(Number.isInteger(result[0].value));
    t.end();
});

tap.test('.collect() - call method twice - should return "null" on second call', (t) => {
    const collector = new Collector();
    const resultA = collector.collect();
    t.true(Array.isArray(resultA));

    const resultB = collector.collect();
    t.true(resultB === null);
    t.end();
});
