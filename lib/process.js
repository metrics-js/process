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
    constructor({
        prefix = '',
        interval = 2000,
    } = {}) {
        super({ objectMode: true, });

        Object.defineProperty(this, 'scheduler', {
            value: new Interval(),
        });

        Object.defineProperty(this, 'interval', {
            value: interval,
        });

        Object.defineProperty(this, 'collectorVER', {
            value: new CollectorVER(prefix),
        });

        Object.defineProperty(this, 'collectorMFD', {
            value: new CollectorMFD(prefix),
        });

        Object.defineProperty(this, 'collectorOFD', {
            value: new CollectorOFD(prefix),
        });

        Object.defineProperty(this, 'collectorELL', {
            value: new CollectorELL(prefix),
        });

        Object.defineProperty(this, 'collectorPST', {
            value: new CollectorPST(prefix),
        });

        Object.defineProperty(this, 'collectorART', {
            value: new CollectorART(prefix),
        });

        Object.defineProperty(this, 'collectorAHT', {
            value: new CollectorAHT(prefix),
        });

        Object.defineProperty(this, 'collectorCPU', {
            value: new CollectorCPU(prefix),
        });

        Object.defineProperty(this, 'collectorHUS', {
            value: new CollectorHUS(prefix),
        });

        Object.defineProperty(this, 'collectorPRM', {
            value: new CollectorPRM(prefix),
        });

        Object.defineProperty(this, 'collectorV8H', {
            value: new CollectorV8H(prefix),
        });
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
                    if (this._readableState.flowing) {
                        this.push(metric);
                        return;
                    }
                    this.emit('drop', metric);
                });
            });

            this.emit('collect:end');
            done();
        }, this.interval, true);
    }

    stop() {
        this.scheduler.stop();
    }

    _read() {
        // nothiong to do, push happens in scheduler
    }
};

module.exports = MetricsProcess;
