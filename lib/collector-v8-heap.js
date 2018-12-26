'use strict';

const Metric = require('@metrics/client/lib/metric');
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
        const meta = {
            total: {},
            used: {},
            available: {},
        };

        v8.getHeapSpaceStatistics().forEach((space) => {
            const name = space.space_name.substr(0, space.space_name.indexOf('_space'));
            meta.total[name] = space.space_size;
            meta.used[name] = space.space_used_size;
            meta.available[name] = space.space_available_size;
        });

        const total = new Metric({
            name: `${this.prefix}nodejs_heap_space_size_total_bytes`,
            description: 'Process heap space size total from node.js in bytes',
            meta: meta.total,
            timestamp,
        });

        const used = new Metric({
            name: `${this.prefix}nodejs_heap_space_size_used_bytes`,
            description: 'Process heap space size used from node.js in bytes',
            meta: meta.used,
            timestamp,
        });

        const available = new Metric({
            name: `${this.prefix}nodejs_heap_space_size_available_bytes`,
            description: 'Process heap space size available from node.js in bytes',
            meta: meta.available,
            timestamp,
        });

        return [
            total,
            used,
            available,
        ];
    }
};

module.exports = CollectorV8Heap;
