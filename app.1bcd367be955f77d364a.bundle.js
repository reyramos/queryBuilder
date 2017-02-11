webpackJsonp([0,2],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const angular = __webpack_require__(31);
const routes_1 = __webpack_require__(136);
var App;
(function (App) {
    __webpack_require__(320);
    App.app = angular.module('app', ['ui.router', 'ngSanitize', 'oc.lazyLoad', __webpack_require__(125).name]);
    App.app.config(routes_1.RouteProvider);
})(App = exports.App || (exports.App = {}));

/***/ }),

/***/ 118:
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

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

var app = __webpack_require__(126).app;
__webpack_require__(331)(app);
__webpack_require__(332)(app);
module.exports = app;

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const angular_1 = __webpack_require__(31);
exports.app = angular_1.module("app.core", []);

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class AboutCtrl {
    constructor($scope) {
        this.$scope = $scope;
    }
}
AboutCtrl.$inject = ['$scope'];
class AboutComponent {
    constructor() {
        this.template = "About Page";
        this.controller = AboutCtrl;
    }
}
exports.AboutComponent = AboutComponent;

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class HomeCtrl {
    constructor($scope) {
        this.$scope = $scope;
    }
}
HomeCtrl.$inject = ['$scope'];
class HomeComponent {
    constructor() {
        this.template = __webpack_require__(321);
        this.controller = HomeCtrl;
    }
}
exports.HomeComponent = HomeComponent;

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class NavCtrl {
    constructor($element) {
        this.$element = $element;
        $element.addClass('navbar navbar-default navbar-fixed-top').css({ position: 'relative' });
    }
}
NavCtrl.$inject = ['$element'];
class NavComponent {
    constructor() {
        this.template = __webpack_require__(322);
        this.controller = NavCtrl;
    }
}
exports.NavComponent = NavComponent;

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Public;
(function (Public) {
    Public.routes = [{
        name: 'rootBundle',
        abstract: true,
        url: "/"
    }, {
        name: 'rootBundle.root',
        template: __webpack_require__(323),
        abstract: true,
        resolve: {
            register: ['jsBundleResolver', function (jsBundleResolver) {
                return jsBundleResolver((app, resolve) => {
                    __webpack_require__.e/* require.ensure */(0/* min-size */).then((function () {
                        app.register(__webpack_require__(131));
                        resolve();
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                });
            }]
        }
    }, {
        name: "root",
        parent: "rootBundle.root",
        component: 'eqHome'
    }, {
        name: "about",
        url: "about/",
        parent: "rootBundle.root",
        component: 'eqAbout'
    }];
})(Public = exports.Public || (exports.Public = {}));

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const angular = __webpack_require__(31);
var app = angular.module("app.public", []);
const nav_component_1 = __webpack_require__(129);
const home_component_1 = __webpack_require__(128);
const about_component_1 = __webpack_require__(127);
app.component('eqNav', new nav_component_1.NavComponent());
app.component('eqHome', new home_component_1.HomeComponent());
app.component('eqAbout', new about_component_1.AboutComponent());
module.exports = app;

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const angular = __webpack_require__(31);
const query_conditions_1 = __webpack_require__(86);
const query_interface_1 = __webpack_require__(87);
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
class QueryBuilderCtrl {
    constructor($element, $scope) {
        this.$element = $element;
        this.$scope = $scope;
        this.maxChips = 1;
        this.multi = false;
        this.operators = query_conditions_1.QUERY_OPERATORS;
        this.conditions = [];
        this.$event = "";
        this.$queryString = "";
        this.$outputUpdate = false;
        let self = this;
        Object.keys(query_conditions_1.QUERY_CONDITIONS).forEach(function (k) {
            self.conditions.push(query_conditions_1.QUERY_CONDITIONS[k]);
        });
    }
    $onInit() {
        if (!this.group) this.group = angular.copy(query_interface_1.QUERY_INTERFACE.filters);
        if (!this.fieldValue) this.fieldValue = 'value';
        if (!this.fieldName) this.fieldName = 'name';
        this.onGroupChange();
    }
    $doCheck() {
        if (!angular.equals(this.queryString, this.$queryString)) {
            let self = this;
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
    }

    split_string(query) {
        if (!query) return;
        let words = query.trim().split(/ /g);
        let conditions = ["(", ")"];
        let qArr = [];
        let string = "";
        this.conditions.map(function (c) {
            let defaultCase = Array.isArray(c.symbol) ? c.symbol : [c.symbol];
            let lowerCase = defaultCase.map(o => {
                return o.toLowerCase();
            });
            conditions = conditions.concat(defaultCase, lowerCase);
        });
        this.operators.map(function (c) {
            let defaultCase = Array.isArray(c.name) ? c.name : [c.name];
            let lowerCase = defaultCase.map(o => {
                return o.toLowerCase();
            });
            conditions = conditions.concat(defaultCase, lowerCase);
        });
        conditions = conditions.unique();
        var i = 0;
        let handler = [];
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
        qArr = qArr.filter(function (o) {
            return o !== "";
        });
        let _split = () => {
            let cQarr = qArr.slice(0);
            qArr.forEach(function (o, i) {
                let regex = /\(|\)/g;
                let m = o.length > 1 ? regex.exec(o) : null;
                if (m) {
                    qArr.splice(m[0] === "(" ? i : i + 1, 0, m[0]);
                    let string = o.replaceAt(m.index, "");
                    qArr.splice(m[0] === ")" ? i : i + 1, 1, string);
                }
            });
            if (qArr.length !== cQarr.length) _split();
        };
        _split();
        qArr = qArr.map(function (o) {
            return o.trim();
        });
        return qArr;
    }
    parseQuery(queryString) {
        let self = this;
        let queryArray = this.split_string(queryString);
        let operators = [];
        this.operators.map(function (c) {
            let defaultCase = Array.isArray(c.name) ? c.name : [c.name];
            let lowerCase = defaultCase.map(o => {
                return o.toLowerCase();
            });
            operators = operators.concat(lowerCase);
        });
        let conditions = [];
        Object.keys(query_conditions_1.QUERY_CONDITIONS).forEach(function (k) {
            let symbol = query_conditions_1.QUERY_CONDITIONS[k].symbol;
            conditions.push({
                symbol: Array.isArray(symbol) ? symbol : [symbol],
                value: query_conditions_1.QUERY_CONDITIONS[k].value
            });
        });
        let newGroup = () => {
            let filters = angular.copy(query_interface_1.QUERY_INTERFACE.filters);
            Object.assign(filters, {
                expressions: []
            });
            return filters;
        };
        let newCondition = exp => {
            let expressions = angular.copy(query_interface_1.QUERY_INTERFACE.filters.expressions[0]);
            let regex = /(["'`])(\\?.)*?\1/g;
            let val = regex.exec(exp[2]);
            let value = val ? exp[2].substring(1, exp[2].length - 1) : exp[2];
            let desc = regex.exec(exp[0]);
            let description = desc ? exp[0].substring(1, exp[0].length - 1) : exp[0];
            Object.assign(expressions, {
                values: [],
                field: self.fields.find(function (o) {
                    return description === o[self.fieldName];
                }),
                operator: conditions.find(o => {
                    return o.symbol.indexOf(exp[1]) !== -1;
                }).value
            });
            expressions.values.push(value);
            expressions.values = expressions.values.filter(function (o) {
                return o !== "" && o !== "``";
            });
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
                    arr = arr.filter(function (o) {
                        return o !== "$$QueryBuilder";
                    });
                    let reg = /(\()?(?:[^()]+|\([^)]+\))+(\)?)/;
                    let m = reg.exec(arr.join(" "));
                    if (m) {
                        let balance = m[0].replaceAt(0, "");
                        balance = balance.replaceAt(balance.length - 1, "");
                        let newStr = arr.join(" ").replace(balance, "").replace(/\(\)/, "");
                        arr = ["$$QueryBuilder"].concat(this.split_string(newStr.trim()) || []);
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
    stringifyQuery(group) {
        let self = this;
        if (!group) return;
        var str = [];
        angular.forEach(group.expressions, function (o, i) {
            if (o.type === 'condition') {
                var values = o.values[0] ? o.values.join(", ") : "";
                if (!o.field || !o.field[self.fieldName]) return;
                if (i !== 0) str.push(group.op);
                str.push(o.field[self.fieldName]);
                let condition = self.conditions.find(function (q) {
                    return o.operator === q.value;
                }).symbol;
                str.push(Array.isArray(condition) ? condition[0] : condition);
                let ticks = "`";
                if (values) str.push(self.$outputUpdate ? values : ticks + values + ticks);
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
        });
        return str;
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
    onConditionChange(rule, e) {
        this.$event = 'onConditionChange';
        this.setOperator(rule.operator);
        this.onGroupChange();
    }

    onGroupChange(e) {
        clearTimeout(this.$timeoutPromise);
        let self = this;
        this.$event = e || 'onGroupChange';
        let conditions = [];
        let values = [];
        this.group.expressions.forEach(function (o, i) {
            if (o.type !== 'condition') return;
            conditions.push(o);
            let hasValue = o.values ? o.values[0] : false;
            let hasOperand = o.field ? o.field[self.fieldValue] : false;
            if (hasValue && hasOperand) values.push(i);
        });
        this.setFieldsDescription(this.group);
        this.trigger('onUpdate');
        if (conditions.length > 0 && values.length === conditions.length) {
            this.AddCondition(values[values.length - 1] + 1);
        } else if (conditions.length == 0) {
            this.AddCondition(0);
        }
    }
    setFieldsDescription(group) {
        let self = this;
        group.expressions.forEach(function (o, i) {
            !function (obj) {
                if (obj.type === 'condition') {
                    let test = self.fields.map(function (o) {
                        if (obj.field && obj.field[self.fieldValue] === o[self.fieldValue]) {
                            return obj.field = o;
                        } else if (obj.field && obj.field[self.fieldName] === o[self.fieldName]) {
                            return obj.field = o;
                        }
                    });
                } else {
                    obj = self.setFieldsDescription(obj);
                }
            }(o);
        });
    }

    AddCondition(idx) {
        let self = this;
        var condition = angular.copy(query_interface_1.QUERY_INTERFACE.filters.expressions[0], {
            $$indeed: self.$countCondition,
            values: []
        });
        if (idx > -1) {
            self.group.expressions.splice(idx, 0, condition);
        } else {
            self.group.expressions.push(condition);
        }
    }
    AddGroup(e) {
        this.$event = 'AddGroup';
        this.group.expressions.push(angular.copy(query_interface_1.QUERY_INTERFACE.filters));
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
        this.group.expressions.map(function (o) {
            if (o.type === 'condition') self.$countCondition++;
        });
        if (self.$countCondition === 1) return;
        self.group.expressions.splice(idx, 1);
        this.onGroupChange();
    }
    onDeleteGroup(e) {
        let self = this;
        let gCopy = this.group.expressions.slice(0);
        gCopy.forEach(function (o, i) {
            if (o.$$hashKey === e.group.$$hashKey && o.$$indeed === e.group.$$indeed) self.group.expressions.splice(i, 1);
        });
        this.onGroupChange();
    }
    onUpdateGroup(e) {
        this.trigger('onUpdate');
    }
    trigger(event) {
        let self = this;
        let string = this.stringifyQuery(this.group);
        this.$queryString = this.queryString = string.join(' ');
        this.$outputUpdate = false;
        this[event]({
            $event: {
                group: JSON.parse(angular.toJson(self.group)),
                string: self.queryString
            }
        });
    }
    $onDestroy() {
        clearTimeout(this.$timeoutPromise);
    }
}
QueryBuilderCtrl.$inject = ['$element', '$scope'];
__webpack_require__(330);
class QueryBuilder {
    constructor() {
        this.bindings = {
            onDelete: '&',
            onUpdate: '&',
            fieldValue: '@?',
            fieldName: '@?',
            queryString: '=?',
            $$index: '<',
            group: '=',
            fields: '<'
        };
        this.template = __webpack_require__(326);
        this.controller = QueryBuilderCtrl;
    }
}
exports.QueryBuilder = QueryBuilder;

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(333);

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const angular = __webpack_require__(31);
const query_builder_component_1 = __webpack_require__(132);
const query_conditions_1 = __webpack_require__(86);
const query_interface_1 = __webpack_require__(87);
var app = angular.module("app.queryBuilder", []);
__webpack_require__(133)(app);
app.component('queryBuilder', new query_builder_component_1.QueryBuilder());
app.constant('QUERY_OPERATORS', query_conditions_1.QUERY_OPERATORS);
app.constant('QUERY_CONDITIONS', query_conditions_1.QUERY_CONDITIONS);
app.constant('QUERY_INTERFACE', query_interface_1.QUERY_INTERFACE);
module.exports = app;

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var QueryBuilder;
(function (QueryBuilder) {
    QueryBuilder.routes = [{
        name: 'QueryBuilder',
        parent: "rootBundle.root",
        abstract: true,
        resolve: {
            ModuleResolver: ['jsBundleResolver', function (jsBundleResolver) {
                return jsBundleResolver(function (app, resolve) {
                    __webpack_require__.e/* require.ensure */(0/* min-size */).then((function () {
                        app.register(__webpack_require__(134));
                        resolve();
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                });
            }]
        }
    }, {
        name: 'queryBuilder',
        url: 'query-builder/',
        parent: 'QueryBuilder',
        template: __webpack_require__(324)
    }];
})(QueryBuilder = exports.QueryBuilder || (exports.QueryBuilder = {}));

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const public_routes_1 = __webpack_require__(130);
const routes_1 = __webpack_require__(135);
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

/***/ 319:
/***/ (function(module, exports) {

module.exports =
	"/**\n*\n*  Bootstrap default values:\n*\n@gray-darker:            lighten(#000, 13.5%); // #222\n@gray-dark:              lighten(#000, 20%);   // #333\n@gray:                   lighten(#000, 33.5%); // #555\n@gray-light:             lighten(#000, 60%);   // #999\n@gray-lighter:           lighten(#000, 93.5%); // #eee\n**/\n/**\n* Bootstrap default values for primary colors\n*\n@brand-primary:         #428bca;\n@brand-success:         #5cb85c;\n@brand-info:            #5bc0de;\n@brand-warning:         #f0ad4e;\n@brand-danger:          #d9534f;\n*/\n.form-group {\n  margin-bottom: 15px !important;\n  margin-right: 5px !important;\n  margin-left: 5px !important;\n}\n.query-filter-group {\n  min-width: 523px;\n  border: thin solid #5db0e1;\n  margin-bottom: 10px;\n}\n.query-filter-group:before {\n  content: '';\n  background-color: #5db0e1;\n  width: 3px;\n  left: 0;\n}\n.remove-group {\n  float: right;\n  margin-left: 8px;\n}\n.add-group {\n  float: right;\n  width: 95px;\n  background-color: rgba(62, 176, 200, 0.26);\n  border: thin solid #5db0e1;\n  color: #444444;\n}\n";

/***/ }),

/***/ 320:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 321:
/***/ (function(module, exports) {

module.exports = "<a ui-sref=queryBuilder>Angular.js Query Builder</a><br><br>";

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-static-top\"><div class=container><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#navbar aria-expanded=false aria-controls=navbar><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand href=#>Project name</a></div><div id=navbar class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav\"><li ui-sref-active=active ui-sref=root><a ui-sref=root>Home</a></li><li ui-sref-active=active><a ui-sref=about>About</a></li><li><a href=#contact>Contact</a></li></ul></div></div></nav>";

/***/ }),

/***/ 323:
/***/ (function(module, exports) {

module.exports = "<eq-nav></eq-nav><div ui-view=\"\" class=container></div>";

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

module.exports = "<div class=container ng-controller=\"QueryBuilderController as $ctrl\"><h1>Angular.js Query Builder</h1>Condition:<textarea style=\"width: 100%; height: 100px\" class=flex ng-model=$ctrl.output name=query-string ng-trim=true></textarea><div class=\"alert alert-info\"><strong>Example Output</strong><br><span ng-bind-html=$ctrl.output></span></div><query-builder group=$ctrl.filters fields=$ctrl.fields on-update=$ctrl.onChanges($event) query-string=$ctrl.output field-value=name field-name=description optgroup=\"\"></query-builder><p>Sample Queries: <i>Copy/Paste or write them out</i><br>Account Country == US AND ((Patient Gender equal `M` AND Patient Age equal `64`) OR (Patient Gender equal `F` AND Patient Age equal `64`))<br><br>((Patient Gender equal `M` AND Patient Age equal `64`) OR (Patient Gender equal `F` AND Patient Age equal `64`))<br><br>(Patient Gender equal `M` AND Patient Age equal `64`) OR (Patient Gender equal `F` AND Patient Age equal `64`)<br><br>(Patient Gender equal `M` AND Patient Age equal `64`)<br><br>(Patient Gender equal `F` AND Patient Age equal `64`)<br><br></p></div>";

/***/ }),

/***/ 326:
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-info alert-group query-filter-group\" style=\"\">\n\n    <div class=\"form-inline\">\n        <div class=\"form-group\">\n            <select ng-options=\"o.name as o.name for o in $ctrl.operators\" data-ng-model=\"$ctrl.group.op\"\n                    class=\"form-control input-sm\"\n                    placeholder=\"{{$ctrl.group.op}}\"\n                    ng-change=\"$ctrl.onGroupChange()\"></select>\n        </div>\n        <!--GROUP CONTROLLERS-->\n        <button class=\"btn btn-default btn-xs remove-group\" md-no-ink ng-click=\"$ctrl.RemoveGroup()\"\n                ng-if=\"$ctrl.$$index\">\n            <i class=\"glyphicon glyphicon-trash\"></i>\n        </button>\n        <button class=\"btn btn-default btn-xs add-group\" md-no-ink ng-click=\"$ctrl.AddGroup()\">Add Group</button>\n    </div>\n\n\n    <!--GROUP CONDITIONS-->\n    <div class=\"group-conditions\">\n        <div ng-repeat=\"rule in $ctrl.group.expressions  track by $index\">\n            <!--//track position-->\n            <span ng-init=\"rule.$$indeed = $index\"></span>\n            <div ng-switch=\"rule.type === 'group'\">\n                <div ng-switch-when=\"true\" class=\"rule-group\">\n                    <query-builder group=\"rule\" fields=\"$ctrl.fields\" $$index=\"1\"\n                                   on-delete=\"$ctrl.onDeleteGroup($event)\"\n                                   on-update=\"$ctrl.onUpdateGroup($event)\"\n                                   field-value=\"{{$ctrl.fieldValue}}\" field-name=\"{{$ctrl.fieldName}}\"></query-builder>\n                </div>\n                <div ng-switch-default class=\"rule-condition\">\n                    <div style=\"margin-left: 30px;\">\n\n\n                        <div class=\"form-inline\">\n                            <div class=\"form-group\">\n                                <select ng-model=\"rule.field[$ctrl.fieldValue]\" class=\"form-control input-sm\"\n                                        ng-change=\"$ctrl.onGroupChange()\">\n                                    <option ng-value=\"t[$ctrl.fieldValue]\"\n                                            ng-repeat=\"t in $ctrl.fields \">\n                                        {{t[$ctrl.fieldName]}}\n                                    </option>\n                                    <!--              <optgroup label=\"Dimensions\">\n                                                      <option value=\"{{t.name}}\"\n                                                              ng-repeat=\"t in $ctrl.fields | filter: {type: 'DIMENSION' } track by t.description\">\n                                                          {{t.description}}\n                                                      </option>\n                                                  </optgroup>\n                                                  <optgroup label=\"Measures\">\n                                                      <option value=\"{{t.name}}\"\n                                                              ng-repeat=\"t in $ctrl.fields | filter: {type: 'MEASURE' } track by t.description\">\n                                                          {{t.description}}\n                                                      </option>\n                                                  </optgroup>-->\n                                </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <!--CONDITIONS-->\n                                <select class=\"form-control input-sm\"\n                                        ng-model=\"rule.operator\" placeholder=\"AND\"\n                                        ng-change=\"$ctrl.onConditionChange(rule)\">\n                                    <option value=\"{{c.value}}\"\n                                            ng-repeat=\"c in $ctrl.conditions | orderBy:'index'\">\n                                        {{c.name}}\n                                    </option>\n                                </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <input type=\"text\" ng-model=\"rule.values[0]\"\n                                       id=\"{{rule.$$hashKey}}\"\n                                       class=\"form-control input-sm\"\n                                       ng-keyup=\"$ctrl.onGroupChange($event)\">\n\n                                <button ng-class=\"{'invisible':!rule.values[0]}\" style=\"margin-left: 5px\"\n                                        ng-click=\"$ctrl.RemoveCondition($index)\" class=\"btn btn-sm btn-danger\"><span\n                                    class=\"glyphicon glyphicon-minus-sign\"></span></button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 327:
/***/ (function(module, exports) {

module.exports = "{\n    \"dimension\": [\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_CITY\",\n            \"description\": \"Account City\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_COUNTRY\",\n            \"description\": \"Account Country\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_NUMBER\",\n            \"description\": \"Account Number\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_STATE\",\n            \"description\": \"Account State\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_ZIP\",\n            \"description\": \"Account Zip\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.BILL_CODE\",\n            \"description\": \"Bill Code\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.BILL_DESCRIPTION\",\n            \"description\": \"Bill Description\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.DIAGNOSIS_CATEGORY\",\n            \"description\": \"Diagnosis Category\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.DIAGNOSIS_CODE\",\n            \"description\": \"Diagnosis Code\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.DIAGNOSIS_DESCRIPTION\",\n            \"description\": \"Diagnosis Description\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ORDER_DATE\",\n            \"description\": \"Order Date\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_AGE\",\n            \"description\": \"Patient Age\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_CITY\",\n            \"description\": \"Patient City\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_COUNTRY_NAME\",\n            \"description\": \"Patient Country Name\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_ETHNICITY\",\n            \"description\": \"Patient Ethnicity\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_GENDER\",\n            \"description\": \"Patient Gender\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_RACE\",\n            \"description\": \"Patient Race\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_STATE_NAME\",\n            \"description\": \"Patient State Name\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_ZIP\",\n            \"description\": \"Patient Zip\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PHYSICIAN_NAME\",\n            \"description\": \"Physician Name\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.TEST_CODE\",\n            \"description\": \"Test Code\",\n            \"optgroup\": \"DIMENSION\"\n        },\n        {\n            \"name\": \"DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.TEST_DESCRIPTION\",\n            \"description\": \"Test Description\",\n            \"optgroup\": \"DIMENSION\"\n        }\n    ]\n}\n"

/***/ }),

/***/ 329:
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
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
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


/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(319);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(329)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./query.less", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./query.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 331:
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

			Loader.OnStateChangeStart(function (modules, to) {

				var body = angular.element(document.body),
					setClass = function (state, name) {
						if (!name)return;
						var _name = name.replace(/\./g, '_');
						_class.push(_name);
						body[state](_name);

					};

				_class.forEach(function (_c) {
					body.removeClass(_c);
				});

				//remove all class
				_class.splice(0, _class.length);

				setClass('addClass', modules.join(' '));
				setClass('addClass', to);

			});
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
				module.requires.forEach(function (moduleName) {
					_this.currentModule.push(moduleName);
					$ocLazyLoad.inject(moduleName);
				});

				console.log('module._invokeQueue ---- ', module._invokeQueue.map(function (ary) {
					return ary[2][0]
				}));


				return $ocLazyLoad.load({name: module.name}).finally(function () {
					_this.currentModule.push(module.name);

				})
			};

			return {
				OnStateChangeStart: function (fn) {
					var func = typeof fn === 'function' ? fn : function () {
						};
					$transitions.onSuccess({to: '*'}, function (transition) {
						func(_this.currentModule, transition.$to().name)
					});
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

/***/ 332:
/***/ (function(module, exports) {

module.exports = function (app) {
	'use strict';


	app.run(['routeState', function (State) {
		var _class = [];
		State.OnStateChangeStart(function(to, from){
			var body = angular.element(document.body),
				_cName = to.name.replace(/\.?([A-Z])/g, function (x, y) {
					return "-" + y.toLowerCase()
				}).replace(/^_/, "");

			_class.forEach(function (_c) {
				body.removeClass(_c);
			});
			//remove all class
			_class.splice(0, _class.length);
			//replace whats in memory
			_class.push(_cName);
			angular.element(document.body).addClass(_cName); //body[0] !== document.body

		})
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
			angular.forEach(routes, function (route) {
				var views = route.views || {};

				Object.keys(views).forEach(function (key) {
					var tem = views[key].templateUrl;
					if (tem) {
						views[key].templateUrl = angular.isArray(tem) ? tem.join('/').replace(/\/\//g, '/') : tem;
					}
				});

				route.data = Object.assign({}, route.data, {
					debug: location.search.split('debug=')[1] || location.hash.split('debug=')[1]
				});

				r.push(route);
				$stateProvider.state(route);
			});


			$urlRouterProvider.otherwise(function ($injector) {
				$injector.get('$state').transitionTo('root');
			});

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
					$rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
						func(toState, toParams, fromState, fromParams)
					});
				}
			};
		}];

	}
};


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by ramor11 on 3/1/2016.
 */

var JSON_DATASET = JSON.parse(__webpack_require__(327));

module.exports = function (app) {

	app.controller('QueryBuilderController', FilterController);

	FilterController.$inject = ['QUERY_INTERFACE'];

	function FilterController(QUERY_INTERFACE) {

		console.clear();
		this.filters = angular.copy(QUERY_INTERFACE.filters);
		// this.filters = {
		// 	"type": "group",
		// 	"op": "AND",
		// 	"expressions": [{
		// 		"type": "condition",
		// 		"field": {
		// 			"description": "Account Country",
		// 			"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_COUNTRY",
		// 			"dataType": "STRING",
		// 			"type": "DIMENSION"
		// 		},
		// 		"operator": "EQ",
		// 		"values": ["United States"]
		// 	}, {
		// 		"type": "group",
		// 		"op": "OR",
		// 		"expressions": [{
		// 			"type": "group",
		// 			"op": "AND",
		// 			"expressions": [{
		// 				"type": "condition",
		// 				"field": {
		// 					"description": "Patient Gender",
		// 					"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_GENDER",
		// 					"dataType": "STRING",
		// 					"type": "DIMENSION"
		// 				},
		// 				"operator": "LT",
		// 				"values": ["M"]
		// 			}, {
		// 				"type": "condition",
		// 				"operator": "EQ",
		// 				"field": {
		// 					"description": "Patient Age",
		// 					"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_AGE",
		// 					"dataType": "STRING",
		// 					"type": "DIMENSION"
		// 				},
		// 				"values": []
		// 			}],
		// 		}, {
		// 			"type": "group",
		// 			"op": "AND",
		// 			"expressions": [{
		// 				"type": "condition",
		// 				"field": {
		// 					"description": "Patient Gender",
		// 					"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_GENDER",
		// 					"dataType": "STRING",
		// 					"type": "DIMENSION"
		// 				},
		// 				"operator": "EQ",
		// 				"values": ["F"]
		// 			}]
		// 		}]
		// 	}]
		// };

		var mapping = function (d) {
			var handler = {
				description: d.description,
				name: d.name
			};
			return handler;
		};

		this.fields = angular.copy(JSON_DATASET.dimension.map(mapping));

		this.onChanges = function (e) {

			if (!angular.equals(this.output, e.string)) {
				this.output = e.string;
			}
		};


		// this.getFields = function (group) {
		// 	console.log('getFields', group)
		//
		// 	var self = this;
		// 	group.expressions.forEach(function (o, i) {
		// 		!function (obj) {
		// 			if (obj.type === 'condition') {
		// 				var test = self.fields.map(function (o) {
		// 					if (obj.field.name && obj.field.name === o.name) {
		// 						return obj.field = o;
		// 					} else if (obj.field.description && obj.field.description === o.description) {
		// 						return obj.field = o;
		// 					}
		// 				});
		// 			} else {
		// 				obj = self.getFields(obj)
		// 			}
		// 		}(o)
		// 	});
		//
		// };


	}

};




// WEBPACK FOOTER //
// ./src/js/queryBuilder/controller/query.controller.js

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
module.exports = __webpack_require__(118);


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.QUERY_OPERATORS = [{ name: 'AND' }, { name: 'OR' }];
exports.QUERY_CONDITIONS = {
    EQUAL: {
        name: "Equal",
        value: "EQ",
        symbol: ["equal", "=="]
    },
    NOT_EQUAL: {
        name: "Not Equal",
        value: "NE",
        symbol: "not_equal"
    },
    GREATER_THAN: {
        name: "Greater Than",
        value: "GT",
        symbol: "greater_than"
    },
    GREATER_EQUAL: {
        name: "Greater or Equal",
        value: "GE",
        symbol: "greater_or_equal"
    },
    LESS_THAN: {
        name: "Less Than",
        value: "LT",
        symbol: "less_than"
    },
    LESS_EQUAL: {
        name: "Less or Equal",
        value: "LE",
        symbol: "less_or_equal"
    },
    IN: {
        name: "In",
        value: "IN",
        symbol: "in"
    },
    BETWEEN: {
        name: "Between",
        value: "BETWEEN",
        symbol: "between"
    },
    CONTAINS: {
        name: "Contains",
        value: "CONTAINS",
        symbol: "contains"
    },
    NOT_CONTAINS: {
        name: "Not Contains",
        value: "NOT_CONTAINS",
        symbol: "not_contains"
    },
    STARTS_WITH: {
        name: "Starts With",
        value: "STARTS_WITH",
        symbol: "starts_with"
    },
    ENDS_WITH: {
        name: "Ends With",
        value: "ENDS_WITH",
        symbol: "ends_with"
    }
};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.QUERY_INTERFACE = Object.freeze({
    filters: {
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
    }
});

/***/ })

},[334]);
//# sourceMappingURL=app.1bcd367be955f77d364a.bundle.map