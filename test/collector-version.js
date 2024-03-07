"use strict";

const tap = require("tap");

const Collector = require("../lib/collector-version");

tap.test("Constructor() - object type - should be CollectorVersion", (t) => {
	const collector = new Collector();
	t.equal(Object.prototype.toString.call(collector), "[object CollectorVersion]");
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
	'.collect() - call method - 1st item in Array - should return an object where "name" is "nodejs_version_info"',
	(t) => {
		const collector = new Collector();
		const result = collector.collect();
		t.equal(result[0].name, "nodejs_version_info");
		t.end();
	},
);

tap.test(
	'.collect() - "prefix" on constructor is set - 1st item in Array - should prepend prefix to "name" in metric',
	(t) => {
		const collector = new Collector("foo_");
		const result = collector.collect();
		t.equal(result[0].name, "foo_nodejs_version_info");
		t.end();
	},
);

tap.test('.collect() - call method - 1st item in Array - should return an object where "value" is 1', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[0], "object");
	t.equal(result[0].value, 1);
	t.end();
});

tap.test('.collect() - call method - 1st item in Array - should return an object where "type" is 1', (t) => {
	const collector = new Collector();
	const result = collector.collect();
	t.type(result[0], "object");
	t.equal(result[0].type, 1);
	t.end();
});

tap.test(
	'.collect() - call method - 1st item in Array - should return an object where "labels" represent the version numbers as segmens',
	(t) => {
		const collector = new Collector();
		const result = collector.collect();
		t.type(result[0], "object");
		t.ok(Array.isArray(result[0].labels));
		t.equal(result[0].labels[0].name, "version");
		t.type(result[0].labels[0].value, "string");
		t.equal(result[0].labels[1].name, "major");
		t.ok(Number.isInteger(result[0].labels[1].value));
		t.equal(result[0].labels[2].name, "minor");
		t.ok(Number.isInteger(result[0].labels[2].value));
		t.equal(result[0].labels[3].name, "patch");
		t.ok(Number.isInteger(result[0].labels[3].value));
		t.end();
	},
);

tap.test('.collect() - call method twice - should return "null" on second call', (t) => {
	const collector = new Collector();
	const resultA = collector.collect();
	t.ok(Array.isArray(resultA));

	const resultB = collector.collect();
	t.ok(resultB === null);
	t.end();
});
