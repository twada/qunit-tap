module("TAP spec compliance");

test('Diagnostic lines' , function() {
         expect(3);
         ok(true, "with\r\nmultiline\nmessage");
         equal("foo\nbar", "foo\r\nbar", "with\r\nmultiline\nmessage");
         equal("foo\r\nbar", "foo\nbar", "with\r\nmultiline\nmessage");
     });
