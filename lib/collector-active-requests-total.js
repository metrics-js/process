'use strict';

const Metric = require('@metrics/client/lib/metric');

const CollectorActiveRequestsTotal = class CollectorActiveRequestsTotal {
    constructor(prefix = '') {
        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });

        Object.defineProperty(this, 'collectable', {
            value: (typeof process._getActiveRequests === 'function'),
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorActiveRequestsTotal';
    }

    collect(timestamp) {
        if (!this.collectable) {
            return null;
        }

        return [new Metric({
            name: `${this.prefix}nodejs_active_requests_total`,
            description: 'Total number of active requests',
            value: process._getActiveRequests().length,
            timestamp,
        })];
    }
};

module.exports = CollectorActiveRequestsTotal;
