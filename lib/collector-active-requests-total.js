'use strict';

const CollectorActiveRequestsTotal = class CollectorActiveRequestsTotal {
    constructor() {
        Object.defineProperty(this, 'collectable', {
            value: (typeof process._getActiveRequests === 'function'),
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorActiveRequestsTotal';
    }

    collect() {
        if (!this.collectable) {
            return null;
        }

        return [{
            name: 'nodejs_active_requests_total',
            description: 'Total number of active requests',
            value: process._getActiveRequests().length,
        }];
    }
};

module.exports = CollectorActiveRequestsTotal;
