# @metrics/process

Module for collecting different process and system metrics providing them as a metric stream.

[![GitHub Actions status](https://github.com/metrics-js/process/workflows/Run%20Lint%20and%20Tests/badge.svg)](https://github.com/metrics-js/process/actions?query=workflow%3A%22Run+Lint+and+Tests%22)
[![Known Vulnerabilities](https://snyk.io/test/github/metrics-js/process/badge.svg?targetFile=package.json)](https://snyk.io/test/github/metrics-js/process?targetFile=package.json)

A streaming metric producer. Allows producing counters, gauges, time series in a way that is independent of your metrics system so that you can produce metrics and let consumers decide how to consume them. Additionally, you can pipe together different metrics streams before finally consuming them all in a single location.

## Usage

- [Getting started with MetricsJS](https://metrics-js.github.io/introduction/getting-started/).
- [Reference documentaiton for `@metrics/process`](https://metrics-js.github.io/reference/process/).

## Attribution

Most of the metric collectors in this module originate in the process collectors in [prom-client](https://github.com/siimon/prom-client). prom-client is licensed under a Apache License 2.0, which
is included in our [license](https://github.com/metrics-js/process/blob/master/LICENSE).

Due to the above fact, most metrics in this module bear the same name as the process metrics in
prom-client. If one uses this module to provide metrics to Prometheus, these metrics will provide
the same metrics as by prom-client.
