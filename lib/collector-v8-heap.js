'use strict';

const Metric = require('@metrics/metric');
const v8 = require('v8');

const CollectorV8Heap = class CollectorV8Heap {
    constructor(prefix = '') {
        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorV8Heap';
    }

    collect(timestamp) {
        const metrics = [];

        v8.getHeapSpaceStatistics().forEach((space) => {
            const name = space.space_name.substr(0, space.space_name.indexOf('_space'));

            metrics.push(new Metric({
                name: `${this.prefix}nodejs_heap_space_size_total_bytes`,
                description: 'Process heap space size total from node.js in bytes',
                type: 1,
                labels: [{
                    name: 'space',
                    value: name,
                }],
                timestamp,
                value: space.space_size,
            }));

            metrics.push(new Metric({
                name: `${this.prefix}nodejs_heap_space_size_used_bytes`,
                description: 'Process heap space size used from node.js in bytes',
                type: 1,
                labels: [{
                    name: 'space',
                    value: name,
                }],
                timestamp,
                value: space.space_used_size,
            }));

            metrics.push(new Metric({
                name: `${this.prefix}nodejs_heap_space_size_available_bytes`,
                description: 'Process heap space size available from node.js in bytes',
                type: 1,
                labels: [{
                    name: 'space',
                    value: name,
                }],
                timestamp,
                value: space.space_available_size,
            }));
        });

        return metrics;
    }
};

module.exports = CollectorV8Heap;
