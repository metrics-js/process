'use strict';

const tap = require('tap');

const Collector = require('../lib/collector-gc');

// NOTE: This test must be run with the "--expose-gc" argument
// node --expose-gc collector-gc.js

// Helper to trigger GC
const gc = () => {
    return new Promise((resolve, reject) => {
        try {
            if (global.gc) {
                global.gc();
            } else {
                reject(new Error('Not able to trigger a GC. Please run the test with the "--expose-gc" argument'));
            }
        } catch (error) {
            reject(error);
        }

        setTimeout(() => {
            resolve();
        }, 40);
    });
};

const BUCKETS = [
    0.001,
    0.01,
    0.1,
    1,
    2,
    5
];
const KINDS = new Set(['major', 'minor', 'incremental', 'weakcb']);

tap.test('Constructor()', (t) => {
    const collector = new Collector();
    t.equal(Object.prototype.toString.call(collector), '[object CollectorGC]', 'Should be of object type [object CollectorGC]');
    t.type(collector.start, 'function', 'Should have a .start() function');
    t.type(collector.stop, 'function', 'Should have a .stop() function');
    t.end();
});

tap.test('Emitted metric object by GC', async (t) => {
    const collector = new Collector();
    collector.on('metric', (metric) => {
        t.equal(Object.prototype.toString.call(metric), '[object Metric]', 'Metric should be of type [object Metric]');
        t.equal(metric.name, 'nodejs_gc_duration_seconds', 'Metric should have ".name" property set to "nodejs_gc_duration_seconds"');
        t.equal(metric.type, 5, 'Metric should have ".type" property set to "5"');
        t.type(metric.value, 'number', 'Metric should have ".value" with a numeric value');
        t.equal(metric.labels[0].name, 'kind', 'Metric should have one label with ".name" set to "kind"');
        t.true(KINDS.has(metric.labels[0].value), 'Metric should have one label with ".value" set to "major", "minor", "incremental" or "weakcb"');
        t.same(metric.meta.buckets, BUCKETS, 'Metric should have a ".meta.buckets" property set with defined buckets');
    });
    collector.start();

    await gc();

    collector.stop();
});


tap.test('"prefix" on constructor is set', async (t) => {
    const collector = new Collector('foo_');
    collector.on('metric', (metric) => {
        t.equal(metric.name, 'foo_nodejs_gc_duration_seconds', 'Metric should have prepended the prefix to the ".name" property');
    });
    collector.start();

    await gc();

    collector.stop();
});
