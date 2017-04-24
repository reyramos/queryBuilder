webpackJsonp([1],{

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular = __webpack_require__(142);
const routes_1 = __webpack_require__(156);
__webpack_require__(158);
exports.app = angular.module('app', ['ui.router', 'ngSanitize', 'oc.lazyLoad', __webpack_require__(152).name]);
exports.app.config(['routeStateProvider', function (states) {
    return new routes_1.RouteProvider(states);
}]);

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

/**
 * # Main Application bootstrap file
 *
 * Allows main Application to be bootloaded. This separate file is required in
 * order to properly isolate angular logic from requirejs module loading
 */
(function (angular) {
	'use strict';
	angular.bootstrap(document, ['app'], {
		// strictDi: true
	});
})(window.angular);


/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var app = __webpack_require__(153).app;
__webpack_require__(162)(app);
__webpack_require__(163)(app);
module.exports = app;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const angular_1 = __webpack_require__(142);
exports.app = angular_1.module("app.core", []);

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Public;
(function (Public) {
    Public.routes = [{
        name: 'rootBundle',
        abstract: true,
        url: "/"
    }, {
        name: 'rootBundle.root',
        template: __webpack_require__(160),
        abstract: true,
        resolve: {
            register: ['jsBundleResolver', function (jsBundleResolver) {
                return jsBundleResolver((app, resolve) => {
                    __webpack_require__.e/* require.ensure */(4/* min-size */).then((function () {
                        app.register(__webpack_require__(167));
                        resolve();
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                });
            }]
        }
    }];
})(Public = exports.Public || (exports.Public = {}));

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var QueryBuilder;
(function (QueryBuilder) {
    QueryBuilder.routes = [{
        name: 'QueryBuilder',
        parent: "rootBundle.root",
        abstract: true,
        resolve: {
            ModuleResolver: ['jsBundleResolver', function (jsBundleResolver) {
                return jsBundleResolver((function (app, resolve) {
                    __webpack_require__.e/* require.ensure */(4).then((function () {
                        app.register(__webpack_require__(168));
                        app.register(__webpack_require__(169));
                        resolve();
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                }));
            }]
        }
    }, {
        name: "root",
        parent: 'QueryBuilder',
        component: 'demoComponent'
    }, {
        name: 'stringify',
        url: 'stringify/',
        parent: 'QueryBuilder',
        component: 'demoComponent'
    }];
})(QueryBuilder = exports.QueryBuilder || (exports.QueryBuilder = {}));

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const public_routes_1 = __webpack_require__(154);
const routes_1 = __webpack_require__(155);
class RouteProvider {
    constructor(states) {
        this.states = states;
        states.inject(public_routes_1.Public.routes);
        states.inject(routes_1.QueryBuilder.routes);
    }
}
RouteProvider.$inject = ['routeStateProvider'];
exports.RouteProvider = RouteProvider;

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

module.exports = "<a href=https://github.com/reyramos/queryBuilder><img style=\"position: absolute; top: 0; right: 0; border: 0;z-index: 1050;\" src=https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67 alt=\"Fork me on GitHub\" data-canonical-src=https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png></a><eq-nav></eq-nav><div ui-view></div>"

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

module.exports = function (app) {

	"use strict";

	/**
	 * @ngdoc service
	 * @name app.provider:lcpLazyLoaderProvider
	 *
	 * @description
	 *
	 * Lazy Loads Angular modules and its components when the JS file is downloaded to the browser.
	 * Each JS file downloaded, on-demand is expected to be an AngularJS module. Any components (contrller, service, etc)
	 * would need to be added into an angular module and delivered to the UI.
	 *
	 * app.register will be called during 'resolve' method of 'ui-router' state to initialize the module into app
	 * main module.
	 *
	 */

	app
		.run(['lcpLazyLoader', function (Loader) {

			var _class = [];

			Loader.OnStateChangeStart((function (modules, to) {

				var body = angular.element(document.body),
					setClass = function (state, name) {
						if (!name)return;
						var _name = name.replace(/\./g, '_');
						_class.push(_name);
						body[state](_name);

					};

				_class.forEach((function (_c) {
					body.removeClass(_c);
				}));

				//remove all class
				_class.splice(0, _class.length);

				setClass('addClass', modules.join(' '));
				setClass('addClass', to);

			}));
		}])
		.provider('lcpLazyLoader', LazyLoaderConfig)
		.provider('jsBundleResolver', BundleResolver);

	function LazyLoaderConfig() {
		app.register = angular.noop;


		this.currentModule = [];

		/**
		 * @ngdoc service
		 * @name app.lcpLazyLoader
		 *
		 * @requires $document
		 * @requires $ocLazyLoad
		 *
		 * @description
		 *
		 * Lazy Loads Angular modules and its components when the JS file is downloaded to the browser.
		 * Each JS file downloaded, on-demand is expected to be an AngularJS module. Any components (contrller, service, etc)
		 * would need to be added into an angular module and delivered to the UI.
		 *
		 * app.register will be called during 'resolve' method of 'ui-router' state to initialize the module into app
		 * main module.
		 *
		 */


		this.$get = ['$document', '$ocLazyLoad', '$transitions', function ($document, $ocLazyLoad, $transitions) {
			var _this = this;

			/**
			 * @ngdoc function
			 * @name app.lcpLazyLoader#register
			 * @methodOf app.lcpLazyLoader
			 *
			 * @description
			 *
			 *
			 */


			app.register = function (module) {

				this.currentModule = [];


				//if the module has dependencies, recursively include those dependencies
				module.requires.forEach((function (moduleName) {
					_this.currentModule.push(moduleName);
					$ocLazyLoad.inject(moduleName);
				}));

				console.log('module._invokeQueue ---- ', module._invokeQueue.map((function (ary) {
					return ary[2][0]
				})));


				return $ocLazyLoad.load({name: module.name}).finally((function () {
					_this.currentModule.push(module.name);

				}))
			};

			return {
				OnStateChangeStart: function (fn) {
					var func = typeof fn === 'function' ? fn : function () {
						};
					$transitions.onSuccess({to: '*'}, (function (transition) {
						func(_this.currentModule, transition.$to().name)
					}));
				}
			};
		}];

	}

	/**
	 * @ngdoc service
	 * @name app.provider:jsBundleResolverProvider
	 *
	 * @description
	 *
	 * Lazy Loads Angular modules and its components when the JS file is downloaded to the browser.
	 * Each JS file downloaded, on-demand is expected to be an AngularJS module. Any components (contrller, service, etc)
	 * would need to be added into an angular module and delivered to the UI.
	 *
	 * app.register will be called during 'resolve' method of 'ui-router' state to initialize the module into app
	 * main module.
	 *
	 */


	function BundleResolver() {


		/**
		 * @ngdoc service
		 * @name app.provider:jsBundleResolver
		 *
		 * @requires $q
		 *
		 *
		 * @description
		 *
		 * Lazy Loads Angular modules and its components when the JS file is downloaded to the browser.
		 * Each JS file downloaded, on-demand is expected to be an AngularJS module. Any components (contrller, service, etc)
		 * would need to be added into an angular module and delivered to the UI.
		 *
		 * app.register will be called during 'resolve' method of 'ui-router' state to initialize the module into app
		 * main module.
		 *
		 * @example

		 ```js
		 var routes = [
		 {
             name: 'billinglayout',
             parent: 'dashboard',
             abstract: true,
             views: {
                 //code ...
             },
             resolve: {
                 jsBundleBilling: ['jsBundleResolver', function (jsBundleResolver) {
					//LazyLoad the necessary dependencies for billing.js module
                     return jsBundleResolver(function(app, resolve){
                         require.ensure([], function () {
                             app.register(require('./billing.js'));
                             resolve();
                         });
                     });
                 }]
             }
         }];

		 module.exports = routes;

		 ```
		 *
		 */


		this.$get = ['$q', function ($q) {


			var Bundler = function (callback) {
				var defer = $q.defer(),
					func = angular.isFunction(callback) ? callback : angular.noop;

				func.apply(this, [app, defer.resolve]);


				return defer.promise;

			};


			return Bundler;
		}];


	}

};


/***/ }),

/***/ 163:
/***/ (function(module, exports) {

module.exports = function (app) {
	'use strict';


	app.run(['routeState', function (State) {
		var _class = [];
		State.OnStateChangeStart((function(to, from){
			var body = angular.element(document.body),
				_cName = to.name.replace(/\.?([A-Z])/g, (function (x, y) {
					return "-" + y.toLowerCase()
				})).replace(/^_/, "");

			_class.forEach((function (_c) {
				body.removeClass(_c);
			}));
			//remove all class
			_class.splice(0, _class.length);
			//replace whats in memory
			_class.push(_cName);
			angular.element(document.body).addClass(_cName); //body[0] !== document.body

		}))
	}])
	/**
	 * @ngdoc service
	 * @name eqApp.provider:routeStateProvider
	 *
	 *
	 * @description
	 *
	 * Use `routeStateProvider` to inject|permission into eqApp during config

	 *
	 *
	 */
		.provider('routeState', routeInjector);

	routeInjector.$inject = ['$injector'];

	function routeInjector($injector) {

		var state = null,
			r = [],
			$stateProvider = $injector.get('$stateProvider', 'routeInjector'),
			$locationProvider = $injector.get('$locationProvider', 'routeInjector'),
			$urlRouterProvider = $injector.get('$urlRouterProvider', 'routeInjector');

		/**
		 * @ngdoc function
		 * @name eqApp.provider:routeStateProvider#inject
		 * @methodOf eqApp.provider:routeStateProvider
		 *
		 *
		 * @param {Array=} routes to inject for module
		 *
		 * @description
		 * Inject routes bases on uiRouter object tree
		 * @example

		 ```js
		 var routes = [
		 {
             name: 'modulelayout',
             parent: 'dashboard',
             abstract: true,
             views: {
                 //code ...
             },
             resolve: {
                 jsBundleBilling: ['jsBundleResolver', function (jsBundleResolver) {
					//LazyLoad the necessary dependencies for billing.js module
                     return jsBundleResolver(function(app, resolve){
                         require.ensure([], function () {
                             app.register(require('./billing.js'));
                             resolve();
                         });
                     });
                 }]
             }
         }];

		 module.exports = routes;

		 ```
		 *
		 */
		this.inject = function (routes) {
			angular.forEach(routes, (function (route) {
				var views = route.views || {};

				Object.keys(views).forEach((function (key) {
					var tem = views[key].templateUrl;
					if (tem) {
						views[key].templateUrl = angular.isArray(tem) ? tem.join('/').replace(/\/\//g, '/') : tem;
					}
				}));

				route.data = Object.assign({}, route.data, {
					debug: location.search.split('debug=')[1] || location.hash.split('debug=')[1]
				});

				r.push(route);
				$stateProvider.state(route);
			}));


			$urlRouterProvider.otherwise((function ($injector) {
				$injector.get('$state').transitionTo('root');
			}));

			/**
			 * ## HTML5 pushState support
			 *
			 * This enables urls to be routed with HTML5 pushState so they appear in a
			 * '/someurl' format without a page refresh
			 *
			 * The server must support routing all urls to index.html as a catch-all for
			 * this to function properly,
			 *
			 * The alternative is to disable this which reverts to '#!/someurl'
			 * anchor-style urls.
			 */
			$locationProvider.html5Mode(false);

		};


		/**
		 * @ngdoc service
		 * @name eqApp.provider:routeState
		 *
		 * @requires $rootScope
		 * @requires $document
		 *
		 * @description
		 * Defines the state of the application rules and views
		 *
		 *
		 * @return {Object|Array} Reference to routeStateProvider injection and permission states
		 *
		 *
		 */

		this.$get = ['$rootScope', function ($rootScope) {


			return {
				OnStateChangeStart: function (fn) {
					var func = typeof fn === 'function' ? fn : function () {
					};
					$rootScope.$on('$stateChangeSuccess', (function (e, toState, toParams, fromState, fromParams) {
						func(toState, toParams, fromState, fromParams)
					}));
				}
			};
		}];

	}
};


/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(143);
module.exports = __webpack_require__(144);


/***/ }),

/***/ 166:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize((function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	})),
	getHeadElement = memoize((function () {
		return document.head || document.getElementsByTagName("head")[0];
	})),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ })

},[164]);