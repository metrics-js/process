'use strict';

const CollectorEventloopLag = class CollectorEventloopLag {
    get [Symbol.toStringTag]() {
        return 'CollectorEventloopLag';
    }

    collect() {
        const start = process.hrtime();

        return new Promise((resolve) => {
            setImmediate(() => {
                const delta = process.hrtime(start);
                const nanosec = delta[0] * 1e9 + delta[1];
                const seconds = nanosec / 1e9;

                resolve([{
                    name: 'eventloop_lag_seconds',
                    description: 'Lag of eventloop in seconds',
                    value: [seconds, Date.now()],
                }]);
            });
        });
    }
};

module.exports = CollectorEventloopLag;
