var q = require('../test_helper').QUnit,
    inc = require('../lib/incr').increment;

q.module('incr module');

q.test('increment', function (assert) {
    assert.equal(inc(1), 2);
    assert.equal(inc(-3), -2);
});
