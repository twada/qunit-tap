// expected output for specific version
var argv = require('optimist').argv,
    qunitVersion = argv.version,
    util = require("util"),
    fs = require('fs'),
    path = require('path'),
    semver = require('semver');

function expectedFileFor (version) {
    if (version === 'stable' || version === 'head') {
        return 'latest_format.txt';
    } else if (semver.satisfies(version, '1.0.0 - 1.3.0')) {
        return 'output-1_0_0-to-1_3_0.txt';
    } else if (semver.satisfies(version, '1.4.0 - 1.9.0')) {
        return 'output-1_4_0-to-1_9_0.txt';
    } else if (semver.satisfies(version, '1.10.0 - 1.11.0')) {
        return 'output-1_10_0-to-1_11_0.txt';
    } else if (semver.satisfies(version, '1.12.0 - 1.14.0')) {
        return 'output-1_12_0-to-1_14_0.txt';
    } else if (semver.satisfies(version, '1.15.0')) {
        return 'output-1_15_0.txt';
    } else {
        return 'latest_format.txt';
    }
}

function printContent (filename) {
    var content = fs.readFileSync(path.resolve(path.join(__dirname, '..', 'expected', filename)), 'utf8');
    util.print(content);
}

printContent(expectedFileFor(qunitVersion));
