// expected output for specific version
var argv = require('optimist').argv,
    qunitVersion = argv.version,
    util = require("util"),
    fs = require('fs'),
    path = require('path'),
    semver = require('semver'),
    printContent = function (filename) {
        var content = fs.readFileSync(path.resolve(path.join(__dirname, '..', 'expected', filename)), 'utf8');
        util.print(content);
    };

if (qunitVersion === 'stable') {
    printContent('latest_format.txt');
} else if (qunitVersion === 'head') {
    printContent('latest_format.txt');
} else if (semver.lt(qunitVersion, '1.4.0')) {
    printContent('output_before_1_4_0.txt');
} else if (semver.lt(qunitVersion, '1.10.0')) {
    printContent('output_before_1_10_0.txt');
} else if (semver.lt(qunitVersion, '1.12.0')) {
    printContent('output_before_1_12_0.txt');
} else if (semver.lt(qunitVersion, '1.15.0')) {
    printContent('output_before_1_15_0.txt');
} else if (semver.lt(qunitVersion, '1.16.0')) {
    printContent('output_before_1_16_0.txt');
} else {
    printContent('latest_format.txt');
}
