'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-heap-used-and-size');

tap.test('Constructor() - object type - should be CollectorHeadUsedAndSize', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorHeadUsedAndSize]');
    t.end();
});

tap.test('.collect() - call method - should return an Array with the length of 3', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 3);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should be an object where "name" is "nodejs_heap_size_total_bytes"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.equal(result[0].name, 'nodejs_heap_size_total_bytes');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[0].name, 'foo_nodejs_heap_size_total_bytes');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should be an object where "value" is an Integer', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.true(Number.isFinite(result[0].value));
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should be an object where "name" is "nodejs_heap_size_used_bytes"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[1], 'object');
    t.equal(result[1].name, 'nodejs_heap_size_used_bytes');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 2nd item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[1].name, 'foo_nodejs_heap_size_used_bytes');
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should be an object where "value" is an Integer', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[1], 'object');
    t.true(Number.isFinite(result[1].value));
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should be an object where "name" is "nodejs_external_memory_bytes"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[2], 'object');
    t.equal(result[2].name, 'nodejs_external_memory_bytes');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 3rd item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[2].name, 'foo_nodejs_external_memory_bytes');
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should be an object where "value" is an Integer', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[2], 'object');
    t.true(Number.isFinite(result[2].value));
    t.end();
});

tap.test('.collect() - "process.memoryUsage" throws - should return "null"', (t) => {
    const original = process.memoryUsage;
    process.memoryUsage = () => {
        throw new Error('blah');
    };

    const collector = new Collector();
    const result = collector.collect();
    t.true(result === null);

    process.memoryUsage = original;
    t.end();
});
