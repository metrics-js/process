'use strict';

const tap = require('tap');
const stream = require('readable-stream');
const Process = require('../');

const destObjectStream = (done) => {
    const arr = [];

    const dStream = new stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            arr.push(chunk);
            callback();
        },
    });

    dStream.on('finish', () => {
        done(arr);
    });

    return dStream;
};

/**
 * Constructor
 */

tap.test('Constructor() - object type - should be MetricsProcess', (t) => {
    const proc = new Process();
    t.equal(Object.prototype.toString.call(proc), '[object MetricsProcess]');
    t.end();
});

tap.test('Constructor() - foo - should foo', (t) => {
    const proc = new Process();
    const dest = destObjectStream((result) => {
        console.log(result);
        // proc.stop();
        t.end();
    });

    proc.pipe(dest);

    proc.start();
    /*
    setImmediate(() => {
        proc.stop();
        dest.end();
    });
*/

    setTimeout(() => {
        dest.end();
    }, 100);
    t.equal(Object.prototype.toString.call(proc), '[object MetricsProcess]');
});
