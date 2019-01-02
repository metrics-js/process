'use strict';

const Metric = require('@metrics/metric');

const CollectorVersion = class CollectorVersion {
    constructor(prefix = '') {
        const { version } = process;
        const segments = version
            .slice(1)
            .split('.')
            .map((value) => {
                return parseInt(value, 10);
            });

        Object.defineProperty(this, 'segments', {
            value: [version].concat(segments),
        });

        Object.defineProperty(this, 'prefix', {
            value: prefix,
        });

        Object.defineProperty(this, 'collected', {
            writable: true,
            value: false,
        });
    }

    get [Symbol.toStringTag]() {
        return 'CollectorVersion';
    }

    collect(timestamp) {
        if (this.collected) {
            return null;
        }

        this.collected = true;

        return [new Metric({
            name: `${this.prefix}nodejs_version_info`,
            description: 'Node.js version info',
            meta: {
                version: this.segments[0],
                major: this.segments[1],
                minor: this.segments[2],
                patch: this.segments[3],
            },
            value: 1,
            timestamp,
        })];
    }
};

module.exports = CollectorVersion;
