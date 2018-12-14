'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-cpu-total');

tap.test('Constructor() - object type - should be CollectorCpuTotal', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorCpuTotal]');
    t.end();
});

tap.test('.collect() - call method - should return an object', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result, 'object');
    t.end();
});

tap.test('.collect() - call method - should return an Array with the length of 3', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 3);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should be an object where "name" is "process_cpu_user_seconds_total"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.equal(result[0].name, 'process_cpu_user_seconds_total');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should be an object where "value" is an Array', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.true(Array.isArray(result[0].value));
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should be an object where "name" is "process_cpu_system_seconds_total"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[1], 'object');
    t.equal(result[1].name, 'process_cpu_system_seconds_total');
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should be an object where "value" is an Array', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[1], 'object');
    t.true(Array.isArray(result[1].value));
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should be an object where "name" is "process_cpu_seconds_total"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[2], 'object');
    t.equal(result[2].name, 'process_cpu_seconds_total');
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should be an object where "value" is an Array', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[2], 'object');
    t.true(Array.isArray(result[2].value));
    t.end();
});