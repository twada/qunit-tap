'use strict';

var child = require('child_process');
var path = require('path');
var TapConsumer = require('tap-consumer');
var consumer = new TapConsumer();
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    string: [
        'suite'
    ]
});

if (!argv.suite) {
    console.log('should pass --suite option');
    process.exit(1);
}

var proc = child.spawn(path.join(__dirname, 'version_compatibility_' + argv.suite + '.sh'));
proc.stdout.pipe(consumer)
    .on('data', function (data) {
        if (typeof data === 'object') {
            var str = (data.ok) ? 'ok' : 'not ok';
            str += ' ' + data.id;
            str += ' - ' + data.name;
            console.log(str);
        }
    })
    .on('end', function (err, actualCount, passed) {
        console.log('1..' + actualCount);
        if (!err && actualCount === passed.length) {
            process.exit(0);
        } else {
            process.exit(1);
        }
    });
