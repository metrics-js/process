'use strict';

const Interval = require('deferred-interval');
const Metrics = require('@metrics/client');

const CollectorVER = require('./collector-version');
const CollectorMFD = require('./collector-max-file-descriptors');
const CollectorOFD = require('./collector-open-file-descriptors');
const CollectorELL = require('./collector-eventloop-lag');
const CollectorPST = require('./collector-process-start-time');
const CollectorART = require('./collector-active-requests-total');
const CollectorAHT = require('./collector-active-handles-total');
const CollectorCPU = require('./collector-cpu-total');
const CollectorHUS = require('./collector-heap-used-and-size');

const collect = Symbol('collect');

const MetricsProcess = class MetricsProcess extends Metrics {
    constructor(...args) {
        super(...args);

        Object.defineProperty(this, 'scheduler', {
            enumerable: false,
            writable: false,
            value: new Interval(),
        });

        this.collectorVER = new CollectorVER();
        this.collectorMFD = new CollectorMFD();
        this.collectorOFD = new CollectorOFD();
        this.collectorELL = new CollectorELL();
        this.collectorPST = new CollectorPST();
        this.collectorART = new CollectorART();
        this.collectorAHT = new CollectorAHT();
        this.collectorCPU = new CollectorCPU();
        this.collectorHUS = new CollectorHUS();
    }

    get [Symbol.toStringTag]() {
        return 'MetricsProcess';
    }

    [collect]() {
        return Promise.all([
            this.collectorVER.collect(),
            this.collectorMFD.collect(),
            this.collectorOFD.collect(),
            this.collectorELL.collect(),
            this.collectorPST.collect(),
            this.collectorART.collect(),
            this.collectorAHT.collect(),
            this.collectorCPU.collect(),
            this.collectorHUS.collect(),
        ]);
    }

    stop() {
        this.scheduler.stop();
    }

    start() {
        this.scheduler.start(async (done) => {
            const results = await this[collect]();
            results.filter((result) => {
                return Array.isArray(result);
            }).forEach((result) => {
                result.forEach((metric) => {
                    this.metric(metric);
                });
            });
            done();
        }, 2000, true);
    }
};

module.exports = MetricsProcess;
