'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-v8-heap');

tap.test('Constructor() - object type - should be CollectorV8Heap', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorV8Heap]');
    t.end();
});

tap.test('.collect() - call method - should return an Array with the length of 3', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 3);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "name" is "nodejs_heap_space_size_total_bytes"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result[0].name, 'nodejs_heap_space_size_total_bytes');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[0].name, 'foo_nodejs_heap_space_size_total_bytes');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object without a "value" key', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.false(result[0].value);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "type" is 1', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.equal(result[0].type, 1);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "meta" is and object with metadata', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.type(result[0].meta, 'object');
    // Labels can vary between node versions, just check its not just an empty array
    t.true(result[0].labels.length > 1);
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should return an object where "name" is "nodejs_heap_space_size_used_bytes"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result[1].name, 'nodejs_heap_space_size_used_bytes');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 2nd item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[1].name, 'foo_nodejs_heap_space_size_used_bytes');
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should return an object without a "value" key', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[1], 'object');
    t.false(result[1].value);
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should return an object where "type" is 1', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[1], 'object');
    t.equal(result[1].type, 1);
    t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should return an object where "meta" is and object with metadata', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[1], 'object');
    t.type(result[1].meta, 'object');
    // Labels can vary between node versions, just check its not just an empty array
    t.true(result[1].labels.length > 1);
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should return an object where "name" is "nodejs_heap_space_size_available_bytes"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result[2].name, 'nodejs_heap_space_size_available_bytes');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 3rd item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[2].name, 'foo_nodejs_heap_space_size_available_bytes');
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should return an object without a "value" key', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[2], 'object');
    t.false(result[2].value);
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should return an object where "type" is 1', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[2], 'object');
    t.equal(result[2].type, 1);
    t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should return an object where "meta" is and object with metadata', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[2], 'object');
    t.type(result[2].meta, 'object');
    // Labels can vary between node versions, just check its not just an empty array
    t.true(result[2].labels.length > 1);
    t.end();
});
