# @metrics/process

Module for collecting different process and system metrics providing them as a metric stream.

[![Dependencies](https://img.shields.io/david/metrics-js/process.svg?style=flat-square)](https://david-dm.org/metrics-js/process)
[![Build Status](http://img.shields.io/travis/metrics-js/process/master.svg?style=flat-square)](https://travis-ci.org/metrics-js/process)
[![Greenkeeper badge](https://badges.greenkeeper.io/metrics-js/process.svg?style=flat-square)](https://greenkeeper.io/)

## Installation

```bash
$ npm install @metrics/process
```

## Example

```js
const stream = require('stream');
const Process = require('@metrics/process');

const proc = new Process();

proc.pipe(new stream.Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        console.log(chunk);
        callback();
    },
}));

proc.start();
```

## Description

This module collects different process and system metrics on a scheduled frequency. The module is
a readable stream which each metrics is emitted on as an metric object on each schedule.

The stream of metrics can be piped into ex the [@metrics/client](https://github.com/metrics-js/client)
or the [@metrics/emitter](https://github.com/metrics-js/emitter) for further distribution.

Example:

```js
const Process = require('@metrics/process');
const Client = require('@metrics/client');
const Emitter = require('@metrics/emitter');

const proc = new Process();
const client = new Client();
const emitter = new Emitter('udp', { port: 45000 });

proc.pipe(client).pipe(emitter);

proc.start();
```

Each metric is collected by a collector. Most collectors will provide metrics on each scheduled
run but some metrics will only run once due to its nature. Some metrics will not be collected on
some operating systems. Please see [collectors](#collectors) for further detail.

### On not staying alive

The internal scheduler is a defered interval which prevents kicking off the collection of a new
set of metrics before any previous collection of metrics has finished. This prevents duplicate
metrics and possible memory leaks if any of the async operations of collecting the metrics get
stale for some weird reason.

The scheduler is by default [unrefered](https://nodejs.org/en/docs/guides/timers-in-node/) so
it will not hold up your node.js process.

## Constructor

Create a new Process instance.

```js
const Process = require('@metrics/process');
const proc = new Process(options);
```

### options (optional)

An Object containing misc configuration. The following values can be provided:

 * **interval** - `Number` - Time between each collection of process metrics in milliseconds. Default: 10000ms.
 * **prefix** - `String` - A prefix to be added to each metrics name.

### returns

Returns a Readable stream in object mode.

## API

The Process instance has the following API:

### .start()

Starts the scheduling of metric collection. The first run of metric collection will run immediately
upon calling this method.

### .stop()

Stops the scheduling of metric collection. Calling this method will not break the stream pipeline.

## Collectors

These are the following mertics collected by this module:

### Version

The Version collector emits a metric with the node.js version used to run the process.

 * **metric name:** nodejs_version_info
 * **collected when:** Only once
 * **collected on:** All operating systems

### V8 heap

The V8 Heap collector emits metrics about the V8 heap spaces.

Metric I:

 * **metric name:** nodejs_heap_space_size_total_bytes
 * **collected when:** On every collect
 * **collected on:** All operating systems

Metric II:

 * **metric name:** nodejs_heap_space_size_used_bytes
 * **collected when:** On every collect
 * **collected on:** All operating systems

Metric III:

 * **metric name:** nodejs_heap_space_size_available_bytes
 * **collected when:** On every collect
 * **collected on:** All operating systems

### Process start time

The Process start time collector emits a metric for when the node.js process started.

 * **metric name:** process_start_time_seconds
 * **collected when:** Only once
 * **collected on:** All operating systems

### Resident memory

The Resident memory collector emits metrics with resident memory in bytes, virtual
memory in bytes and process heap size in bytes.

Metric I:

 * **metric name:** process_resident_memory_bytes
 * **collected when:** On every collect
 * **collected on:** All operating systems

Metric II:

 * **metric name:** process_virtual_memory_bytes
 * **collected when:** On every collect
 * **collected on:** Linux only

Metric III:

 * **metric name:** process_heap_bytes
 * **collected when:** On every collect
 * **collected on:** Linux only

### Open file descriptors

The Open file descriptor collector emits a metric with the number of open file
descriptors.

 * **metric name:** process_open_fds
 * **collected when:** On every collect
 * **collected on:** Linux only

### Max file descriptors

The max file descriptor collector emits a metric with the maximum number of file
descriptors that can be opened.

 * **metric name:** process_max_fds
 * **collected when:** Only once
 * **collected on:** Linux only

### Heap used and size

The Heap used and size collector emits metrics about the memory usage of the Node.js
process.

Metric I:

 * **metric name:** nodejs_heap_size_total_bytes
 * **collected when:** On every collect
 * **collected on:** All operating systems

Metric II:

 * **metric name:** nodejs_heap_size_used_bytes
 * **collected when:** On every collect
 * **collected on:** All operating systems

Metric III:

 * **metric name:** nodejs_external_memory_bytes
 * **collected when:** On every collect
 * **collected on:** All operating systems

### Eventloop lag

The Eventloop lag collector emits a metric with the lag of the eventloop in seconds.

 * **metric name:** nodejs_eventloop_lag_seconds
 * **collected when:** On every collect
 * **collected on:** All operating systems

### CPU total

The CPU total collector emits a metric with the user and system CPU time usage of the
current process. Values are in seconds.

Metric I:

 * **metric name:** process_cpu_user_seconds_total
 * **collected when:** On every collect
 * **collected on:** All operating systems

Metric II:

 * **metric name:** process_cpu_system_seconds_total
 * **collected when:** On every collect
 * **collected on:** All operating systems

Metric III:

 * **metric name:** process_cpu_seconds_total
 * **collected when:** On every collect
 * **collected on:** All operating systems

### Active requests

The Active requests collector emits a metric with the number of open network requests
held by the node.js working queue.

 * **metric name:** nodejs_active_requests_total
 * **collected when:** On every collect
 * **collected on:** All operating systems if `process._getActiveRequests()` is available

### Active handles

The Active handles collector emits a metric with the number of open handles (such as
`setTimeout` etc) held by the node.js working queue.

 * **metric name:** nodejs_active_handles_total
 * **collected when:** On every collect
 * **collected on:** All operating systems if `process._getActiveRequests()` is available

## Attribution

Most of the metric collectors in this module originate in the process collectors in [prom-client](https://github.com/siimon/prom-client). prom-client is licensed under a Apache License 2.0, which
is included in our [license](https://github.com/metrics-js/process/blob/master/LICENSE).

Due to the above fact, most metrics in this module bear the same name as the process metrics in
prom-client. If one uses this module to provide metrics to Prometheus, these metrics will provide
the same metrics as by prom-client.
