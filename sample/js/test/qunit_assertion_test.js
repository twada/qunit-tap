module("QUnit Assertions");

test('equal' , function() {
    equal('1', 1, "equal('1', 1)");
    equal(null, 'null', "equal(null, 'null')");
    equal(undefined, 'undefined', "equal(undefined, 'undefined')");
    equal(null, undefined, "equal(null, undefined)");
    equal(undefined, null, "equal(undefined, null)");
    equal(undefined, undefined, "equal(undefined, undefined)");
});

test('strictEqual' , function() {
    strictEqual(0, '0', "strictEqual(0, '0')");
    strictEqual('1', 1, "strictEqual('1', 1)");
    strictEqual(null, undefined, "strictEqual(null, undefined)");
    strictEqual(undefined, null, "strictEqual(undefined, null)");
    strictEqual(undefined, undefined, "strictEqual(undefined, undefined)");
});

test('deepEqual' , function() {
    deepEqual(undefined, undefined, "deepEqual(undefined, undefined)");
    deepEqual(['1', '2'], [1, 2], "deepEqual(['1', '2'], [1, 2])");
    deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'}, "deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'})");
});

test('ok' , function() {
    ok(null, "ok(null)");
    ok(undefined, "ok(undefined)");
    ok(1, "ok(1)");
    ok(0, "ok(0)");
    ok('', "ok('')");
    ok([], "ok([])");
    ok({}, "ok({})");
});
