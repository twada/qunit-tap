var q = require("../test_helper").QUnit;

q.module("QUnit Assertions");

q.test('equal' , function() {
    q.equal('1', 1, "equal('1', 1)");
    q.equal(null, 'null', "equal(null, 'null')");
    q.equal(undefined, 'undefined', "equal(undefined, 'undefined')");
    q.equal(null, undefined, "equal(null, undefined)");
    q.equal(undefined, null, "equal(undefined, null)");
    q.equal(undefined, undefined, "equal(undefined, undefined)");
});

q.test('strictEqual' , function() {
    q.strictEqual(0, '0', "strictEqual(0, '0')");
    q.strictEqual('1', 1, "strictEqual('1', 1)");
    q.strictEqual(null, undefined, "strictEqual(null, undefined)");
    q.strictEqual(undefined, null, "strictEqual(undefined, null)");
    q.strictEqual(undefined, undefined, "strictEqual(undefined, undefined)");
});

q.test('deepEqual' , function() {
    q.deepEqual(undefined, undefined, "deepEqual(undefined, undefined)");
    q.deepEqual(['1', '2'], [1, 2], "deepEqual(['1', '2'], [1, 2])");
    q.deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'}, "deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'})");
});

q.test('ok' , function() {
    q.ok(null, "ok(null)");
    q.ok(undefined, "ok(undefined)");
    q.ok(1, "ok(1)");
    q.ok(0, "ok(0)");
    q.ok('', "ok('')");
    q.ok([], "ok([])");
    q.ok({}, "ok({})");
});


q.test('throws' , function(assert) {
    assert.throws(function () { throw new Error('hoge'); }, 'testing some error is thrown');

    assert.throws(function () { return 'hoge'; }, 'error is not thrown');
    assert.throws(function () { return 'hoge'; }, Error, 'Error is not thrown');

    assert.throws(function () { throw new TypeError('hoge'); }, TypeError, 'Error class assertion');
    assert.throws(function () { throw new TypeError('hoge'); }, Error, 'Error class assertion uses instanceof');
    assert.throws(function () { throw new Error('hoge'); }, TypeError, 'Error class assertion uses instanceof');

    assert.throws(function () {
        throw {
            name: 'TypeError',
            message: 'type mismatch'
        };
    }, 'throwing object');

    assert.throws(function () {
        throw {
            name: 'TypeError',
            message: 'type mismatch'
        };
    }, TypeError, 'throwing object is not equivalent to Error class assertion');

    assert.throws(function () {
        throw {
            name: 'TypeError',
            message: 'type mismatch'
        };
    }, Object, 'throwing object then assert it is instanceof Object');

    assert.throws(function () {
        throw {
            name: 'TypeError',
            message: 'type mismatch'
        };
    }, function (err) { return err.name === 'TypeError'; }, 'validation function');

    assert.throws(function () { throw 'hoge'; }, 'throwing string');
    assert.throws(function () { throw 'hoge'; }, /^hoge$/, 'throwing string then assert that using regex');
    assert.throws(function () { throw 'fuga'; }, /^hoge$/, 'throwing string then assert that using regex');
});
