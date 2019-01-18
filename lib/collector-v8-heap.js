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
        const totalLabels = [];
        const usedLabels = [];
        const availableLabels = [];

        v8.getHeapSpaceStatistics().forEach((space) => {
            const name = space.space_name.substr(0, space.space_name.indexOf('_space'));

            totalLabels.push({ name, value: space.space_size });
            usedLabels.push({ name, value: space.space_used_size });
            availableLabels.push({ name, value: space.space_available_size });
        });

        const total = new Metric({
            name: `${this.prefix}nodejs_heap_space_size_total_bytes`,
            description: 'Process heap space size total from node.js in bytes',
            type: 1,
            labels: totalLabels,
            timestamp,
        });

        const used = new Metric({
            name: `${this.prefix}nodejs_heap_space_size_used_bytes`,
            description: 'Process heap space size used from node.js in bytes',
            type: 1,
            labels: usedLabels,
            timestamp,
        });

        const available = new Metric({
            name: `${this.prefix}nodejs_heap_space_size_available_bytes`,
            description: 'Process heap space size available from node.js in bytes',
            type: 1,
            labels: availableLabels,
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
