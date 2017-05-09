webpackJsonp([4],{

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(142);
var app = angular.module("app.public", []);
const nav_component_1 = __webpack_require__(178);
app.component('eqNav', new nav_component_1.NavComponent());
module.exports = app;

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(142);
const demo_component_1 = __webpack_require__(181);
var app = angular.module("demo.queryBuilder", []);
app.component('demoComponent', new demo_component_1.DemoComponent());
module.exports = app;

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(142);
const query_builder_component_1 = __webpack_require__(179);
const tags_component_1 = __webpack_require__(182);
const query_conditions_1 = __webpack_require__(170);
const query_interface_1 = __webpack_require__(172);
exports.app = angular.module("app.queryBuilder", []);
exports.app.constant('QUERY_OPERATORS', query_conditions_1.QUERY_OPERATORS);
exports.app.constant('QUERY_CONDITIONS', query_conditions_1.QUERY_CONDITIONS);
exports.app.constant('QUERY_INTERFACE', query_interface_1.QUERY_INTERFACE);
exports.app.component('queryBuilder', new query_builder_component_1.QueryBuilder());
exports.app.component('qbTags', new tags_component_1.TagsComponent());
module.exports = exports.app;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY_OPERATORS = [{ name: 'AND' }, { name: 'OR' }];
exports.QUERY_CONDITIONS = {
    EQUAL: {
        name: "Equal",
        value: "EQ",
        symbol: ["equal", "==", "=", "<=>"]
    },
    NOT_EQUAL: {
        name: "Not Equal",
        value: "NE",
        symbol: ["not_equal", "not equal", "!==", "!=", "<>"]
    },
    GREATER_THAN: {
        name: "Greater Than",
        value: "GT",
        symbol: ["greater_than", ">"]
    },
    GREATER_EQUAL: {
        name: "Greater or Equal",
        value: "GE",
        symbol: ["greater_or_equal", ">="]
    },
    LESS_THAN: {
        name: "Less Than",
        value: "LT",
        symbol: ["less_than", "<"]
    },
    LESS_EQUAL: {
        name: "Less or Equal",
        value: "LE",
        symbol: ["less_or_equal", "<="]
    },
    IN: {
        name: "In",
        value: "IN",
        symbol: "IN"
    },
    BETWEEN: {
        name: "Between",
        value: "BETWEEN",
        symbol: "BETWEEN"
    },
    CONTAINS: {
        name: "Contains",
        value: "CONTAINS",
        symbol: ["contains", "LIKE `%{{VALUES}}%`"]
    },
    NOT_CONTAINS: {
        name: "Not Contains",
        value: "NOT_CONTAINS",
        symbol: ["not_contains", "NOT CONTAINS", "NOT LIKE `%{{VALUES}}%`"]
    },
    STARTS_WITH: {
        name: "Starts With",
        value: "STARTS_WITH",
        symbol: ["starts_with", "STARTS WITH", "LIKE `%{{VALUES}}`"]
    },
    ENDS_WITH: {
        name: "Ends With",
        value: "ENDS_WITH",
        symbol: ["ends_with", "ENDS WITH", "LIKE `{{VALUES}}%`"]
    }
};

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, (function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    }));
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, (function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    }));
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, (function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      }));
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, (function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      }));
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, (function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    })).sort((function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    })), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, (function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      }));
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group((function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  }));

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group((function(result, value, key) {
    result[key] = value;
  }));

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group((function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  }));

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, (function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    }));
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, (function(value){
      return !_.contains(rest, value);
    }));
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout((function(){
      return func.apply(null, args);
    }), wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], (function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  }));

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, (function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    }));
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), (function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    }));
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], (function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  }));

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], (function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  }));

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY_INTERFACE = Object.freeze({
    "type": "group",
    "op": "AND",
    "expressions": [{
        "type": "condition",
        "field": {
            "name": "",
            "description": ""
        },
        "operator": "EQ",
        "values": []
    }]
});

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(171), __webpack_require__(141), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, (function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once((function() {
        self.off(name, once);
        callback.apply(this, arguments);
      }));
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, (function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  }));

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, (function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  }));

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map((function(model){ return model.toJSON(options); }));
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter']((function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      }));
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, (function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  }));

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, (function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  }));

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, (function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      }));
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, (function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   }))
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, (function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      }));
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, (function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      }));
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

})));


/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {(function ($) {
  "use strict";

  var defaultOptions = {
    tagClass: function(item) {
      return 'label label-info';
    },
    focusClass: 'focus',
    itemValue: function(item) {
      return item ? item.toString() : item;
    },
    itemText: function(item) {
      return this.itemValue(item);
    },
    itemTitle: function(item) {
      return null;
    },
    freeInput: true,
    addOnBlur: true,
    maxTags: undefined,
    maxChars: undefined,
    confirmKeys: [13, 44],
    delimiter: ',',
    delimiterRegex: null,
    cancelConfirmKeysOnEmpty: false,
    onTagExists: function(item, $tag) {
      $tag.hide().fadeIn();
    },
    trimValue: false,
    allowDuplicates: false,
    triggerChange: true
  };

  /**
   * Constructor function
   */
  function TagsInput(element, options) {
    this.isInit = true;
    this.itemsArray = [];

    this.$element = $(element);
    this.$element.hide();

    this.isSelect = (element.tagName === 'SELECT');
    this.multiple = (this.isSelect && element.hasAttribute('multiple'));
    this.objectItems = options && options.itemValue;
    this.placeholderText = element.hasAttribute('placeholder') ? this.$element.attr('placeholder') : '';
    this.inputSize = Math.max(1, this.placeholderText.length);

    this.$container = $('<div class="bootstrap-tagsinput"></div>');
    this.$input = $('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container);

    this.$element.before(this.$container);

    this.build(options);
    this.isInit = false;
  }

  TagsInput.prototype = {
    constructor: TagsInput,

    /**
     * Adds the given item as a new tag. Pass true to dontPushVal to prevent
     * updating the elements val()
     */
    add: function(item, dontPushVal, options) {
      var self = this;

      if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
        return;

      // Ignore falsey values, except false
      if (item !== false && !item)
        return;

      // Trim value
      if (typeof item === "string" && self.options.trimValue) {
        item = $.trim(item);
      }

      // Throw an error when trying to add an object while the itemValue option was not set
      if (typeof item === "object" && !self.objectItems)
        throw("Can't add objects when itemValue option is not set");

      // Ignore strings only containg whitespace
      if (item.toString().match(/^\s*$/))
        return;

      // If SELECT but not multiple, remove current tag
      if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
        self.remove(self.itemsArray[0]);

      if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
        var delimiter = (self.options.delimiterRegex) ? self.options.delimiterRegex : self.options.delimiter;
        var items = item.split(delimiter);
        if (items.length > 1) {
          for (var i = 0; i < items.length; i++) {
            this.add(items[i], true);
          }

          if (!dontPushVal)
            self.pushVal(self.options.triggerChange);
          return;
        }
      }

      var itemValue = self.options.itemValue(item),
          itemText = self.options.itemText(item),
          tagClass = self.options.tagClass(item),
          itemTitle = self.options.itemTitle(item);

      // Ignore items allready added
      var existing = $.grep(self.itemsArray, (function(item) { return self.options.itemValue(item) === itemValue; }) )[0];
      if (existing && !self.options.allowDuplicates) {
        // Invoke onTagExists
        if (self.options.onTagExists) {
          var $existingTag = $(".tag", self.$container).filter((function() { return $(this).data("item") === existing; }));
          self.options.onTagExists(item, $existingTag);
        }
        return;
      }

      // if length greater than limit
      if (self.items().toString().length + item.length + 1 > self.options.maxInputLength)
        return;

      // raise beforeItemAdd arg
      var beforeItemAddEvent = $.Event('beforeItemAdd', { item: item, cancel: false, options: options});
      self.$element.trigger(beforeItemAddEvent);
      if (beforeItemAddEvent.cancel)
        return;

      // register item in internal array and map
      self.itemsArray.push(item);

      // add a tag element

      var $tag = $('<span class="tag ' + htmlEncode(tagClass) + (itemTitle !== null ? ('" title="' + itemTitle) : '') + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
      $tag.data('item', item);
      self.findInputWrapper().before($tag);
      $tag.after(' ');

      // Check to see if the tag exists in its raw or uri-encoded form
      var optionExists = (
        $('option[value="' + encodeURIComponent(itemValue) + '"]', self.$element).length ||
        $('option[value="' + htmlEncode(itemValue) + '"]', self.$element).length
      );

      // add <option /> if item represents a value not present in one of the <select />'s options
      if (self.isSelect && !optionExists) {
        var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
        $option.data('item', item);
        $option.attr('value', itemValue);
        self.$element.append($option);
      }

      if (!dontPushVal)
        self.pushVal(self.options.triggerChange);

      // Add class when reached maxTags
      if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength)
        self.$container.addClass('bootstrap-tagsinput-max');

      // If using typeahead, once the tag has been added, clear the typeahead value so it does not stick around in the input.
      if ($('.typeahead, .twitter-typeahead', self.$container).length) {
        self.$input.typeahead('val', '');
      }

      if (this.isInit) {
        self.$element.trigger($.Event('itemAddedOnInit', { item: item, options: options }));
      } else {
        self.$element.trigger($.Event('itemAdded', { item: item, options: options }));
      }
    },

    /**
     * Removes the given item. Pass true to dontPushVal to prevent updating the
     * elements val()
     */
    remove: function(item, dontPushVal, options) {
      var self = this;

      if (self.objectItems) {
        if (typeof item === "object")
          item = $.grep(self.itemsArray, (function(other) { return self.options.itemValue(other) ==  self.options.itemValue(item); }) );
        else
          item = $.grep(self.itemsArray, (function(other) { return self.options.itemValue(other) ==  item; }) );

        item = item[item.length-1];
      }

      if (item) {
        var beforeItemRemoveEvent = $.Event('beforeItemRemove', { item: item, cancel: false, options: options });
        self.$element.trigger(beforeItemRemoveEvent);
        if (beforeItemRemoveEvent.cancel)
          return;

        $('.tag', self.$container).filter((function() { return $(this).data('item') === item; })).remove();
        $('option', self.$element).filter((function() { return $(this).data('item') === item; })).remove();
        if($.inArray(item, self.itemsArray) !== -1)
          self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
      }

      if (!dontPushVal)
        self.pushVal(self.options.triggerChange);

      // Remove class when reached maxTags
      if (self.options.maxTags > self.itemsArray.length)
        self.$container.removeClass('bootstrap-tagsinput-max');

      self.$element.trigger($.Event('itemRemoved',  { item: item, options: options }));
    },

    /**
     * Removes all items
     */
    removeAll: function() {
      var self = this;

      $('.tag', self.$container).remove();
      $('option', self.$element).remove();

      while(self.itemsArray.length > 0)
        self.itemsArray.pop();

      self.pushVal(self.options.triggerChange);
    },

    /**
     * Refreshes the tags so they match the text/value of their corresponding
     * item.
     */
    refresh: function() {
      var self = this;
      $('.tag', self.$container).each((function() {
        var $tag = $(this),
            item = $tag.data('item'),
            itemValue = self.options.itemValue(item),
            itemText = self.options.itemText(item),
            tagClass = self.options.tagClass(item);

          // Update tag's class and inner text
          $tag.attr('class', null);
          $tag.addClass('tag ' + htmlEncode(tagClass));
          $tag.contents().filter((function() {
            return this.nodeType == 3;
          }))[0].nodeValue = htmlEncode(itemText);

          if (self.isSelect) {
            var option = $('option', self.$element).filter((function() { return $(this).data('item') === item; }));
            option.attr('value', itemValue);
          }
      }));
    },

    /**
     * Returns the items added as tags
     */
    items: function() {
      return this.itemsArray;
    },

    /**
     * Assembly value by retrieving the value of each item, and set it on the
     * element.
     */
    pushVal: function() {
      var self = this,
          val = $.map(self.items(), (function(item) {
            return self.options.itemValue(item).toString();
          }));

      self.$element.val(val, true);

      if (self.options.triggerChange)
        self.$element.trigger('change');
    },

    /**
     * Initializes the tags input behaviour on the element
     */
    build: function(options) {
      var self = this;

      self.options = $.extend({}, defaultOptions, options);
      // When itemValue is set, freeInput should always be false
      if (self.objectItems)
        self.options.freeInput = false;

      makeOptionItemFunction(self.options, 'itemValue');
      makeOptionItemFunction(self.options, 'itemText');
      makeOptionFunction(self.options, 'tagClass');

      // Typeahead Bootstrap version 2.3.2
      if (self.options.typeahead) {
        var typeahead = self.options.typeahead || {};

        makeOptionFunction(typeahead, 'source');

        self.$input.typeahead($.extend({}, typeahead, {
          source: function (query, process) {
            function processItems(items) {
              var texts = [];

              for (var i = 0; i < items.length; i++) {
                var text = self.options.itemText(items[i]);
                map[text] = items[i];
                texts.push(text);
              }
              process(texts);
            }

            this.map = {};
            var map = this.map,
                data = typeahead.source(query);

            if ($.isFunction(data.success)) {
              // support for Angular callbacks
              data.success(processItems);
            } else if ($.isFunction(data.then)) {
              // support for Angular promises
              data.then(processItems);
            } else {
              // support for functions and jquery promises
              $.when(data)
               .then(processItems);
            }
          },
          updater: function (text) {
            self.add(this.map[text]);
            return this.map[text];
          },
          matcher: function (text) {
            return (text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
          },
          sorter: function (texts) {
            return texts.sort();
          },
          highlighter: function (text) {
            var regex = new RegExp( '(' + this.query + ')', 'gi' );
            return text.replace( regex, "<strong>$1</strong>" );
          }
        }));
      }

      // typeahead.js
      if (self.options.typeaheadjs) {
          var typeaheadConfig = null;
          var typeaheadDatasets = {};

          // Determine if main configurations were passed or simply a dataset
          var typeaheadjs = self.options.typeaheadjs;
          if ($.isArray(typeaheadjs)) {
            typeaheadConfig = typeaheadjs[0];
            typeaheadDatasets = typeaheadjs[1];
          } else {
            typeaheadDatasets = typeaheadjs;
          }

          self.$input.typeahead(typeaheadConfig, typeaheadDatasets).on('typeahead:selected', $.proxy((function (obj, datum) {
            if (typeaheadDatasets.valueKey)
              self.add(datum[typeaheadDatasets.valueKey]);
            else
              self.add(datum);
            self.$input.typeahead('val', '');
          }), self));
      }

      self.$container.on('click', $.proxy((function(event) {
        if (! self.$element.attr('disabled')) {
          self.$input.removeAttr('disabled');
        }
        self.$input.focus();
      }), self));

        if (self.options.addOnBlur && self.options.freeInput) {
          self.$input.on('focusout', $.proxy((function(event) {
              // HACK: only process on focusout when no typeahead opened, to
              //       avoid adding the typeahead text as tag
              if ($('.typeahead, .twitter-typeahead', self.$container).length === 0) {
                self.add(self.$input.val());
                self.$input.val('');
              }
          }), self));
        }

      // Toggle the 'focus' css class on the container when it has focus
      self.$container.on({
        focusin: function() {
          self.$container.addClass(self.options.focusClass);
        },
        focusout: function() {
          self.$container.removeClass(self.options.focusClass);
        },
      });

      self.$container.on('keydown', 'input', $.proxy((function(event) {
        var $input = $(event.target),
            $inputWrapper = self.findInputWrapper();

        if (self.$element.attr('disabled')) {
          self.$input.attr('disabled', 'disabled');
          return;
        }

        switch (event.which) {
          // BACKSPACE
          case 8:
            if (doGetCaretPosition($input[0]) === 0) {
              var prev = $inputWrapper.prev();
              if (prev.length) {
                self.remove(prev.data('item'));
              }
            }
            break;

          // DELETE
          case 46:
            if (doGetCaretPosition($input[0]) === 0) {
              var next = $inputWrapper.next();
              if (next.length) {
                self.remove(next.data('item'));
              }
            }
            break;

          // LEFT ARROW
          case 37:
            // Try to move the input before the previous tag
            var $prevTag = $inputWrapper.prev();
            if ($input.val().length === 0 && $prevTag[0]) {
              $prevTag.before($inputWrapper);
              $input.focus();
            }
            break;
          // RIGHT ARROW
          case 39:
            // Try to move the input after the next tag
            var $nextTag = $inputWrapper.next();
            if ($input.val().length === 0 && $nextTag[0]) {
              $nextTag.after($inputWrapper);
              $input.focus();
            }
            break;
         default:
             // ignore
         }

        // Reset internal input's size
        var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
        $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }), self));

      self.$container.on('keypress', 'input', $.proxy((function(event) {
         var $input = $(event.target);

         if (self.$element.attr('disabled')) {
            self.$input.attr('disabled', 'disabled');
            return;
         }

         var text = $input.val(),
         maxLengthReached = self.options.maxChars && text.length >= self.options.maxChars;
         if (self.options.freeInput && (keyCombinationInList(event, self.options.confirmKeys) || maxLengthReached)) {
            // Only attempt to add a tag if there is data in the field
            if (text.length !== 0) {
               self.add(maxLengthReached ? text.substr(0, self.options.maxChars) : text);
               $input.val('');
            }

            // If the field is empty, let the event triggered fire as usual
            if (self.options.cancelConfirmKeysOnEmpty === false) {
                event.preventDefault();
            }
         }

         // Reset internal input's size
         var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
         $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }), self));

      // Remove icon clicked
      self.$container.on('click', '[data-role=remove]', $.proxy((function(event) {
        if (self.$element.attr('disabled')) {
          return;
        }
        self.remove($(event.target).closest('.tag').data('item'));
      }), self));

      // Only add existing value as tags when using strings as tags
      if (self.options.itemValue === defaultOptions.itemValue) {
        if (self.$element[0].tagName === 'INPUT') {
            self.add(self.$element.val());
        } else {
          $('option', self.$element).each((function() {
            self.add($(this).attr('value'), true);
          }));
        }
      }
    },

    /**
     * Removes all tagsinput behaviour and unregsiter all event handlers
     */
    destroy: function() {
      var self = this;

      // Unbind events
      self.$container.off('keypress', 'input');
      self.$container.off('click', '[role=remove]');

      self.$container.remove();
      self.$element.removeData('tagsinput');
      self.$element.show();
    },

    /**
     * Sets focus on the tagsinput
     */
    focus: function() {
      this.$input.focus();
    },

    /**
     * Returns the internal input element
     */
    input: function() {
      return this.$input;
    },

    /**
     * Returns the element which is wrapped around the internal input. This
     * is normally the $container, but typeahead.js moves the $input element.
     */
    findInputWrapper: function() {
      var elt = this.$input[0],
          container = this.$container[0];
      while(elt && elt.parentNode !== container)
        elt = elt.parentNode;

      return $(elt);
    }
  };

  /**
   * Register JQuery plugin
   */
  $.fn.tagsinput = function(arg1, arg2, arg3) {
    var results = [];

    this.each((function() {
      var tagsinput = $(this).data('tagsinput');
      // Initialize a new tags input
      if (!tagsinput) {
          tagsinput = new TagsInput(this, arg1);
          $(this).data('tagsinput', tagsinput);
          results.push(tagsinput);

          if (this.tagName === 'SELECT') {
              $('option', $(this)).attr('selected', 'selected');
          }

          // Init tags from $(this).val()
          $(this).val($(this).val());
      } else if (!arg1 && !arg2) {
          // tagsinput already exists
          // no function, trying to init
          results.push(tagsinput);
      } else if(tagsinput[arg1] !== undefined) {
          // Invoke function on existing tags input
            if(tagsinput[arg1].length === 3 && arg3 !== undefined){
               var retVal = tagsinput[arg1](arg2, null, arg3);
            }else{
               var retVal = tagsinput[arg1](arg2);
            }
          if (retVal !== undefined)
              results.push(retVal);
      }
    }));

    if ( typeof arg1 == 'string') {
      // Return the results from the invoked function calls
      return results.length > 1 ? results : results[0];
    } else {
      return results;
    }
  };

  $.fn.tagsinput.Constructor = TagsInput;

  /**
   * Most options support both a string or number as well as a function as
   * option value. This function makes sure that the option with the given
   * key in the given options is wrapped in a function
   */
  function makeOptionItemFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var propertyName = options[key];
      options[key] = function(item) { return item[propertyName]; };
    }
  }
  function makeOptionFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var value = options[key];
      options[key] = function() { return value; };
    }
  }
  /**
   * HtmlEncodes the given value
   */
  var htmlEncodeContainer = $('<div />');
  function htmlEncode(value) {
    if (value) {
      return htmlEncodeContainer.text(value).html();
    } else {
      return '';
    }
  }

  /**
   * Returns the position of the caret in the given input field
   * http://flightschool.acylt.com/devnotes/caret-position-woes/
   */
  function doGetCaretPosition(oField) {
    var iCaretPos = 0;
    if (document.selection) {
      oField.focus ();
      var oSel = document.selection.createRange();
      oSel.moveStart ('character', -oField.value.length);
      iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart == '0') {
      iCaretPos = oField.selectionStart;
    }
    return (iCaretPos);
  }

  /**
    * Returns boolean indicates whether user has pressed an expected key combination.
    * @param object keyPressEvent: JavaScript event object, refer
    *     http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    * @param object lookupList: expected key combinations, as in:
    *     [13, {which: 188, shiftKey: true}]
    */
  function keyCombinationInList(keyPressEvent, lookupList) {
      var found = false;
      $.each(lookupList, (function (index, keyCombination) {
          if (typeof (keyCombination) === 'number' && keyPressEvent.which === keyCombination) {
              found = true;
              return false;
          }

          if (keyPressEvent.which === keyCombination.which) {
              var alt = !keyCombination.hasOwnProperty('altKey') || keyPressEvent.altKey === keyCombination.altKey,
                  shift = !keyCombination.hasOwnProperty('shiftKey') || keyPressEvent.shiftKey === keyCombination.shiftKey,
                  ctrl = !keyCombination.hasOwnProperty('ctrlKey') || keyPressEvent.ctrlKey === keyCombination.ctrlKey;
              if (alt && shift && ctrl) {
                  found = true;
                  return false;
              }
          }
      }));

      return found;
  }

  /**
   * Initialize tagsinput behaviour on inputs and selects which have
   * data-role=tagsinput
   */
  $((function() {
    $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
  }));
})(__webpack_provided_window_dot_jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(141)))

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
class NavCtrl {
    constructor($element) {
        this.$element = $element;
        $element.addClass('navbar navbar-default navbar-fixed-top').css({ position: 'relative' });
    }
}
NavCtrl.$inject = ['$element'];
class NavComponent {
    constructor() {
        this.template = __webpack_require__(196);
        this.controller = NavCtrl;
    }
}
exports.NavComponent = NavComponent;

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(142);
const query_conditions_1 = __webpack_require__(170);
const query_interface_1 = __webpack_require__(172);
const query_builder_service_1 = __webpack_require__(180);
const QBKEY = "$$QueryBuilder";
String.prototype.replaceAt = function (index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
};
Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) {
                a.splice(j--, 1);
            }
        }
    }
    return a;
};
class QueryBuilderCtrl extends query_builder_service_1.QueryBuilderService {
    constructor($element, $scope) {
        super();
        this.$element = $element;
        this.$scope = $scope;
        this.maxChips = 1;
        this.multi = false;
        this.operators = query_conditions_1.QUERY_OPERATORS;
        this.conditions = [];
        this.$event = "";
        this.$queryString = "";
        this.$trigger = false;
        let self = this;
        Object.keys(query_conditions_1.QUERY_CONDITIONS).forEach((function (k) {
            self.conditions.push(query_conditions_1.QUERY_CONDITIONS[k]);
        }));
    }
    $onInit() {
        if (!this.group) this.group = angular.copy(query_interface_1.QUERY_INTERFACE);
        if (!this.fieldValue) this.fieldValue = 'value';
        if (!this.fieldName) this.fieldName = 'name';
        this.onGroupChange();
    }
    $doCheck() {
        let self = this;
        if (!angular.equals(this.queryString, this.$queryString)) {
            this.$queryString = this.queryString;
            clearTimeout(this.$timeoutPromise);
            this.$timeoutPromise = setTimeout(() => {
                self.$outputUpdate = true;
                let obj = self.parseQuery(self.queryString);
                let group = angular.toJson(obj);
                self.group = JSON.parse(group);
                self.onGroupChange();
                self.$scope.$digest();
            }, 500);
        }
        if (this.$trigger && !angular.equals(this.group, this.$group)) {
            this.$group = angular.copy(this.group);
            this.$trigger = false;
            self.trigger('onUpdate');
        }
    }

    split_string(query) {
        if (!query) return;
        let words = query.trim().split(/ /g);
        let conditions = ["(", ")"];
        let self = this;
        let qArr = [];
        let string = "";
        let operands = [];
        this.conditions.map((function (c) {
            let lowerCase = (Array.isArray(c.symbol) ? c.symbol : [c.symbol]).map(o => {
                return o.toLowerCase();
            });
            conditions = conditions.concat(lowerCase);
        }));
        this.fields.map((function (o) {
            operands.push(o[self.fieldName]);
        }));
        this.operators.map((function (c) {
            let lowerCase = (Array.isArray(c.name) ? c.name : [c.name]).map(o => {
                return o.toLowerCase();
            });
            conditions = conditions.concat(lowerCase);
        }));
        conditions = conditions.unique();
        let wCopy = words.filter(o => {
            return o !== "";
        });
        let _split = () => {
            let cQarr = wCopy.slice(0);
            wCopy.forEach((function (o, i) {
                let regex = /\(|\)/g;
                let m = o.length > 1 ? regex.exec(o) : null;
                if (m) {
                    wCopy.splice(m[0] === "(" ? i : i + 1, 0, m[0]);
                    let string = o.replaceAt(m.index, "");
                    wCopy.splice(m[0] === ")" ? i : i + 1, 1, string);
                }
            }));
            if (wCopy.length !== cQarr.length) _split();
        };
        _split();
        words = wCopy.slice(0);
        let sCount = [];
        let position = 0;
        for (let i = 0; i < words.length; i++) {
            let test = words[i].trim();
            if (["(", ")"].indexOf(test) === -1) {
                string += " " + words[i];
                sCount.push(i);
                if (conditions.indexOf(test.toLowerCase()) > -1) {
                    let isNot = words[i - 1] ? words[i - 1].toUpperCase() === "NOT" : false;
                    let cond = test;
                    if (isNot) {
                        cond = [words[i - 1], test].join(" ");
                        wCopy.splice(i, 1, cond);
                        wCopy.splice(i - 1, 1, QBKEY);
                    }
                    let comp1 = string.replace(cond, "").trim();
                    let comp2 = words[i - 1] ? words[i - 1].trim() : null;
                    if (comp1 && [test, comp2].indexOf(comp1) < 0) {
                        wCopy.splice(i - 1, 1, comp1.trim());
                        sCount.forEach(idx => {
                            if (idx < i - 1) wCopy.splice(idx, 1, QBKEY);
                        });
                    }
                    sCount = [];
                    string = "";
                } else if (operands.indexOf(string.trim()) > -1) {
                    wCopy.splice(i, 1, string.trim());
                    sCount.forEach(idx => {
                        if (idx < i) wCopy.splice(idx, 1, QBKEY);
                    });
                    sCount = [];
                    string = "";
                }
            } else if (test === ")") {
                sCount = [];
                string = "";
            }
            position = i;
        }
        if (string) wCopy.splice(position, 1, string.trim());
        sCount.forEach(idx => {
            if (idx < position) wCopy.splice(idx, 1, QBKEY);
        });
        words = wCopy.filter(o => {
            return o !== QBKEY;
        });
        var i = 0;
        let handler = [];
        string = "";
        do {
            if (words[i]) {
                if (conditions.indexOf(words[i].toLowerCase()) < 0) {
                    let regex = /^and|AND|or|OR$`/g;
                    let cond = regex.exec(words[i]);
                    if (cond) {
                        handler.push(string);
                        handler.push(words[i]);
                    } else {
                        string += " " + words[i];
                    }
                } else if (["(", ")"].indexOf(words[i].trim()) !== -1) {
                    handler.push(string);
                    string = "";
                    handler.push(words[i]);
                } else {
                    let regex = /(["'`])(\\?.)*?\1/g;
                    let value = regex.exec(string);
                    if (value) {
                        handler.push(value.input);
                    } else {
                        handler.push(string);
                    }
                    if (words[i]) handler.push(words[i]);
                    if (handler.length > 3) {
                        qArr = qArr.concat(handler);
                        handler = [];
                    }
                    string = "";
                }
            } else {
                handler.push(string);
            }
            i++;
        } while (i <= words.length);
        qArr = qArr.concat(handler);
        qArr = qArr.filter((function (o) {
            return o !== "";
        }));
        qArr = qArr.map((function (o) {
            return o.trim();
        }));
        return qArr;
    }
    parseQuery(queryString) {
        let self = this;
        let queryArray = this.split_string(queryString);
        let operators = [];
        this.operators.map((function (c) {
            let lowerCase = (Array.isArray(c.name) ? c.name : [c.name]).map(o => {
                return o.toLowerCase();
            });
            operators = operators.concat(lowerCase);
        }));
        let conditions = [];
        Object.keys(query_conditions_1.QUERY_CONDITIONS).forEach((function (k) {
            let symbol = query_conditions_1.QUERY_CONDITIONS[k].symbol;
            conditions.push({
                symbol: Array.isArray(symbol) ? symbol : [symbol],
                value: query_conditions_1.QUERY_CONDITIONS[k].value
            });
        }));
        let newGroup = () => {
            let filters = angular.copy(query_interface_1.QUERY_INTERFACE);
            Object.assign(filters, {
                expressions: []
            });
            return filters;
        };
        let newCondition = exp => {
            let expressions = angular.copy(query_interface_1.QUERY_INTERFACE.expressions[0]);
            let regex = /(["'`])(\\?.)*?\1/g;
            let val = regex.exec(exp[2]);
            let value = val ? exp[2].substring(1, exp[2].length - 1) : exp[2];
            let desc = regex.exec(exp[0]);
            let description = desc ? exp[0].substring(1, exp[0].length - 1) : exp[0];
            Object.assign(expressions, {
                values: [],
                field: self.fields.find((function (o) {
                    return description === o[self.fieldName];
                })),
                operator: conditions.find(o => {
                    return o.symbol.indexOf(exp[1].toLowerCase()) !== -1 || o.symbol.indexOf(exp[1].toUpperCase()) !== -1;
                }).value
            });
            let dataType = expressions.field.hasOwnProperty(this.fieldDatatype) ? expressions.field[this.fieldDatatype] : false;
            let values = this.defineDatatype(dataType, value.split(","));
            values.forEach(v => {
                expressions.values.push(v);
            });
            expressions.values = expressions.values.filter((function (o) {
                return o !== "" && o !== "``";
            }));
            return expressions;
        };
        let group = newGroup();
        let parseIt = (group, arr) => {
            let expressions = [];
            if (!arr) return;
            for (let i = 0; i < arr.length; i++) {
                let txt = arr[i];
                if (txt === "$$QueryBuilder") return;
                if (txt === "(") {
                    let _group = newGroup();
                    group.expressions.push(_group);
                    arr = arr.filter((function (o) {
                        return o !== "$$QueryBuilder";
                    }));
                    let reg = /(\()?(?:[^()]+|\([^)]+\))+(\)?)/;
                    let m = reg.exec(arr.join(" "));
                    if (m) {
                        let balance = m[0].replace(/\(/, "").trim();
                        balance = balance.replaceAt(balance.length - 1, "").trim();
                        let newStr = arr.join(" ").replace(balance, "").replace(/\(\s{1,}\)/, "").trim();
                        arr = ["$$QueryBuilder"].concat(this.split_string(newStr) || []);
                        let handler = this.split_string(balance) || [];
                        handler = handler.filter(o => {
                            return o.trim();
                        });
                        expressions = [];
                        parseIt(_group, handler);
                    }
                } else if (txt === ")") {} else if (operators.indexOf(txt.toLowerCase()) === -1) {
                    expressions.push(txt);
                    if (expressions.length === 3) group.expressions.push(newCondition(expressions));
                } else {
                    group.op = txt;
                    expressions = [];
                }
                arr[i] = "$$QueryBuilder";
            }
        };
        parseIt(group, queryArray);
        return group;
    }
    setOperator(operator) {
        let self = this;
        switch (operator) {
            case query_conditions_1.QUERY_CONDITIONS.IN.value:
                self.multi = true;
                self.maxChips = 9999;
                break;
            case query_conditions_1.QUERY_CONDITIONS.BETWEEN.value:
                self.multi = true;
                self.maxChips = 2;
                break;
            default:
                self.multi = false;
                self.maxChips = 1;
                break;
        }
    }
    safeApply(fn) {
        let scope = this.$scope;
        clearTimeout(this.$digestCycle);
        this.$digestCycle = setTimeout((function () {
            var phase = scope.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && typeof fn === 'function') {
                    fn();
                }
            } else if (!scope.$$phase) {
                scope.$apply(fn);
            }
        }), 0);
    }
    onOperandChange(rule) {
        this.$event = 'onOperandChange';
        this.$outputUpdate = false;
        this.onGroupChange();
    }
    onKeyUp(e, rule) {
        let self = this;
        let evnt = e.originalEvent || e;
        this.$event = 'onKeyUp';
        this.$trigger = true;
        this.$outputUpdate = false;
        this.onPrefetch(evnt, rule).then(e => {
            self.onGroupChange();
        });
    }
    onTagsChange(e) {
        this.$event = 'onTagsChange';
        this.$outputUpdate = false;
        this.onGroupChange();
        this.safeApply();
    }
    onConditionChange(rule, e) {
        this.$event = 'onConditionChange';
        this.setOperator(rule.operator);
        rule.values.splice(this.maxChips);
        this.onGroupChange();
    }

    checkExpressions(group) {
        let self = this;
        let conditions = [];
        let values = [];
        group.expressions.forEach((function (o, i) {
            if (o.type === 'condition') {
                conditions.push(o);
                let hasValue = o.values ? angular.isDefined(o.values[0]) : false;
                let hasOperand = o.field ? o.field[self.fieldValue] : false;
                if (hasValue && hasOperand) values.push(i);
            } else {
                self.checkExpressions(o);
            }
        }));
        if (conditions.length > 0 && values.length === conditions.length) {
            this.AddCondition(group, values[values.length - 1] + 1);
        } else if (conditions.length == 0) {
            this.AddCondition(group, 0);
        }
    }
    onGroupChange(e) {
        clearTimeout(this.$timeoutPromise);
        let self = this;
        this.$event = e || 'onGroupChange';
        this.checkExpressions(this.group);
        this.setFieldsDescription(this.group);
        this.trigger('onUpdate');
    }
    setFieldsDescription(group) {
        let self = this;
        let findBy = self.$outputUpdate ? self.fieldName : self.fieldValue;
        group.expressions.forEach((function (condition, i) {
            if (condition.type === 'condition') {
                let found = self.fields.find((function (o) {
                    return condition.field[findBy] === o[findBy];
                }));
                if (found) Object.assign(condition.field, found);
                let dataType = condition.field.hasOwnProperty(self.fieldDatatype) ? condition.field[self.fieldDatatype] : false;
            } else {
                self.setFieldsDescription(condition);
            }
        }));
    }

    AddCondition(group, idx) {
        let self = this;
        var condition = angular.copy(query_interface_1.QUERY_INTERFACE.expressions[0], {
            $$indeed: self.$countCondition,
            values: []
        });
        if (idx > -1) {
            group.expressions.splice(idx, 0, condition);
        } else {
            group.expressions.push(condition);
        }
    }
    AddGroup(e) {
        this.$event = 'AddGroup';
        this.group.expressions.push(angular.copy(query_interface_1.QUERY_INTERFACE));
    }
    RemoveGroup(e) {
        this.$event = 'RemoveGroup';
        let self = this;
        this.onDelete({
            $event: {
                group: self.group
            }
        });
    }
    RemoveCondition(idx, e) {
        this.$event = 'RemoveCondition';
        let self = this;
        this.$countCondition = 0;
        this.group.expressions.map((function (o) {
            if (o.type === 'condition') self.$countCondition++;
        }));
        if (self.$countCondition === 1) return;
        self.group.expressions.splice(idx, 1);
        this.onGroupChange();
    }
    onDeleteGroup(e) {
        let self = this;
        let gCopy = this.group.expressions.slice(0);
        gCopy.forEach((function (o, i) {
            if (o.$$hashKey === e.group.$$hashKey && o.$$indeed === e.group.$$indeed) self.group.expressions.splice(i, 1);
        }));
        this.onGroupChange();
    }
    onUpdateGroup(e) {
        this.trigger('onUpdate');
    }
    CleanObject() {
        const regex = /\{"type":"condition".*?"values":\[\]\}/g;
        let str = angular.toJson(this.group);
        let m;
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((function (match) {
                try {
                    let obj = JSON.parse("[" + match + "]");
                    obj.forEach((function (o) {
                        if (!o.values.length) {
                            let search = JSON.stringify(o).trim();
                            let re = str.split(search);
                            str = re.join("");
                        }
                    }));
                } catch (e) {}
            }));
        }
        str = str.replace(/,\]/g, "]").replace(/\[,/g, "[").replace(/,,/g, ",");
        return this.setDatatypes(JSON.parse(str));
    }
    setDatatypes(group) {
        let self = this;
        group.expressions.forEach((function (o, i) {
            if (o.type === 'condition') {
                let dataType = o.field.hasOwnProperty(self.fieldDatatype) ? o.field[self.fieldDatatype] : false;
                o.values = angular.isDefined(o.values[0]) ? self.defineDatatype(dataType, o.values) : [];
            } else {
                self.setDatatypes(o);
            }
        }));
        return group;
    }

    trigger(event) {
        let self = this;
        let string = this.stringifyQuery(this.group);
        this.$queryString = this.queryString = string.join(' ');
        this.$outputUpdate = false;
        this[event]({
            $event: {
                event: self.$event,
                group: self.CleanObject(),
                string: self.queryString
            }
        });
    }
    onPrefetch(e, rule) {
        let self = this;
        return new Promise(resolve => {
            let $event = { $event: e };
            if (rule) Object.assign($event, {
                group: rule,
                target: 'input'
            });
            if (e.$event) Object.assign($event, e);
            this.onFetch({
                $event: $event
            });
            $event.$event.target.focus();
            resolve(e.target);
        });
    }
    onValueChange(e) {
        this.$event = 'onValueChange';
        let self = this;
        let a = [];
        Object.keys(e).forEach(k => {
            a.push(e[k]);
        });
        this.onPrefetch.apply(this, a).then(e => {
            self.onGroupChange();
        });
    }
    $onDestroy() {
        clearTimeout(this.$timeoutPromise);
        clearTimeout(this.$digestCycle);
    }
}
QueryBuilderCtrl.$inject = ['$element', '$scope'];
__webpack_require__(201);
class QueryBuilder {
    constructor() {
        this.bindings = {
            onDelete: '&',
            onUpdate: '&',
            onFetch: '&onValueChange',
            fieldValue: '@?',
            fieldName: '@?',
            fieldDatatype: '@?',
            queryString: '=?',
            $$index: '<',
            group: '=',
            fields: '<operands'
        };
        this.template = __webpack_require__(197);
        this.controller = QueryBuilderCtrl;
    }
}
exports.QueryBuilder = QueryBuilder;

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(142);
const query_conditions_1 = __webpack_require__(170);
const QBKEY = "$$QueryBuilder";
class QueryBuilderService {
    constructor() {
        this.conditions = [];
        this.fieldName = "name";
        this.fieldDatatype = "dataType";
        this.$outputUpdate = false;
        Object.keys(query_conditions_1.QUERY_CONDITIONS).forEach(k => {
            this.conditions.push(query_conditions_1.QUERY_CONDITIONS[k]);
        });
    }
    defineDatatype(dataType, values) {
        values = Array.isArray(values) ? values : [values];
        let num = values.slice(0).map(f => {
            return typeof f === 'string' ? f.trim() : f;
        });
        if (dataType) switch (dataType.toUpperCase()) {
            case 'NUMBER':
            case 'INTEGER':
            case 'FLOAT':
                num = values.map(v => {
                    return Number(v);
                });
                break;
        }
        return num.unique();
    }
    stringify(group) {
        if (!this.fieldName) throw "MISSING FIELDNAME";
        if (!this.fieldDatatype) throw "MISSING FIELDNAME";
        this.$outputUpdate = false;
        let string = this.stringifyQuery(group);
        let $string = string ? string.join(' ') : "";
        return $string;
    }
    stringifyQuery(group) {
        let self = this;
        if (!group) return;
        var str = [];
        angular.forEach(group.expressions, (function (o, i) {
            if (o.type === 'condition') {
                if (!o.field || !o.field[self.fieldName]) return;
                if (i !== 0) str.push(group.op);
                str.push(o.field[self.fieldName]);
                let dataType = o.field.hasOwnProperty(self.fieldDatatype) ? o.field[self.fieldDatatype] : false;
                let values = angular.isDefined(o.values[0]) ? self.defineDatatype(dataType, o.values).unique().join(", ") : "";
                let condition = self.conditions.find((function (q) {
                    return o.operator === q.value;
                })).symbol;
                str.push(Array.isArray(condition) ? condition[0] : condition);
                let ticks = "`";
                str.push(self.$outputUpdate ? values : ticks + values + ticks);
            } else {
                var comp = self.stringifyQuery(o);
                if (comp.length) {
                    if (str.length) str.push(group.op);
                    if (comp.length > 3) {
                        comp.unshift("(");
                        comp.push(")");
                    }
                    str = str.concat(comp);
                }
            }
        }));
        return str;
    }
}
exports.QueryBuilderService = QueryBuilderService;

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(142);
const query_interface_1 = __webpack_require__(172);
const PrettyJSON = __webpack_require__(206);
const JSON_DATASET = __webpack_require__(205);
const GROUP_SAMPLE = JSON.parse(__webpack_require__(200));
__webpack_require__(190);
__webpack_require__(203);
__webpack_require__(202);
class DemoComponentCtrl {
    constructor($scope, $element) {
        this.$scope = $scope;
        this.$element = $element;
        this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Some really long name for this input'];
        this.JSON_PRETTY = $element.find('#PRETTY_JSON');
    }
    $onInit() {
        this.filters = angular.copy(query_interface_1.QUERY_INTERFACE);
        this.fields = angular.copy(JSON_DATASET);
    }
    setBloodhound(ele) {
        let self = this;
        return new Promise((resolve, reject) => {
            if (!ele.data('bloodhound')) {
                let typed = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: self.states
                });
                ele.data('bloodhound', typed);
                $(ele).typeahead({
                    minLength: 3,
                    hint: true,
                    highlight: true
                }, {
                    name: 'states',
                    source: typed
                });
            }
            $(ele).off('typeahead:select').on('typeahead:select', (function (ev, suggestion) {
                resolve(suggestion);
            }));
        });
    }
    onValueFetch(e) {
        let self = this;
        let ele = angular.element(e.$event.target);
        let ctrl = ele.controller('ngModel');
        let model = Array.isArray(ctrl.$viewValue) ? ctrl.$viewValue.slice(0) : ctrl.$viewValue;
        this.setBloodhound(ele).then(result => {
            if (!!e.group) {
                ctrl.$setViewValue(result, 'change');
            }
        });
    }
    validateQuery(group) {
        var validate = [];
        delete group.error;
        group.expressions.forEach((o, i) => {
            if (o.type === 'condition') {
                if (['INTEGER', 'STRING'].indexOf(o.field.dataType) !== -1) validate.push(o.field.dataType);
            } else {
                this.validateQuery(o);
            }
        });
        if (validate.indexOf('INTEGER') !== -1 && validate.indexOf('STRING') !== -1) {
            group.error = true;
        }
        return group;
    }
    onChanges(e) {
        this.validateQuery(e.group);
        let self = this;
        if (!angular.equals(this.output, e.string)) {
            self.output = e.string;
        }
        var node = new PrettyJSON.view.Node({
            el: self.JSON_PRETTY,
            data: e.group
        });
        node.expandAll();
    }
}
DemoComponentCtrl.$inject = ['$scope', '$element'];
class DemoComponent {
    constructor() {
        this.template = __webpack_require__(198);
        this.controller = DemoComponentCtrl;
    }
}
exports.DemoComponent = DemoComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(141)))

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(174);
__webpack_require__(189);
const angular = __webpack_require__(142);
class TagsComponentCtrl {
    constructor($element) {
        this.$element = $element;
        this.model = [];
        this.$model = [];
        this.$id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + Date.now().toString();
        this.select = $($element.find('input[type="text"]')[0]);
        this.hidden = angular.element($element.find('input[type="hidden"]')).controller('ngModel');
    }
    RenderInit() {
        let self = this;
        let options = {
            itemValue: self.itemvalue,
            itemText: self.itemtext,
            trimValue: true,
            confirmKeys: self.confirmkeys ? JSON.parse(self.confirmkeys) : [13],
            tagClass: typeof self.tagClass === "function" ? self.tagClass : function (item) {
                return self.tagclass;
            }
        };
        if (self.options) Object.assign(options, self.options);
        self.select.tagsinput(options);
        if (self.model.length) self.model.forEach(m => {
            self.select.tagsinput('add', m);
        });
        self.select.on('itemAdded', (function (event) {
            if (self.model.indexOf(event.item) === -1) {
                self.model.push(event.item);
                self.CheckModel();
            }
        }));
        self.select.on('itemRemoved', (function (event) {
            let idx = self.model.indexOf(event.item);
            if (idx !== -1) self.model.splice(idx, 1);
            self.CheckModel();
        }));
    }
    $onInit() {
        let self = this;
        if (!this.name) this.name = this.$id;
        if (!this.required) this.required = false;
        if (this.ngModel) this.ngModel.$render = function () {
            self.model = !Array.isArray(this.$viewValue) ? [] : this.$viewValue.slice(0);
            self.RenderInit();
        };
    }
    CheckModel() {
        let self = this;
        if (!angular.equals(this.model, this.$model)) {
            this.$model = angular.copy(this.model);
            this.ngModel.$setValidity("tags-invalid", !!this.model.length);
            this.ngModel.$setViewValue(this.model, 'change');
            self.select.tagsinput('removeAll');
            self.model.forEach(m => {
                self.select.tagsinput('add', m);
            });
            this.ngChange({
                $event: {
                    $element: self.$element,
                    model: self.model
                }
            });
        }
    }
    $doCheck() {
        let self = this;
        this.CheckModel();
    }

    $postLink() {
        let self = this;
        this.$inputtimeout = setTimeout(() => {
            let input = self.$element.find('input');
            self.$input = input[0];
            self.$input.placeholder = self.placeholder || "";
            self.$input.addEventListener('keyup', (function (e) {
                self.ngKeyup({
                    $event: {
                        $event: e,
                        target: 'tags',
                        values: self.model
                    }
                });
            }), false);
            try {
                $(self.$input).typeahead().on('typeahead:selected', (e, value) => {
                    this.model.push(value);
                });
            } catch (e) {}
        }, 0);
    }
    $onDestroy() {
        clearTimeout(this.$timeout);
        clearTimeout(this.$tagstimeout);
        clearTimeout(this.$inputtimeout);
        this.select.tagsinput('destroy');
    }
}
TagsComponentCtrl.$inject = ['$element'];
__webpack_require__(204);
class TagsComponent {
    constructor() {
        this.require = {
            ngModel: '^?',
            form: '^^?'
        };
        this.bindings = {
            ngKeyup: "&?",
            ngChange: '&?',
            placeholder: '<',
            name: '<',
            required: '<',
            note: '<',
            disabled: '<',
            options: '<',
            tagclass: "<",
            itemvalue: "@",
            itemtext: "@",
            confirmKeys: "@"
        };
        this.template = __webpack_require__(199);
        this.controller = TagsComponentCtrl;
    }
}
exports.TagsComponent = TagsComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(141)))

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

module.exports =
	"/**\n*\n*  Bootstrap default values:\n*\n@gray-darker:            lighten(#000, 13.5%); // #222\n@gray-dark:              lighten(#000, 20%);   // #333\n@gray:                   lighten(#000, 33.5%); // #555\n@gray-light:             lighten(#000, 60%);   // #999\n@gray-lighter:           lighten(#000, 93.5%); // #eee\n**/\n/**\n* Bootstrap default values for primary colors\n*\n@brand-primary:         #428bca;\n@brand-success:         #5cb85c;\n@brand-info:            #5bc0de;\n@brand-warning:         #f0ad4e;\n@brand-danger:          #d9534f;\n*/\nquery-builder .rule-container,\nquery-builder .rule-placeholder,\nquery-builder .rules-group-container {\n  position: relative;\n  margin: 4px 0;\n  border-radius: 5px;\n  padding: 5px;\n  border: 1px solid #EEE;\n  background: rgba(255, 255, 255, 0.9);\n}\nquery-builder .drag-handle,\nquery-builder .error-container,\nquery-builder .rule-container .rule-filter-container,\nquery-builder .rule-container .rule-operator-container,\nquery-builder .rule-container .rule-value-container {\n  display: inline-block;\n  margin: 0 5px 0 0;\n  vertical-align: middle;\n}\nquery-builder .rules-group-container {\n  padding: 10px 10px 6px;\n  border: 1px solid #DCC896;\n  background: rgba(250, 240, 210, 0.5);\n}\nquery-builder .rules-group-header {\n  margin-bottom: 10px;\n}\nquery-builder .rules-group-header .group-conditions .btn.readonly {\n  border-radius: 3px;\n}\nquery-builder .rule-value-container {\n  border-left: 1px solid #DDD;\n  padding-left: 5px;\n}\nquery-builder .rule-value-container label {\n  margin-bottom: 0;\n  font-weight: 400;\n}\nquery-builder .rule-value-container label.block {\n  display: block;\n}\nquery-builder .rules-list {\n  list-style: none;\n  padding: 0 0 0 30px;\n  margin: 0;\n}\nquery-builder .rules-list > ::after,\nquery-builder .rules-list > ::before {\n  content: '';\n  position: absolute;\n  left: -10px;\n  width: 10px;\n  height: calc(80%);\n  border-color: #CCC;\n  border-style: solid;\n}\nquery-builder .rules-list > ::before {\n  top: -10px;\n  border-width: 0 0 2px 2px;\n}\nquery-builder .rules-list > ::after {\n  top: 30%;\n  border-width: 0 0 0 2px;\n}\nquery-builder .rules-list > :first-child::before {\n  top: -12px;\n  height: calc(64%);\n}\nquery-builder .rules-list > :last-child::before {\n  border-radius: 0 0 0 4px;\n}\nquery-builder .rules-list > :last-child::after {\n  display: none;\n}\nquery-builder .rules-group-header [data-invert] {\n  margin-left: 5px;\n}\nquery-builder .rule-placeholder {\n  border: 1px dashed #BBB;\n  opacity: 0.7;\n}\n.remove-group {\n  float: right;\n  margin-left: 8px;\n}\n.add-group {\n  float: right;\n  width: 95px;\n  background-color: rgba(62, 176, 200, 0.26);\n  border: thin solid #5db0e1;\n  color: #444444;\n}\n";

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

module.exports =
	".rules-group-container-child.error-group query-builder .rules-group-container {\n  position: relative;\n  margin: 4px 0;\n  border-radius: 5px;\n  padding: 5px;\n  border: 1px solid red;\n  background: rgba(255, 255, 255, 0.9);\n}\n";

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

module.exports =
	"/**\n*\n*  Bootstrap default values:\n*\n@gray-darker:            lighten(#000, 13.5%); // #222\n@gray-dark:              lighten(#000, 20%);   // #333\n@gray:                   lighten(#000, 33.5%); // #555\n@gray-light:             lighten(#000, 60%);   // #999\n@gray-lighter:           lighten(#000, 93.5%); // #eee\n**/\n/**\n* Bootstrap default values for primary colors\n*\n@brand-primary:         #428bca;\n@brand-success:         #5cb85c;\n@brand-info:            #5bc0de;\n@brand-warning:         #f0ad4e;\n@brand-danger:          #d9534f;\n*/\nspan.twitter-typeahead .tt-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 100%;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  background-color: #ffffff;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  cursor: pointer;\n}\nspan.twitter-typeahead .tt-menu .tt-suggestion {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.428571429;\n  color: #333333;\n  white-space: nowrap;\n  width: auto;\n}\nspan.twitter-typeahead .tt-menu .tt-suggestion:hover,\nspan.twitter-typeahead .tt-menu .tt-suggestion:focus {\n  color: #ffffff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #5db0e1;\n}\nspan.twitter-typeahead .tt-menu .tt-suggestion.tt-cursor:not(:hover):not(:focus) {\n  background-color: #f6f6f6;\n}\n";

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

module.exports =
	"qb-tags .tagsinput-container {\n  margin: 0px;\n  min-width: 168px;\n}\nqb-tags .tagsinput-container .tag.label {\n  display: inline-block !important;\n}\nqb-tags .tagsinput-container .bootstrap-tagsinput {\n  width: 100%;\n  border-radius: 0px;\n  line-height: 20px;\n}\nqb-tags .tagsinput-container .bootstrap-tagsinput input {\n  width: 100px;\n  font-weight: normal;\n  display: inline-block;\n}\nqb-tags .tagsinput-container .bootstrap-tagsinput input[value=\"\"] {\n  width: auto;\n}\nqb-tags .tagsinput-container .bootstrap-tagsinput .tag {\n  color: #444444;\n  background-color: #bce8f1;\n  padding: 4px;\n  font-weight: normal;\n}\nqb-tags .tt-menu {\n  min-width: 140px;\n}\n";

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

module.exports =
	".bootstrap-tagsinput {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  display: inline-block;\n  padding: 4px 6px;\n  color: #555;\n  vertical-align: middle;\n  border-radius: 4px;\n  max-width: 100%;\n  line-height: 22px;\n  cursor: text;\n}\n.bootstrap-tagsinput input {\n  border: none;\n  box-shadow: none;\n  outline: none;\n  background-color: transparent;\n  padding: 0 6px;\n  margin: 0;\n  width: auto;\n  max-width: inherit;\n}\n.bootstrap-tagsinput.form-control input::-moz-placeholder {\n  color: #777;\n  opacity: 1;\n}\n.bootstrap-tagsinput.form-control input:-ms-input-placeholder {\n  color: #777;\n}\n.bootstrap-tagsinput.form-control input::-webkit-input-placeholder {\n  color: #777;\n}\n.bootstrap-tagsinput input:focus {\n  border: none;\n  box-shadow: none;\n}\n.bootstrap-tagsinput .tag {\n  margin-right: 2px;\n  color: white;\n}\n.bootstrap-tagsinput .tag [data-role=\"remove\"] {\n  margin-left: 8px;\n  cursor: pointer;\n}\n.bootstrap-tagsinput .tag [data-role=\"remove\"]:after {\n  content: \"x\";\n  padding: 0px 2px;\n}\n.bootstrap-tagsinput .tag [data-role=\"remove\"]:hover {\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.bootstrap-tagsinput .tag [data-role=\"remove\"]:hover:active {\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n";

/***/ }),

/***/ 188:
/***/ (function(module, exports) {

module.exports =
	"/* common */\r\n.mark-water{\r\n    color:#bbb;\r\n}\r\n/* eof common */\r\n\r\n/* node */\r\n.node-content-wrapper{\r\n    font-family: 'Quicksand', sans-serif;\r\n    background-color:#fff;\r\n}\r\n.node-content-wrapper ul{\r\n    border-left:1px dotted #ccc;\r\n    list-style:none;\r\n    padding-left:25px;\r\n    margin:0px;\r\n}\r\n.node-content-wrapper ul li{\r\n    list-style:none;\r\n    border-bottom:0; \r\n    padding-bottom:0\r\n}\r\n.node-hgl-path{\r\n    background-color:#fefbdf;\r\n}\r\n.node-bracket{\r\n    font-weight:bold;\r\n    display:inline-block;\r\n    cursor:pointer;\r\n}\r\n.node-bracket:hover{\r\n    color:#999;\r\n}\r\n/* eof node */\r\n\r\n/* leaf */\r\n.leaft-container{\r\n    width:100%;\r\n    max-width:300px;\r\n    height:100%;\r\n}\r\n\r\n.title{ color:#ccc;}\r\n.string{ color:#080;}\r\n.number{ color:#ccaa00;}\r\n.boolean{ color:#1979d3;}\r\n.date{ color:#aa6655;}\r\n.null{ color:#ff5050;}\r\n/* eof leaf */";

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(187);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(166)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!./bootstrap-tagsinput.css", (function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!./bootstrap-tagsinput.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		}));
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose((function() { update(); }));
}

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(188);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(166)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!./pretty-json.css", (function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!./pretty-json.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		}));
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose((function() { update(); }));
}

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-static-top\" style=\"margin: 0px;\"><div class=container><div class=navbar-header><a class=navbar-brand href=#>Angular Query Builder</a></div><div id=navbar class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav\"></ul></div></div></nav>"

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

module.exports = "<dl class=rules-group-container><dt class=rules-group-header><div class=\"btn-group pull-right group-actions\"><button class=\"btn btn-default btn-xs add-group\" md-no-ink ng-click=$ctrl.AddGroup()>Add Group</button> <button class=\"btn btn-default btn-xs remove-group\" md-no-ink ng-click=$ctrl.RemoveGroup() ng-if=$ctrl.$$index><i class=\"fa fa-trash\" aria-hidden=true></i></button></div><div class=\"btn-group group-conditions\"><select ng-options=\"o.name as o.name for o in $ctrl.operators\" data-ng-model=$ctrl.group.op class=\"form-control input-sm\" placeholder={{$ctrl.group.op}} ng-change=$ctrl.onGroupChange()></select></div></dt><dd class=rules-group-body><ul class=rules-list><li class=rule-container ng-repeat=\"rule in $ctrl.group.expressions track by $index\"><span ng-init=\"rule.$$indeed = $index\"></span><div ng-if=\"rule.type === 'condition'\"><div class=rule-header><div class=\"btn-group pull-right rule-actions\"><button ng-class=\"{'invisible':!rule.values[0]}\" style=\"margin-left: 5px\" ng-click=$ctrl.RemoveCondition($index) class=\"btn btn-sm btn-danger\"><i class=\"fa fa-minus\" aria-hidden=true></i></button></div></div><div class=rule-filter-container><select ng-model=rule.field[$ctrl.fieldValue] class=\"form-control input-sm\" style=\"width: 150px;\" ng-change=$ctrl.onOperandChange(rule)><option ng-value=t[$ctrl.fieldValue] ng-repeat=\"t in $ctrl.fields track by $index\">{{t[$ctrl.fieldName]}}</option></select></div><div class=rule-operator-container><select class=\"form-control input-sm\" ng-model=rule.operator placeholder=AND ng-change=$ctrl.onConditionChange(rule)><option value={{c.value}} ng-repeat=\"c in $ctrl.conditions | orderBy:'index'\">{{c.name}}</option></select></div><div class=rule-value-container><span ng-switch=rule.operator><span ng-switch-when=IN class=rule-operator-in><qb-tags ng-model=rule.values tags=rule.values ng-keyup=$ctrl.onKeyUp($event) ng-change=$ctrl.onTagsChange($event)></qb-tags></span> <span ng-switch-when=BETWEEN class=rule-operator-between><input type=text ng-model=rule.values[0] class=\"form-control input-sm\" ng-change=$ctrl.onChange($event) ng-keyup=\"$ctrl.onKeyUp($event, rule)\"> AND <input type=text ng-model=rule.values[1] class=\"form-control input-sm\" ng-change=$ctrl.onChange($event) ng-keyup=\"$ctrl.onKeyUp($event, rule)\"></span> <span ng-switch-default class=rule-condition><input type=text ng-model=rule.values[0] id={{rule.$$hashKey}} ng-change=$ctrl.onChange($event) class=\"form-control input-sm\" ng-keyup=\"$ctrl.onKeyUp($event, rule)\"></span></span></div></div><div class=rules-group-container-child ng-class=\"{'error-group':rule.error}\" ng-if=\"rule.type === 'group'\"><query-builder group=rule operands=$ctrl.fields $$index=1 on-delete=$ctrl.onDeleteGroup($event) on-update=$ctrl.onUpdateGroup($event) on-value-change=$ctrl.onValueChange($event) field-value={{$ctrl.fieldValue}} field-name={{$ctrl.fieldName}} field-datatype={{$ctrl.fieldDatatype}}></query-builder></div></li></ul></dd></dl>"

/***/ }),

/***/ 198:
/***/ (function(module, exports) {

module.exports = "<div class=jumbotron><div class=container><h1>Angular Query Builder</h1><p>CommonJs plugin for user friendly query/filter interface.</p><p><a class=\"btn btn-default\" role=button href=https://github.com/reyramos/queryBuilder>Code on Github</a></p></div></div><div class=container><section class=bs-docs-section><h1 id=overview class=page-header>Overview</h1><blockquote>QueryBuilder is an Angular component to create queries and filters</blockquote><ul><li>Allows for user input/copy/paste functionality for ease query format samples.</li><li>Build JSON object for server restful interaction and parsing.</li><li>It outputs a structured JSON of rules which can be easily parsed.</li></ul></section><section class=clearfix><h4>Example:</h4><div class=\"alert alert-info\"><strong>Sample Queries: <i>Copy/Paste or Write them out</i></strong><br><br>Gender IN `M, F` AND Age BETWEEN `0, 100`<br><br>Country equal `USA` AND Country equal `Canada` AND Gender equal `Male` AND Gender equal `Female` AND ( State equal `North Carolina` OR Age equal `15` )<br><br>Country equal `USA` AND Country equal `Canada` AND ((Gender equal `Male` AND Gender equal `Female`) AND (State equal `North Carolina` OR State equal `Ontario`))</div>Condition: <textarea style=\"width: 100%; height: 100px;\" class=flex ng-model=$ctrl.output name=query-string ng-trim=true></textarea><query-builder class=query-builder group=$ctrl.filters operands=$ctrl.fields on-update=$ctrl.onChanges($event) query-string=$ctrl.output field-value=name field-name=description field-datatype=dataType on-value-change=$ctrl.onValueFetch($event) optgroup></query-builder><br><p>JSON OUTPUT <code>\n                <pre id=PRETTY_JSON style=\"max-height: 500px;\"></pre>\n            </code></p></section><section class=bs-docs-section><h1 id=installation class=page-header>Getting started</h1><h3 id=dependencies>Dependencies</h3><ul><li>WebPack or CommonJS bundle see directory src for demo packages</li><li>Install Node.JS version 6.20>: Use your system package manager (brew,port,apt-get,yum etc)</li><li>Install global Typings , Bower, and Typescript commands</li></ul></section></div>"

/***/ }),

/***/ 199:
/***/ (function(module, exports) {

module.exports = "<label class=tagsinput-container ng-class=\"{'required':$ctrl.required,'state-disabled':$ctrl.disabled,'state-error':$ctrl.form[$ctrl.name].$invalid}\"><input type=text class=\"form-control tagsinput\"></label> <input type=hidden name={{::$ctrl.name}} ng-required=$ctrl.required ng-model=$ctrl.model>"

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

module.exports = "{\n    \"type\": \"group\",\n    \"op\": \"AND\",\n    \"expressions\": [\n        {\n            \"type\": \"condition\",\n            \"field\": {\n                \"name\": \"SOME_TABLE_NAME_COUNTRY\",\n                \"description\": \"Country\",\n                \"dataType\": \"STRING\"\n            },\n            \"operator\": \"EQ\",\n            \"values\": [\n                \"USA\"\n            ]\n        },\n        {\n            \"type\": \"condition\",\n            \"field\": {\n                \"name\": \"SOME_TABLE_NAME_COUNTRY\",\n                \"description\": \"Country\",\n                \"dataType\": \"STRING\"\n            },\n            \"operator\": \"EQ\",\n            \"values\": [\n                \"Canada\"\n            ]\n        },\n        {\n            \"type\": \"condition\",\n            \"field\": {\n                \"name\": \"SOME_TABLE_NAME_GENDER\",\n                \"description\": \"Gender\",\n                \"dataType\": \"STRING\"\n            },\n            \"operator\": \"EQ\",\n            \"values\": [\n                \"Male\"\n            ]\n        },\n        {\n            \"type\": \"condition\",\n            \"field\": {\n                \"name\": \"SOME_TABLE_NAME_GENDER\",\n                \"description\": \"Gender\",\n                \"dataType\": \"STRING\"\n            },\n            \"operator\": \"EQ\",\n            \"values\": [\n                \"Female\"\n            ]\n        },\n        {\n            \"type\": \"group\",\n            \"op\": \"OR\",\n            \"expressions\": [\n                {\n                    \"type\": \"condition\",\n                    \"field\": {\n                        \"name\": \"SOME_TABLE_NAME_STATE\",\n                        \"description\": \"State\",\n                        \"dataType\": \"STRING\"\n                    },\n                    \"operator\": \"EQ\",\n                    \"values\": [\n                        \"North Carolina\"\n                    ]\n                },\n                {\n                    \"type\": \"condition\",\n                    \"field\": {\n                        \"name\": \"SOME_TABLE_NAME_AGE\",\n                        \"description\": \"Age\",\n                        \"dataType\": \"INTEGER\"\n                    },\n                    \"operator\": \"EQ\",\n                    \"values\": [\n                        15\n                    ]\n                },\n                {\n                    \"type\": \"condition\",\n                    \"field\": {\n                        \"name\": \"\",\n                        \"description\": \"\"\n                    },\n                    \"operator\": \"EQ\",\n                    \"values\": [\n                    ]\n                }\n            ],\n            \"error\": true\n        }\n    ]\n}\n"

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(183);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(166)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./query.less", (function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./query.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		}));
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose((function() { update(); }));
}

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(184);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(166)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./custom.less", (function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./custom.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		}));
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose((function() { update(); }));
}

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(185);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(166)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./typeaheadjs.less", (function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./typeaheadjs.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		}));
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose((function() { update(); }));
}

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(186);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(166)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./tags.less", (function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./tags.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		}));
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose((function() { update(); }));
}

/***/ }),

/***/ 205:
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "SOME_TABLE_NAME_COUNTRY",
		"description": "Country",
		"dataType": "STRING"
	},
	{
		"name": "SOME_TABLE_NAME_STATE",
		"description": "State",
		"dataType": "STRING"
	},
	{
		"name": "SOME_TABLE_NAME_GENDER",
		"description": "Gender",
		"dataType": "STRING"

	},
	{
		"name": "SOME_TABLE_NAME_AGE",
		"description": "Age",
		"dataType": "INTEGER"

	}
];


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {/*
 License here,
 I dont think too  much about licence
 just feel free to do anything you want... :-)
 */
var PrettyJSON = {view: {}, tpl: {}};
PrettyJSON.util = {
	isObject: function (v) {
		return Object.prototype.toString.call(v) === '[object Object]';
	}, pad: function (str, length) {
		str = String(str);
		while (str.length < length)str = '0' + str;
		return str;
	}, dateFormat: function (date, f) {
		f = f.replace('YYYY', date.getFullYear());
		f = f.replace('YY', String(date.getFullYear()).slice(-2));
		f = f.replace('MM', PrettyJSON.util.pad(date.getMonth() + 1, 2));
		f = f.replace('DD', PrettyJSON.util.pad(date.getDate(), 2));
		f = f.replace('HH24', PrettyJSON.util.pad(date.getHours(), 2));
		f = f.replace('HH', PrettyJSON.util.pad((date.getHours() % 12), 2));
		f = f.replace('MI', PrettyJSON.util.pad(date.getMinutes(), 2));
		f = f.replace('SS', PrettyJSON.util.pad(date.getSeconds(), 2));
		return f;
	}
}
PrettyJSON.tpl.Node = '' + '<span class="node-container">' + '<span class="node-top node-bracket" />' + '<span class="node-content-wrapper">' + '<ul class="node-body" />' + '</span>' + '<span class="node-down node-bracket" />' + '</span>';
PrettyJSON.tpl.Leaf = '' + '<span class="leaf-container">' + '<span class="<%= type %>"> <%-data%></span><span><%= coma %></span>' + '</span>';
PrettyJSON.view.Node = Backbone.View.extend({
	tagName: 'span',
	data: null,
	level: 1,
	path: '',
	type: '',
	size: 0,
	isLast: true,
	rendered: false,
	events: {
		'click .node-bracket': 'collapse',
		'mouseover .node-container': 'mouseover',
		'mouseout .node-container': 'mouseout'
	},
	initialize: function (opt) {
		this.options = opt;
		this.data = this.options.data;
		this.level = this.options.level || this.level;
		this.path = this.options.path;
		this.isLast = _.isUndefined(this.options.isLast) ? this.isLast : this.options.isLast;
		this.dateFormat = this.options.dateFormat;
		var m = this.getMeta();
		this.type = m.type;
		this.size = m.size;
		this.childs = [];
		this.render();
		if (this.level == 1)
			this.show();
	},
	getMeta: function () {
		var val = {size: _.size(this.data), type: _.isArray(this.data) ? 'array' : 'object',};
		return val;
	},
	elements: function () {
		this.els = {
			container: $(this.el).find('.node-container'),
			contentWrapper: $(this.el).find('.node-content-wrapper'),
			top: $(this.el).find('.node-top'),
			ul: $(this.el).find('.node-body'),
			down: $(this.el).find('.node-down')
		};
	},
	render: function () {
		this.tpl = _.template(PrettyJSON.tpl.Node);
		$(this.el).html(this.tpl);
		this.elements();
		var b = this.getBrackets();
		this.els.top.html(b.top);
		this.els.down.html(b.bottom);
		this.hide();
		return this;
	},
	renderChilds: function () {
		var count = 1;
		_.each(this.data, (function (val, key) {
			var isLast = (count == this.size);
			count = count + 1;
			var path = (this.type == 'array') ? this.path + '[' + key + ']' : this.path + '.' + key;
			var opt = {
				key: key,
				data: val,
				parent: this,
				path: path,
				level: this.level + 1,
				dateFormat: this.dateFormat,
				isLast: isLast
			};
			var child = (PrettyJSON.util.isObject(val) || _.isArray(val)) ? new PrettyJSON.view.Node(opt) : new PrettyJSON.view.Leaf(opt);
			child.on('mouseover', (function (e, path) {
				this.trigger("mouseover", e, path);
			}), this);
			child.on('mouseout', (function (e) {
				this.trigger("mouseout", e);
			}), this);
			var li = $('<li/>');
			var colom = '&nbsp;:&nbsp;';
			var left = $('<span />');
			var right = $('<span />').append(child.el);
			(this.type == 'array') ? left.html('') : left.html(key + colom);
			left.append(right);
			li.append(left);
			this.els.ul.append(li);
			child.parent = this;
			this.childs.push(child);
		}), this);
	},
	isVisible: function () {
		return this.els.contentWrapper.is(":visible");
	},
	collapse: function (e) {
		e.stopPropagation();
		this.isVisible() ? this.hide() : this.show();
		this.trigger("collapse", e);
	},
	show: function () {
		if (!this.rendered) {
			this.renderChilds();
			this.rendered = true;
		}
		this.els.top.html(this.getBrackets().top);
		this.els.contentWrapper.show();
		this.els.down.show();
	},
	hide: function () {
		var b = this.getBrackets();
		this.els.top.html(b.close);
		this.els.contentWrapper.hide();
		this.els.down.hide();
	},
	getBrackets: function () {
		var v = {top: '{', bottom: '}', close: '{ ... }'};
		if (this.type == 'array') {
			v = {top: '[', bottom: ']', close: '[ ... ]'};
		}
		;
		v.bottom = (this.isLast) ? v.bottom : v.bottom + ',';
		v.close = (this.isLast) ? v.close : v.close + ',';
		return v;
	},
	mouseover: function (e) {
		e.stopPropagation();
		this.trigger("mouseover", e, this.path);
	},
	mouseout: function (e) {
		e.stopPropagation();
		this.trigger("mouseout", e);
	},
	expandAll: function () {
		_.each(this.childs, (function (child) {
			if (child instanceof PrettyJSON.view.Node) {
				child.show();
				child.expandAll();
			}
		}), this);
		this.show();
	},
	collapseAll: function () {
		_.each(this.childs, (function (child) {
			if (child instanceof PrettyJSON.view.Node) {
				child.hide();
				child.collapseAll();
			}
		}), this);
		if (this.level != 1)
			this.hide();
	}
});
PrettyJSON.view.Leaf = Backbone.View.extend({
	tagName: 'span',
	data: null,
	level: 0,
	path: '',
	type: 'string',
	isLast: true,
	events: {"mouseover .leaf-container": "mouseover", "mouseout .leaf-container": "mouseout"},
	initialize: function (opt) {
		this.options = opt;
		this.data = this.options.data;
		this.level = this.options.level;
		this.path = this.options.path;
		this.type = this.getType();
		this.dateFormat = this.options.dateFormat;
		this.isLast = _.isUndefined(this.options.isLast) ? this.isLast : this.options.isLast;
		this.render();
	},
	getType: function () {
		var m = 'string';
		var d = this.data;
		if (_.isNumber(d)) m = 'number'; else if (_.isBoolean(d)) m = 'boolean'; else if (_.isDate(d)) m = 'date'; else if (_.isNull(d)) m = 'null'
		return m;
	},
	getState: function () {
		var coma = this.isLast ? '' : ',';
		var state = {data: this.data, level: this.level, path: this.path, type: this.type, coma: coma};
		return state;
	},
	render: function () {
		var state = this.getState();
		if (state.type == 'date' && this.dateFormat) {
			state.data = PrettyJSON.util.dateFormat(this.data, this.dateFormat);
		}
		if (state.type == 'null') {
			state.data = 'null';
		}
		if (state.type == 'string') {
			state.data = (state.data == '') ? '""' : '"' + state.data + '"';
		}
		this.tpl = _.template(PrettyJSON.tpl.Leaf);
		$(this.el).html(this.tpl(state));
		return this;
	},
	mouseover: function (e) {
		e.stopPropagation();
		var path = this.path + '&nbsp;:&nbsp;<span class="' + this.type + '"><b>' + this.data + '</b></span>';
		this.trigger("mouseover", e, path);
	},
	mouseout: function (e) {
		e.stopPropagation();
		this.trigger("mouseout", e);
	}
});



module.exports = PrettyJSON;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(173), __webpack_require__(171), __webpack_require__(141)))

/***/ })

});