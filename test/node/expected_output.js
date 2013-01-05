var argv = require('optimist').argv,
    qunitVersion = argv.version,
    util = require("util"),
    fs = require('fs'),
    path = require('path'),
    semver = require('semver'),
    before_1_0_0 = function () {
        return (!semver.valid(qunitVersion) && qunitVersion !== 'stable');
    };

// expected output for specific version
var expectedFile;
if (qunitVersion === 'stable') {
    expectedFile = 'latest_format.txt';
} else if (qunitVersion === '001_two_args') {
    expectedFile = '001_format.txt';
} else if (before_1_0_0() || semver.lt(qunitVersion, '1.4.0')) {
    expectedFile = 'output_before_1_4_0.txt';
} else if (semver.lt(qunitVersion, '1.10.0')) {
    expectedFile = 'output_before_1_10_0.txt';
} else {
    expectedFile = 'latest_format.txt';
}

var content = fs.readFileSync(path.resolve(path.join(__dirname, '..', 'expected', expectedFile)), 'utf8');
util.print(content);
