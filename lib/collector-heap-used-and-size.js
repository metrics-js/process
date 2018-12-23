'use strict';

const CollectorHeadUsedAndSize = class CollectorHeadUsedAndSize {
    constructor(prefix = '') {
        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorHeadUsedAndSize';
    }

    collect() {
        const mem = this.constructor.getMemoryUsage();
        if (!mem) {
            return null;
        }

        const heapSizeTotal = {
            name: `${this.prefix}nodejs_heap_size_total_bytes`,
            description: 'Process heap size from node.js in bytes',
            value: mem.heapTotal,
        };

        const heapSizeUsed = {
            name: `${this.prefix}nodejs_heap_size_used_bytes`,
            description: 'Process heap size used from node.js in bytes',
            value: mem.heapUsed,
        };

        const externalMemUsed = {
            name: `${this.prefix}nodejs_external_memory_bytes`,
            description: 'Nodejs external memory size in bytes',
            value: mem.external,
        };

        return [
            heapSizeTotal,
            heapSizeUsed,
            externalMemUsed,
        ];
    }

    static getMemoryUsage() {
        let mem = null;
        try {
            mem = process.memoryUsage();
        } catch (ex) { // eslint-disable-line no-empty

        }
        return mem;
    }
};

module.exports = CollectorHeadUsedAndSize;