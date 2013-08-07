QUnit.module("math module");
QUnit.test('add' , function() {
    var add = math.add;
    QUnit.equal(add(1, 4), 5);
    QUnit.equal(add(-3, 2), -1, '');
    QUnit.equal(add(1, 3, 4), 8, 'passing 3 args');
    QUnit.equal(add(2), 2, 'just one arg');
    QUnit.equal(add(), 0, 'no args');

    QUnit.equal(add(-3, 4), 7);
    QUnit.equal(add(-3, 4), 7, 'with message');

    QUnit.ok(true);
    QUnit.ok(true, 'with message');
    QUnit.ok(false);
    QUnit.ok(false, 'with message');
});

QUnit.module("incr module");
QUnit.test('increment' , function() {
    var inc = incr.increment;
    QUnit.equal(inc(1), 2);
    QUnit.equal(inc(-3), -2);
});

QUnit.module("TAP spec compliance");
QUnit.test('Diagnostic lines' , function() {
    QUnit.ok(true, "with\nmultiline\nmessage");
    QUnit.equal("foo\nbar", "foobar\n", "with\nmultiline\nmessage");
});

QUnit.module("QUnit Assertions");
QUnit.test('equal' , function() {
    QUnit.equal('1', 1, "equal('1', 1)");
    QUnit.equal(null, 'null', "equal(null, 'null')");
    QUnit.equal(undefined, 'undefined', "equal(undefined, 'undefined')");
    QUnit.equal(null, undefined, "equal(null, undefined)");
    QUnit.equal(undefined, null, "equal(undefined, null)");
    QUnit.equal(undefined, undefined, "equal(undefined, undefined)");
});
QUnit.test('strictEqual' , function() {
    QUnit.strictEqual(0, '0', "strictEqual(0, '0')");
    QUnit.strictEqual('1', 1, "strictEqual('1', 1)");
    QUnit.strictEqual(null, undefined, "strictEqual(null, undefined)");
    QUnit.strictEqual(undefined, null, "strictEqual(undefined, null)");
    QUnit.strictEqual(undefined, undefined, "strictEqual(undefined, undefined)");
});
QUnit.test('deepEqual' , function() {
    QUnit.deepEqual(undefined, undefined, "deepEqual(undefined, undefined)");
    QUnit.deepEqual(['1', '2'], [1, 2], "deepEqual(['1', '2'], [1, 2])");
    QUnit.deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'}, "deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'})");
});
QUnit.test('ok' , function() {
    QUnit.ok(null, "ok(null)");
    QUnit.ok(undefined, "ok(undefined)");
    QUnit.ok(1, "ok(1)");
    QUnit.ok(0, "ok(0)");
    QUnit.ok('', "ok('')");
    QUnit.ok([], "ok([])");
    QUnit.ok({}, "ok({})");
});
