module("incr module");

test('increment' , function() {
    expect(2);
    var inc = incr.increment;
    equal(inc(1), 2);
    equal(inc(-3), -2);
});
