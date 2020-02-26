'use strict';

const Metric = require('@metrics/metric');
const fs = require('fs');

const CollectorMaxFileDescriptors = class CollectorMaxFileDescriptors {
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
        return 'CollectorMaxFileDescriptors';
    }

    collect(timestamp) {
        if (process.platform !== 'linux') {
            return null;
        }

        if (this.collected) {
            return null;
        }

        return new Promise((resolve) => {
            fs.readFile('/proc/self/limits', 'utf8', (error, limits) => {
                if (error) {
                    resolve(null);
                    return;
                }

                const lines = limits.split('\n');

                let result = '';
                lines.find((line) => {
                    if (line.startsWith('Max open files')) {
                        [, result] = line.split(/  +/);
                        return true;
                    }
                    return false;
                });

                if (result === '') {
                    resolve(null);
                    return;
                }

                resolve([new Metric({
                    name: `${this.prefix}process_max_fds`,
                    description: 'Maximum number of open file descriptors',
                    type: 1,
                    value: parseInt(result, 10),
                    timestamp,
                })]);

                this.collected = true;
            });
        });
    }
};

module.exports = CollectorMaxFileDescriptors;
