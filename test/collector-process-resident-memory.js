"use strict";

const tap = require("tap");

const Collector = require("../lib/collector-process-resident-memory");

tap.grep =
	process.platform === "linux" ? [/condition:all|condition:supported/] : [/condition:all|condition:unsupported/];

tap.test("Constructor() - condition:all - object type - should be CollectorProcessResidentMemory", (t) => {
	const collector = new Collector();
	t.equal(Object.prototype.toString.call(collector), "[object CollectorProcessResidentMemory]");
	t.end();
});

/**
 * When the operating system support reporting more than the resident process memory
 */

tap.test(".collect() - condition:supported - call method - should return an Array with the length of 3", async (t) => {
	const collector = new Collector();
	const result = await collector.collect();
	t.ok(Array.isArray(result));
	t.equal(result.length, 3);
	t.end();
});

tap.test(
	'.collect() - condition:supported - call method - 1st item in Array - should return an object where "name" is "process_resident_memory_bytes"',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.equal(result[0].name, "process_resident_memory_bytes");
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric',
	async (t) => {
		const collector = new Collector("foo_");
		const result = await collector.collect();
		t.equal(result[0].name, "foo_process_resident_memory_bytes");
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 1st item in Array - should return an object where "value" is an Integer',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.ok(Number.isFinite(result[0].value));
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 1st item in Array - should return an object where "type" is 1',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.equal(result[0].type, 1);
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 2nd item in Array - should return an object where "name" is "process_virtual_memory_bytes"',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[1], "object");
		t.equal(result[1].name, "process_virtual_memory_bytes");
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - "prefix" on constructor is set - 2nd item in Array - should prepend prefix to "name" in metric',
	async (t) => {
		const collector = new Collector("foo_");
		const result = await collector.collect();
		t.equal(result[1].name, "foo_process_virtual_memory_bytes");
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 2nd item in Array - should return an object where "value" is an Integer',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[1], "object");
		t.ok(Number.isFinite(result[1].value));
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 2nd item in Array - should return an object where "type" is 1',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[1], "object");
		t.equal(result[1].type, 1);
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 3rd item in Array - should return an object where "name" is "process_heap_bytes"',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[2], "object");
		t.equal(result[2].name, "process_heap_bytes");
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - "prefix" on constructor is set - 3rd item in Array - should prepend prefix to "name" in metric',
	async (t) => {
		const collector = new Collector("foo_");
		const result = await collector.collect();
		t.equal(result[2].name, "foo_process_heap_bytes");
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 3rd item in Array - should return an object where "value" is an Integer',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[2], "object");
		t.ok(Number.isFinite(result[2].value));
		t.end();
	},
);

tap.test(
	'.collect() - condition:supported - call method - 3rd item in Array - should return an object where "type" is 1',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[2], "object");
		t.equal(result[2].type, 1);
		t.end();
	},
);

/**
 * When the operating system DOES NOT support reporting more than the resident process memory
 */

tap.test(
	".collect() - condition:unsupported - call method - should return an Array with the length of 1",
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.ok(Array.isArray(result));
		t.equal(result.length, 1);
		t.end();
	},
);

tap.test(
	'.collect() - condition:unsupported - call method - 1st item in Array - should return an object where "name" is "process_resident_memory_bytes"',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.equal(result[0].name, "process_resident_memory_bytes");
		t.end();
	},
);

tap.test(
	'.collect() - condition:unsupported - call method - 1st item in Array - should return an object where "value" is an Integer',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.ok(Number.isFinite(result[0].value));
		t.end();
	},
);

tap.test(
	'.collect() - condition:unsupported - call method - 1st item in Array - should return an object where "type" is 1',
	async (t) => {
		const collector = new Collector();
		const result = await collector.collect();
		t.type(result[0], "object");
		t.equal(result[0].type, 1);
		t.end();
	},
);
