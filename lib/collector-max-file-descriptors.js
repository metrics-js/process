'use strict';

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

    collect() {
        if (process.platform !== 'linux') {
            return null;
        }

        if (this.collected) {
            return null;
        }

        return new Promise((resolve) => {
            fs.readFile('/proc/sys/fs/file-max', 'utf8', (error, result) => {
                if (error) {
                    resolve(null);
                    return;
                }

                resolve([{
                    name: `${this.prefix}process_max_fds`,
                    description: 'Maximum number of open file descriptors',
                    value: parseInt(result, 10),
                }]);

                this.collected = true;
            });
        });
    }
};

module.exports = CollectorMaxFileDescriptors;
