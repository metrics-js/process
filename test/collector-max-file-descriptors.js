'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-max-file-descriptors');

tap.grep = process.platform === 'linux' ? [/condition:all|condition:supported/] : [/condition:all|condition:unsupported/];

tap.test('Constructor() - condition:all - object type - should be CollectorMaxFileDescriptors', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorMaxFileDescriptors]');
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

tap.test('.collect() - condition:supported - call method - 1st item in Array - should return an object where "name" is "process_max_fds"', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.type(result[0], 'object');
    t.equal(result[0].name, 'process_max_fds');
    t.end();
});

tap.test('.collect() - condition:supported - call method - 1st item in Array - should return an object where "value" is an Integer', async (t) => {
    const collector = new Collector();
    const result = await collector.collect();
    t.type(result[0], 'object');
    t.true(Number.isFinite(result[0].value));
    t.end();
});

tap.test('.collect() - condition:supported - call method twice - should return "null" on second call', async (t) => {
    const collector = new Collector();
    const resultA = await collector.collect();
    t.true(Array.isArray(resultA));

    const resultB = await collector.collect();
    t.true(resultB === null);
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
