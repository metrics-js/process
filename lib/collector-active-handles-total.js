'use strict';

const CollectorActiveHandlesTotal = class CollectorActiveHandlesTotal {
    constructor() {
        Object.defineProperty(this, 'collectable', {
            value: (typeof process._getActiveHandles === 'function'),
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorActiveHandlesTotal';
    }

    collect() {
        if (!this.collectable) {
            return null;
        }

        return {
            name: 'nodejs_active_handles_total',
            description: 'Total number of handles',
            value: [process._getActiveHandles().length, Date.now()],
        };
    }
};

module.exports = CollectorActiveHandlesTotal;
