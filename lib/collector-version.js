"use strict";

const Metric = require("@metrics/metric");

const CollectorVersion = class CollectorVersion {
	constructor(prefix = "") {
		const { version } = process;
		const segments = version
			.slice(1)
			.split(".")
			.map((value) => {
				return parseInt(value, 10);
			});

		Object.defineProperty(this, "segments", {
			value: [version].concat(segments),
		});

		Object.defineProperty(this, "prefix", {
			value: prefix,
		});

		Object.defineProperty(this, "collected", {
			writable: true,
			value: false,
		});
	}

	get [Symbol.toStringTag]() {
		return "CollectorVersion";
	}

	collect(timestamp) {
		if (this.collected) {
			return null;
		}

		this.collected = true;

		return [
			new Metric({
				name: `${this.prefix}nodejs_version_info`,
				description: "Node.js version info",
				type: 1,
				labels: [
					{ name: "version", value: this.segments[0] },
					{ name: "major", value: this.segments[1] },
					{ name: "minor", value: this.segments[2] },
					{ name: "patch", value: this.segments[3] },
				],
				value: 1,
				timestamp,
			}),
		];
	}
};

module.exports = CollectorVersion;
