if ( typeof exports !== "undefined" || typeof require !== "undefined" ) {
    require("../test_helper");
    xx = require("../lib/math");
    equals = assert.equal;
    puts("1..5");
}

QUnit.module("math module");

QUnit.test('add' , function() {
         var add = xx.add;
         equals(add(1, 4), 5);
         equals(add(-3, 2), -1);
         equals(add(1, 3, 4), 8, 'passing 3 args');
         equals(add(2), 2, 'just one arg');
         equals(add(), 0, 'no args');
     });
