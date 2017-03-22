"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var query_conditions_1 = require("./query.conditions");
var query_interface_1 = require("./query.interface");
var QBKEY = "$$QueryBuilder";
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
var QueryBuilderCtrl = (function () {
    function QueryBuilderCtrl($element, $scope) {
        this.$element = $element;
        this.$scope = $scope;
        this.maxChips = 1;
        this.multi = false;
        this.operators = query_conditions_1.QUERY_OPERATORS;
        this.conditions = [];
        this.$event = "";
        this.$queryString = "";
        this.$outputUpdate = false;
        this.$trigger = false;
        var self = this;
        Object.keys(query_conditions_1.QUERY_CONDITIONS).forEach(function (k) {
            self.conditions.push(query_conditions_1.QUERY_CONDITIONS[k]);
        });
    }
    QueryBuilderCtrl.prototype.$onInit = function () {
        if (!this.group)
            this.group = angular.copy(query_interface_1.QUERY_INTERFACE);
        if (!this.fieldValue)
            this.fieldValue = 'value';
        if (!this.fieldName)
            this.fieldName = 'name';
        this.onGroupChange();
    };
    QueryBuilderCtrl.prototype.$doCheck = function () {
        var self = this;
        if (!angular.equals(this.queryString, this.$queryString)) {
            console.log('doCheck:', this.queryString);
            this.$queryString = this.queryString;
            clearTimeout(this.$timeoutPromise);
            this.$timeoutPromise = setTimeout(function () {
                self.$outputUpdate = true;
                var obj = self.parseQuery(self.queryString);
                var group = angular.toJson(obj);
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
    };
    ;
    QueryBuilderCtrl.prototype.split_string = function (query) {
        if (!query)
            return;
        var words = (query.trim()).split(/ /g);
        var conditions = ["(", ")"];
        var self = this;
        var qArr = [];
        var string = "";
        var operands = [];
        this.conditions.map(function (c) {
            var lowerCase = (Array.isArray(c.symbol) ? c.symbol : [c.symbol]).map(function (o) {
                return o.toLowerCase();
            });
            conditions = conditions.concat(lowerCase);
        });
        this.fields.map(function (o) {
            operands.push(o[self.fieldName]);
        });
        this.operators.map(function (c) {
            var lowerCase = (Array.isArray(c.name) ? c.name : [c.name]).map(function (o) {
                return o.toLowerCase();
            });
            conditions = conditions.concat(lowerCase);
        });
        conditions = conditions.unique();
        var wCopy = words.filter(function (o) {
            return o !== "";
        });
        var _split = function () {
            var cQarr = wCopy.slice(0);
            wCopy.forEach(function (o, i) {
                var regex = /\(|\)/g;
                var m = o.length > 1 ? regex.exec(o) : null;
                if (m) {
                    wCopy.splice(m[0] === "(" ? i : i + 1, 0, m[0]);
                    var string_1 = o.replaceAt(m.index, "");
                    wCopy.splice(m[0] === ")" ? i : i + 1, 1, string_1);
                }
            });
            if (wCopy.length !== cQarr.length)
                _split();
        };
        _split();
        words = wCopy.slice(0);
        var sCount = [];
        var position = 0;
        var _loop_1 = function (i_1) {
            var test = words[i_1].trim();
            if (["(", ")"].indexOf(test) === -1) {
                string += " " + words[i_1];
                sCount.push(i_1);
                if (conditions.indexOf(test.toLowerCase()) > -1) {
                    var isNot = words[i_1 - 1] ? words[i_1 - 1].toUpperCase() === "NOT" : false;
                    var cond = test;
                    if (isNot) {
                        cond = [words[i_1 - 1], test].join(" ");
                        wCopy.splice(i_1, 1, cond);
                        wCopy.splice(i_1 - 1, 1, QBKEY);
                    }
                    var comp1 = string.replace(cond, "").trim();
                    var comp2 = words[i_1 - 1] ? words[i_1 - 1].trim() : null;
                    if (comp1 && [test, comp2].indexOf(comp1) < 0) {
                        wCopy.splice(i_1 - 1, 1, comp1.trim());
                        sCount.forEach(function (idx) {
                            if (idx < (i_1 - 1))
                                wCopy.splice(idx, 1, QBKEY);
                        });
                    }
                    sCount = [];
                    string = "";
                }
                else if (operands.indexOf(string.trim()) > -1) {
                    wCopy.splice(i_1, 1, string.trim());
                    sCount.forEach(function (idx) {
                        if (idx < i_1)
                            wCopy.splice(idx, 1, QBKEY);
                    });
                    sCount = [];
                    string = "";
                }
            }
            else if (test === ")") {
                sCount = [];
                string = "";
            }
            position = i_1;
        };
        for (var i_1 = 0; i_1 < words.length; i_1++) {
            _loop_1(i_1);
        }
        if (string)
            wCopy.splice(position, 1, string.trim());
        sCount.forEach(function (idx) {
            if (idx < position)
                wCopy.splice(idx, 1, QBKEY);
        });
        words = wCopy.filter(function (o) {
            return o !== QBKEY;
        });
        var i = 0;
        var handler = [];
        string = "";
        do {
            if (words[i]) {
                if (conditions.indexOf(words[i].toLowerCase()) < 0) {
                    var regex = /^and|AND|or|OR$`/g;
                    var cond = regex.exec(words[i]);
                    if (cond) {
                        handler.push(string);
                        handler.push(words[i]);
                    }
                    else {
                        string += " " + words[i];
                    }
                }
                else if (["(", ")"].indexOf(words[i].trim()) !== -1) {
                    handler.push(string);
                    string = "";
                    handler.push(words[i]);
                }
                else {
                    var regex = /(["'`])(\\?.)*?\1/g;
                    var value = regex.exec(string);
                    if (value) {
                        handler.push(value.input);
                    }
                    else {
                        handler.push(string);
                    }
                    if (words[i])
                        handler.push(words[i]);
                    if (handler.length > 3) {
                        qArr = qArr.concat(handler);
                        handler = [];
                    }
                    string = "";
                }
            }
            else {
                handler.push(string);
            }
            i++;
        } while (i <= words.length);
        qArr = qArr.concat(handler);
        qArr = qArr.filter(function (o) {
            return o !== "";
        });
        qArr = qArr.map(function (o) {
            return o.trim();
        });
        return qArr;
    };
    QueryBuilderCtrl.prototype.defineDatatype = function (dataType, values) {
        values = Array.isArray(values) ? values : [values];
        var num = (values.slice(0)).map(function (f) {
            return typeof f === 'string' ? f.trim() : f;
        });
        if (dataType)
            switch (dataType.toUpperCase()) {
                case 'NUMBER':
                case 'INTEGER':
                case 'FLOAT':
                    num = values.map(function (v) {
                        return Number(v);
                    });
                    break;
            }
        return num.unique();
    };
    QueryBuilderCtrl.prototype.parseQuery = function (queryString) {
        var _this = this;
        var self = this;
        var queryArray = this.split_string(queryString);
        var operators = [];
        this.operators.map(function (c) {
            var lowerCase = (Array.isArray(c.name) ? c.name : [c.name]).map(function (o) {
                return o.toLowerCase();
            });
            operators = operators.concat(lowerCase);
        });
        var conditions = [];
        Object.keys(query_conditions_1.QUERY_CONDITIONS).forEach(function (k) {
            var symbol = query_conditions_1.QUERY_CONDITIONS[k].symbol;
            conditions.push({
                symbol: Array.isArray(symbol) ? symbol : [symbol],
                value: query_conditions_1.QUERY_CONDITIONS[k].value
            });
        });
        var newGroup = function () {
            var filters = angular.copy(query_interface_1.QUERY_INTERFACE);
            Object.assign(filters, {
                expressions: []
            });
            return filters;
        };
        var newCondition = function (exp) {
            var expressions = angular.copy(query_interface_1.QUERY_INTERFACE.expressions[0]);
            var regex = /(["'`])(\\?.)*?\1/g;
            var val = regex.exec(exp[2]);
            var value = val ? exp[2].substring(1, exp[2].length - 1) : exp[2];
            var desc = regex.exec(exp[0]);
            var description = desc ? exp[0].substring(1, exp[0].length - 1) : exp[0];
            Object.assign(expressions, {
                values: [],
                field: self.fields.find(function (o) {
                    return description === o[self.fieldName];
                }),
                operator: conditions.find(function (o) {
                    return o.symbol.indexOf(exp[1].toLowerCase()) !== -1 || o.symbol.indexOf(exp[1].toUpperCase()) !== -1;
                }).value
            });
            var dataType = expressions.field.hasOwnProperty(_this.fieldDatatype) ? expressions.field[_this.fieldDatatype] : false;
            var values = _this.defineDatatype(dataType, value.split(","));
            values.forEach(function (v) {
                expressions.values.push(v);
            });
            expressions.values = expressions.values.filter(function (o) {
                return o !== "" && o !== "``";
            });
            return expressions;
        };
        var group = newGroup();
        var parseIt = function (group, arr) {
            var expressions = [];
            if (!arr)
                return;
            for (var i = 0; i < arr.length; i++) {
                var txt = arr[i];
                if (txt === "$$QueryBuilder")
                    return;
                if (txt === "(") {
                    var _group = newGroup();
                    group.expressions.push(_group);
                    arr = arr.filter(function (o) {
                        return o !== "$$QueryBuilder";
                    });
                    var reg = /(\()?(?:[^()]+|\([^)]+\))+(\)?)/;
                    var m = reg.exec(arr.join(" "));
                    if (m) {
                        var balance = m[0].replace(/\(/, "").trim();
                        balance = balance.replaceAt(balance.length - 1, "").trim();
                        var newStr = ((arr.join(" ")).replace(balance, "")).replace(/\(\s{1,}\)/, "").trim();
                        arr = ["$$QueryBuilder"].concat(_this.split_string(newStr) || []);
                        var handler = _this.split_string(balance) || [];
                        handler = handler.filter(function (o) {
                            return o.trim();
                        });
                        expressions = [];
                        parseIt(_group, handler);
                    }
                }
                else if (txt === ")") {
                }
                else if (operators.indexOf(txt.toLowerCase()) === -1) {
                    expressions.push(txt);
                    if (expressions.length === 3)
                        group.expressions.push(newCondition(expressions));
                }
                else {
                    group.op = txt;
                    expressions = [];
                }
                arr[i] = "$$QueryBuilder";
            }
        };
        parseIt(group, queryArray);
        return group;
    };
    QueryBuilderCtrl.prototype.stringifyQuery = function (group) {
        var self = this;
        if (!group)
            return;
        var str = [];
        angular.forEach(group.expressions, function (o, i) {
            if (o.type === 'condition') {
                if (!o.field || !o.field[self.fieldName])
                    return;
                if (i !== 0)
                    str.push(group.op);
                str.push(o.field[self.fieldName]);
                var dataType = o.field.hasOwnProperty(self.fieldDatatype) ? o.field[self.fieldDatatype] : false;
                var values = o.values[0] ? (self.defineDatatype(dataType, o.values)).unique().join(", ") : "";
                var condition = self.conditions.find(function (q) {
                    return o.operator === q.value;
                }).symbol;
                str.push(Array.isArray(condition) ? condition[0] : condition);
                var ticks = "`";
                str.push(self.$outputUpdate ? values : ticks + values + ticks);
            }
            else {
                var comp = self.stringifyQuery(o);
                if (comp.length) {
                    if (str.length)
                        str.push(group.op);
                    if (comp.length > 3) {
                        comp.unshift("(");
                        comp.push(")");
                    }
                    str = str.concat(comp);
                }
            }
        });
        return str;
    };
    QueryBuilderCtrl.prototype.setOperator = function (operator) {
        var self = this;
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
    };
    QueryBuilderCtrl.prototype.safeApply = function (fn) {
        var scope = this.$scope;
        clearTimeout(this.$digestCycle);
        this.$digestCycle = setTimeout(function () {
            var phase = scope.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            }
            else if (!scope.$$phase) {
                scope.$apply(fn);
            }
        }, 0);
    };
    QueryBuilderCtrl.prototype.onOperandChange = function (rule) {
        this.$event = 'onOperandChange';
        this.$outputUpdate = false;
        this.onGroupChange();
    };
    QueryBuilderCtrl.prototype.onKeyUp = function (e, rule) {
        var self = this;
        var evnt = e.originalEvent || e;
        this.$event = 'onKeyUp';
        this.$trigger = true;
        this.$outputUpdate = false;
        this.onPrefetch(evnt, rule).then(function (e) {
            self.onGroupChange();
        });
    };
    QueryBuilderCtrl.prototype.onTagsChange = function (e) {
        this.$event = 'onTagsChange';
        this.$outputUpdate = false;
        this.onGroupChange();
        this.safeApply();
    };
    QueryBuilderCtrl.prototype.onConditionChange = function (rule, e) {
        this.$event = 'onConditionChange';
        this.setOperator(rule.operator);
        rule.values.splice(this.maxChips);
        this.onGroupChange();
    };
    ;
    QueryBuilderCtrl.prototype.checkExpressions = function (group) {
        var self = this;
        var conditions = [];
        var values = [];
        group.expressions.forEach(function (o, i) {
            if (o.type === 'condition') {
                conditions.push(o);
                var hasValue = o.values ? o.values[0] : false;
                var hasOperand = o.field ? o.field[self.fieldValue] : false;
                if (hasValue && hasOperand)
                    values.push(i);
            }
            else {
                self.checkExpressions(o);
            }
        });
        if (conditions.length > 0 && values.length === conditions.length) {
            this.AddCondition(group, values[values.length - 1] + 1);
        }
        else if (conditions.length == 0) {
            this.AddCondition(group, 0);
        }
    };
    QueryBuilderCtrl.prototype.onChange = function (e) {
        this.onGroupChange(e);
    };
    QueryBuilderCtrl.prototype.onGroupChange = function (e) {
        clearTimeout(this.$timeoutPromise);
        var self = this;
        this.$event = e || 'onGroupChange';
        this.checkExpressions(this.group);
        this.setFieldsDescription(this.group);
        this.trigger('onUpdate');
    };
    QueryBuilderCtrl.prototype.setFieldsDescription = function (group) {
        var self = this;
        var findBy = self.$outputUpdate ? self.fieldName : self.fieldValue;
        group.expressions.forEach(function (condition, i) {
            if (condition.type === 'condition') {
                var found = self.fields.find(function (o) {
                    return condition.field[findBy] === o[findBy];
                });
                if (found)
                    Object.assign(condition.field, found);
                var dataType = condition.field.hasOwnProperty(self.fieldDatatype) ? condition.field[self.fieldDatatype] : false;
            }
            else {
                self.setFieldsDescription(condition);
            }
        });
    };
    ;
    QueryBuilderCtrl.prototype.AddCondition = function (group, idx) {
        var self = this;
        var condition = angular.copy(query_interface_1.QUERY_INTERFACE.expressions[0], {
            $$indeed: self.$countCondition,
            values: []
        });
        if (idx > -1) {
            group.expressions.splice(idx, 0, condition);
        }
        else {
            group.expressions.push(condition);
        }
    };
    QueryBuilderCtrl.prototype.AddGroup = function (e) {
        this.$event = 'AddGroup';
        this.group.expressions.push(angular.copy(query_interface_1.QUERY_INTERFACE));
    };
    QueryBuilderCtrl.prototype.RemoveGroup = function (e) {
        this.$event = 'RemoveGroup';
        var self = this;
        this.onDelete({
            $event: {
                group: self.group
            }
        });
    };
    QueryBuilderCtrl.prototype.RemoveCondition = function (idx, e) {
        this.$event = 'RemoveCondition';
        var self = this;
        this.$countCondition = 0;
        this.group.expressions.map(function (o) {
            if (o.type === 'condition')
                self.$countCondition++;
        });
        if (self.$countCondition === 1)
            return;
        self.group.expressions.splice(idx, 1);
        this.onGroupChange();
    };
    QueryBuilderCtrl.prototype.onDeleteGroup = function (e) {
        var self = this;
        var gCopy = this.group.expressions.slice(0);
        gCopy.forEach(function (o, i) {
            if (o.$$hashKey === e.group.$$hashKey && o.$$indeed === e.group.$$indeed)
                self.group.expressions.splice(i, 1);
        });
        this.onGroupChange();
    };
    QueryBuilderCtrl.prototype.onUpdateGroup = function (e) {
        this.trigger('onUpdate');
    };
    QueryBuilderCtrl.prototype.CleanObject = function () {
        var regex = /\{"type":"condition".*?"values":\[\]\}/g;
        var str = angular.toJson(this.group);
        var m;
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach(function (match) {
                try {
                    var obj = JSON.parse("[" + match + "]");
                    obj.forEach(function (o) {
                        if (!o.values.length) {
                            var search = JSON.stringify(o).trim();
                            var re = str.split(search);
                            str = re.join("");
                        }
                    });
                }
                catch (e) {
                }
            });
        }
        str = str.replace(/,\]/g, "]").replace(/\[,/g, "[").replace(/,,/g, ",");
        return this.setDatatypes(JSON.parse(str));
    };
    QueryBuilderCtrl.prototype.setDatatypes = function (group) {
        var self = this;
        group.expressions.forEach(function (o, i) {
            if (o.type === 'condition') {
                var dataType = o.field.hasOwnProperty(self.fieldDatatype) ? o.field[self.fieldDatatype] : false;
                o.values = o.values[0] ? self.defineDatatype(dataType, o.values) : [];
            }
            else {
                self.setDatatypes(o);
            }
        });
        return group;
    };
    ;
    QueryBuilderCtrl.prototype.trigger = function (event) {
        var self = this;
        var string = this.stringifyQuery(this.group);
        this.$queryString = string.join(' ');
        this.$outputUpdate = false;
        if (this.$queryString)
            this.queryString = this.$queryString;
        this[event]({
            $event: {
                event: self.$event,
                group: self.CleanObject(),
                string: self.queryString
            }
        });
    };
    QueryBuilderCtrl.prototype.onPrefetch = function (e, rule) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve) {
            var $event = { $event: e };
            if (rule)
                Object.assign($event, {
                    group: rule,
                    target: 'input'
                });
            if (e.$event)
                Object.assign($event, e);
            _this.onFetch({
                $event: $event
            });
            $event.$event.target.focus();
            resolve(e.target);
        });
    };
    QueryBuilderCtrl.prototype.onValueChange = function (e) {
        this.$event = 'onValueChange';
        var self = this;
        var a = [];
        Object.keys(e).forEach(function (k) {
            a.push(e[k]);
        });
        this.onPrefetch.apply(this, a).then(function (e) {
            self.onGroupChange();
        });
    };
    QueryBuilderCtrl.prototype.$onDestroy = function () {
        clearTimeout(this.$timeoutPromise);
        clearTimeout(this.$digestCycle);
    };
    return QueryBuilderCtrl;
}());
QueryBuilderCtrl.$inject = ['$element', '$scope'];
require('./query.less');
var QueryBuilder = (function () {
    function QueryBuilder() {
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
        this.template = require('./query-builder.component.html');
        this.controller = QueryBuilderCtrl;
    }
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=query-builder.component.js.map