'use strict';

const fs = require('fs');

const generic = Symbol('generic');
const linux = Symbol('linux');

const CollectorProcessResidentMemory = class CollectorProcessResidentMemory {
    get [Symbol.toStringTag]() {
        return 'CollectorProcessResidentMemory';
    }

    [generic]() {
        const mem = this.constructor.getMemoryUsage();
        if (mem) {
            return [{
                name: 'process_resident_memory_bytes',
                description: 'Resident memory size in bytes',
                value: mem.rss,
            }];
        }
        return null;
    }

    [linux]() {
        return new Promise((resolve) => {
            fs.readFile('/proc/self/status', 'utf8', (error, file) => {
                if (error) {
                    resolve(null);
                    return;
                }

                const mem = this.constructor.parseFile(file);

                const residentMemory = {
                    name: 'process_resident_memory_bytes',
                    description: 'Resident memory size in bytes',
                    value: mem.VmRSS,
                };

                const virtualMemory = {
                    name: 'process_virtual_memory_bytes',
                    description: 'Virtual memory size in bytes',
                    value: mem.VmSize,
                };

                const heapSizeMemory = {
                    name: 'process_heap_bytes',
                    description: 'Process heap size in bytes',
                    value: mem.VmData,
                };

                resolve([
                    residentMemory,
                    virtualMemory,
                    heapSizeMemory,
                ]);
            });
        });
    }

    collect() {
        if (process.platform === 'linux') {
            return this[linux]();
        }
        return this[generic]();
    }

    static getMemoryUsage() {
        let mem;
        try {
            mem = process.memoryUsage();
        } catch (ex) { // eslint-disable-line no-empty

        }
        return mem;
    }

    static parseFile(file) {
        const metrics = {};
        const values = ['VmSize', 'VmRSS', 'VmData'];

        file.split('\n')
            .filter(s => values.some(value => s.indexOf(value) === 0))
            .forEach((string) => {
                const split = string.split(':');

                // Get the value
                let value = split[1].trim();
                // Remove trailing ` kb`
                value = value.substr(0, value.length - 3);
                // Make it into a number in bytes bytes
                value = Number(value) * 1024;

                metrics[split[0]] = value;
            });

        return metrics;
    }
};

module.exports = CollectorProcessResidentMemory;
