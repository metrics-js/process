"use strict";

const Metric = require("@metrics/metric");
const fs = require("fs");

const generic = Symbol("generic");
const linux = Symbol("linux");

const CollectorProcessResidentMemory = class CollectorProcessResidentMemory {
	constructor(prefix = "") {
		Object.defineProperty(this, "prefix", {
			value: prefix,
		});
	}

	get [Symbol.toStringTag]() {
		return "CollectorProcessResidentMemory";
	}

	[generic](timestamp) {
		const mem = this.constructor.getMemoryUsage();
		if (mem) {
			return [
				new Metric({
					name: `${this.prefix}process_resident_memory_bytes`,
					description: "Resident memory size in bytes",
					type: 1,
					value: mem.rss,
					timestamp,
				}),
			];
		}
		return null;
	}

	[linux](timestamp) {
		return new Promise((resolve) => {
			fs.readFile("/proc/self/status", "utf8", (error, file) => {
				if (error) {
					resolve(null);
					return;
				}

				const mem = this.constructor.parseFile(file);

				const residentMemory = new Metric({
					name: `${this.prefix}process_resident_memory_bytes`,
					description: "Resident memory size in bytes",
					type: 1,
					value: mem.VmRSS,
					timestamp,
				});

				const virtualMemory = new Metric({
					name: `${this.prefix}process_virtual_memory_bytes`,
					description: "Virtual memory size in bytes",
					type: 1,
					value: mem.VmSize,
					timestamp,
				});

				const heapSizeMemory = new Metric({
					name: `${this.prefix}process_heap_bytes`,
					description: "Process heap size in bytes",
					type: 1,
					value: mem.VmData,
					timestamp,
				});

				resolve([residentMemory, virtualMemory, heapSizeMemory]);
			});
		});
	}

	collect(timestamp) {
		if (process.platform === "linux") {
			return this[linux](timestamp);
		}
		return this[generic](timestamp);
	}

	static getMemoryUsage() {
		let mem;
		try {
			mem = process.memoryUsage();
		} catch (ex) {
			// eslint-disable-line no-empty
		}
		return mem;
	}

	static parseFile(file) {
		const metrics = {};
		const values = ["VmSize", "VmRSS", "VmData"];

		file
			.split("\n")
			.filter((s) => values.some((value) => s.indexOf(value) === 0))
			.forEach((string) => {
				const split = string.split(":");

				// Get the value
				let value = split[1].trim();
				// Remove trailing ` kb`
				value = value.substr(0, value.length - 3);
				// Make it into a number in bytes bytes
				value = Number(value) * 1024;

				metrics[split[0]] = value;
			});

		return metrics;
	}
};

module.exports = CollectorProcessResidentMemory;
