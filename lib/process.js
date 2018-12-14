'use strict';

const Interval = require('deferred-interval');
const Metrics = require('@metrics/client');

const CollectorVer = require('./collector-version');
const CollectorMFD = require('./collector-max-file-descriptors');
const CollectorOFD = require('./collector-open-file-descriptors');
const CollectorELL = require('./collector-eventloop-lag');
const CollectorPST = require('./collector-process-start-time');
const CollectorART = require('./collector-active-requests-total');
const CollectorAHT = require('./collector-active-handles-total');
const CollectorCPU = require('./collector-cpu-total');

const MetricsProcess = class MetricsProcess {
    constructor() {
        Object.defineProperty(this, 'metrics', {
            enumerable: true,
            writable: false,
            value: new Metrics(),
        });

        Object.defineProperty(this, 'scheduler', {
            enumerable: false,
            writable: false,
            value: new Interval(),
        });

        const collectorVer = new CollectorVer();
        const collectorMFD = new CollectorMFD();
        const collectorOFD = new CollectorOFD();
        const collectorELL = new CollectorELL();
        const collectorPST = new CollectorPST();
        const collectorART = new CollectorART();
        const collectorAHT = new CollectorAHT();
        const collectorCPU = new CollectorCPU();

        this.scheduler.start((done) => {
            Promise.all([
                collectorVer.collect(),
                collectorMFD.collect(),
                collectorOFD.collect(),
                collectorELL.collect(),
                collectorPST.collect(),
                collectorART.collect(),
                collectorAHT.collect(),
                collectorCPU.collect(),
            ]).then((result) => {
                result.forEach((metric) => {
                    if (metric) {
                        console.log(metric);
                        this.metrics.metric(metric);
                    }
                });
                done();
            });
        }, 2000);
    }

    get [Symbol.toStringTag]() {
        return 'MetricsProcess';
    }

    stop() {
        this.scheduler.stop();
    }
};

module.exports = MetricsProcess;
