'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-open-file-descriptors');

tap.test('Constructor() - object type - should be CollectorOpenFileDescriptors', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorOpenFileDescriptors]');
    t.end();
});

tap.test('.collect() - call method - should return an object', (t) => {
    const collector = new Collector();
    const result = collector.collect();
    t.type(result, 'object');
    t.end();
});

tap.test('.collect() - call method - should return an object where "name" is "process_open_fds"', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.equal(result.name, 'process_open_fds');
    t.end();
});

tap.test('.collect() - call method - should return an object where "value" is an Array', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.true(Array.isArray(result.value));
    t.end();
});

tap.test('.collect() - platform is not linux - should return "null"', async (t) => {
    const originalPlatform = process.platform;
    Object.defineProperty(process, 'platform', {
        value: 'FakeOS'
    });

    const collector = new Collector();
    const result = await collector.collect();
    t.true(result === null);
    t.end();

    Object.defineProperty(process, 'platform', {
        value: originalPlatform
    });
});
