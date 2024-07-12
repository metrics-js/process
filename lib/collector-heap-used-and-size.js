"use strict";

const Metric = require("@metrics/metric");

const CollectorHeapUsedAndSize = class CollectorHeapUsedAndSize {
	constructor(prefix = "") {
		Object.defineProperty(this, "prefix", {
			value: prefix,
		});
	}

	get [Symbol.toStringTag]() {
		return "CollectorHeapUsedAndSize";
	}

	collect(timestamp) {
		const mem = this.constructor.getMemoryUsage();
		if (!mem) {
			return null;
		}

		const heapSizeTotal = new Metric({
			name: `${this.prefix}nodejs_heap_size_total_bytes`,
			description: "Process heap size from node.js in bytes",
			type: 1,
			value: mem.heapTotal,
			timestamp,
		});

		const heapSizeUsed = new Metric({
			name: `${this.prefix}nodejs_heap_size_used_bytes`,
			description: "Process heap size used from node.js in bytes",
			type: 1,
			value: mem.heapUsed,
			timestamp,
		});

		const externalMemUsed = new Metric({
			name: `${this.prefix}nodejs_external_memory_bytes`,
			description: "Nodejs external memory size in bytes",
			type: 1,
			value: mem.external,
			timestamp,
		});

		return [heapSizeTotal, heapSizeUsed, externalMemUsed];
	}

	static getMemoryUsage() {
		let mem = null;
		try {
			mem = process.memoryUsage();
			// eslint-disable-next-line
		} catch (ex) {}
		return mem;
	}
};

module.exports = CollectorHeapUsedAndSize;
