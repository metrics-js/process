'use strict';

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

    collect() {
        if (!this.collectable) {
            return null;
        }

        return [{
            name: `${this.prefix}nodejs_active_handles_total`,
            description: 'Total number of handles',
            value: process._getActiveHandles().length,
        }];
    }
};

module.exports = CollectorActiveHandlesTotal;
