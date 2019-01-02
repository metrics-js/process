'use strict';

const Metric = require('@metrics/metric');

const CollectorCpuTotal = class CollectorCpuTotal {
    constructor(prefix = '') {
        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });

        Object.defineProperty(this, 'previousSample', {
            writable: true,
            value: process.cpuUsage(),
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorCpuTotal';
    }

    collect(timestamp) {
        const sample = process.cpuUsage();

        const userUsageMicros = sample.user - this.previousSample.user;
        const systemUsageMicros = sample.system - this.previousSample.system;

        this.previousSample = sample;

        const cpuUserUsageCounter = new Metric({
            name: `${this.prefix}process_cpu_user_seconds_total`,
            description: 'Total user CPU time spent in seconds',
            value: userUsageMicros / 1e6,
            timestamp,
        });

        const cpuSystemUsageCounter = new Metric({
            name: `${this.prefix}process_cpu_system_seconds_total`,
            description: 'Total system CPU time spent in seconds',
            value: systemUsageMicros / 1e6,
            timestamp,
        });

        const cpuUsageCounter = new Metric({
            name: `${this.prefix}process_cpu_seconds_total`,
            description: 'Total user and system CPU time spent in seconds',
            value: (userUsageMicros + systemUsageMicros) / 1e6,
            timestamp,
        });

        return [
            cpuUserUsageCounter,
            cpuSystemUsageCounter,
            cpuUsageCounter,
        ];
    }
};

module.exports = CollectorCpuTotal;
