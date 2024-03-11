"use strict";

const tap = require("tap");

const Collector = require("../lib/collector-cpu-total");

tap.test("Constructor() - object type - should be CollectorCpuTotal", (t) => {
	const collector = new Collector();
	t.equal(Object.prototype.toString.call(collector), "[object CollectorCpuTotal]");
	t.end();
});

tap.test(".collect() - call method - should return an object", (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result, "object");
	t.end();
});

tap.test(".collect() - call method - should return an Array with the length of 3", (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.ok(Array.isArray(result));
	t.equal(result.length, 3);
	t.end();
});

tap.test(
	'.collect() - call method - 1st item in Array - should be an object where "name" is "process_cpu_user_seconds_total"',
	(t) => {
		const collector = new Collector();
		const result = collector.collect();
		t.type(result[0], "object");
		t.equal(result[0].name, "process_cpu_user_seconds_total");
		t.end();
	},
);

tap.test(
	'.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric',
	(t) => {
		const collector = new Collector("foo_");
		const result = collector.collect();
		t.equal(result[0].name, "foo_process_cpu_user_seconds_total");
		t.end();
	},
);

tap.test('.collect() - call method - 1st item in Array - should be an object where "value" is an Integer', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[0], "object");
	t.ok(Number.isFinite(result[0].value));
	t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "type" is 2', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[0], "object");
	t.equal(result[0].type, 2);
	t.end();
});

tap.test(
	'.collect() - call method - 2nd item in Array - should be an object where "name" is "process_cpu_system_seconds_total"',
	(t) => {
		const collector = new Collector();
		const result = collector.collect();
		t.type(result[1], "object");
		t.equal(result[1].name, "process_cpu_system_seconds_total");
		t.end();
	},
);

tap.test(
	'.collect() - "prefix" on constructor is set - 2nd item in Array - should prepend prefix to "name" in metric',
	(t) => {
		const collector = new Collector("foo_");
		const result = collector.collect();
		t.equal(result[1].name, "foo_process_cpu_system_seconds_total");
		t.end();
	},
);

tap.test('.collect() - call method - 2nd item in Array - should be an object where "value" is an Integer', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[1], "object");
	t.ok(Number.isFinite(result[1].value));
	t.end();
});

tap.test('.collect() - call method - 2nd item in Array - should return an object where "type" is 2', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[1], "object");
	t.equal(result[1].type, 2);
	t.end();
});

tap.test(
	'.collect() - call method - 3rd item in Array - should be an object where "name" is "process_cpu_seconds_total"',
	(t) => {
		const collector = new Collector();
		const result = collector.collect();
		t.type(result[2], "object");
		t.equal(result[2].name, "process_cpu_seconds_total");
		t.end();
	},
);

tap.test(
	'.collect() - "prefix" on constructor is set - 3rd item in Array - should prepend prefix to "name" in metric',
	(t) => {
		const collector = new Collector("foo_");
		const result = collector.collect();
		t.equal(result[2].name, "foo_process_cpu_seconds_total");
		t.end();
	},
);

tap.test('.collect() - call method - 3rd item in Array - should be an object where "value" is an Integer', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[2], "object");
	t.ok(Number.isFinite(result[2].value));
	t.end();
});

tap.test('.collect() - call method - 3rd item in Array - should return an object where "type" is 2', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[2], "object");
	t.equal(result[2].type, 2);
	t.end();
});
