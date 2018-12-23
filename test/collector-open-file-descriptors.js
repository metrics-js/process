'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-open-file-descriptors');

tap.grep = process.platform === 'linux' ? [/condition:all|condition:supported/] : [/condition:all|condition:unsupported/];

tap.test('Constructor() - condition:all - object type - should be CollectorOpenFileDescriptors', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorOpenFileDescriptors]');
    t.end();
});

/**
 * When the operating system support reporting file descriptors
 */

tap.test('.collect() - condition:supported - call method - should return an Array with the length of 1', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.true(Array.isArray(result));
    t.equal(result.length, 1);
    t.end();
});

tap.test('.collect() - condition:supported - call method - 1st item in Array - should return an object where "name" is "process_open_fds"', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.equal(result[0].name, 'process_open_fds');
    t.end();
});

tap.test('.collect() - condition:supported - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric', async (t) => {
    const collector = new Collector('foo_');
    const result = await collector.collect();
    t.equal(result[0].name, 'foo_process_open_fds');
    t.end();
});

tap.test('.collect() - condition:supported - call method - 1st item in Array - should return an object where "value" is an Integer', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.type(result[0], 'object');
    t.true(Number.isFinite(result[0].value));
    t.end();
});

/**
 * When the operating system DOES NOT support reporting file descriptors
 */

tap.test('.collect() - condition:unsupported - call method - should return "null"', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.true(result === null);
    t.end();
});
