"use strict";

const EventEmitter = require("events");
const perfHooks = require("perf_hooks");
const Metric = require("@metrics/metric");

const CollectorGC = class CollectorGC extends EventEmitter {
	constructor(prefix = "") {
		super();

		const dictionary = new Map([
			[perfHooks.constants.NODE_PERFORMANCE_GC_MAJOR, "major"],
			[perfHooks.constants.NODE_PERFORMANCE_GC_MINOR, "minor"],
			[perfHooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL, "incremental"],
			[perfHooks.constants.NODE_PERFORMANCE_GC_WEAKCB, "weakcb"],
		]);

		const buckets = [0.001, 0.01, 0.1, 1, 2, 5];

		Object.defineProperty(this, "observer", {
			value: new perfHooks.PerformanceObserver((list) => {
				const entry = list.getEntries()[0];
				const metric = new Metric({
					name: `${prefix}nodejs_gc_duration_seconds`,
					description: 'Garbage collection duration by kind, one of "major", "minor", "incremental" or "weakcb"',
					type: 5,
					labels: [{ name: "kind", value: dictionary.get(entry.kind) }],
					timestamp: Date.now() / 1000,
					value: entry.duration / 1000,
					meta: {
						buckets,
					},
				});
				this.emit("metric", metric);
			}),
		});
	}

	get [Symbol.toStringTag]() {
		return "CollectorGC";
	}

	start() {
		this.observer.observe({ entryTypes: ["gc"], buffered: false });
	}

	stop() {
		this.observer.disconnect();
	}
};

module.exports = CollectorGC;
