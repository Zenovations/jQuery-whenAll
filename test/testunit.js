
(function($) {

   module('jQuery.whenAll');

   asyncTest('#whenAll, rejection', function() {
      expect(2);
      var expected = [], promises = [
         _def(expected, 'resolve', 1),
         _def(expected, 'reject', false),
         _def(expected, 'resolve', true, 100)
      ];

      jQuery.whenAll(promises)
         .done(function() { ok(false, 'should not resolve'); })
         .fail(function() { ok(true, 'should reject'); })
         .always(function(results) {
            deepEqual(results, expected);
         });
      start();
   });

   asyncTest('#whenAll, no values', function() {
      start();
   });

   asyncTest('#whenAll, no deferreds', function() {
      start();
   });

   asyncTest('#whenAll, various falsys', function() {
      start();
   });

   asyncTest('#whenAllExpires', function() {
      start();
   });

   asyncTest('#whenAllExpires, rejection', function() {
      start();
   });

   asyncTest('#whenAllExpires, expired', function() {
      start();
   });

   function _def(expected, result, value, len) {
      if( !len ) { len = 10; }
      expected.push(value);
      return $.Deferred(function(def) {
         _.delay(def[result](value), len);
      })
   }

})(jQuery);

