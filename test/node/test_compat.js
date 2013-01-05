var helper = require("./test_helper").helper,
    q = helper.QUnit,
    starter = helper.starter;
var inc = require("../../sample/commonjs/lib/incr").increment,
    math = require("../../sample/commonjs/lib/math"),
    add = math.add;

q.module("math module");
q.test('add' , function() {
    q.equal(add(1, 4), 5);
    q.equal(add(-3, 2), -1, '');
    q.equal(add(1, 3, 4), 8, 'passing 3 args');
    q.equal(add(2), 2, 'just one arg');
    q.equal(add(), 0, 'no args');

    q.equal(add(-3, 4), 7);
    q.equal(add(-3, 4), 7, 'with message');

    q.ok(true);
    q.ok(true, 'with message');
    q.ok(false);
    q.ok(false, 'with message');
});

q.module("incr module");
q.test('increment' , function() {
    q.equal(inc(1), 2);
    q.equal(inc(-3), -2);
});

q.module("TAP spec compliance");
q.test('Diagnostic lines' , function() {
    q.ok(true, "with\nmultiline\nmessage");
    q.equal("foo\nbar", "foobar\n", "with\nmultiline\nmessage");
});

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

starter();
