
# jQuery.whenAll

Wait for all jQuery Deferred objects to resolve or reject, or for a specific time in milliseconds to expire.

Once all items have resolved or expired, the results are returned as an array with all of the resolved/rejected values. Each time a deferred is rejected or resolved, the progress method is called with the results.

To see an example of the behavior achieved by this plugin, [check out this jsfiddle][1].

## Installation

You must have jQuery 1.8.2 or greater (with Deferred and Deferred.state() support)

Include jQuery and the whenAll plugin:

      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
      <script type="text/javascript" src="jquery.whenall.js"></script>

## Usage

Call `whenAll` to wait for all objects to resolve:

      jQuery.whenAll(
              $.get( URL1 ),
              $.get( URL2 ),
              $.Deferred(function(def) { setTimeout(def.reject, 100); }),
              true,
              null,
              false,
              25,
              { hello: 'world' }
         )
         .progress(function(index, status, value) {
            // called once for each argument passed to whenAll, as soon as the promise fulfills
            console.log('deferred '+index+' '+status+' with value '+value);
         })
         .then(
            function(results) { /* all tests succeeded */ },
            function(results) { /* all tests done, one or more failed */ }
         )
         .always(function(results) { /* called whether they succeed or fail */ });

Call `whenAllExpires` to wait for all arguments to fulfill or give up after a certain number of milliseconds:

      jQuery.whenAllExpires(
               5000, // any promises not fulfilled in 5 seconds are rejected with 'expired' status
               $.get( URL1 ),
               $.get( URL2 )
            )
            .progress( ... )
            .then( ... )
            .done( ... )
            .fail( ... )
            .always( ... );

For more examples, see test/test.html

## API

### jQuery.whenAll( possiblePromises... )

@param {*} `possiblePromises` one or more returned values, any of which may be a promise

If an argument is not a promise, it is treated as a successfully resolved promise and immediately resolved.
If an argument contains a promise, then whenAll waits for it to reject or resolve.

The `then`, `done`, `fail`, and `always` methods are called the same as they would after a normal `jQuery.when`.
However, failures do not cause whenAll to end right away. Instead, it waits for all arguments to complete before
calling the reject listeners.

Additionally, the `progress` function is called after each deferred or value is fulfilled. It receives three arguments:
   {int} index: the number of the argument passed to `whenAll`, starting from zero
   {string} status: one of `resolved` or `rejected`
   {*} values: any arguments to resolve or reject are passed here in the same order, after the status


### jQuery.whenAllExpires( milliseconds, possiblePromises... )

@param {int} `milliseconds` any promises not fulfilled before this many milliseconds are rejected with an 'expired' status
@param {*} `possiblePromises` one or more returned values, any of which may be a promise

This behaves exactly like whenAll, except that the additional status `expired` may be returned in lieu of `resolved` or `rejected`

    [1]: http://jsfiddle.net/katowulf/grdFU/

## Contributing

Include test units in test/testunit.js (or add another js file).
Make sure all test units pass.
Create a min version using [Dean Edwards's Packr](http://dean.edwards.name/packer/)
Create a pull request in GitHub

## Support

Visit the [GitHub Issue Tracker]()

## License

The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

