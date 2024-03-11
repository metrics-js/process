"use strict";

const tap = require("tap");

const Collector = require("../lib/collector-active-handles-total");

tap.test("Constructor() - object type - should be CollectorActiveHandlesTotal", (t) => {
	const collector = new Collector();
	t.equal(Object.prototype.toString.call(collector), "[object CollectorActiveHandlesTotal]");
	t.end();
});

tap.test(".collect() - call method - should return an Array with the length of 1", (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.ok(Array.isArray(result));
	t.equal(result.length, 1);
	t.end();
});

tap.test(
	'.collect() - call method - 1st item in Array - should return an object where "name" is "nodejs_active_requests_total"',
	(t) => {
		const collector = new Collector();
		const result = collector.collect();
		t.type(result[0], "object");
		t.equal(result[0].name, "nodejs_active_handles_total");
		t.end();
	},
);

tap.test(
	'.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric',
	(t) => {
		const collector = new Collector("foo_");
		const result = collector.collect();
		t.equal(result[0].name, "foo_nodejs_active_handles_total");
		t.end();
	},
);

tap.test('.collect() - call method - 1st item in Array - should return an object where "value" is an Integer', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[0], "object");
	t.ok(Number.isFinite(result[0].value));
	t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "type" is 1', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[0], "object");
	t.equal(result[0].type, 1);
	t.end();
});

tap.test('.collect() - "process._getActiveHandles" is not a function - should return "null"', (t) => {
	const original = process._getActiveHandles;
	process._getActiveHandles = null;

	const collector = new Collector();
	const result = collector.collect();
	t.ok(result === null);

	process._getActiveHandles = original;
	t.end();
});
