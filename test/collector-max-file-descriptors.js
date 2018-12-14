'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-max-file-descriptors');

tap.grep = process.platform === 'linux' ? [/condition:metrics/] : [/condition:unsupported/];

tap.test('contextual tests', (tp) => {
    /**
     * When the operating system support reporting file descriptors
     */

    tap.test('Constructor() - condition:supported - object type - should be CollectorMaxFileDescriptors', (t) => {
        const collector = new Collector();
        t.equal(Object.prototype.toString.call(collector), '[object CollectorMaxFileDescriptors]');
        t.end();
    });

    tap.test('.collect() - condition:supported - call method - should return an object', async (t) => {
        const collector = new Collector();
        const result = await collector.collect();
        t.type(result, 'object');
        t.end();
    });

    tap.test('.collect() - condition:supported - call method - should return an object where "name" is "process_max_fds"', async (t) => {
        const collector = new Collector();
        const result = await collector.collect();
        t.equal(result.name, 'process_max_fds');
        t.end();
    });

    tap.test('.collect() - condition:supported - call method - should return an object where "value" is an Number', async (t) => {
        const collector = new Collector();
        const result = await collector.collect();
        t.true(Number.isInteger(result.value));
        t.end();
    });

    tap.test('.collect() - condition:supported - call method twice - should return "null" on second call', async (t) => {
        const collector = new Collector();
        const resultA = await collector.collect();
        t.type(resultA, 'object');

        const resultB = await collector.collect();
        t.true(resultB === null);
        t.end();
    });

    /**
     * When the operating system DOES NOT support reporting file descriptors
     */

    tap.test('Constructor() - condition:unsupported - object type - should be CollectorMaxFileDescriptors', (t) => {
        const collector = new Collector();
        t.equal(Object.prototype.toString.call(collector), '[object CollectorMaxFileDescriptors]');
        t.end();
    });

    tap.test('.collect() - condition:unsupported - call method - should return "null"', async (t) => {
        const collector = new Collector();
        const result = await collector.collect();
        t.true(result === null);
        t.end();
    });

    tp.end();
});
