'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-version');

tap.test('Constructor() - object type - should be CollectorVersion', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorVersion]');
    t.end();
});

tap.test('.collect() - call method - should return an Array with the length of 1', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 1);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "name" is "nodejs_version_info"', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.equal(result[0].name, 'nodejs_version_info');
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "value" is 1', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.equal(result[0].value, 1);
    t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "meta" is and object with version numbers as segmens', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result[0], 'object');
    t.type(result[0].meta, 'object');
    t.type(result[0].meta.version, 'string');
    t.true(Number.isInteger(result[0].meta.major));
    t.true(Number.isInteger(result[0].meta.minor));
    t.true(Number.isInteger(result[0].meta.patch));
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
