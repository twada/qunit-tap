module("TAP spec compliance");

test('Diagnostic lines' , function() {
         ok(true, "with\nmultiline\nmessage");
         equal("foo\nbar", "foobar\n", "with\nmultiline\nmessage");
     });
