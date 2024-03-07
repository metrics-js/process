"use strict";

const Interval = require("deferred-interval");
const stream = require("readable-stream");

const CollectorVER = require("./collector-version");
const CollectorMFD = require("./collector-max-file-descriptors");
const CollectorOFD = require("./collector-open-file-descriptors");
const CollectorELL = require("./collector-eventloop-lag");
const CollectorPST = require("./collector-process-start-time");
const CollectorART = require("./collector-active-requests-total");
const CollectorAHT = require("./collector-active-handles-total");
const CollectorCPU = require("./collector-cpu-total");
const CollectorHUS = require("./collector-heap-used-and-size");
const CollectorPRM = require("./collector-process-resident-memory");
const CollectorV8H = require("./collector-v8-heap");
const CollectorGC = require("./collector-gc");

const collect = Symbol("collect");

const MetricsProcess = class MetricsProcess extends stream.Readable {
	constructor({ prefix = "", interval = 10000 } = {}) {
		super({ objectMode: true });

		Object.defineProperty(this, "scheduler", {
			value: new Interval(),
		});

		Object.defineProperty(this, "interval", {
			value: interval,
		});

		Object.defineProperty(this, "collectorVER", {
			value: new CollectorVER(prefix),
		});

		Object.defineProperty(this, "collectorMFD", {
			value: new CollectorMFD(prefix),
		});

		Object.defineProperty(this, "collectorOFD", {
			value: new CollectorOFD(prefix),
		});

		Object.defineProperty(this, "collectorELL", {
			value: new CollectorELL(prefix),
		});

		Object.defineProperty(this, "collectorPST", {
			value: new CollectorPST(prefix),
		});

		Object.defineProperty(this, "collectorART", {
			value: new CollectorART(prefix),
		});

		Object.defineProperty(this, "collectorAHT", {
			value: new CollectorAHT(prefix),
		});

		Object.defineProperty(this, "collectorCPU", {
			value: new CollectorCPU(prefix),
		});

		Object.defineProperty(this, "collectorHUS", {
			value: new CollectorHUS(prefix),
		});

		Object.defineProperty(this, "collectorPRM", {
			value: new CollectorPRM(prefix),
		});

		Object.defineProperty(this, "collectorV8H", {
			value: new CollectorV8H(prefix),
		});

		Object.defineProperty(this, "collectorGC", {
			value: new CollectorGC(prefix),
		});

		this.collectorGC.on("metric", (metric) => {
			if (this._readableState.flowing) {
				this.push(metric);
				return;
			}
			this.emit("drop", metric);
		});
	}

	get [Symbol.toStringTag]() {
		return "MetricsProcess";
	}

	[collect]() {
		const now = Date.now() / 1000;
		return Promise.all([
			this.collectorVER.collect(now),
			this.collectorMFD.collect(now),
			this.collectorOFD.collect(now),
			this.collectorELL.collect(now),
			this.collectorPST.collect(now),
			this.collectorART.collect(now),
			this.collectorAHT.collect(now),
			this.collectorCPU.collect(now),
			this.collectorHUS.collect(now),
			this.collectorPRM.collect(now),
			this.collectorV8H.collect(now),
		]);
	}

	start(options = {}) {
		const o = {
			ver: true,
			mfd: true,
			ofd: true,
			ell: true,
			pst: true,
			art: true,
			aht: true,
			cpu: true,
			hus: true,
			prm: true,
			v8h: true,
			gc: false,
			...options,
		};

		this.scheduler.start(
			async (done) => {
				this.emit("collect:start");

				const results = await this[collect](o);
				results
					.filter((result) => {
						return Array.isArray(result);
					})
					.forEach((result) => {
						result.forEach((metric) => {
							if (this._readableState.flowing) {
								this.push(metric);
								return;
							}
							this.emit("drop", metric);
						});
					});

				this.emit("collect:end");
				done();
			},
			this.interval,
			true,
		);

		if (o.gc) {
			this.collectorGC.start();
		}
	}

	stop() {
		this.scheduler.stop();
		this.collectorGC.stop();
	}

	_read() {
		// nothiong to do, push happens in scheduler
	}
};

module.exports = MetricsProcess;
