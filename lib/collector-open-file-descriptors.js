'use strict';

const fs = require('fs');

const CollectorOpenFileDescriptors = class CollectorOpenFileDescriptors {
    constructor(prefix = '') {
        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorOpenFileDescriptors';
    }

    collect() {
        if (process.platform !== 'linux') {
            return null;
        }

        return new Promise((resolve) => {
            fs.readdir('/proc/self/fd', (error, result) => {
                if (error) {
                    resolve(null);
                    return;
                }

                resolve([{
                    name: `${this.prefix}process_open_fds`,
                    description: 'Number of open file descriptors',
                    value: result.length - 1,
                }]);
            });
        });
    }
};

module.exports = CollectorOpenFileDescriptors;
