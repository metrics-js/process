'use strict';

const Metric = require('@metrics/client/lib/metric');

const CollectorActiveHandlesTotal = class CollectorActiveHandlesTotal {
    constructor(prefix = '') {
        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });

        Object.defineProperty(this, 'collectable', {
            value: (typeof process._getActiveHandles === 'function'),
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorActiveHandlesTotal';
    }

    collect(timestamp) {
        if (!this.collectable) {
            return null;
        }

        return [new Metric({
            name: `${this.prefix}nodejs_active_handles_total`,
            description: 'Total number of handles',
            value: process._getActiveHandles().length,
            timestamp,
        })];
    }
};

module.exports = CollectorActiveHandlesTotal;
