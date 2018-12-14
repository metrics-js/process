'use strict';

const CollectorCpuTotal = class CollectorCpuTotal {
    constructor() {
        Object.defineProperty(this, 'previousSample', {
            writable: true,
            value: process.cpuUsage(),
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorCpuTotal';
    }

    collect() {
        const sample = process.cpuUsage();
        const now = Date.now();

        const userUsageMicros = sample.user - this.previousSample.user;
        const systemUsageMicros = sample.system - this.previousSample.system;

        this.previousSample = sample;

        const cpuUserUsageCounter = {
            name: 'process_cpu_user_seconds_total',
            description: 'Total user CPU time spent in seconds',
            value: [userUsageMicros / 1e6, now],
        };

        const cpuSystemUsageCounter = {
            name: 'process_cpu_system_seconds_total',
            description: 'Total system CPU time spent in seconds',
            value: [systemUsageMicros / 1e6, now],
        };

        const cpuUsageCounter = {
            name: 'process_cpu_seconds_total',
            description: 'Total user and system CPU time spent in seconds',
            value: [(userUsageMicros + systemUsageMicros) / 1e6, now],
        };

        return [
            cpuUserUsageCounter,
            cpuSystemUsageCounter,
            cpuUsageCounter,
        ];
    }
};

module.exports = CollectorCpuTotal;
