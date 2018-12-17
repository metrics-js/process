'use strict';

const START_TIME = Math.round(Date.now() / 1000 - process.uptime());

const CollectorProcessStartTime = class CollectorProcessStartTime {
    constructor() {
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
            name: 'process_start_time_seconds',
            description: 'Start time of the process since unix epoch in seconds.',
            value: START_TIME,
        }];
    }
};

module.exports = CollectorProcessStartTime;
