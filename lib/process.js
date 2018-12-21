'use strict';

const Interval = require('deferred-interval');
const Metric = require('@metrics/client/lib/metric');
const stream = require('readable-stream');

const CollectorVER = require('./collector-version');
const CollectorMFD = require('./collector-max-file-descriptors');
const CollectorOFD = require('./collector-open-file-descriptors');
const CollectorELL = require('./collector-eventloop-lag');
const CollectorPST = require('./collector-process-start-time');
const CollectorART = require('./collector-active-requests-total');
const CollectorAHT = require('./collector-active-handles-total');
const CollectorCPU = require('./collector-cpu-total');
const CollectorHUS = require('./collector-heap-used-and-size');
const CollectorPRM = require('./collector-process-resident-memory');
const CollectorV8H = require('./collector-v8-heap');

const collect = Symbol('collect');

const MetricsProcess = class MetricsProcess extends stream.Readable {
    constructor() {
        super({ objectMode: true, });

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
        this.collectorPRM = new CollectorPRM();
        this.collectorV8H = new CollectorV8H();
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
            this.collectorPRM.collect(),
            this.collectorV8H.collect(),
        ]);
    }

    start() {
        this.scheduler.start(async (done) => {
            this.emit('collect:start');

            const results = await this[collect]();
            const now = Date.now() / 1000;

            results.filter((result) => {
                return Array.isArray(result);
            }).forEach((result) => {
                result.forEach((item) => {
                    item.timestamp = now;
                    const metric = new Metric(item);
                    this.push(metric);
                });
            });

            this.emit('collect:end');
            done();
        }, 2000, true);
    }

    stop() {
        this.scheduler.stop();
    }

    _read() {
        // nothiong to do, push happens in scheduler
    }
};

module.exports = MetricsProcess;
