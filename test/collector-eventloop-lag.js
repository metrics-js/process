"use strict";

const tap = require("tap");

const Collector = require("../lib/collector-eventloop-lag");

tap.test("Constructor() - object type - should be CollectorEventloopLag", (t) => {
	const collector = new Collector();
	t.equal(Object.prototype.toString.call(collector), "[object CollectorEventloopLag]");
	t.end();
});

tap.test(".collect() - call method - should return an Array with the length of 1", async (t) => {
	const collector = new Collector();
	const result = await collector.collect();
	t.ok(Array.isArray(result));
	t.equal(result.length, 1);
	t.end();
});

tap.test(
	'.collect() - call method - 1st item in Array - should return an object where "name" is "nodejs_eventloop_lag_seconds"',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.equal(result[0].name, "nodejs_eventloop_lag_seconds");
		t.end();
	},
);

tap.test(
	'.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric',
	async (t) => {
		const collector = new Collector("foo_");
		const result = await collector.collect();
		t.equal(result[0].name, "foo_nodejs_eventloop_lag_seconds");
		t.end();
	},
);

tap.test(
	'.collect() - call method - 1st item in Array - should return an object where "value" is an Integer',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.ok(Number.isFinite(result[0].value));
		t.end();
	},
);

tap.test('.collect() - call method - 1st item in Array - should return an object where "type" is 1', async (t) => {
	const collector = new Collector();
	const result = await collector.collect();
	t.type(result[0], "object");
	t.equal(result[0].type, 1);
	t.end();
});
