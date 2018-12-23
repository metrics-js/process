'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-active-requests-total');

tap.test('Constructor() - object type - should be CollectorActiveRequestsTotal', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorActiveRequestsTotal]');
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
    t.type(result[0], 'object');
    t.equal(result[0].name, 'nodejs_active_requests_total');
    t.end();
});

tap.test('.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric', (t) => {
    const collector = new Collector('foo_');
    const result = collector.collect();
    t.equal(result[0].name, 'foo_nodejs_active_requests_total');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "value" is an Integer', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.true(Number.isFinite(result[0].value));
    t.end();
});

tap.test('.collect() - "process._getActiveRequests" is not a function - should return "null"', (t) => {
    const original = process._getActiveRequests;
    process._getActiveRequests = null;

    const collector = new Collector();
    const result = collector.collect();
    t.true(result === null);

    process._getActiveRequests = original;
    t.end();
});
