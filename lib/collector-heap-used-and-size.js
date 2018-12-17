'use strict';

const CollectorHeadUsedAndSize = class CollectorHeadUsedAndSize {
    get [Symbol.toStringTag]() {
        return 'CollectorHeadUsedAndSize';
    }

    collect() {
        const now = Date.now();
        const mem = this.constructor.getMemoryUsage();

        let heapSizeTotal = null;
        let heapSizeUsed = null;
        let externalMemUsed = null;

        if (mem) {
            heapSizeTotal = {
                name: 'nodejs_heap_size_total_bytes',
                description: 'Process heap size from node.js in bytes',
                value: [mem.heapTotal, now],
            };

            heapSizeUsed = {
                name: 'nodejs_heap_size_used_bytes',
                description: 'Process heap size used from node.js in bytes',
                value: [mem.heapUsed, now],
            };

            externalMemUsed = {
                name: 'nodejs_external_memory_bytes',
                description: 'Nodejs external memory size in bytes',
                value: [mem.external, now],
            };
        }

        return [
            heapSizeTotal,
            heapSizeUsed,
            externalMemUsed,
        ];
    }

    static getMemoryUsage() {
        let mem;
        try {
            mem = process.memoryUsage();
        } catch (ex) { // eslint-disable-line no-empty

        }
        return mem;
    }
};

module.exports = CollectorHeadUsedAndSize;
