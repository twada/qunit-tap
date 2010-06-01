(function(ns) {
     var math;
     if ( typeof exports !== "undefined" || typeof require !== "undefined" ) {
         math = require('./math');
     } else {
         math = ns;
     }

     ns.increment = function(val) {
         return math.add(val, 1);
     };
 })((typeof(exports) !== "undefined") ? exports : (this.xx || this));
