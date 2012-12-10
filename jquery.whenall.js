
(function($) {

   // inspired by @InfinitiesLoop comment here:
   // http://stackoverflow.com/questions/5573165/raising-jquery-deferred-then-once-all-deferred-objects-have-been-resolved
   jQuery.extend({
      whenAll: function(firstParam) {
         return whenAllFx(0, jQuery.makeArray(arguments));
      },

      whenAllExpires: function(expires, firstParam) {
         return whenAllFx(expires, jQuery.makeArray(arguments));
      }
   });

   function whenAllFx(expires, args) {
      var def = jQuery.Deferred();
      var failed = false;
      var results = [];
      var to;

      if (expires) {
         to = setTimeout(function() {
            def.reject('expired', results.slice(0), args);
         }, expires);
      }

      function next(remainingArgs) {
         if (remainingArgs.length) {
            var arg = remainingArgs.shift();
            results.push(arg);
            jQuery.when(arg).fail(function() {
               failed = true;
            }).always(function() {
                  next(remainingArgs);
               });
         }
         else {
            to && clearTimeout(to);
            if (failed) {
               def.reject(results);
            }
            else {
               def.resolve(results);
            }
         }
      }

      next(args.slice(0));

      return def.promise();
   }

})(jQuery);
