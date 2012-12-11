
(function($) {

   module('jQuery.whenAll');

   asyncTest('#whenAll, rejection', function() {
      expect(2);
      var expected = [];
      $.whenAll(
               _def(expected, 'resolve', 1),
               _def(expected, 'reject', false),
               _def(expected, 'resolve', true, 100)
            )
            .done(function() { ok(false, 'should not resolve'); })
            .fail(function() { ok(true, 'should reject'); })
            .always(function(results) {
               deepEqual(results, expected);
               start();
            });
   });

   asyncTest('#whenAll, no values', function() {
      expect(2);
      var expected = [];
      $.whenAll()
            .done(function() { ok(true, 'should resolve'); })
            .fail(function() { ok(false, 'should not reject'); })
            .always(function(results) {
               deepEqual(results, expected);
               start();
            });
   });

   asyncTest('#whenAll, no deferreds', function() {
      expect(2);
      var expected = [
         ['resolved', 'a'],
         ['resolved', 'b'],
         ['resolved', true],
         ['resolved', null],
         ['resolved', false],
         ['resolved', 3]
      ];
      $.whenAll('a', 'b', true, null, false, 3)
            .done(function() { ok(true, 'should resolve'); })
            .fail(function() { ok(false, 'should not reject'); })
            .always(function(results) {
               deepEqual(results, expected);
               start();
            });
   });

   asyncTest('#whenAll, progress', function() {
      var progressValues = [];
      $.whenAll(
               true,
               _def(null, 'resolve', 1),
               _def(null, 'reject', false),
               'a',
               _def(null, 'resolve', true, 100)
            )
            .progress(function() {
               progressValues.push($.makeArray(arguments).slice(1));
            })
            .always(function(finalValues) {
               deepEqual(_sort(progressValues), _sort(finalValues));
               start();
            });
   });

   asyncTest('#whenAll, multiple resolve values', function() {
      $.whenAll(
               $.Deferred(function(def) {
                  setTimeout(function() {
                     def.resolve('a', 'b', 'c');
                  }, 50);
               })
            )
            .always(function(results) {
               deepEqual(results, [
                  ['resolved', 'a', 'b', 'c']
               ]);
               start();
            });
   });

   asyncTest('#whenAllExpires', function() {
      $.whenAllExpires(100,
               true,
               $.Deferred().reject(),
               $.Deferred()
            )
            .always(function(results) {
               deepEqual(results, [ ['resolved', true], ['rejected'], ['expired'] ]);
               start();
            });
   });

   asyncTest('#whenAllExpires, rejection', function() {
      $.whenAllExpires(100,
               true,
               $.Deferred(function(def) {
                  setTimeout(def.reject, 10);
               })
            )
            .always(function(results) {
               deepEqual(results, [ ['resolved', true], ['rejected'] ]);
               start();
            });
   });

   asyncTest('#whenAllExpires, progress', function() {
      var progressValues = [];
      $.whenAll(
               true,
               _def(null, 'resolve', 1),
               _def(null, 'reject', false),
               'a',
               _def(null, 'resolve', true, 100)
            )
            .progress(function() {
               progressValues.push($.makeArray(arguments).slice(1));
            })
            .always(function(finalValues) {
               deepEqual(_sort(progressValues), _sort(finalValues));
               start();
            });
   });

   asyncTest('#whenAll, multiple resolve values', function() {
      $.whenAll(
               $.Deferred(function(def) { def.resolve('a', 'b', 'c'); }).promise()
            )
            .always(function(results) {
               deepEqual(results, [
                  ['resolved', 'a', 'b', 'c']
               ]);
               start();
            });
   });

   function _def(expected, result, value, len) {
      if( !len ) { len = 50; }
      expected && expected.push([_doneStatus(result), value]);
      return $.Deferred(function(def) {
         _.delay(function() { def[result](value) }, len);
      })
   }

   function _doneStatus(result) {
      switch(result) {
         case 'resolve':
            return 'resolved';
         case 'reject':
            return 'rejected';
         case 'expired':
            return 'expired';
         default:
            throw new Error('invalid result type: '+result);
      }
   }

   function _sort(vals) {
      return _.sortBy(vals, function(v) { return v.join('|'); });
   }

})(jQuery);

