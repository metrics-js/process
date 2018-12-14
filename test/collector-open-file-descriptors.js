'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-open-file-descriptors');

tap.grep = process.platform === 'linux' ? [/condition:metrics/] : [/condition:unsupported/];

tap.test('contextual tests', (tp) => {
    /**
     * When the operating system support reporting file descriptors
     */

    tap.test('Constructor() - condition:supported - object type - should be CollectorOpenFileDescriptors', (t) => {
        const collector = new Collector();
        t.equal(Object.prototype.toString.call(collector), '[object CollectorOpenFileDescriptors]');
        t.end();
    });

    tap.test('.collect() - condition:supported - call method - should return an object', (t) => {
        const collector = new Collector();
        const result = collector.collect();
        t.type(result, 'object');
        t.end();
    });

    tap.test('.collect() - condition:supported - call method - should return an object where "name" is "process_open_fds"', async (t) => {
        const collector = new Collector();
        const result = await collector.collect();
        t.equal(result.name, 'process_open_fds');
        t.end();
    });

    tap.test('.collect() - condition:supported - call method - should return an object where "value" is an Array', async (t) => {
        const collector = new Collector();
        const result = await collector.collect();
        t.true(Array.isArray(result.value));
        t.end();
    });



    /**
     * When the operating system DOES NOT support reporting file descriptors
     */

    tap.test('Constructor() - condition:unsupported - object type - should be CollectorOpenFileDescriptors', (t) => {
        const collector = new Collector();
        t.equal(Object.prototype.toString.call(collector), '[object CollectorOpenFileDescriptors]');
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
