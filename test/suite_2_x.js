QUnit.module("math module");
QUnit.test('add' , function(assert) {
    var add = math.add;
    assert.equal(add(1, 4), 5);
    assert.equal(add(-3, 2), -1, '');
    assert.equal(add(1, 3, 4), 8, 'passing 3 args');
    assert.equal(add(2), 2, 'just one arg');
    assert.equal(add(), 0, 'no args');

    assert.equal(add(-3, 4), 7);
    assert.equal(add(-3, 4), 7, 'with message');

    assert.ok(true);
    assert.ok(true, 'with message');
    assert.ok(false);
    assert.ok(false, 'with message');
});

QUnit.module("incr module");
QUnit.test('increment' , function(assert) {
    var inc = incr.increment;
    assert.equal(inc(1), 2);
    assert.equal(inc(-3), -2);
});

QUnit.module("TAP spec compliance");
QUnit.test('Diagnostic lines' , function(assert) {
    assert.ok(true, "with\nmultiline\nmessage");
    assert.equal("foo\nbar", "foobar\n", "with\nmultiline\nmessage");
    tap.unsubscribe('moduleStart');
});

QUnit.module("QUnit Assertions");
QUnit.test('equal' , function(assert) {
    assert.equal('1', 1, "equal('1', 1)");
    assert.equal(null, 'null', "equal(null, 'null')");
    assert.equal(undefined, 'undefined', "equal(undefined, 'undefined')");
    assert.equal(null, undefined, "equal(null, undefined)");
    assert.equal(undefined, null, "equal(undefined, null)");
    assert.equal(undefined, undefined, "equal(undefined, undefined)");
});
QUnit.test('strictEqual' , function(assert) {
    assert.strictEqual(0, '0', "strictEqual(0, '0')");
    assert.strictEqual('1', 1, "strictEqual('1', 1)");
    assert.strictEqual(null, undefined, "strictEqual(null, undefined)");
    assert.strictEqual(undefined, null, "strictEqual(undefined, null)");
    assert.strictEqual(undefined, undefined, "strictEqual(undefined, undefined)");
});
QUnit.test('deepEqual' , function(assert) {
    assert.deepEqual(undefined, undefined, "deepEqual(undefined, undefined)");
    assert.deepEqual(['1', '2'], [1, 2], "deepEqual(['1', '2'], [1, 2])");
    assert.deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'}, "deepEqual({foo: 'hoge', bar: 'piyo'}, {foo: 'fuga', baz: 'piyo'})");
    tap.unsubscribe('testStart');
});
QUnit.test('ok' , function(assert) {
    assert.ok(null, "ok(null)");
    assert.ok(undefined, "ok(undefined)");
    assert.ok(1, "ok(1)");
    assert.ok(0, "ok(0)");
    assert.ok('', "ok('')");
    assert.ok([], "ok([])");
    assert.ok({}, "ok({})");
});
