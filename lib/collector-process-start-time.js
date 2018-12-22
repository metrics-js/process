'use strict';

const START_TIME = Math.round(Date.now() / 1000 - process.uptime());

const CollectorProcessStartTime = class CollectorProcessStartTime {
    constructor(prefix = '') {
        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });

        Object.defineProperty(this, 'collected', {
            writable: true,
            value: false,
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorProcessStartTime';
    }

    collect() {
        if (this.collected) {
            return null;
        }

        this.collected = true;

        return [{
            name: `${this.prefix}process_start_time_seconds`,
            description: 'Start time of the process since unix epoch in seconds.',
            value: START_TIME,
        }];
    }
};

module.exports = CollectorProcessStartTime;
